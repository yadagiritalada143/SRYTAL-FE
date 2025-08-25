import { Badge, Box, Table, Text } from '@mantine/core';
import { EmployeeTimesheet } from '../../../interfaces/timesheet';
import moment from 'moment';
import { OrganizationConfig } from '../../../interfaces/organization';

export const TimeEntriesTable = ({
  changesMade,
  pendingChanges = 0,
  organizationConfig
}: {
  changesMade: EmployeeTimesheet[];
  pendingChanges?: number;
  organizationConfig: OrganizationConfig;
}) => {
  return (
    <Box className="my-12 w-full overflow-x-auto">
      {changesMade.length ? (
        <div className="w-full overflow-x-auto">
          <Table
            striped
            highlightOnHover
            verticalSpacing="sm"
            horizontalSpacing="md"
            withColumnBorders
            className="min-w-[600px] md:min-w-full"
          >
            <thead
              style={{
                position: 'sticky',
                backgroundColor:
                  organizationConfig.organization_theme.theme.backgroundColor,
                color: organizationConfig.organization_theme.theme.color,
                top: 0,
                zIndex: 1
              }}
            >
              <tr>
                <th className="px-2 py-2 border whitespace-nowrap overflow-hidden text-ellipse min-w-[120px]">
                  Date
                </th>
                <th className="px-2 py-2 border whitespace-nowrap overflow-hidden text-ellipse min-w-[100px]">
                  Hours
                </th>
                <th className="px-2 py-2 border whitespace-nowrap overflow-hidden text-ellipse min-w-[150px]">
                  Comment
                </th>
                <th className="px-2 py-2 border whitespace-nowrap overflow-hidden text-center min-w-[100px]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(
                changesMade.reduce(
                  (acc, change) => {
                    const dateKey = moment(change.date).format('YYYY-MM-DD');
                    if (!acc[dateKey]) acc[dateKey] = [];
                    acc[dateKey].push(change);
                    return acc;
                  },
                  {} as Record<string, typeof changesMade>
                )
              ).map(([dateKey, entries]) => {
                return entries.map((entry, idx) => (
                  <tr key={`${dateKey}-${idx}`} className="m-2 p-2">
                    {idx === 0 && (
                      <td
                        rowSpan={entries.length}
                        className="px-2 py-2 border text-center"
                      >
                        <Badge variant="light" color="blue" fullWidth>
                          {moment(entry.date).format('ddd, DD MMM')}
                        </Badge>
                      </td>
                    )}
                    <td className="px-2 py-2 border text-center">
                      <Text fw={500}>{entry.hours}</Text>
                    </td>
                    <td className="px-2 py-2 border text-center">
                      <Text lineClamp={2}>{entry.comments}</Text>
                    </td>
                    <td className="px-2 py-2 border text-center">
                      <Text
                        fw={600}
                        c={
                          entry.status === 'Approved'
                            ? 'green'
                            : entry.status === 'Rejected'
                              ? 'red'
                              : 'orange'
                        }
                      >
                        {!pendingChanges && entry.status === 'Not Submitted'
                          ? 'Waiting For Approval'
                          : entry.status}
                      </Text>
                    </td>
                  </tr>
                ));
              })}
            </tbody>
          </Table>
        </div>
      ) : null}
    </Box>
  );
};
