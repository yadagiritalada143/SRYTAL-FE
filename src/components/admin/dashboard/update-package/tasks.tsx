import { Table } from "@mantine/core";
import { OrganizationConfig } from "../../../../interfaces/organization";
import moment from "moment";

const PackageTasksTable = ({
  tasks,
  organizationConfig,
}: {
  tasks: any;
  organizationConfig: OrganizationConfig;
}) => {
  return (
    <div
      style={{
        color: organizationConfig.organization_theme.theme.button.textColor,
        fontFamily: organizationConfig.organization_theme.theme.fontFamily,
      }}
      className=" my-10 overflow-auto max-w-full shadow-lg rounded-lg"
    >
      <Table className="w-full text-center shadow-md border table-auto">
        <colgroup>
          <col className="w-16" />
          <col className="w-56" />
          <col className="w-32" />
          <col className="w-32" />
        </colgroup>
        <thead
          style={{
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
            color: organizationConfig.organization_theme.theme.color,
          }}
        >
          <tr className="border-b ">
            <th className="px-4 py-2 text-left border-r ">S.no</th>
            <th className="px-4 py-2 text-left border-r ">Tasks</th>
            <th className="px-4 py-2 text-left border-r ">Created By</th>
            <th className="px-4 py-2 text-left border-r ">Created At</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((tasks: any, index: number) => (
            <tr
              key={index}
              className="border-b  transition-all duration-200 relative text-left"
            >
              <td className="px-4 py-2 border-r ">{index + 1}</td>
              <td className="px-4 py-2 border-r">{tasks.tasks}</td>
              <td className="px-4 py-2 border-r ">
                {tasks?.userId?.firstName || ""}{" "}
                {tasks?.userId?.lastName || ""}
              </td>
              <td className="px-4 py-2 border-r ">
                {moment(new Date(tasks.updateAt)).format(
                  "MMMM Do YYYY, h:mm"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default PackageTasksTable;
