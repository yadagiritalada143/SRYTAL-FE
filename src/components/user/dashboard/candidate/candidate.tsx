import { Button, Loader, Table, Center, Pagination } from '@mantine/core';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getAllPoolCandidatesByEmployee } from '../../../../services/user-services';
import {
  commonUrls,
  organizationAdminUrls,
  organizationEmployeeUrls
} from '../../../../utils/common/constants';
import { SearchBarFullWidht } from '../../../common/search-bar/search-bar';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import moment from 'moment';
import useHorizontalScroll from '../../../../hooks/horizontal-scroll';
import { CandidateInterface } from '../../../../interfaces/candidate';

const PoolCandidateList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState<
    CandidateInterface[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp } =
    useHorizontalScroll();
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemPerPage = 10;
  const highlightScrollRef = useRef(false);

  useEffect(() => {
    getAllPoolCandidatesByEmployee()
      .then(candidates => {
        setCandidates(candidates);
        setFilteredCandidates(candidates);
        setIsLoading(false);
      })
      .catch(error => {
        toast(error?.response?.data?.message || 'Something went wrong');
        setIsLoading(false);
      });
  }, []);

  const handleNavigate = useCallback(
    (id: string) => {
      if (localStorage.getItem('userRole') === 'admin') {
        navigate(
          `${organizationAdminUrls(
            organizationConfig.organization_name
          )}/dashboard/${id}/edit-pool-candidate`
        );
      } else {
        navigate(
          `${organizationEmployeeUrls(
            organizationConfig.organization_name
          )}/dashboard/${id}/edit-pool-candidate`
        );
      }
    },
    [navigate, organizationConfig.organization_name]
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const query = e.target.value;
      setSearch(query);

      const filtered = candidates.filter((candidate: any) => {
        return (
          candidate.candidateName
            .toLowerCase()
            .includes(query.toLocaleLowerCase()) ||
          candidate.contact.email.toLowerCase().includes(query.toLowerCase()) ||
          candidate.contact.phone.toString().includes(query) ||
          candidate.evaluatedSkills?.toLowerCase().toString().includes(query)
        );
      });

      setFilteredCandidates(filtered);
    },
    [candidates]
  );

  useEffect(() => {
    const selectedCandidate = localStorage.getItem('id');
    if (selectedCandidate && filteredCandidates.length > 0) {
      const index = filteredCandidates.findIndex(
        emps => emps._id === selectedCandidate
      );
      if (index === -1) return;
      const targetPage = Math.floor(index / itemPerPage) + 1;
      highlightScrollRef.current = true;
      setPage(targetPage);

      const timer = setTimeout(() => {
        const rowElement = document.getElementById(
          `candidate-${selectedCandidate}`
        );
        if (rowElement) {
          rowElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          rowElement.style.backgroundColor =
            organizationConfig.organization_theme.theme.backgroundColor;
          rowElement.style.color =
            organizationConfig.organization_theme.theme.color;
          setTimeout(() => {
            localStorage.removeItem('id');
            rowElement.style.backgroundColor = '';
            rowElement.style.color = '';
          }, 2000);
        }
        highlightScrollRef.current = false;
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [
    filteredCandidates,
    organizationConfig.organization_theme.theme.backgroundColor,
    organizationConfig.organization_theme.theme.color,
    itemPerPage
  ]);

  useEffect(() => {
    if (!highlightScrollRef.current) {
      setPage(1);
    }
    setTotalPages(Math.ceil(filteredCandidates.length / itemPerPage));
  }, [filteredCandidates]);

  const paginatedCandidates = useMemo(() => {
    const start = (activePage - 1) * itemPerPage;
    const end = start + itemPerPage;
    return filteredCandidates.slice(start, end);
  }, [filteredCandidates, activePage]);

  return (
    <div
      style={{
        color: organizationConfig.organization_theme.theme.button.textColor,
        fontFamily: organizationConfig.organization_theme.theme.fontFamily
      }}
      className="p-6"
    >
      <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold underline text-center px-2 py-4">
        Manage Candidates
      </h1>

      <div className="text-right">
        <Button
          onClick={() =>
            navigate(
              `${commonUrls(
                organizationConfig.organization_name
              )}/dashboard/add-pool-candidate`
            )
          }
        >
          Add Candidate
        </Button>
      </div>

      <SearchBarFullWidht
        search={search}
        handleSearch={handleSearch}
        placeHolder="Search by Name, Email, Phone, Skills"
      />

      <div
        className="flex overflow-auto sm:overflow-hidden max-w-full shadow-lg rounded-lg"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ userSelect: 'none' }}
      >
        <Table className="w-full text-center shadow-md border table-auto">
          <colgroup>
            <col className="w-16" />
            <col className="w-44" />
            <col className="w-56" />
            <col className="w-32" />
            <col className="w-32" />
            <col className="w-32" />
            <col className="w-32" />
            <col className="w-32" />
            <col className="w-32" />
          </colgroup>
          <thead
            style={{
              backgroundColor:
                organizationConfig.organization_theme.theme.backgroundColor,
              color: organizationConfig.organization_theme.theme.color
            }}
          >
            <tr className="border-b ">
              <th className="px-4 py-2 text-left border-r ">S.no</th>
              <th className="px-4 py-2 text-left border-r ">Name</th>
              <th className="px-4 py-2 text-left border-r ">Email</th>
              <th className="px-4 py-2 text-left border-r ">Phone</th>
              <th className="px-4 py-2 text-left border-r ">Experience</th>
              <th className="px-4 py-2 text-left border-r ">Created By</th>
              <th className="px-4 py-2 text-left border-r ">Created At</th>
              <th className="px-4 py-2 text-left border-r ">
                Latest Comment By
              </th>
              <th className="px-4 py-2 text-left border-r ">
                Latest Comment At
              </th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>

          {isLoading ? (
            <tbody>
              <tr>
                <td colSpan={9} className="text-center py-4">
                  <Loader size="xl" />
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {paginatedCandidates.map((candidate: any, index: number) => (
                <tr
                  id={`candidate-${candidate._id}`}
                  key={candidate._id}
                  className="border-b transition-all duration-200 text-left"
                >
                  <td className="px-4 py-2 border-r ">
                    {index + 1 + (activePage - 1) * itemPerPage}
                  </td>
                  <td className="px-4 py-2 border-r ">
                    {candidate.candidateName}
                  </td>
                  <td className="px-4 py-2 border-r ">
                    {candidate.contact.email}
                  </td>
                  <td className="px-4 py-2 border-r ">
                    {candidate.contact.phone}
                  </td>
                  <td className="px-4 py-2 border-r ">
                    {candidate.totalYearsOfExperience}
                  </td>
                  <td className="px-4 py-2 border-r">
                    {candidate?.createdBy?.firstName || ''}{' '}
                    {candidate?.createdBy?.lastName || ''}
                  </td>
                  <td className="px-4 py-2 border-r ">
                    {moment(new Date(candidate.createdAt)).format(
                      'MMMM Do YYYY'
                    )}
                  </td>

                  <td className="px-4 py-2 border-r ">
                    {candidate?.comments?.length
                      ? `${candidate.comments[0].userId?.firstName} ${candidate.comments[0].userId?.lastName}`
                      : 'N/A'}
                  </td>
                  <td className="px-4 py-2 border-r ">
                    {candidate?.comments?.length
                      ? moment(
                          new Date(candidate.comments[0]?.updateAt)
                        ).format('MMMM Do YYYY')
                      : 'N/A'}
                  </td>

                  <td className="px-4 py-2">
                    <Button
                      onClick={() => handleNavigate(candidate._id)}
                      variant="outline"
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
      </div>
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
  );
};

export default PoolCandidateList;
