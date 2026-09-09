import { Card, Grid, Group, Text, TextInput } from '@mantine/core';
import { IconId } from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import type { SectionProps } from './types';

const StatutoryDetailsSection = ({ register, errors }: SectionProps) => {
  const { themeConfig } = useAppTheme();

  return (
    <Card withBorder shadow='xs' p='lg'>
      <Group gap='xs' mb={4}>
        <IconId size={18} />
        <Text fw={600} size='lg'>
          Statutory Details
        </Text>
      </Group>
      <Text size='sm' c='dimmed' mb='md'>
        Add statutory identification details for the employee.
      </Text>

      <Grid>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <TextInput
            label='UAN Number'
            placeholder='Enter 12-digit UAN number'
            type='tel'
            maxLength={12}
            leftSection={<IconId size={16} color={themeConfig.iconColor} />}
            {...register('uanNumber')}
            error={errors.uanNumber?.message}
          />
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default StatutoryDetailsSection;
