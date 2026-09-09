import { Stack, Title, Text } from '@mantine/core';
import { IconCircleCheck } from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { CommonButton } from '@components/common/button/CommonButton';

const CompletedStep = () => {
  const { themeConfig } = useAppTheme();

  return (
    <Stack align='center' py='xl' gap='md'>
      <IconCircleCheck size={48} color={themeConfig.successColor} />

      <Title order={3} c={themeConfig.successColor}>
        Salary Slip Generated
      </Title>

      <Text size='sm' ta='center' opacity={0.8}>
        The salary slip has been successfully generated and downloaded.
      </Text>

      <CommonButton variant='light' onClick={() => window.location.reload()}>
        Generate Another Salary Slip
      </CommonButton>
    </Stack>
  );
};

export default CompletedStep;
