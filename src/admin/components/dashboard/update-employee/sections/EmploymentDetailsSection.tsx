import { Card, Grid, Group, MultiSelect, Select, Text } from '@mantine/core';
import { Controller } from 'react-hook-form';
import {
  IconBriefcase,
  IconBuildingBank,
  IconUserCog
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import type { SectionProps, SelectOption } from './types';

interface EmploymentDetailsSectionProps extends SectionProps {
  employmentTypeOptions: SelectOption[];
  employmentRolesOptions: SelectOption[];
  departmentOptions: SelectOption[];
}

const EmploymentDetailsSection = ({
  control,
  errors,
  employmentTypeOptions,
  employmentRolesOptions,
  departmentOptions
}: EmploymentDetailsSectionProps) => {
  const { themeConfig } = useAppTheme();

  return (
    <Card withBorder shadow='xs' p='lg'>
      <Group gap='xs' mb={4}>
        <IconBriefcase size={18} />
        <Text fw={600} size='lg'>
          Employment Details
        </Text>
      </Group>
      <Text size='sm' c='dimmed' mb='md'>
        Manage role and employment type
      </Text>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Controller
            name='employmentType'
            control={control}
            render={({ field }) => (
              <Select
                label='Employment Type'
                placeholder='Select employment type'
                leftSection={
                  <IconBriefcase size={16} color={themeConfig.iconColor} />
                }
                data={employmentTypeOptions || []}
                {...field}
                value={field.value ?? null}
                onChange={value => field.onChange(value ?? undefined)}
                error={errors.employmentType?.message}
                searchable
                autoComplete='off'
                required
                clearable
              />
            )}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Controller
            name='employeeRole'
            control={control}
            render={({ field }) => (
              <MultiSelect
                label='Employee Roles'
                placeholder={
                  field.value && field.value.length > 0
                    ? ''
                    : 'Select employee roles'
                }
                leftSection={
                  <IconUserCog size={16} color={themeConfig.iconColor} />
                }
                data={employmentRolesOptions || []}
                value={field.value ?? []}
                onChange={values =>
                  field.onChange(values.filter(v => v && v.trim() !== ''))
                }
                onBlur={field.onBlur}
                autoComplete='off'
                required
                error={errors.employeeRole?.message}
                searchable
                clearable
              />
            )}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Controller
            name='department'
            control={control}
            render={({ field }) => (
              <Select
                label='Department'
                placeholder='Select department'
                leftSection={
                  <IconBuildingBank size={16} color={themeConfig.iconColor} />
                }
                data={departmentOptions || []}
                value={field.value ?? null}
                onChange={value => field.onChange(value ?? null)}
                error={errors.department?.message}
                searchable
                clearable
              />
            )}
          />
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default EmploymentDetailsSection;
