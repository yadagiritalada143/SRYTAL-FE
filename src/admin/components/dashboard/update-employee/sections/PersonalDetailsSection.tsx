import { Card, Grid, Group, Select, Text, Textarea } from '@mantine/core';
import { Controller } from 'react-hook-form';
import { DatePickerInput } from '@mantine/dates';
import { IconCalendar, IconDroplet, IconMapPin } from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import type { SectionProps, SelectOption } from './types';

interface PersonalDetailsSectionProps extends SectionProps {
  bloodGroupOptions: SelectOption[];
}

const PersonalDetailsSection = ({
  register,
  control,
  errors,
  bloodGroupOptions
}: PersonalDetailsSectionProps) => {
  const { themeConfig } = useAppTheme();

  return (
    <Card withBorder shadow='xs' p='lg'>
      <Group justify='space-between' mb='md'>
        <Group gap='xs'>
          <IconCalendar size={18} />
          <Text fw={600} size='lg'>
            Personal Details
          </Text>
        </Group>
        <Text size='sm' c='dimmed'>
          (Optional)
        </Text>
      </Group>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Controller
            name='bloodGroup'
            control={control}
            render={({ field }) => (
              <Select
                label='Blood Group'
                placeholder='Select blood group'
                leftSection={
                  <IconDroplet size={16} color={themeConfig.dangerColor} />
                }
                data={bloodGroupOptions || []}
                {...field}
                value={field.value ?? null}
                onChange={value => field.onChange(value ?? null)}
                error={errors.bloodGroup?.message}
                searchable
                clearable
                autoComplete='off'
              />
            )}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <Controller
            name='dateOfBirth'
            control={control}
            render={({ field }) => (
              <DatePickerInput
                label='Date of Birth'
                placeholder='Select date of birth'
                leftSection={
                  <IconCalendar size={16} color={themeConfig.iconColor} />
                }
                value={field.value ? new Date(field.value) : null}
                maxDate={new Date()}
                onChange={date => {
                  if (!date) {
                    field.onChange('');
                    return;
                  }
                  const iso = new Date(date).toISOString().split('T')[0];
                  field.onChange(iso);
                }}
                error={errors.dateOfBirth?.message}
              />
            )}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Textarea
            label='Present Address'
            placeholder='Enter present address'
            leftSection={<IconMapPin size={16} color={themeConfig.iconColor} />}
            {...register('presentAddress')}
            error={errors.presentAddress?.message}
            minRows={3}
            styles={{ input: { paddingTop: 29 } }}
            autoComplete='off'
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Textarea
            label='Permanent Address'
            placeholder='Enter permanent address'
            leftSection={<IconMapPin size={16} color={themeConfig.iconColor} />}
            {...register('permanentAddress')}
            error={errors.permanentAddress?.message}
            minRows={3}
            styles={{ input: { paddingTop: 29 } }}
            autoComplete='off'
          />
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default PersonalDetailsSection;
