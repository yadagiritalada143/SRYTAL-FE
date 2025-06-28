import { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Group,
  Table,
  Text,
  TextInput,
  Title,
  Badge,
  ActionIcon,
} from '@mantine/core';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import {
  IconSearch,
  IconX,
  IconDownload,
  IconChevronLeft,
  IconChevronRight,
  IconCalendar,
} from '@tabler/icons-react';
import moment from 'moment';
import { ColorDiv } from '../style-components/c-div';

const PayslipList = () => {
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const theme = organizationConfig.organization_theme.theme;

  const payslipData = [
    {
      employeeName: 'Test Employee',
      amount: '₹ 32000.00',
      year: '2025',
      month: 'May',
      status: 'PAID',
    },
    {
      employeeName: 'Another Employee',
      amount: '₹ 45000.00',
      year: '2025',
      month: 'July',
      status: 'PAID',
    },
    {
      employeeName: 'Another Employee',
      amount: '₹ 45000.00',
      year: '2025',
      month: 'June',
      status: 'UNPAID',
    },
  ];

  const getMonthIndex = (monthName: string) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return months.indexOf(monthName);
  };

  const [search, setSearch] = useState('');
  const [dateRange, setDateRange] = useState<DatesRangeValue>([
    moment().startOf('month').toDate(),
    moment().endOf('month').toDate(),
  ]);

  const [filters, setFilters] = useState<{
    range: DatesRangeValue;
  }>({
    range: [null, null],
  });

  const filteredData = payslipData.filter(item => {
    const itemDate = new Date(
      parseInt(item.year),
      getMonthIndex(item.month),
      1
    );
    const [from, to] = filters.range;

    const matchesDate = !from || !to || (itemDate >= from && itemDate <= to);
    const matchesSearch = item.employeeName
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesDate && matchesSearch;
  });

  const navigateDateRange = (direction: 'previous' | 'next') => {
    const [start, end] = dateRange;
    if (!start || !end) return;
    const daysDiff = moment(end).diff(start, 'days') + 1;
    const method = direction === 'previous' ? 'subtract' : 'add';
    const newStart = (moment(start) as any)[method](daysDiff, 'days').toDate();
    const newEnd = (moment(end) as any)[method](daysDiff, 'days').toDate();
    setDateRange([newStart, newEnd]);
  };

  return (
    <ColorDiv className="w-100 p-5">
      <Title
        order={2}
        className="text-xl sm:text-2xl md:text-3xl font-extrabold underline text-center px-2 py-6"
      >
        Payslip List
      </Title>

      <Grid align="center" gutter="md" className="mb-4 p-4 rounded-md">
        <Grid.Col span={12}>
          <Group justify="space-between" wrap="wrap">
            <Group gap="sm" wrap="wrap">
              <ActionIcon
                variant="outline"
                radius="xl"
                color={theme.color}
                size="lg"
                onClick={() => navigateDateRange('previous')}
              >
                <IconChevronLeft size={18} />
              </ActionIcon>

              <DatePickerInput
                type="range"
                value={dateRange}
                onChange={setDateRange}
                leftSection={<IconCalendar size={16} />}
                size="sm"
                radius="md"
                valueFormat="MMMM YYYY"
                allowSingleDateInRange={false}
                placeholder="Select from and to month"
              />

              <ActionIcon
                variant="outline"
                radius="xl"
                color={theme.color}
                size="lg"
                onClick={() => navigateDateRange('next')}
              >
                <IconChevronRight size={18} />
              </ActionIcon>

              <Button
                size="sm"
                radius="md"
                onClick={() => setFilters({ range: dateRange })}
                style={{
                  backgroundColor: theme.button.color,
                  color: theme.button.textColor,
                }}
              >
                Search
              </Button>
            </Group>

            <TextInput
              placeholder="Search by name..."
              leftSection={<IconSearch size={16} />}
              rightSection={
                search && (
                  <IconX
                    size={16}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSearch('')}
                  />
                )
              }
              value={search}
              onChange={e => setSearch(e.currentTarget.value)}
              size="sm"
              radius="md"
              style={{ minWidth: '200px' }}
            />
          </Group>
        </Grid.Col>
      </Grid>

      <Box style={{ overflowX: 'auto' }}>
        <Table
          striped
          highlightOnHover
          verticalSpacing="sm"
          horizontalSpacing="sm"
          className="border"
          style={{
            borderColor: theme.borderColor,
            color: theme.color,
            fontFamily: theme.fontFamily,
          }}
        >
          <thead
            style={{
              backgroundColor: theme.headerBackgroundColor,
              color: theme.color,
            }}
          >
            <tr>
              <th className="border px-1 py-1 text-center">S.No</th>
              <th className="border px-1 py-1 text-center">Employee Name</th>
              <th className="border px-1 py-1 text-center">Year</th>
              <th className="border px-1 py-1 text-center">Month</th>
              <th className="border px-1 py-1 text-center">Status</th>
              <th className="border px-1 py-1 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td className="border px-1 py-1 text-center">{index + 1}</td>
                <td className="border px-1 py-1 text-center">
                  {item.employeeName}
                </td>
                <td className="border px-1 py-1 text-center">{item.year}</td>
                <td className="border px-1 py-1 text-center">{item.month}</td>
                <td className="border px-1 py-1 text-center">
                  <Badge
                    variant="light"
                    size="sm"
                    style={{
                      color: '#fff',
                      backgroundColor:
                        item.status === 'PAID' ? '#4CAF50' : '#F44336',
                    }}
                  >
                    {item.status === 'PAID' ? '✔ PAID' : '✖ UNPAID'}
                  </Badge>
                </td>
                <td className="border px-1 py-1 text-center">
                  <Group justify="center" gap="xs" wrap="nowrap">
                    <Button
                      leftSection={<IconDownload size={14} />}
                      size="xs"
                      radius="sm"
                      variant="filled"
                      style={{
                        color: theme.button.textColor,
                      }}
                    >
                      Download
                    </Button>
                  </Group>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Text size="xs" mt="sm" style={{ color: theme.color }}>
          Showing {filteredData.length} of {payslipData.length} entries
        </Text>
      </Box>
    </ColorDiv>
  );
};

export default PayslipList;
