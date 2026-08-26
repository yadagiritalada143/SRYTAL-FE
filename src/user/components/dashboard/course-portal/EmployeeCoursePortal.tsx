import { Container, Card, Stack, Text, ThemeIcon, Group } from '@mantine/core';
import { IconBook } from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import PageHeader from '@components/common/page-header/PageHeader';

const EmployeeCoursePortal = () => {
  const { themeConfig } = useAppTheme();

  return (
    <Container
      size='xl'
      py={{ base: 'md', sm: 'xl' }}
      px={{ base: 'xs', sm: 'md' }}
    >
      <PageHeader
        title='Courses'
        subtitle='Your assigned learning courses'
      />

      <Card withBorder radius='md' p='xl' mt='lg'>
        <Stack align='center' gap='md' py='xl'>
          <ThemeIcon size={64} radius='xl' variant='light' color={themeConfig.color}>
            <IconBook size={32} />
          </ThemeIcon>
          <Group gap='xs'>
            <Text fw={600} size='lg'>
              Welcome to Employee Learning Portal
            </Text>
          </Group>
          <Text c='dimmed' ta='center' maw={500}>
            Your assigned courses will appear here once an admin assigns them
            to you.
          </Text>
        </Stack>
      </Card>
    </Container>
  );
};

export default EmployeeCoursePortal;
