import {
  Button,
  useMantineTheme,
  Loader,
  TextInput,
  Pagination,
  Center
} from '@mantine/core';
import {
  IconCalendarTime,
  IconEdit,
  IconPackage,
  IconSearch,
  IconUser
} from '@tabler/icons-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllEmployeeDetailsByAdmin } from '../../../../services/admin-services';
import { toast } from 'react-toastify';
import { organizationAdminUrls } from '../../../../utils/common/constants';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  organizationEmployeeAtom,
  organizationThemeAtom
} from '../../../../atoms/organization-atom';
import useHorizontalScroll from '../../../../hooks/horizontal-scroll';
import { debounce } from '../../../../utils/common/debounce';
import { EmployeeInterface } from '../../../../interfaces/employee';

const Employees = () => {
  const theme = useMantineTheme();
  const [employees, setEmployees] = useRecoilState(organizationEmployeeAtom);
  const [activePage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filteredEmployees, setFilteredEmployees] = useState<
    EmployeeInterface[]
  >([]);
  const highlightScrollRef = useRef(false);

  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const navigate = useNavigate();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const itemPerPage = 10;

  const {
    scrollRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart
  } = useHorizontalScroll();

  useEffect(() => {
    if (employees.length > 0) {
      setFilteredEmployees(employees);
      setIsLoading(false);
      return;
    }
    getAllEmployeeDetailsByAdmin()
      .then(employeesList => {
        setEmployees(employeesList);
        setFilteredEmployees(employeesList);
        setIsLoading(false);
      })
      .catch(error => {
        toast(error?.response?.data?.message || 'Something went wrong');
        setIsLoading(false);
      });
  }, [setEmployees]);

  const paginatedEmployees = useMemo(() => {
    const start = (activePage - 1) * itemPerPage;
    const end = start + itemPerPage;
    return filteredEmployees.slice(start, end);
  }, [filteredEmployees, activePage]);

  const debouncedFilter = useMemo(
    () =>
      debounce((query: string) => {
        if (!query.length) {
          setFilteredEmployees(employees);
        }
        const filtered = employees.filter(employee => {
          return (
            employee.firstName.toLowerCase().includes(query.toLowerCase()) ||
            employee.lastName.toLowerCase().includes(query.toLowerCase()) ||
            employee.email.toLowerCase().includes(query.toLowerCase()) ||
            employee.mobileNumber.toString().includes(query.toLowerCase())
          );
        });

        setFilteredEmployees(filtered);
      }, 300),
    [setFilteredEmployees, employees]
  );

  const handleSearch = () => {
    const query = inputRef.current?.value || '';
    debouncedFilter(query);
  };

  const handleSortByEmployeeId = () => {
    const sorted = [...filteredEmployees].sort((a, b) => {
      const empA = a.employeeId?.toLowerCase() || '';
      const empB = b.employeeId?.toLowerCase() || '';
      return sortOrder === 'asc'
        ? empA.localeCompare(empB)
        : empB.localeCompare(empA);
    });
    setFilteredEmployees(sorted);
    setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleEmployeeSelect = useCallback(
    (employeeId: string) => {
      navigate(
        `${organizationAdminUrls(
          organizationConfig.organization_name
        )}/dashboard/update/${employeeId}`
      );
    },
    [organizationConfig.organization_name, navigate]
  );

  const handlePackageSelect = useCallback(
    (employeeId: string) => {
      navigate(
        `${organizationAdminUrls(
          organizationConfig.organization_name
        )}/dashboard/package/${employeeId}`
      );
    },
    [organizationConfig.organization_name, navigate]
  );

  const handleTimesheet = useCallback(
    (employeeId: string) => {
      navigate(
        `${organizationAdminUrls(
          organizationConfig.organization_name
        )}/dashboard/timesheet/${employeeId}`
      );
    },
    [organizationConfig.organization_name, navigate]
  );

  useEffect(() => {
    const selectedEmployee = localStorage.getItem('id');

    if (selectedEmployee && filteredEmployees.length > 0) {
      const index = filteredEmployees.findIndex(
        emp => emp._id === selectedEmployee
      );
      if (index === -1) return;

      const targetPage = Math.floor(index / itemPerPage) + 1;
      highlightScrollRef.current = true;
      setPage(targetPage);

      const timer = setTimeout(() => {
        const rowElement = document.getElementById(
          `employee-${selectedEmployee}`
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
    filteredEmployees,
    organizationConfig.organization_theme.theme.backgroundColor,
    organizationConfig.organization_theme.theme.color,
    itemPerPage
  ]);

  useEffect(() => {
    if (!highlightScrollRef.current) {
      setPage(1);
    }
    setTotalPages(Math.ceil(filteredEmployees.length / itemPerPage));
  }, [filteredEmployees]);

  return (
    <div
      style={{
        color: organizationConfig.organization_theme.theme.button.textColor,
        fontFamily: theme.fontFamily
      }}
    >
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold underline text-center px-2 py-4">
          Manage Employee
        </h1>

        <div className="text-right">
          <Button
            onClick={() =>
              navigate(
                `${organizationAdminUrls(
                  organizationConfig.organization_name
                )}/dashboard/addemployee`
              )
            }
          >
            Add Employee
          </Button>
        </div>
        <div className="w-full my-2">
          <TextInput
            ref={inputRef}
            rightSection={<IconSearch />}
            onChange={handleSearch}
            className="my-4"
            placeholder="Search by Name, Email, Phone"
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader
              size="xl"
              color={organizationConfig.organization_theme.theme.button.color}
            />
          </div>
        ) : (
          <div
            className="flex max-w-full shadow-lg rounded-lg"
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ userSelect: 'none', overflowX: 'hidden', cursor: 'grab' }}
          >
            <table className="w-full text-center shadow-md border ">
              <colgroup>
                <col className="w-32" />
                <col className="w-56" />
                <col className="w-32" />
                <col className="w-32" />
                <col className="w-32" />
                <col className="w-32" />
                <col className="w-32" />
                <col className="w-32" />
                <col className="w-32" />
                <col className="w-32" />
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
                  <th className="p-2 border ">S.No</th>
                  <th
                    className="p-2 border cursor-pointer"
                    onClick={handleSortByEmployeeId}
                  >
                    Employee ID {sortOrder === 'asc' ? '▲' : '▼'}
                  </th>{' '}
                  <th className="p-2 border">First Name</th>
                  <th className="p-2 border">Last Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Mobile Number</th>
                  <th className="p-2 border">Role</th>
                  <th className="p-2 border">Employment Type</th>
                  <th className="p-2 border">Blood Group</th>
                  <th className="p-2 border">Employee Role</th>
                  <th className="p-2 border">Update Details</th>
                  <th className="p-2 border">Update Package</th>
                  <th className="p-2 border">Timesheet</th>
                </tr>
              </thead>
              {isLoading ? (
                <div className="flex justify-center items-center h-48">
                  <Loader
                    size="xl"
                    color={
                      organizationConfig.organization_theme.theme.button.color
                    }
                  />
                </div>
              ) : (
                <tbody className="text-sm">
                  {paginatedEmployees.length > 0 ? (
                    paginatedEmployees.map((employee, index) => (
                      <tr key={employee._id} id={`employee-${employee._id}`}>
                        <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                          {index + 1 + (activePage - 1) * itemPerPage}
                        </td>
                        <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                          {employee.employeeId}
                        </td>
                        <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                          {employee.firstName}
                        </td>
                        <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                          {employee.lastName}
                        </td>
                        <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                          {employee.email}
                        </td>
                        <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                          {employee.mobileNumber}
                        </td>
                        <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                          {employee.userRole}
                        </td>
                        <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                          {employee.employmentType?.employmentType}
                        </td>
                        <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                          {employee.bloodGroup?.type}
                        </td>
                        <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                          <ul>
                            {employee.employeeRole?.map((role, index) => (
                              <li key={role._id}>
                                {index + 1}. {role.designation}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td
                          id={`employee-${employee._id}`}
                          className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis"
                        >
                          <Button
                            onClick={() => handleEmployeeSelect(employee._id)}
                          >
                            <IconUser /> {'  '}
                            <IconEdit />
                          </Button>
                        </td>
                        <td
                          id={`employee-${employee._id}`}
                          className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis"
                        >
                          <Button
                            onClick={() => handlePackageSelect(employee._id)}
                          >
                            <IconPackage /> {'  '}
                            <IconEdit />
                          </Button>
                        </td>
                        <td
                          id={`employee-${employee._id}`}
                          className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis"
                        >
                          <Button onClick={() => handleTimesheet(employee._id)}>
                            <IconCalendarTime /> {'  '}
                            <IconEdit />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="px-4 py-2">
                        No employees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              )}
            </table>
          </div>
        )}
      </div>
      {totalPages > 1 && (
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

export default Employees;
