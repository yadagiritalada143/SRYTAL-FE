import { Card, Text } from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { BgDiv } from '../../common/style-components/bg-div';
import { EmployeeInterface } from '../../../interfaces/employee';
import { useEffect, useState } from 'react';
import { getUserDetails } from '../../../services/user-services';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const orgTheme = organizationConfig.organization_theme.theme;

  const [userDetails, setUserDetails] = useState<EmployeeInterface | null>(
    null
  );

  useEffect(() => {
    getUserDetails()
      .then(res => setUserDetails(res))
      .catch(err =>
        toast.error(
          err?.message ||
            err?.response?.data?.message ||
            'Failed to fetch user details'
        )
      );
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <BgDiv>
        <div
          className="w-full p-8 shadow-lg rounded-lg"
          style={{
            backgroundColor: orgTheme.backgroundColor,
            color: orgTheme.color,
            fontFamily: orgTheme.fontFamily,
          }}
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              Welcome Back,{' '}
              <span className="text-2xl font-semibold">
                {userDetails?.firstName || ''} {userDetails?.lastName || ''}
              </span>{' '}
              <span className="text-3xl">👋</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card
              padding="lg"
              radius="md"
              shadow="md"
              style={{
                backgroundColor: orgTheme.colors.primary[1],
                color: orgTheme.button.textColor,
              }}
            >
              <Text size="xl" fw={700}>
                12
              </Text>
              <Text>Completed</Text>
            </Card>

            <Card
              padding="lg"
              radius="md"
              shadow="md"
              style={{
                backgroundColor: orgTheme.colors.primary[2],
                color: orgTheme.button.textColor,
              }}
            >
              <Text size="xl" fw={700}>
                5
              </Text>
              <Text>In Progress</Text>
            </Card>

            <Card
              padding="lg"
              radius="md"
              shadow="md"
              style={{
                backgroundColor: orgTheme.colors.primary[4],
                color: orgTheme.button.textColor,
              }}
            >
              <Text size="xl" fw={700}>
                2
              </Text>
              <Text>Pending</Text>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card
              padding="lg"
              radius="md"
              shadow="sm"
              style={{
                backgroundColor: orgTheme.backgroundColor,
                color: orgTheme.color,
                border: `1px solid ${orgTheme.borderColor}`,
              }}
            >
              <Text size="lg" fw={600} mb="sm">
                Upcoming Tasks
              </Text>
              <ul className="text-sm space-y-2">
                <li className="flex justify-between">
                  <span>Implement authentication</span>
                  <span>May 5, 2024</span>
                </li>
                <li className="flex justify-between">
                  <span>Database optimization</span>
                  <span>May 7, 2024</span>
                </li>
                <li className="flex justify-between">
                  <span>Write unit tests</span>
                  <span>May 10, 2024</span>
                </li>
              </ul>
            </Card>

            <Card
              padding="lg"
              radius="md"
              shadow="sm"
              style={{
                backgroundColor: orgTheme.backgroundColor,
                color: orgTheme.color,
                border: `1px solid ${orgTheme.borderColor}`,
              }}
            >
              <Text size="lg" fw={600} mb="sm">
                My Schedule
              </Text>
              <ul className="text-sm space-y-2">
                <li className="flex justify-between">
                  <span>Stand-up Meeting</span>
                  <span>10:00 AM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sprint Review</span>
                  <span>2:00 PM</span>
                </li>
              </ul>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              padding="lg"
              radius="md"
              shadow="sm"
              style={{
                backgroundColor: orgTheme.backgroundColor,
                color: orgTheme.color,
                border: `1px solid ${orgTheme.borderColor}`,
              }}
            >
              <Text size="lg" fw={600} mb="sm">
                Recent Announcements
              </Text>
              <ul className="text-sm space-y-2">
                <li>
                  <strong>Quarterly Meeting on April 30, 2024</strong>
                  <p style={{ color: orgTheme.linkColor }}>
                    Reminder: The quarterly meeting is scheduled for 2:00 PM.
                  </p>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </BgDiv>
    </div>
  );
};

export default Dashboard;
