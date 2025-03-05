import { useState, useEffect } from "react";
import { getCompanyDetails } from "../../../../services/user-services";
import { toast } from "react-toastify";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconBuildings, IconUserEdit } from "@tabler/icons-react";
import { CompaniesInterface } from "../../../../interfaces/companies";
import moment from "moment";
import { useMantineTheme } from "@mantine/core";
import { commonUrls } from "../../../../utils/common/constants";
import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../../atoms/organization-atom";
import { SearchBarFullWidht } from "../../../common/search-bar/search-bar";

const Companies = () => {
  const theme = useMantineTheme();
  const [companies, setCompanies] = useState<CompaniesInterface[]>([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [filteredCompanies, setFilteredCompanies] = useState<
    CompaniesInterface[]
  >([]);
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  useEffect(() => {
    getCompanyDetails()
      .then((data) => {
        setCompanies(data);
        setFilteredCompanies(data);
      })
      .catch((error) =>
        toast.error(error.response?.data?.message || "Something went wrong")
      );
  }, []);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    const filter = companies.filter((company) => {
      return company.companyName
        .toLowerCase()
        .toString()
        .includes(query.toLowerCase());
    });
    setFilteredCompanies(filter);
  };
  return (
    <div
      style={{
        color: organizationConfig.organization_theme.theme.button.textColor,
        fontFamily: theme.fontFamily,
      }}
      className=" h-screen  "
    >
      <h1 className="text-3xl font-extrabold underline text-center">
        Manage Pool Companies
      </h1>
      <div className="text-right">
        <Button
          onClick={() =>
            navigate(
              `${commonUrls(
                organizationConfig.organization_name
              )}/dashboard/add-pool-companies`
            )
          }
        >
          Add Company
        </Button>
      </div>
      <SearchBarFullWidht
        search={search}
        handleSearch={handleSearch}
        placeHolder="Search by company name"
      />
      <div className="overflow-x-auto ">
        <table className="min-w-full table-fixed text-center shadow-md">
          <colgroup>
            <col className="w-56" />
            <col className="w-32" />
            <col className="w-32" />
            <col className="w-32" />
            <col className="w-32" />
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
            style={{
              backgroundColor:
                organizationConfig.organization_theme.theme.backgroundColor,
              color: organizationConfig.organization_theme.theme.color,
            }}
            className="text-xs uppercase"
          >
            <tr>
              <th className="p-4 border sticky left-0 z-10" rowSpan={2}>
                Company Name
              </th>
              <th className="p-4 border" colSpan={3}>
                Primary Contact
              </th>
              <th className="p-4 border" colSpan={3}>
                Secondary Contact 1
              </th>
              <th className="p-4 border" colSpan={3}>
                Secondary Contact 2
              </th>
              <th className="p-4 border" rowSpan={2}>
                Status
              </th>
              <th className="p-4 border" rowSpan={2}>
                Last Update
              </th>
              <th className="p-4 border" rowSpan={2}>
                Update
              </th>
            </tr>
            <tr>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
              <th className="p-2 border">Name</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Phone</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredCompanies.map((company: CompaniesInterface) => {
              return (
                <tr key={company.id}>
                  <td className="px-4 py-2 border sticky left-0 z-10 text-ellipsis">
                    {company.companyName}
                  </td>
                  <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                    {company.primaryContact.name}
                  </td>
                  <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                    {company.primaryContact.email}
                  </td>
                  <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                    {company.primaryContact.phone}
                  </td>
                  <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                    {company.secondaryContact_1.name}
                  </td>
                  <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                    {company.secondaryContact_1.email}
                  </td>
                  <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                    {company.secondaryContact_1.phone}
                  </td>
                  <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                    {company.secondaryContact_2.name}
                  </td>
                  <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                    {company.secondaryContact_2.email}
                  </td>
                  <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                    {company.secondaryContact_2.phone}
                  </td>
                  <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                    {company.status}
                  </td>
                  <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                    {moment(company.lastUpdatedAt).format("DD MMM YYYY")}
                  </td>
                  <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                    <Button
                      onClick={() =>
                        navigate(
                          `${commonUrls(
                            organizationConfig.organization_name
                          )}/dashboard/update-pool-company/${company.id}`
                        )
                      }
                      size="sm"
                    >
                      <IconBuildings />
                      <IconUserEdit />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Companies;
