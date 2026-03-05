import { useMemo } from 'react';
import Profile from '@common/profile/profile';
import { useGetUserDetails } from '@hooks/queries/useUserQueries';
import { Container, Card, Stack, Text, Center, Button } from '@mantine/core';
import PremiumLoader from '@components/common/loaders/PremiumLoader';
import { useMediaQuery } from '@mantine/hooks';
import { IconRefresh } from '@tabler/icons-react';

const UserProfile = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch
  } = useGetUserDetails();

  const formatDate = (dateString: any) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const userDetailsFormatted = useMemo(() => {
    if (!user) return null;
    return {
      ...user,
      dateOfBirth: user.dateOfBirth ? formatDate(user.dateOfBirth) : ''
    };
  }, [user]);

  if (isLoading) {
    return (
      <Container size='xl' py='xl'>
        <Center style={{ minHeight: '60vh' }}>
          <Stack align='center' gap='md'>
            <PremiumLoader label='Loading profile...' />
          </Stack>
        </Center>
      </Container>
    );
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

  if (!userDetailsFormatted) return null;

  return <Profile details={userDetailsFormatted} />;
};

export default UserProfile;
