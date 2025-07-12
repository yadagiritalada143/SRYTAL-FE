import { Badge, Box, Table, Text } from '@mantine/core';
import { EmployeeTimesheet } from '../../../interfaces/timesheet';
import moment from 'moment';
import { OrganizationConfig } from '../../../interfaces/organization';

export const TimeEntriesTable = ({
  changesMade,
  organizationConfig,
}: {
  changesMade: EmployeeTimesheet[];
  organizationConfig: OrganizationConfig;
}) => {
  return (
    <Box className="my-12">
      <Table
        striped
        highlightOnHover
        verticalSpacing="sm"
        horizontalSpacing="md"
        withColumnBorders
      >
        <thead
          style={{
            position: 'sticky',
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
            color: organizationConfig.organization_theme.theme.color,
          }}
        >
          <tr
            style={{
              backgroundColor:
                organizationConfig.organization_theme.theme.backgroundColor,
              color: organizationConfig.organization_theme.theme.color,
            }}
          >
            <th
              className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ minWidth: '120px' }}
            >
              Date
            </th>
            <th
              className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ minWidth: '180px' }}
            >
              Project
            </th>
            <th
              className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ minWidth: '180px' }}
            >
              Task
            </th>
            <th
              className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ width: '80px', textAlign: 'center' }}
            >
              Hours
            </th>
            <th
              className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
              style={{ minWidth: '200px' }}
            >
              Comments
            </th>
          </tr>
        </thead>
        <tbody>
          {changesMade.map((change, index) => {
            return (
              <tr key={index} className="m-2 p-2">
                <td className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis">
                  <Badge variant="light" color="blue" fullWidth>
                    {moment(change.date).format('ddd, DD MMM')}
                  </Badge>
                </td>
                <td className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis">
                  <Text fw={500} lineClamp={2}>
                    {change.project_name}
                  </Text>
                </td>
                <td className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis">
                  <Text lineClamp={2}>{change.task_name}</Text>
                </td>
                <td
                  className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                  style={{ textAlign: 'center' }}
                >
                  <Text fw={600}>{change.hours}</Text>
                </td>
                <td className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis">
                  <Text lineClamp={2} style={{ flex: 1 }}>
                    {change.comments}
                  </Text>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Box>
  );
};
