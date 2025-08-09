import {
  Button,
  useMantineTheme,
  Loader,
  Tooltip,
  Center,
  Pagination
} from '@mantine/core';
import { IconEdit } from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackageInterface } from '../../../../interfaces/package';
import { getAllPackagesByAdmin } from '../../../../services/admin-services';
import { toast } from 'react-toastify';
import { organizationAdminUrls } from '../../../../utils/common/constants';
import { SearchBarFullWidht } from '../../../common/search-bar/search-bar';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import useHorizontalScroll from '../../../../hooks/horizontal-scroll';
import moment from 'moment';

const Packages = () => {
  const theme = useMantineTheme();
  const [packages, setPackages] = useState<PackageInterface[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<PackageInterface[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp } =
    useHorizontalScroll();
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemPerPage = 10;
  const highlightScrollRef = useRef(false);

  const handlePackageSelect = useCallback(
    (packageId: string) => {
      localStorage.setItem('packageId', packageId);
      navigate(
        `${organizationAdminUrls(
          organizationConfig.organization_name
        )}/dashboard/updates/${packageId}`
      );
    },
    [navigate, organizationConfig.organization_name]
  );

  useEffect(() => {
    const selectedPackage = localStorage.getItem('packageId');

    if (selectedPackage && filteredPackages.length > 0) {
      const index = filteredPackages.findIndex(
        pkg => pkg._id === selectedPackage
      );
      if (index === -1) return;

      const targetPage = Math.floor(index / itemPerPage) + 1;
      highlightScrollRef.current = true;
      setPage(targetPage);

      const timer = setTimeout(() => {
        const rowElement = document.getElementById(
          `package-${selectedPackage}`
        );
        if (rowElement) {
          rowElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          rowElement.style.backgroundColor =
            organizationConfig.organization_theme.theme.backgroundColor;
          rowElement.style.color =
            organizationConfig.organization_theme.theme.color;

          setTimeout(() => {
            localStorage.removeItem('packageId');
            rowElement.style.backgroundColor = '';
            rowElement.style.color = '';
          }, 2000);
        }

        highlightScrollRef.current = false;
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [
    filteredPackages,
    organizationConfig.organization_theme.theme.backgroundColor,
    organizationConfig.organization_theme.theme.color,
    itemPerPage
  ]);

  useEffect(() => {
    if (!highlightScrollRef.current) {
      setPage(1);
    }
    setTotalPages(Math.ceil(filteredPackages.length / itemPerPage));
  }, [filteredPackages]);

  const paginatedPackages = useMemo(() => {
    const start = (activePage - 1) * itemPerPage;
    const end = start + itemPerPage;
    return filteredPackages.slice(start, end);
  }, [filteredPackages, activePage]);

  useEffect(() => {
    getAllPackagesByAdmin()
      .then(packagesList => {
        setPackages(packagesList);
        setFilteredPackages(packagesList);
        setIsLoading(false);
      })
      .catch(error => {
        toast.error(
          error?.response?.data?.message || 'Failed to fetch packages.'
        );
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = packages.filter(
      pkg =>
        pkg.title.toLowerCase().includes(query) ||
        pkg.description.toLowerCase().includes(query)
    );
    setFilteredPackages(filtered);
  };

  return (
    <div
      style={{
        color: organizationConfig.organization_theme.theme.button.textColor,
        fontFamily: theme.fontFamily
      }}
    >
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold underline text-center px-2 py-4">
          Manage Packages
        </h1>
        <div className="text-right">
          <Button
            onClick={() =>
              navigate(
                `${organizationAdminUrls(
                  organizationConfig.organization_name
                )}/dashboard/addPackage`
              )
            }
          >
            Add Package
          </Button>
        </div>

        <SearchBarFullWidht
          search={searchQuery}
          handleSearch={handleSearch}
          placeHolder="Search by Title or Description"
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader
              size="xl"
              color={organizationConfig.organization_theme.theme.button.color}
            />
          </div>
        ) : (
          <div
            className="flex overflow-auto sm:overflow-hidden max-w-full shadow-lg rounded-lg"
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ userSelect: 'none' }}
          >
            <table className="w-full text-center shadow-md border">
              <colgroup>
                <col className="w-20" />
                <col className="w-55" />
                <col className="w-64" />
                <col className="w-32" />
                <col className="w-32" />
                <col className="w-25" />
              </colgroup>
              <thead
                className="text-xs"
                style={{
                  backgroundColor:
                    organizationConfig.organization_theme.theme.backgroundColor,
                  color: organizationConfig.organization_theme.theme.color
                }}
              >
                <tr>
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Start Date</th>
                  <th className="p-2 border">End Date</th>
                  <th className="p-2 border">Update Package</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {paginatedPackages.length > 0 ? (
                  paginatedPackages.map((pkg: PackageInterface, index) => (
                    <tr key={pkg._id} id={`package-${pkg._id}`}>
                      <td className="px-4 py-2 border">
                        {index + 1 + (activePage - 1) * itemPerPage}
                      </td>
                      <td className="px-4 py-2 border">{pkg.title}</td>
                      <td className="px-4 py-2 border">
                        <Tooltip label={pkg.description} withArrow>
                          <span>
                            {pkg.description.length > 20
                              ? pkg.description.substring(0, 20) + '...'
                              : pkg.description}
                          </span>
                        </Tooltip>
                      </td>
                      <td className="px-4 py-2 border">
                        {moment(pkg.startDate).format('YYYY-MM-DD')}
                      </td>
                      <td className="px-4 py-2 border">
                        {moment(pkg.endDate).format('YYYY-MM-DD')}
                      </td>
                      <td className="px-4 py-2 border">
                        <Button
                          onClick={() => handlePackageSelect(pkg._id)}
                          className="cursor-pointer"
                        >
                          <IconEdit />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-2">
                      No Packages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
        {!isLoading && totalPages > 1 && (
          <Center className="my-8">
            <Pagination
              value={activePage}
              onChange={setPage}
              total={totalPages}
            />
          </Center>
        )}
      </div>
    </div>
  );
};

export default Packages;
