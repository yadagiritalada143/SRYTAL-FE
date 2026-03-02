import { useMemo } from 'react';
import Profile from '@common/profile/profile';
import {
  Container,
  Card,
  Stack,
  Loader,
  Text,
  Center,
  Button
} from '@mantine/core';
import { useGetUserDetails } from '@hooks/queries/useUserQueries';
import { useMediaQuery } from '@mantine/hooks';
import { IconRefresh } from '@tabler/icons-react';

const AdminProfile = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch
  } = useGetUserDetails();

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const adminDetailsFormated = useMemo(() => {
    if (!user) return null;
    return {
      ...user,
      dateOfBirth: user.dateOfBirth ? formatDate(user.dateOfBirth) : ''
    };
  }, [user]);

  if (isLoading) {
    return (
      <Container size="xl" py="xl">
        <Center style={{ minHeight: '60vh' }}>
          <Stack align="center" gap="md">
            <Loader size="xl" />
            <Text>Loading profile...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  if (isError) {
    const errorMessage = error?.message || 'Failed to load profile';
    return (
      <Container size={isMobile ? 'sm' : 'lg'} py="xl">
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Stack align="center" gap="md">
            <Text ta="center" size="lg" c="red">
              {errorMessage}
            </Text>
            <Button
              leftSection={<IconRefresh size={16} />}
              onClick={() => refetch()}
            >
              Try Again
            </Button>
          </Stack>
        </Card>
      </Container>
    );
  }

  if (!adminDetailsFormated) return null;

  return <Profile details={adminDetailsFormated} />;
};

export default AdminProfile;
