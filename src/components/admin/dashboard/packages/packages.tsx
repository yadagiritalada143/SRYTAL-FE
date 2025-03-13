import { Button, useMantineTheme, Loader, Tooltip } from "@mantine/core";
import { IconEdit } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PackageInterface } from "../../../../interfaces/package";
import { getAllPackagesByAdmin } from "../../../../services/admin-services";
import { toast } from "react-toastify";
import { organizationAdminUrls } from "../../../../utils/common/constants";
import { SearchBarFullWidht } from "../../../common/search-bar/search-bar";
import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../../atoms/organization-atom";
import useHorizontalScroll from "../../../../hooks/horizontal-scroll";
import moment from "moment";

const Packages = () => {
  const theme = useMantineTheme();
  const [packages, setPackages] = useState<PackageInterface[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<PackageInterface[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp } =
    useHorizontalScroll();

  useEffect(() => {
    getAllPackagesByAdmin()
      .then((packagesList) => {
        if (packagesList.length > 0) {
          setPackages(packagesList);
          setFilteredPackages(packagesList);
        } else {
          toast.info("No packages available.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "Failed to fetch packages."
        );
        setIsLoading(false);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = packages.filter(
      (pkg) =>
        pkg.title.toLowerCase().includes(query) ||
        pkg.description.toLowerCase().includes(query)
    );
    setFilteredPackages(filtered);
  };

  return (
    <div
      style={{
        color: organizationConfig.organization_theme.theme.button.textColor,
        fontFamily: theme.fontFamily,
      }}
    >
      <div>
        <h1 className="text-3xl font-extrabold underline text-center">
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
            style={{ userSelect: "none" }}
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
                  color: organizationConfig.organization_theme.theme.color,
                }}
              >
                <tr>
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Package ID</th>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Start Date</th>
                  <th className="p-2 border">End Date</th>
                  <th className="p-2 border">Update Package</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredPackages.length > 0 ? (
                  filteredPackages.map((pkg: PackageInterface, index) => (
                    <tr key={pkg._id}>
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{pkg.packageId}</td>
                      <td className="px-4 py-2 border">{pkg.title}</td>
                      <td className="px-4 py-2 border">
                        <Tooltip label={pkg.description} withArrow>
                          <span>
                            {pkg.description.length > 20
                              ? pkg.description.substring(0, 20) + "..."
                              : pkg.description}
                          </span>
                        </Tooltip>
                      </td>
                      <td className="px-4 py-2 border">
                        {moment(pkg.startDate).format("YYYY-MM-DD")}
                      </td>
                      <td className="px-4 py-2 border">
                        {moment(pkg.endDate).format("YYYY-MM-DD")}
                      </td>
                      <td className="px-4 py-2 border">
                        <Button
                          onClick={() =>
                            navigate(`/dashboard/editpackage/${pkg.packageId}`)
                          }
                        >
                          <IconEdit />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-4 py-2">
                      No Packages found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Packages;
