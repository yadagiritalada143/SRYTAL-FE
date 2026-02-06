import {
  Card,
  Tabs,
  Stack,
  Grid,
  Text,
  Badge,
  Group,
  Container,
  Divider,
  Paper,
  Title
} from '@mantine/core';
import { EmployeeInterface } from '../../../interfaces/employee';
import ProfileImageUploader from '../profile-image/profile-image';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconUser,
  IconMail,
  IconPhone,
  IconCalendar,
  IconDroplet,
  IconId,
  IconMapPin,
  IconBriefcase,
  IconBuildingBank
} from '@tabler/icons-react';

// Info Item Component
const InfoItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | undefined;
  isMobile?: boolean;
}> = ({ icon, label, value, isMobile = false }) => (
  <Paper p={isMobile ? 'xs' : 'sm'} withBorder radius="md">
    <Group gap="xs" wrap="nowrap">
      <div style={{ color: 'var(--mantine-color-blue-6)' }}>{icon}</div>
      <Stack gap={2} style={{ flex: 1 }}>
        <Text size="xs" c="dimmed" fw={500}>
          {label}
        </Text>
        <Text size="sm" fw={500} lineClamp={1}>
          {value || 'N/A'}
        </Text>
      </Stack>
    </Group>
  </Paper>
);

