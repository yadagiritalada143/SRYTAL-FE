import React from 'react';
import {
  Card,
  Stack,
  Button,
  Collapse,
  Select,
  TextInput,
  Group
} from '@mantine/core';
import { DatePickerInput, DatesRangeValue } from '@mantine/dates';
import {
  IconFilter,
  IconChevronUp,
  IconChevronDown,
  IconSearch,
  IconCalendar,
  IconX
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { TimesheetStatus } from '@interfaces/timesheet';

interface FilterSectionProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedStatus: TimesheetStatus | null;
  setSelectedStatus: (status: TimesheetStatus | null) => void;
  dateRange: DatesRangeValue;
  setDateRange: (range: DatesRangeValue) => void;
  filtersExpanded: boolean;
  setFiltersExpanded: (val: boolean) => void;
  resetFilters: () => void;
  statusOptions: Array<{ value: string; label: string }>;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  searchQuery,
  setSearchQuery,
  selectedStatus,
  setSelectedStatus,
  dateRange,
  setDateRange,
  filtersExpanded,
  setFiltersExpanded,
  resetFilters,
  statusOptions
}) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  return (
    <Card
      shadow='sm'
      p={isSmallMobile ? 'xs' : isMobile ? 'sm' : 'md'}
      radius='md'
      withBorder
    >
      <Stack gap='sm'>
        {isMobile && (
          <Button
            variant='light'
            fullWidth
            size={isSmallMobile ? 'xs' : 'sm'}
            onClick={() => setFiltersExpanded(!filtersExpanded)}
            rightSection={
              filtersExpanded ? (
                <IconChevronUp size={14} />
              ) : (
                <IconChevronDown size={14} />
              )
            }
            leftSection={<IconFilter size={14} />}
          >
            {filtersExpanded ? 'Hide Filters' : 'Show Filters'}
          </Button>
        )}

        <Collapse in={filtersExpanded || !isMobile}>
          <Stack gap='md'>
            <Stack gap='sm'>
              <Select
                label='Status'
                placeholder='Filter by status'
                data={statusOptions}
                value={selectedStatus}
                onChange={value =>
                  setSelectedStatus(value as TimesheetStatus | null)
                }
                clearable
                leftSection={<IconFilter size={14} />}
                radius='md'
              />

              <DatePickerInput
                type='range'
                label='Date Range'
                placeholder='Pick dates range'
                value={dateRange}
                onChange={setDateRange}
                leftSection={<IconCalendar size={14} />}
                radius='md'
              />

              <TextInput
                label='Search'
                placeholder='Search projects, tasks, comments...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.currentTarget.value)}
                leftSection={<IconSearch size={14} />}
                radius='md'
              />
            </Stack>

            <Group grow>
              <Button
                variant='outline'
                color='gray'
                onClick={resetFilters}
                leftSection={<IconX size={14} />}
                radius='md'
                size={isSmallMobile ? 'xs' : 'sm'}
              >
                Reset Filters
              </Button>
            </Group>
          </Stack>
        </Collapse>
      </Stack>
    </Card>
  );
};
