import { Button, useMantineTheme, Loader } from "@mantine/core";
import { IconEdit, IconUser } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeInterface } from "../../../../interfaces/employee";
import { getAllEmployeeDetailsByAdmin } from "../../../../services/admin-services";
import { toast } from "react-toastify";
import { organizationAdminUrls } from "../../../../utils/common/constants";
import { SearchBarFullWidht } from "../../../common/search-bar/search-bar";
import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../../atoms/organization-atom";

const Employees = () => {
  const theme = useMantineTheme();
  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<
    EmployeeInterface[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  useEffect(() => {
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

  return (
    <div
      style={{
        color: organizationConfig.organization_theme.theme.button.textColor,
        fontFamily: theme.fontFamily,
      }}
      className="h-auto"
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
          <div className="overflow-auto max-w-full shadow-lg rounded-lg">
            <table className="w-full text-center shadow-md border table-auto">
              <colgroup>
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
              <tbody className="text-sm">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr key={employee._id}>
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
                      <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                        <Button
                          onClick={() =>
                            navigate(
                              `${organizationAdminUrls(
                                organizationConfig.organization_name
                              )}/dashboard/update/${employee._id}`
                            )
                          }
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
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
