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
    <Box className="my-12">
      {changesMade.length ? (
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
              color: organizationConfig.organization_theme.theme.color
            }}
          >
            <tr
              style={{
                backgroundColor:
                  organizationConfig.organization_theme.theme.backgroundColor,
                color: organizationConfig.organization_theme.theme.color
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
                Hours
              </th>
              <th
                className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ minWidth: '180px' }}
              >
                Comment
              </th>
              <th
                className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                style={{ width: '80px', textAlign: 'center' }}
              >
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
                      className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      <Badge variant="light" color="blue" fullWidth>
                        {moment(entry.date).format('ddd, DD MMM')}
                      </Badge>
                    </td>
                  )}
                  <td className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis">
                    <Text fw={500} lineClamp={2}>
                      {entry.hours}
                    </Text>
                  </td>
                  <td className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis">
                    <Text lineClamp={2}>{entry.comments}</Text>
                  </td>
                  <td
                    className="px-1 py-1 border whitespace-nowrap overflow-hidden text-ellipsis"
                    style={{ textAlign: 'center' }}
                  >
                    <Text
                      fw={600}
                      c={
                        entry.status === 'Approved'
                          ? 'green'
                          : entry.status === 'Rejected'
                            ? 'red'
                            : entry.status === 'Waiting For Approval'
                              ? 'orange'
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
      ) : (
        <></>
      )}
    </Box>
  );
};
