import { Button, useMantineTheme, Loader } from "@mantine/core";
import { IconEdit, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeInterface } from "../../../../interfaces/employee";
import { getAllEmployeeDetailsByAdmin } from "../../../../services/admin-services";
import { toast } from "react-toastify";
import { organizationAdminUrls } from "../../../../utils/common/constants";
import { SearchBarFullWidht } from "../../../common/search-bar/search-bar";
import { useRecoilState, useRecoilValue } from "recoil";
import { organizationEmployeeAtom, organizationThemeAtom } from "../../../../atoms/organization-atom";
import useHorizontalScroll from "../../../../hooks/horizontal-scroll";

const Employees = () => {
  const theme = useMantineTheme();
  const [employees, setEmployees] = useRecoilState(organizationEmployeeAtom);
  const [filteredEmployees,setFilteredEmployees]= useRecoilState(organizationEmployeeAtom);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp } =
    useHorizontalScroll();
    useEffect(() => {
      if (employees.length > 0) {
        setFilteredEmployees(employees);
        setIsLoading(false);
        return;
      }
      getAllEmployeeDetailsByAdmin()
        .then((employeesList) => {
          setEmployees(employeesList);
          setFilteredEmployees(employeesList);
          setIsLoading(false);
        })
        .catch((error) => {
          toast(error?.response?.data?.message || "Something went wrong");
          setIsLoading(false);
        });
    }, []);
    

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = employees.filter((employee) => {
      return (
        employee.firstName.toLowerCase().includes(query.toLowerCase()) ||
        employee.lastName.toLowerCase().includes(query.toLowerCase()) ||
        employee.email.toLowerCase().includes(query.toLowerCase()) ||
        employee.mobileNumber.toString().includes(query.toLowerCase())
      );
    });

    setFilteredEmployees(filtered);
  };

  const handleEmployeeSelect = (employeeId: string) => {
    navigate(
      `${organizationAdminUrls(
        organizationConfig.organization_name
      )}/dashboard/update/${employeeId}`
    );
  };

  useEffect(() => {
    const selectedEmployee = localStorage.getItem("id");
    if (selectedEmployee && filteredEmployees.length > 0) {
      const rowElement = document.getElementById(
        `employee-${selectedEmployee}`
      );
      if (rowElement) {
        rowElement.scrollIntoView({ behavior: "smooth", block: "center" });
        rowElement.style.backgroundColor =
          organizationConfig.organization_theme.theme.backgroundColor;
        rowElement.style.color =
          organizationConfig.organization_theme.theme.color;
        setTimeout(() => {
          rowElement.style.backgroundColor = "";
          rowElement.style.color = "";
        }, 2000);
      }
      localStorage.removeItem("id");
    }
  }, [
    filteredEmployees,
    organizationConfig.organization_theme.theme.backgroundColor,
    organizationConfig.organization_theme.theme.color,
  ]);

  return (
    <div
      style={{
        color: organizationConfig.organization_theme.theme.button.textColor,
        fontFamily: theme.fontFamily,
      }}
    >
      <div>
        <h1 className="text-3xl font-extrabold underline text-center">
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

        <SearchBarFullWidht
          search={searchQuery}
          handleSearch={handleSearch}
          placeHolder="Search by Name, Email, Phone"
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
                  <th className="p-2 border ">Id</th>
                  <th className="p-2 border">Employee ID</th>
                  <th className="p-2 border">First Name</th>
                  <th className="p-2 border">Last Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Mobile Number</th>
                  <th className="p-2 border">Role</th>
                  <th className="p-2 border">Employment Type</th>
                  <th className="p-2 border">Blood Group</th>
                  <th className="p-2 border">Employee Role</th>
                  <th className="p-2 border">Update Details</th>
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
                  {filteredEmployees.length > 0 ? (
                    filteredEmployees.map((employee, index) => (
                      <tr key={employee._id} id={`employee-${employee._id}`}>
                        <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                          {index + 1}
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
                            <IconUser /> {"  "}
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
    </div>
  );
};

export default Employees;
