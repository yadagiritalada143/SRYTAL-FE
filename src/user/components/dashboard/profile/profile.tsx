import { useEffect, useState } from 'react';
import Profile from '@common/profile/profile';
import { getUserDetails } from '@services/user-services';
import { toast } from 'react-toastify';
import { EmployeeInterface } from '@interfaces/employee';

const EmployeeProfile = () => {
  const [employeeDetails, setEmployeeDetails] = useState<EmployeeInterface>(
    {} as unknown as EmployeeInterface
  );

  useEffect(() => {
    getUserDetails()
      .then(user => {
        setEmployeeDetails({
          ...(user as EmployeeInterface),
          dateOfBirth: user.dateOfBirth ? formatDate(user.dateOfBirth) : ''
        });
      })
      .catch(error =>
        toast.error(error || error.message || error.response.data.message)
      );
  }, []);
  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Profile details={employeeDetails} />
    </>
  );
};

export default EmployeeProfile;
