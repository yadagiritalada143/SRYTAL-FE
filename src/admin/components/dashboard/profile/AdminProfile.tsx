import { useMemo } from 'react';
import Profile from '@common/profile/profile';
import { Button, Container, Card, Stack, Text, Center } from '@mantine/core';
import PremiumLoader from '@components/common/loaders/PremiumLoader';
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
    return <PremiumLoader />;
  }

  if (isError) {
    const errorMessage = error?.message || 'Failed to load profile';
    return (
      <Container size={isMobile ? 'sm' : 'lg'} py='xl'>
        <Card shadow='sm' p='lg' radius='md' withBorder>
          <Stack align='center' gap='md'>
            <Text ta='center' size='lg' c='red'>
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
