import {
  Badge,
  Button,
  Center,
  Group,
  Loader,
  Pagination,
  Text,
  TextInput,
  useMantineTheme
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import moment from 'moment';
import { useEffect, useMemo, useRef, useState } from 'react';
import { TimesheetNotification } from '../../../../interfaces/notifications';
import { OrganizationConfig } from '../../../../interfaces/organization';
import useHorizontalScroll from '../../../../hooks/horizontal-scroll';
import { toast } from 'react-toastify';
import { EmployeeInterface } from '../../../../interfaces/employee';
import { getUserDetails } from '../../../../services/user-services';

export const NotificationsTable = ({
  notifications,
  organizationConfig,
  onAction
}: {
  notifications: TimesheetNotification[];
  organizationConfig: OrganizationConfig;
  onAction: (id: string, action: 'Approved' | 'Rejected') => Promise<void>;
}) => {
  const theme = useMantineTheme();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [filteredNotifications, setFilteredNotifications] =
    useState(notifications);
  const [activePage, setPage] = useState(1);
  const [userDetails, setUserDetails] = useState<EmployeeInterface | null>(
    null
  );
  const [loadingUser, setLoadingUser] = useState<boolean>(true);
  const itemPerPage = 10;
  const totalPages = Math.ceil(filteredNotifications.length / itemPerPage);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    scrollRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart
  } = useHorizontalScroll();

  useEffect(() => {
    getUserDetails()
      .then(res => setUserDetails(res))
      .catch(err =>
        toast.error(
          err?.message ||
            err?.response?.data?.message ||
            'Failed to fetch user details'
        )
      )
      .finally(() => setLoadingUser(false));
  }, []);

  useEffect(() => {
    setFilteredNotifications(notifications);
  }, [notifications]);

  const paginatedNotifications = useMemo(() => {
    const start = (activePage - 1) * itemPerPage;
    const end = start + itemPerPage;
    return filteredNotifications.slice(start, end);
  }, [filteredNotifications, activePage]);

  const handleSearch = () => {
    const query = inputRef.current?.value.toLowerCase() || '';
    if (!query) {
      setFilteredNotifications(notifications);
      return;
    }
    const filtered = notifications.filter(notification =>
      notification.employeeName.toLowerCase().includes(query)
    );
    setFilteredNotifications(filtered);
  };

  const handleButtonAction = async (
    id: string,
    action: 'Approved' | 'Rejected'
  ) => {
    setLoadingId(id);
    await onAction(id, action);
    setLoadingId(null);
  };

  return (
    <div
      style={{
        color: organizationConfig.organization_theme.theme.button.textColor,
        fontFamily: theme.fontFamily
      }}
    >
      {/* Header & Search */}
      <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold underline text-center px-2 py-4">
        Alerts & Notifications
      </h1>

      {loadingUser ? (
        <Center className="my-8">
          <Loader
            size="lg"
            color={organizationConfig.organization_theme.theme.button.color}
          />
        </Center>
      ) : (
        <div className="mb-6 mt-4 ml-4">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Hello,{' '}
            <span className="text-2xl font-semibold">
              {userDetails?.firstName || ''} {userDetails?.lastName || ''}
            </span>{' '}
            <span className="text-3xl">👋</span>
          </h1>
        </div>
      )}

      <div className="w-full my-2">
        <TextInput
          ref={inputRef}
          rightSection={<IconSearch />}
          onChange={handleSearch}
          className="my-4"
          placeholder="Search by Employee Name"
        />
      </div>

      {/* Table */}
      <div
        className="flex max-w-full shadow-lg rounded-lg"
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ userSelect: 'none', overflowX: 'hidden', cursor: 'grab' }}
      >
        <table className="w-full text-center shadow-md border">
          <thead
            className="text-xs"
            style={{
              backgroundColor:
                organizationConfig.organization_theme.theme.backgroundColor,
              color: organizationConfig.organization_theme.theme.color
            }}
          >
            <tr>
              <th className="p-2 border">S.No</th>
              <th className="p-2 border">Date</th>
              <th className="p-2 border">Employee</th>
              <th className="p-2 border">Hours</th>
              <th className="p-2 border">Comments</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {paginatedNotifications.length > 0 ? (
              paginatedNotifications.map((notification, index) => (
                <tr key={notification.id}>
                  <td className="px-4 py-2 border">
                    {index + 1 + (activePage - 1) * itemPerPage}
                  </td>
                  <td className="px-4 py-2 border">
                    <Badge variant="light" color="blue" fullWidth>
                      {moment(notification.date).format('ddd, DD MMM')}
                    </Badge>
                  </td>
                  <td className="px-4 py-2 border">
                    {notification.employeeName}
                  </td>
                  <td className="px-4 py-2 border">{notification.hours}</td>
                  <td className="px-4 py-2 border">
                    <Text lineClamp={2}>{notification.comments}</Text>
                  </td>
                  <td className="px-4 py-2 border">
                    <Text
                      fw={600}
                      c={
                        notification.status === 'Approved'
                          ? 'green'
                          : notification.status === 'Rejected'
                            ? 'red'
                            : 'orange'
                      }
                    >
                      {notification.status}
                    </Text>
                  </td>
                  <td className="px-4 py-2 border">
                    {notification.status === 'Waiting For Approval' ? (
                      <Group gap="sm" justify="center">
                        <Button
                          color="green"
                          size="xs"
                          loading={loadingId === notification.id}
                          onClick={() =>
                            handleButtonAction(notification.id, 'Approved')
                          }
                        >
                          Approve
                        </Button>
                        <Button
                          color="red"
                          size="xs"
                          loading={loadingId === notification.id}
                          onClick={() =>
                            handleButtonAction(notification.id, 'Rejected')
                          }
                        >
                          Reject
                        </Button>
                      </Group>
                    ) : (
                      <Text c="dimmed" size="xs">
                        Action Completed
                      </Text>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-2">
                  No notifications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <Center className="my-8">
          <Pagination
            value={activePage}
            onChange={setPage}
            total={totalPages}
          />
        </Center>
      )}
    </div>
  );
};
