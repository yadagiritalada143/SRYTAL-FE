import {
  Stack,
  Card,
  Grid,
  TextInput,
  Group,
  Select,
  Text,
  Box,
  Divider,
  ActionIcon,
  rgba
} from '@mantine/core';
import { Controller } from 'react-hook-form';
import { DatePickerInput } from '@mantine/dates';
import {
  IconCoin,
  IconCalculator,
  IconPlus,
  IconTrash
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useAppTheme } from '@hooks/use-app-theme';
import { CommonButton } from '@components/common/button/CommonButton';
import type { SalarySlipVM } from '../useSalarySlip';

const blockInvalidNumberKeys = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault();
};

const formatINR = (n: number) =>
  `₹ ${(isFinite(n) ? n : 0).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;

const SalaryCalculationStep = ({ vm }: { vm: SalarySlipVM }) => {
  const { themeConfig } = useAppTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const {
    register,
    control,
    errors,
    setValue,
    fields,
    append,
    remove,
    isPreviewLoading,
    prevStep,
    nextStep,
    basic,
    hra,
    special,
    conveyance,
    medical,
    other,
    additionalAllowances
  } = vm;

  const cardStyle = {
    backgroundColor: themeConfig.headerBackgroundColor,
    color: themeConfig.color
  };

  // Live earnings estimate (preview only — server computes the authoritative values).
  const hraAmount = (basic * hra) / 100;
  const additionalTotal = additionalAllowances.reduce(
    (sum, item: any) =>
      item?.type === 'deduct'
        ? sum - (item.amount || 0)
        : sum + (item.amount || 0),
    0
  );
  const grossEstimate =
    basic +
    hraAmount +
    special +
    conveyance +
    medical +
    other +
    additionalTotal;

  const breakdown = [
    { label: 'Basic', value: basic },
    { label: `HRA (${hra || 0}%)`, value: hraAmount },
    { label: 'Special', value: special },
    { label: 'Conveyance', value: conveyance },
    { label: 'Medical', value: medical },
    { label: 'Other', value: other }
  ];

  return (
    <Stack mt='lg' gap='md'>
      <Card radius='md' p={isMobile ? 'md' : 'lg'} withBorder style={cardStyle}>
        <Group gap='xs' mb='md'>
          <Box style={{ color: themeConfig.accentColor, display: 'flex' }}>
            <IconCoin size={18} />
          </Box>
          <Text
            fw={700}
            size='sm'
            tt='uppercase'
            style={{ letterSpacing: 0.4 }}
          >
            Earnings Breakdown
          </Text>
        </Group>

        <Grid>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label='Basic Salary'
              type='number'
              required
              onKeyDown={blockInvalidNumberKeys}
              {...register('basicSalary', { valueAsNumber: true })}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label='HRA (%)'
              type='number'
              onKeyDown={blockInvalidNumberKeys}
              {...register('hraPercentage', { valueAsNumber: true })}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label='Special Allowance'
              type='number'
              onKeyDown={blockInvalidNumberKeys}
              {...register('specialAllowance', { valueAsNumber: true })}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label='Conveyance Allowance'
              type='number'
              onKeyDown={blockInvalidNumberKeys}
              {...register('conveyanceAllowance', { valueAsNumber: true })}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label='Medical Allowance'
              type='number'
              onKeyDown={blockInvalidNumberKeys}
              {...register('medicalAllowance', { valueAsNumber: true })}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label='Other Allowances'
              type='number'
              onKeyDown={blockInvalidNumberKeys}
              {...register('otherAllowances', { valueAsNumber: true })}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <Controller
              name='payDate'
              control={control}
              render={({ field }) => (
                <DatePickerInput
                  label='Pay Date'
                  placeholder='Select pay date'
                  required
                  value={field.value ? new Date(field.value) : null}
                  onChange={date => {
                    if (date) {
                      const d = new Date(date);
                      const adjustedDate = new Date(
                        d.getTime() - d.getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .split('T')[0];
                      field.onChange(adjustedDate);
                    }
                  }}
                  error={errors.payDate?.message}
                  styles={{
                    input: {
                      backgroundColor: themeConfig.headerBackgroundColor,
                      color: themeConfig.color,
                      borderColor: themeConfig.borderColor
                    },
                    label: { color: themeConfig.color }
                  }}
                />
              )}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label='Transaction ID'
              required
              placeholder='Enter transaction ID'
              {...register('transactionId')}
              onChange={e =>
                setValue('transactionId', e.target.value.toUpperCase())
              }
              error={errors.transactionId?.message}
            />
          </Grid.Col>
        </Grid>
      </Card>

      <Card
        shadow='sm'
        radius='md'
        p={isMobile ? 'md' : 'lg'}
        withBorder
        style={cardStyle}
      >
        <Group justify='space-between' mb='md'>
          <Text
            fw={700}
            size='sm'
            tt='uppercase'
            style={{ letterSpacing: 0.4 }}
          >
            Additional Allowances
          </Text>
          <CommonButton
            type='button'
            variant='light'
            size='xs'
            leftSection={<IconPlus size={14} />}
            onClick={() => append({ label: '', amount: 0, type: 'add' })}
          >
            Add More
          </CommonButton>
        </Group>

        {fields.length === 0 ? (
          <Text size='sm' c={themeConfig.mutedTextColor}>
            No additional allowances added.
          </Text>
        ) : (
          <Stack gap='sm'>
            {fields.map((field, index) => (
              <Grid key={field.id} align='flex-end' gutter='sm'>
                <Grid.Col span={{ base: 12, sm: 5 }}>
                  <TextInput
                    placeholder='Allowance name'
                    {...register(`additionalAllowances.${index}.label`)}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 6, sm: 3 }}>
                  <TextInput
                    type='number'
                    placeholder='Amount'
                    onKeyDown={blockInvalidNumberKeys}
                    {...register(`additionalAllowances.${index}.amount`, {
                      valueAsNumber: true
                    })}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 4, sm: 3 }}>
                  <Select
                    data={[
                      { value: 'add', label: 'Add' },
                      { value: 'deduct', label: 'Deduct' }
                    ]}
                    {...register(`additionalAllowances.${index}.type`)}
                    defaultValue='add'
                    onChange={value =>
                      setValue(
                        `additionalAllowances.${index}.type`,
                        value as 'add' | 'deduct'
                      )
                    }
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 2, sm: 1 }}>
                  <ActionIcon
                    color={themeConfig.dangerColor}
                    variant='light'
                    size='lg'
                    onClick={() => remove(index)}
                    aria-label='Remove allowance'
                  >
                    <IconTrash size={16} />
                  </ActionIcon>
                </Grid.Col>
              </Grid>
            ))}
          </Stack>
        )}
      </Card>

      {/* Live earnings estimate */}
      <Card
        radius='md'
        p={isMobile ? 'md' : 'lg'}
        withBorder
        style={{
          borderColor: rgba(themeConfig.accentColor, 0.4),
          backgroundColor: rgba(themeConfig.accentColor, 0.06)
        }}
      >
        <Group gap='xs' mb='sm'>
          <Box style={{ color: themeConfig.accentColor, display: 'flex' }}>
            <IconCalculator size={18} />
          </Box>
          <Text
            fw={700}
            size='sm'
            tt='uppercase'
            style={{ letterSpacing: 0.4 }}
          >
            Estimated Earnings
          </Text>
        </Group>

        <Grid gutter='xs'>
          {breakdown.map(item => (
            <Grid.Col span={{ base: 6, sm: 4 }} key={item.label}>
              <Group justify='space-between' wrap='nowrap'>
                <Text size='xs' c={themeConfig.mutedTextColor} lineClamp={1}>
                  {item.label}
                </Text>
                <Text size='xs' fw={600}>
                  {formatINR(item.value)}
                </Text>
              </Group>
            </Grid.Col>
          ))}
        </Grid>

        <Divider my='sm' color={rgba(themeConfig.accentColor, 0.3)} />

        <Group justify='space-between'>
          <Text fw={700}>Gross Earnings (est.)</Text>
          <Text fw={800} size='lg' c={themeConfig.accentColor}>
            {formatINR(grossEstimate)}
          </Text>
        </Group>
        <Text size='xs' c={themeConfig.mutedTextColor} mt={4}>
          Final figures are calculated on the server in the next step.
        </Text>
      </Card>

      <Group justify='space-between' mt='md'>
        <CommonButton variant='default' onClick={prevStep}>
          Back
        </CommonButton>
        <CommonButton loading={isPreviewLoading} onClick={nextStep} size='md'>
          Preview
        </CommonButton>
      </Group>
    </Stack>
  );
};

export default SalaryCalculationStep;
