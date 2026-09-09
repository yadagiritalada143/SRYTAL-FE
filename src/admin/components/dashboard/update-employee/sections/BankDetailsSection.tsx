import { Card, Grid, Group, Text, TextInput } from '@mantine/core';
import {
  IconBuildingBank,
  IconCreditCard,
  IconUser
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import type { SectionProps } from './types';

const BankDetailsSection = ({ register, errors }: SectionProps) => {
  const { themeConfig } = useAppTheme();

  return (
    <Card withBorder shadow='xs' p='lg'>
      <Group justify='space-between' mb='md'>
        <Group gap='xs'>
          <IconBuildingBank size={18} />
          <Text fw={600} size='lg'>
            Bank Details
          </Text>
        </Group>
        <Text size='sm' c='dimmed'>
          (Optional)
        </Text>
      </Group>

      <Grid gutter='md'>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <TextInput
            label='Account Number'
            placeholder='Enter account number'
            leftSection={
              <IconCreditCard size={16} color={themeConfig.accentColor} />
            }
            {...register('bankDetailsInfo.accountNumber')}
            autoComplete='off'
            error={errors.bankDetailsInfo?.accountNumber?.message}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <TextInput
            label='Account Holder Name'
            placeholder='Enter account holder name'
            leftSection={<IconUser size={16} color={themeConfig.accentColor} />}
            autoComplete='off'
            {...register('bankDetailsInfo.accountHolderName')}
            error={errors.bankDetailsInfo?.accountHolderName?.message}
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <TextInput
            label='Bank Name'
            placeholder='Enter bank name'
            leftSection={
              <IconBuildingBank size={16} color={themeConfig.accentColor} />
            }
            {...register('bankDetailsInfo.bankName')}
            error={errors.bankDetailsInfo?.bankName?.message}
            autoComplete='off'
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6 }}>
          <TextInput
            label='IFSC Code'
            placeholder='Enter IFSC code'
            leftSection={
              <IconBuildingBank size={16} color={themeConfig.accentColor} />
            }
            {...register('bankDetailsInfo.ifscCode')}
            error={errors.bankDetailsInfo?.ifscCode?.message}
            autoComplete='off'
          />
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default BankDetailsSection;
