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
import useHorizontalScroll from "../../../../hooks/horizontal-scroll";

const Packages = () => {
  const theme = useMantineTheme();
  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<
    EmployeeInterface[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp } =
    useHorizontalScroll();
  useEffect(() => {
    getAllEmployeeDetailsByAdmin()
      .then((employeesList) => {
        setEmployees(employeesList);
        // setFilteredEmployees(employeesList);
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
                )}/dashboard/`
              )
            }
          >
            Add Package
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
                <th className="p-2 border ">ID</th>
                  <th className="p-2 border ">Package ID</th>
                  <th className="p-2 border">Title</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Tasks</th>
                  <th className="p-2 border">Start Date</th>
                  <th className="p-2 border">End Date</th>
                  <th className="p-2 border">Update Package</th>
                  {/* <th className="p-2 border">Employment Type</th>
                  <th className="p-2 border">Blood Group</th>
                  <th className="p-2 border">Employee Role</th>
                  <th className="p-2 border">Update Details</th> */}
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
                      <tr>
                        <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                          {index + 1}
                        </td>
                        <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                          {}
                        </td>
                        <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                          {}
                        </td>
                        <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                          {}
                        </td>
                        <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                          {}
                        </td>
                        <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                          {}
                        </td>
                        <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                          {}
                        </td>
                        <td
                          id={`employee-${employee._id}`}
                          className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis"
                        >
                          <Button
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
                        No Packages found.
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

export default Packages;
