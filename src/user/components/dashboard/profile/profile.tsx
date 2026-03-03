import Profile from '@common/profile/profile';
import { useGetUserDetails } from '@hooks/queries/useUserQueries';
import { EmployeeInterface } from '@interfaces/employee';

const EmployeeProfile = () => {
  const { data: user, isLoading, isError, error } = useGetUserDetails();

  const formatDate = (dateString: any) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  const employeeDetails = {
    ...user,
    dateOfBirth: user?.dateOfBirth ? formatDate(user.dateOfBirth) : ''
  };

  return <Profile details={employeeDetails as any} />;
};

export default EmployeeProfile;
