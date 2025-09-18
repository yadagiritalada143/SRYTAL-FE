import { useEffect, useState } from 'react';
import {
  Paper,
  Group,
  Text,
  Badge,
  TextInput,
  Pagination,
  Button,
  Loader,
  Center,
  Title,
  Card,
  Stack,
  SimpleGrid,
  Modal,
  Textarea,
  Select
} from '@mantine/core';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { useNavigate } from 'react-router-dom';
import { organizationEmployeeUrls } from '../../../utils/common/constants';

// Mock writers data
const mockWriters = [
  {
    empId: 'CW-001',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    joiningDate: '2025-01-15',
    totalTasksAssigned: 4
  },
  {
    empId: 'CW-002',
    name: 'Rohit Verma',
    email: 'rohit@example.com',
    joiningDate: '2025-03-20',
    totalTasksAssigned: 2
  },
  {
    empId: 'CW-003',
    name: 'Anjali Singh',
    email: 'anjali@example.com',
    joiningDate: '2025-05-10',
    totalTasksAssigned: 5
  }
];

const ContentWriters = () => {
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const navigate = useNavigate();
  const orgTheme = organizationConfig.organization_theme.theme;
  const [writers, setWriters] = useState<typeof mockWriters>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [openModal, setOpenModal] = useState(false);

  const pageSize = 6;

  useEffect(() => {
    setTimeout(() => {
      setWriters(mockWriters);
      setLoading(false);
    }, 800);
  }, []);

  const filteredWriters = writers.filter(
    w =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.empId.toLowerCase().includes(search.toLowerCase())
  );

  const paginated = filteredWriters.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <Stack gap={24} px="md">
      {/* Header */}
      <Stack align="center" gap={9} mt="lg" mb="md">
        <Title order={2} c="blue.7">
          Content Writers
        </Title>
        <Text size="sm" c="dimmed">
          Manage content writers and their writing tasks
        </Text>
      </Stack>

      {/* Search + Add */}
      <Group justify="space-between">
        <TextInput
          placeholder="Search by name or EMP-ID..."
          value={search}
          onChange={e => setSearch(e.currentTarget.value)}
          w={260}
          radius="md"
        />
        <Button
          radius="md"
          variant="gradient"
          gradient={{ from: 'blue', to: 'indigo' }}
          onClick={() => setOpenModal(true)}
        >
          + Add Writer
        </Button>
      </Group>

      {/* Loader */}
      {loading ? (
        <Center h={200}>
          <Loader size="lg" color="blue" />
        </Center>
      ) : (
        <>
          {/* Card Grid */}
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg" mt="md">
            {paginated.map(writer => (
              <Card
                key={writer.empId}
                shadow="sm"
                radius="md"
                withBorder
                p="lg"
              >
                <Stack gap="xs">
                  <Text fw={600}>{writer.name}</Text>
                  <Text size="xs" c="dimmed">
                    {writer.empId} • {writer.email}
                  </Text>
                  <Text size="xs" c="gray">
                    Joined: {writer.joiningDate}
                  </Text>
                </Stack>

                <Group mt="md" justify="space-between">
                  <Badge color="blue" variant="light" radius="sm">
                    {writer.totalTasksAssigned} Tasks
                  </Badge>
                  <Button
                    size="xs"
                    radius="xl"
                    variant="light"
                    color="blue"
                    onClick={() =>
                      navigate(
                        `${organizationEmployeeUrls(
                          organizationConfig.organization_name
                        )}/dashboard/common/contentwriter/${writer.empId}`
                      )
                    }
                  >
                    View Tasks
                  </Button>
                </Group>
              </Card>
            ))}
          </SimpleGrid>

          {/* Pagination */}
          {filteredWriters.length > pageSize && (
            <Group justify="center" mt="lg">
              <Pagination
                total={Math.ceil(filteredWriters.length / pageSize)}
                value={page}
                onChange={setPage}
                size="sm"
                radius="md"
              />
            </Group>
          )}
        </>
      )}

      {/* Add Writer Modal */}
      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title="Add Content Writer"
        centered
      >
        <Stack gap="sm">
          <TextInput label="Full Name" placeholder="Enter writer name" />
          <TextInput label="Email" placeholder="Enter email" />
          <TextInput label="EMP-ID" placeholder="CW-004" />
          <TextInput label="Joining Date" type="date" />
          <Textarea label="Notes" placeholder="Optional notes..." />
          <Select
            label="Initial Tasks"
            placeholder="Select count"
            data={['0', '1', '2', '3', '5+']}
          />
          <Group justify="flex-end" mt="sm">
            <Button variant="default" onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button color="blue">Save</Button>
          </Group>
        </Stack>
      </Modal>
    </Stack>
  );
};

export default ContentWriters;