const Profile = ({ details }: { details: EmployeeInterface }) => {
  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  return (
    <Container size="xl" py="md" my="xl" px={isSmallMobile ? 'xs' : 'md'}>
      <Stack gap="md">
        {/* Header Card with Profile Image */}
        <Card
          shadow="sm"
          p={isMobile ? 'md' : 'lg'}
          radius="md"
          withBorder
          mt="xl"
        >
          <Stack gap="lg">
            <Group
              justify="space-between"
              wrap={isMobile ? 'wrap' : 'nowrap'}
              align={isMobile ? 'flex-start' : 'center'}
            >
              <Group gap="md">
                <div
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: '29px',
                    overflow: 'hidden'
                  }}
                >
                  <ProfileImageUploader />
                </div>
                <Stack gap={4}>
                  <Title order={isMobile ? 4 : 2}>
                    {details.firstName} {details.lastName}
                  </Title>
                  {details.employeeId && (
                    <Group gap="xs">
                      <IconId size={16} />
                      <Text size="sm" c="dimmed">
                        {details.employeeId}
                      </Text>
                    </Group>
                  )}
                  {isMobile && (
                    <Badge
                      size={isMobile ? 'sm' : 'md'}
                      variant="light"
                      color="blue"
                      w="fit-content"
                    >
                      {details.userRole}
                    </Badge>
                  )}
                </Stack>
              </Group>
              {!isMobile && details.userRole && (
                <Badge size="md" variant="light" color="blue">
                  {details.userRole}
                </Badge>
              )}
            </Group>
          </Stack>
        </Card>

        {/* Basic Information Card */}
        <Card shadow="sm" p={isMobile ? 'md' : 'lg'} radius="md" withBorder>
          <Stack gap="md">
            <Text size="lg" fw={600}>
              Basic Information
            </Text>
            <Divider />
            <Grid gutter="md">
              <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
                <InfoItem
                  icon={<IconUser size={18} />}
                  label="First Name"
                  value={details.firstName}
                  isMobile={isMobile}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
                <InfoItem
                  icon={<IconUser size={18} />}
                  label="Last Name"
                  value={details.lastName}
                  isMobile={isMobile}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
                <InfoItem
                  icon={<IconCalendar size={18} />}
                  label="Date of Birth"
                  value={details.dob}
                  isMobile={isMobile}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
                <InfoItem
                  icon={<IconDroplet size={18} />}
                  label="Blood Group"
                  value={details.bloodGroup?.type}
                  isMobile={isMobile}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
                <InfoItem
                  icon={<IconMail size={18} />}
                  label="Email"
                  value={details.email}
                  isMobile={isMobile}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
                <InfoItem
                  icon={<IconPhone size={18} />}
                  label="Mobile"
                  value={details.mobileNumber}
                  isMobile={isMobile}
                />
              </Grid.Col>
            </Grid>
          </Stack>
        </Card>

        {/* Tabbed Information */}
        <Card shadow="sm" p={0} radius="md" withBorder>
          <Tabs
            defaultValue="employment"
            orientation={isMobile ? 'horizontal' : 'horizontal'}
          >
            <Tabs.List
              p="md"
              style={{
                display: 'flex',
                flexWrap: isMobile ? 'wrap' : 'nowrap',
                justifyContent: 'flex-start'
              }}
            >
              <Tabs.Tab
                value="employment"
                leftSection={<IconBriefcase size={16} />}
                w={isMobile ? '50%' : 'auto'}
              >
                Employment
              </Tabs.Tab>
              <Tabs.Tab
                value="address"
                leftSection={<IconMapPin size={16} />}
                w={isMobile ? '40%' : 'auto'}
              >
                Address
              </Tabs.Tab>
              <Tabs.Tab
                value="bankDetails"
                leftSection={<IconBuildingBank size={16} />}
                w={isMobile ? '50%' : 'auto'}
                mt={isMobile ? 'sm' : '0'}
              >
                Bank Details
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="employment" p={isMobile ? 'md' : 'lg'}>
              <Stack gap="md">
                <Grid gutter="md">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Paper p="md" withBorder radius="md">
                      <Stack gap="xs">
                        <Group gap="xs" align="center">
                          <IconBriefcase
                            size={16}
                            color="var(--mantine-color-blue-6)"
                          />
                          <Text size="xs" c="dimmed" fw={500}>
                            Employment Type
                          </Text>
                        </Group>
                        <Badge size="lg" variant="light" color="teal">
                          {details.employmentType?.employmentType || 'N/A'}
                        </Badge>
                      </Stack>
                    </Paper>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Paper p="md" withBorder radius="md">
                      <Stack gap="xs">
                        <Group gap="xs" align="center">
                          <IconBriefcase
                            size={16}
                            color="var(--mantine-color-blue-6)"
                          />
                          <Text size="xs" c="dimmed" fw={500}>
                            Designations
                          </Text>
                        </Group>
                        <Group gap="xs" wrap="wrap">
                          {details.employeeRole &&
                          details.employeeRole.length > 0 ? (
                            details.employeeRole.map(role => (
                              <Badge
                                key={role._id}
                                size="md"
                                variant="outline"
                                color="blue"
                              >
                                {role.designation}
                              </Badge>
                            ))
                          ) : (
                            <Text size="sm" c="dimmed">
                              N/A
                            </Text>
                          )}
                        </Group>
                      </Stack>
                    </Paper>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="address" p={isMobile ? 'md' : 'lg'}>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Paper p="md" withBorder radius="md">
                    <Stack gap="xs">
                      <Group gap="xs">
                        <IconMapPin
                          size={18}
                          color="var(--mantine-color-blue-6)"
                        />
                        <Text size="sm" fw={600} c="dimmed">
                          Present Address
                        </Text>
                      </Group>
                      <Text size="sm">{details.presentAddress || 'N/A'}</Text>
                    </Stack>
                  </Paper>
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Paper p="md" withBorder radius="md">
                    <Stack gap="xs">
                      <Group gap="xs">
                        <IconMapPin
                          size={18}
                          color="var(--mantine-color-green-6)"
                        />
                        <Text size="sm" fw={600} c="dimmed">
                          Permanent Address
                        </Text>
                      </Group>
                      <Text size="sm">{details.permanentAddress || 'N/A'}</Text>
                    </Stack>
                  </Paper>
                </Grid.Col>
              </Grid>
            </Tabs.Panel>

            <Tabs.Panel value="bankDetails" p={isMobile ? 'md' : 'lg'}>
              <Stack gap="md">
                <Grid gutter="md">
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Paper p="md" withBorder radius="md">
                      <Stack gap="xs">
                        <Group gap="xs" align="center">
                          <IconBuildingBank
                            size={16}
                            color="var(--mantine-color-blue-6)"
                          />
                          <Text size="xs" c="dimmed" fw={500}>
                            Account Number
                          </Text>
                        </Group>
                        <Text size="sm" fw={500}>
                          {details.bankDetailsInfo?.accountNumber || 'N/A'}
                        </Text>
                      </Stack>
                    </Paper>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Paper p="md" withBorder radius="md">
                      <Stack gap="xs">
                        <Group gap="xs" align="center">
                          <IconUser
                            size={16}
                            color="var(--mantine-color-blue-6)"
                          />
                          <Text size="xs" c="dimmed" fw={500}>
                            Account Holder Name
                          </Text>
                        </Group>
                        <Text size="sm" fw={500}>
                          {details.bankDetailsInfo?.accountHolderName || 'N/A'}
                        </Text>
                      </Stack>
                    </Paper>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Paper p="md" withBorder radius="md">
                      <Stack gap="xs">
                        <Group gap="xs" align="center">
                          <IconBuildingBank
                            size={16}
                            color="var(--mantine-color-blue-6)"
                          />
                          <Text size="xs" c="dimmed" fw={500}>
                            IFSC Code
                          </Text>
                        </Group>
                        <Text size="sm" fw={500}>
                          {details.bankDetailsInfo?.ifscCode || 'N/A'}
                        </Text>
                      </Stack>
                    </Paper>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Tabs.Panel>
          </Tabs>
        </Card>
      </Stack>
    </Container>
  );
};

export default Profile;
