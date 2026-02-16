import { useCallback, useEffect, useState } from 'react';
import Profile from '../../../common/profile/profile';
import { getUserDetails } from '../../../../services/user-services';
import { toast } from 'react-toastify';
import { EmployeeInterface } from '../../../../interfaces/employee';
import {
  Container,
  Card,
  Stack,
  Loader,
  Text,
  Center,
  Button
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconRefresh } from '@tabler/icons-react';

const AdminProfile = () => {
  const [adminDetails, setAdminDetails] = useState<EmployeeInterface>({
    _id: '',
    employeeId: '',
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    dob: '',
    presentAddress: '',
    permanentAddress: '',
    userRole: '',
    passwordResetRequired: 'false',
    employeeRole: [{ _id: '', designation: '' }],
    bloodGroup: { _id: '', type: '' },
    employmentType: { _id: '', employmentType: '' },
    bankDetailsInfo: {
      accountNumber: '',
      accountHolderName: '',
      ifscCode: ''
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const fetchAdminDetails = useCallback(() => {
    setIsLoading(true);
    setError(null);
    getUserDetails()
      .then(user => {
        setAdminDetails({
          ...user,
          dob: user.dateOfBirth ? formatDate(user.dateOfBirth) : ''
        });
      })
      .catch(error => {
        const errorMessage =
          error?.response?.data?.message ||
          error?.message ||
          'Failed to load profile';
        setError(errorMessage);
        toast.error(errorMessage);
      })
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    fetchAdminDetails();
  }, [fetchAdminDetails]);

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

  if (error) {
    return (
      <Container size={isMobile ? 'sm' : 'lg'} py="xl">
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Stack align="center" gap="md">
            <Text ta="center" size="lg" c="red">
              {error}
            </Text>
            <Button
              leftSection={<IconRefresh size={16} />}
              onClick={fetchAdminDetails}
            >
              Try Again
            </Button>
          </Stack>
        </Card>
      </Container>
    );
  }

  return <Profile details={adminDetails} />;
};

export default AdminProfile;
