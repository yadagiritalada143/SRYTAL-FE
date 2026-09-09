import { Card, Grid, Group, Text, TextInput } from '@mantine/core';
import { Controller } from 'react-hook-form';
import { DatePickerInput } from '@mantine/dates';
import {
  IconUser,
  IconMail,
  IconPhone,
  IconCalendar,
  IconId,
  IconFingerprint,
  IconIdBadge2
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import type { SectionProps } from './types';

const BasicInfoSection = ({ register, control, errors }: SectionProps) => {
  const { themeConfig } = useAppTheme();
  const panRegister = register('panCardNumber');

  const fieldStyles = {
    input: {
      backgroundColor: themeConfig.headerBackgroundColor,
      color: themeConfig.color,
      borderColor: themeConfig.borderColor
    },
    label: { color: themeConfig.color }
  };

  return (
    <Card withBorder shadow='xs' p='lg'>
      <Group gap='xs' mb={4}>
        <IconUser size={18} />
        <Text fw={600} size='lg'>
          Basic Information
        </Text>
      </Group>
      <Text size='sm' c='dimmed' mb='md'>
        Employee identity and contact information.
      </Text>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <TextInput
            label='Employee ID'
            placeholder='Enter employee ID'
            styles={fieldStyles}
            leftSection={
              <IconIdBadge2 size={16} color={themeConfig.iconColor} />
            }
            {...register('employeeId')}
            autoComplete='off'
            required
            error={errors.employeeId?.message}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Controller
            name='dateOfJoining'
            control={control}
            render={({ field }) => (
              <DatePickerInput
                label='Date of Joining'
                placeholder='Select joining date'
                leftSection={
                  <IconCalendar size={16} color={themeConfig.iconColor} />
                }
                value={field.value ? new Date(field.value) : null}
                onChange={date => {
                  if (!date) {
                    field.onChange('');
                    return;
                  }
                  const iso = new Date(date).toISOString().split('T')[0];
                  field.onChange(iso);
                }}
                error={errors.dateOfJoining?.message}
                styles={fieldStyles}
              />
            )}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label='First Name'
            placeholder='Enter first name'
            leftSection={<IconUser size={16} color={themeConfig.iconColor} />}
            {...register('firstName')}
            error={errors.firstName?.message}
            autoComplete='off'
            required
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label='Last Name'
            placeholder='Enter last name'
            leftSection={<IconUser size={16} color={themeConfig.iconColor} />}
            {...register('lastName')}
            error={errors.lastName?.message}
            autoComplete='off'
            required
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label='Email Address'
            placeholder='Enter email address'
            type='email'
            leftSection={<IconMail size={16} color={themeConfig.dangerColor} />}
            {...register('email')}
            error={errors.email?.message}
            autoComplete='off'
            required
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label='Mobile Number'
            placeholder='Enter mobile number'
            type='tel'
            leftSection={
              <IconPhone size={16} color={themeConfig.successColor} />
            }
            {...register('mobileNumber')}
            error={errors.mobileNumber?.message}
            required
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <TextInput
            label='Aadhar Number'
            placeholder='Enter Aadhaar number'
            type='tel'
            leftSection={
              <IconFingerprint size={16} color={themeConfig.iconColor} />
            }
            {...register('aadharNumber')}
            maxLength={12}
            error={errors.aadharNumber?.message}
            required
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <TextInput
            label='PAN Card Number'
            placeholder='Enter PAN Card number'
            type='text'
            leftSection={<IconId size={16} color={themeConfig.iconColor} />}
            {...panRegister}
            onChange={e => {
              e.target.value = e.target.value.toUpperCase();
              panRegister.onChange(e);
            }}
            maxLength={10}
            error={errors.panCardNumber?.message}
            required
          />
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default BasicInfoSection;
