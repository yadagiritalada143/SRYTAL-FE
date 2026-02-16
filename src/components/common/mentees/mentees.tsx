import { useEffect, useMemo, useState } from 'react';
import {
  Group,
  Text,
  Badge,
  TextInput,
  Pagination,
  Loader,
  Center,
  Title,
  Card,
  Stack,
  SimpleGrid,
  useMantineTheme
} from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { themeAtom } from '../../../atoms/theme';
import { getThemeConfig } from '../../../utils/common/theme-utils';
// import { menteesAtom } from '../../../atoms/mentees-atom';
import { useNavigate } from 'react-router-dom';
import { IconSearch } from '@tabler/icons-react';
import CountButton from '../../UI/Buttonsanimate/Countbutton';
import ButtonAnimate from '../../UI/Buttonsanimate/Button';
import { organizationEmployeeUrls } from '../../../utils/common/constants';

const mockMentees = [
  {
    empId: 'SSIPL-007',
    name: 'Sai Babu',
    email: 'sai@gmail.com',
    joiningDate: '2025-04-25',
    totalTasksAssigned: 3
  },
  {
    empId: 'SSIPL-010',
    name: 'Ravi Kumar',
    email: 'ravi@gmail.com',
    joiningDate: '2025-05-01',
    totalTasksAssigned: 2
  },
  {
    empId: 'SSIPL-015',
    name: 'Anitha',
    email: 'anitha@gmail.com',
    joiningDate: '2025-06-15',
    totalTasksAssigned: 5
  },
  {
    empId: 'SSIPL-007',
    name: 'Sai Babu',
    email: 'sai@gmail.com',
    joiningDate: '2025-04-25',
    totalTasksAssigned: 3
  },
  {
    empId: 'SSIPL-010',
    name: 'Ravi Kumar',
    email: 'ravi@gmail.com',
    joiningDate: '2025-05-01',
    totalTasksAssigned: 2
  },
  {
    empId: 'SSIPL-015',
    name: 'Anitha',
    email: 'anitha@gmail.com',
    joiningDate: '2025-06-15',
    totalTasksAssigned: 5
  },
  {
    empId: 'SSIPL-007',
    name: 'Sai Babu',
    email: 'sai@gmail.com',
    joiningDate: '2025-04-25',
    totalTasksAssigned: 3
  },
  {
    empId: 'SSIPL-010',
    name: 'Ravi Kumar',
    email: 'ravi@gmail.com',
    joiningDate: '2025-05-01',
    totalTasksAssigned: 2
  },
  {
    empId: 'SSIPL-015',
    name: 'Anitha',
    email: 'anitha@gmail.com',
    joiningDate: '2025-06-15',
    totalTasksAssigned: 5
  }
];

const Mentees = () => {
  const theme = useMantineTheme();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);

  const [mentees, setMentees] = useState<typeof mockMentees>([]);
  //const [mentees, setMentees] = useRecoilValue(menteesAtom);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setMentees(mockMentees);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredMentees = mentees.filter(
    m =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.empId.toLowerCase().includes(search.toLowerCase())
  );

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredMentees.length / itemsPerPage);
  const paginated = filteredMentees.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  const activePage = page;
  const setActivePage = setPage;

  return (
    <Stack
      gap={24}
      px="md"
      style={{
        color: currentThemeConfig.button.textColor,
        fontFamily: theme.fontFamily
      }}
    >
      {/* Header */}
      <Stack align="center" gap={9} mt="lg" mb="md">
        <Title className="text-xl sm:text-2xl md:text-3xl font-extrabold underline text-center px-2 py-4">
          Mentee Tasks Flow
        </Title>
      </Stack>

      {/* Search Bar */}
      <Group justify="space-between" align="center">
        <TextInput
          placeholder="Search by name or EMP ID ..."
          value={search}
          onChange={e => {
            setSearch(e.currentTarget.value);
            setPage(1);
          }}
          leftSection={<IconSearch size={18} />}
          w={{ base: '100%', sm: 300 }}
          radius="md"
          styles={{
            input: {
              backgroundColor: currentThemeConfig.backgroundColor,
              color: currentThemeConfig.color,
              borderColor: currentThemeConfig.borderColor
            }
          }}
        />
      </Group>

      {/* Loader */}
      {loading ? (
        <Center h={250}>
          <Loader
            size="lg"
            type="bars"
            color={currentThemeConfig.button.color}
          />
        </Center>
      ) : (
        <>
          {filteredMentees.length === 0 ? (
            <Center h={200}>
              <Text fw={600} c="dimmed">
                No search results found
              </Text>
            </Center>
          ) : (
            <>
              {/* Card Grid */}
              <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="md">
                {paginated.map((mentee, index) => (
                  <Card
                    key={`${mentee.empId}-${index}`}
                    shadow="sm"
                    radius="md"
                    withBorder
                    p="md"
                    style={{
                      backgroundColor: currentThemeConfig.backgroundColor,
                      color: currentThemeConfig.color,
                      border: `1px solid ${currentThemeConfig.borderColor}`,
                      transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                      width: '100%'
                    }}
                    className="hover:shadow-lg hover:scale-[1.02] cursor-pointer"
                  >
                    <Stack gap={3}>
                      <Group gap="3" justify="space-between" w="100%">
                        <Text fw={600} size="sm">
                          {mentee.name}
                        </Text>
                        <Badge size="sm" variant="light" color="blue" fw={500}>
                          {mentee.empId}
                        </Badge>
                      </Group>

                      <Text size="xs" c="dimmed">
                        Email : {mentee.email}
                      </Text>
                      <Text size="xs" c="gray">
                        Joined : {mentee.joiningDate}
                      </Text>
                    </Stack>

                    <Group mt="md" justify="space-between">
                      <CountButton radius="sm">
                        {mentee.totalTasksAssigned} Tasks
                      </CountButton>
                      <ButtonAnimate
                        primaryText="Assign"
                        onClick={() =>
                          navigate(
                            `${organizationEmployeeUrls(
                              organizationConfig.organization_name
                            )}/dashboard/common/mentees/${mentee.empId}`
                          )
                        }
                      >
                        Assign
                      </ButtonAnimate>
                    </Group>
                  </Card>
                ))}
              </SimpleGrid>

              {/* Pagination */}
              {totalPages > 1 && (
                <Center className="my-8">
                  <Pagination
                    total={totalPages}
                    value={activePage}
                    onChange={setActivePage}
                    mt="md"
                    size="md"
                    radius="md"
                    styles={{
                      control: {
                        borderColor: currentThemeConfig.borderColor
                      }
                    }}
                  />
                </Center>
              )}
            </>
          )}
        </>
      )}
    </Stack>
  );
};

export default Mentees;
