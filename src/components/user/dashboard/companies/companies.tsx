import { useState, useEffect } from "react";
import { getCompanyDetails } from "../../../../services/user-services";
import { toast } from "react-toastify";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { IconBuildings, IconUserEdit } from "@tabler/icons-react";
import { CompaniesInterface } from "../../../../interfaces/companies";
import moment from "moment";
import { commonUrls } from "../../../../utils/common/constants";
import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../../atoms/organization-atom";
import { SearchBarFullWidht } from "../../../common/search-bar/search-bar";
import useHorizontalScroll from "../../../../hooks/horizontal-scroll";

const Companies = () => {
  const [companies, setCompanies] = useState<CompaniesInterface[]>([]);
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [filteredCompanies, setFilteredCompanies] = useState<
    CompaniesInterface[]
  >([]);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const { scrollRef, handleMouseDown, handleMouseMove, handleMouseUp } =
    useHorizontalScroll();
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

  useEffect(() => {
    const selectedCompany = localStorage.getItem("id");
    if (selectedCompany && filteredCompanies.length > 0) {
      const rowElement = document.getElementById(`company-${selectedCompany}`);
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
    filteredCompanies,
    organizationConfig.organization_theme.theme.backgroundColor,
    organizationConfig.organization_theme.theme.color,
  ]);
  return (
    <div
      style={{
        color: organizationConfig.organization_theme.theme.button.textColor,
        fontFamily: organizationConfig.organization_theme.theme.fontFamily,
      }}
      className="p-6"
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
      <div
        className="overflow-hidden max-w-full shadow-lg rounded-lg"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ userSelect: "none" }}
      >
        <table className="min-w-full table-fixed text-center shadow-md border-separate border-spacing-0">
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
              <th
                className="w-1/6 border p-3 sticky left-0  z-20  backdrop-blur-sm"
                rowSpan={3}
              >
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
                <tr id={`company-${company.id}`} key={company.id}>
                  <td className="border px-4 py-2 sticky left-0 z-10 backdrop-blur-sm">
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
