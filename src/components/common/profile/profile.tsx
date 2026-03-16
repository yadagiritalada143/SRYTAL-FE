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
import type { EmployeeInterface } from '@interfaces/employee';
import ProfileImageUploader from '../profile-image/ProfileImage'; // Assuming we standardize this too
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
  IconBuildingBank,
  IconFingerprint,
  IconUserCog
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { useState } from 'react';

// Info Item Component
const InfoItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string | undefined;
  mutedTextColor: string;
  iconColor: string;
  isMobile?: boolean;
}> = ({ icon, label, value, mutedTextColor, iconColor, isMobile = false }) => (
  <Paper p={isMobile ? 'xs' : 'sm'} withBorder radius='md'>
    <Group gap='xs' wrap='nowrap'>
      <div style={{ color: iconColor }}>{icon}</div>
      <Stack gap={2} style={{ flex: 1 }}>
        <Text size='xs' c={mutedTextColor} fw={500}>
          {label}
        </Text>
        <Text size='sm' fw={500} lineClamp={1}>
          {value || 'N/A'}
        </Text>
      </Stack>
    </Group>
  </Paper>
);

const Profile = ({ details }: { details: EmployeeInterface }) => {
  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { themeConfig: currentThemeConfig, isDarkTheme } = useAppTheme();
  const isSmallMobile = useMediaQuery('(max-width: 500px)');
  const [activeTab, setActiveTab] = useState<string | null>('employment');

  // Helper function to format ISO date to readable format
  const formatDate = (isoDate: string): string => {
    if (!isoDate) return '';
    try {
      const date = new Date(isoDate);
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      });
    } catch {
      return isoDate;
    }
  };

  return (
    <Container size='xl' py='md' my='xl' px={isSmallMobile ? 'xs' : 'md'}>
      <Stack gap='md'>
        {/* Header Card with Profile Image */}
        <Card
          shadow='sm'
          p='xs'
          radius='md'
          withBorder
          mt='xl'
          style={{
            color: currentThemeConfig.color,
            borderColor: currentThemeConfig.borderColor
          }}
        >
          <Stack gap='lg'>
            <Group
              justify='space-between'
              wrap={isMobile ? 'wrap' : 'nowrap'}
              align={isMobile ? 'flex-start' : 'center'}
            >
              <Group gap='md'>
                <div
                  style={{
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
                    <Group gap='xs'>
                      <IconId size={16} />
                      <Text size='sm' c={currentThemeConfig.mutedTextColor}>
                        {details.employeeId}
                      </Text>
                    </Group>
                  )}
                  {isMobile && (
                    <Badge
                      size={isMobile ? 'sm' : 'md'}
                      variant='light'
                      color={currentThemeConfig.accentColor}
                      w='fit-content'
                    >
                      {details.userRole}
                    </Badge>
                  )}
                </Stack>
              </Group>
              {!isMobile && details.userRole && (
                <Badge
                  size='md'
                  variant='light'
                  color={currentThemeConfig.accentColor}
                >
                  {details.userRole}
                </Badge>
              )}
            </Group>
          </Stack>
        </Card>

        {/* Basic Information Card */}
        <Card
          shadow='sm'
          p={isMobile ? 'md' : 'lg'}
          radius='md'
          withBorder
          style={{
            color: currentThemeConfig.color,
            borderColor: currentThemeConfig.borderColor
          }}
        >
          <Stack gap='md'>
            <Text size='lg' fw={600}>
              Basic Information
            </Text>
            <Divider />
            <Grid gutter='md'>
              <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
                <InfoItem
                  icon={<IconUser size={20} stroke={1.8} />}
                  label='First Name'
                  value={details.firstName}
                  isMobile={isMobile}
                  mutedTextColor={currentThemeConfig.mutedTextColor}
                  iconColor={currentThemeConfig.accentColor}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
                <InfoItem
                  icon={<IconUser size={20} stroke={1.8} />}
                  label='Last Name'
                  value={details.lastName}
                  isMobile={isMobile}
                  mutedTextColor={currentThemeConfig.mutedTextColor}
                  iconColor={currentThemeConfig.accentColor}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
                <InfoItem
                  icon={<IconCalendar size={18} />}
                  label='Date of Birth'
                  value={formatDate(details.dateOfBirth)}
                  isMobile={isMobile}
                  mutedTextColor={currentThemeConfig.mutedTextColor}
                  iconColor={currentThemeConfig.accentColor}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
                <InfoItem
                  icon={<IconDroplet size={18} />}
                  label='Blood Group'
                  value={details.bloodGroup?.type}
                  isMobile={isMobile}
                  mutedTextColor={currentThemeConfig.mutedTextColor}
                  iconColor={currentThemeConfig.accentColor}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
                <InfoItem
                  icon={<IconMail size={18} />}
                  label='Email'
                  value={details.email}
                  isMobile={isMobile}
                  mutedTextColor={currentThemeConfig.mutedTextColor}
                  iconColor={currentThemeConfig.accentColor}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
                <InfoItem
                  icon={<IconPhone size={18} />}
                  label='Mobile'
                  value={details.mobileNumber}
                  isMobile={isMobile}
                  mutedTextColor={currentThemeConfig.mutedTextColor}
                  iconColor={currentThemeConfig.accentColor}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
                <InfoItem
                  icon={<IconFingerprint size={18} />}
                  label='Aadhar Number'
                  value={details.aadharNumber}
                  isMobile={isMobile}
                  mutedTextColor={currentThemeConfig.mutedTextColor}
                  iconColor={currentThemeConfig.accentColor}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
                <InfoItem
                  icon={<IconId size={18} />}
                  label='PAN Card Number'
                  value={details.panCardNumber}
                  isMobile={isMobile}
                  mutedTextColor={currentThemeConfig.mutedTextColor}
                  iconColor={currentThemeConfig.accentColor}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
                <InfoItem
                  icon={<IconFingerprint size={18} />}
                  label='UAN Number'
                  value={details.uanNumber}
                  isMobile={isMobile}
                  mutedTextColor={currentThemeConfig.mutedTextColor}
                  iconColor={currentThemeConfig.accentColor}
                />
              </Grid.Col>

              <Grid.Col span={{ base: 12, xs: 6, sm: 6, md: 4 }}>
                <InfoItem
                  icon={<IconCalendar size={18} />}
                  label='Date of Joining'
                  value={formatDate(details.dateOfJoining)}
                  isMobile={isMobile}
                  mutedTextColor={currentThemeConfig.mutedTextColor}
                  iconColor={currentThemeConfig.accentColor}
                />
              </Grid.Col>
            </Grid>
          </Stack>
        </Card>

        {/* Tabbed Information */}
        <Card
          shadow='sm'
          p={0}
          radius='md'
          withBorder
          style={{
            color: currentThemeConfig.color,
            borderColor: currentThemeConfig.borderColor
          }}
        >
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            variant='default'
            orientation='horizontal'
            classNames={{
              tab: 'settings-tab'
            }}
            styles={{
              list: {
                flexWrap: isMobile ? 'wrap' : 'nowrap',
                justifyContent: isMobile ? 'center' : 'flex-start',
                gap: isMobile ? 8 : 0
              },
              tab: {
                fontWeight: 500,
                transition: 'color 0.2s ease',
                ...(isDarkTheme && {
                  color: currentThemeConfig.color,
                  '&[data-active]': {
                    color: '#ffffff'
                  },
                  '&[data-active] svg': {
                    color: '#ffffff'
                  }
                })
              }
            }}
          >
            <Tabs.List mb='md'>
              <Tabs.Tab
                value='employment'
                leftSection={<IconBriefcase size={16} stroke={1.8} />}
                w={isMobile ? '50%' : 'auto'}
              >
                Employment
              </Tabs.Tab>
              <Tabs.Tab
                value='address'
                leftSection={<IconMapPin size={16} stroke={1.8} />}
                w={isMobile ? '40%' : 'auto'}
              >
                Address
              </Tabs.Tab>
              <Tabs.Tab
                value='bankDetails'
                leftSection={<IconBuildingBank size={16} stroke={1.8} />}
                mt={isMobile ? 'sm' : '0'}
              >
                Bank Details
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='employment' p={isMobile ? 'md' : 'lg'}>
              <Stack gap='md'>
                <Grid gutter='md'>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Paper
                      p='md'
                      withBorder
                      radius='md'
                      style={{
                        color: currentThemeConfig.color,
                        borderColor: currentThemeConfig.borderColor
                      }}
                    >
                      <Stack gap='xs'>
                        <Group gap='xs' align='center'>
                          <IconBriefcase
                            size={16}
                            color={currentThemeConfig.iconColor}
                          />
                          <Text
                            size='xs'
                            c={currentThemeConfig.mutedTextColor}
                            fw={500}
                          >
                            Employment Type
                          </Text>
                        </Group>
                        <Badge
                          size='md'
                          variant='light'
                          color={currentThemeConfig.successColor}
                        >
                          {details.employmentType?.employmentType || 'N/A'}
                        </Badge>
                      </Stack>
                    </Paper>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Paper
                      p='md'
                      withBorder
                      radius='md'
                      style={{
                        color: currentThemeConfig.color,
                        borderColor: currentThemeConfig.borderColor
                      }}
                    >
                      <Stack gap='xs'>
                        <Group gap='xs' align='center'>
                          <IconUserCog
                            size={16}
                            color={currentThemeConfig.iconColor}
                          />
                          <Text
                            size='xs'
                            c={currentThemeConfig.mutedTextColor}
                            fw={500}
                          >
                            Designations
                          </Text>
                        </Group>
                        <Group gap='xs' wrap='wrap'>
                          {details.employeeRole &&
                          details.employeeRole.length > 0 ? (
                            details.employeeRole.map(role => (
                              <Badge
                                key={role._id}
                                size='md'
                                variant='outline'
                                color={currentThemeConfig.accentColor}
                              >
                                {role.designation}
                              </Badge>
                            ))
                          ) : (
                            <Text
                              size='sm'
                              c={currentThemeConfig.mutedTextColor}
                            >
                              N/A
                            </Text>
                          )}
                        </Group>
                      </Stack>
                    </Paper>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Paper
                      p='md'
                      withBorder
                      radius='md'
                      style={{
                        color: currentThemeConfig.color,
                        borderColor: currentThemeConfig.borderColor
                      }}
                    >
                      <Stack gap='xs'>
                        <Group gap='xs' align='center'>
                          <IconBuildingBank
                            size={16}
                            color={currentThemeConfig.iconColor}
                          />
                          <Text
                            size='xs'
                            c={currentThemeConfig.mutedTextColor}
                            fw={500}
                          >
                            Department
                          </Text>
                        </Group>

                        {details.department?.departmentName ? (
                          <Badge
                            size='md'
                            variant='outline'
                            color={currentThemeConfig.accentColor}
                          >
                            {details.department.departmentName}
                          </Badge>
                        ) : (
                          <Text size='sm' c={currentThemeConfig.mutedTextColor}>
                            N/A
                          </Text>
                        )}
                      </Stack>
                    </Paper>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value='address' p={isMobile ? 'md' : 'lg'}>
              <Grid>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Paper
                    p='md'
                    withBorder
                    radius='md'
                    style={{
                      color: currentThemeConfig.color,
                      borderColor: currentThemeConfig.borderColor
                    }}
                  >
                    <Stack gap='xs'>
                      <Group gap='xs'>
                        <IconMapPin
                          size={18}
                          color={currentThemeConfig.iconColor}
                        />
                        <Text
                          size='sm'
                          fw={600}
                          c={currentThemeConfig.mutedTextColor}
                        >
                          Present Address
                        </Text>
                      </Group>
                      <Text size='sm'>{details.presentAddress || 'N/A'}</Text>
                    </Stack>
                  </Paper>
                </Grid.Col>

                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <Paper
                    p='md'
                    withBorder
                    radius='md'
                    style={{
                      color: currentThemeConfig.color,
                      borderColor: currentThemeConfig.borderColor
                    }}
                  >
                    <Stack gap='xs'>
                      <Group gap='xs'>
                        <IconMapPin
                          size={18}
                          color={currentThemeConfig.successColor}
                        />
                        <Text
                          size='sm'
                          fw={600}
                          c={currentThemeConfig.mutedTextColor}
                        >
                          Permanent Address
                        </Text>
                      </Group>
                      <Text size='sm'>{details.permanentAddress || 'N/A'}</Text>
                    </Stack>
                  </Paper>
                </Grid.Col>
              </Grid>
            </Tabs.Panel>

            <Tabs.Panel value='bankDetails' p={isMobile ? 'md' : 'lg'}>
              <Stack gap='md'>
                <Grid gutter='md'>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Paper
                      p='md'
                      withBorder
                      radius='md'
                      style={{
                        color: currentThemeConfig.color,
                        borderColor: currentThemeConfig.borderColor
                      }}
                    >
                      <Stack gap='xs'>
                        <Group gap='xs' align='center'>
                          <IconBuildingBank
                            size={16}
                            color={currentThemeConfig.iconColor}
                          />
                          <Text
                            size='xs'
                            c={currentThemeConfig.mutedTextColor}
                            fw={500}
                          >
                            Account Number
                          </Text>
                        </Group>
                        <Text size='sm' fw={500}>
                          {details.bankDetailsInfo?.accountNumber || 'N/A'}
                        </Text>
                      </Stack>
                    </Paper>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Paper
                      p='md'
                      withBorder
                      radius='md'
                      style={{
                        color: currentThemeConfig.color,
                        borderColor: currentThemeConfig.borderColor
                      }}
                    >
                      <Stack gap='xs'>
                        <Group gap='xs' align='center'>
                          <IconUser
                            size={16}
                            color={currentThemeConfig.iconColor}
                          />
                          <Text
                            size='xs'
                            c={currentThemeConfig.mutedTextColor}
                            fw={500}
                          >
                            Account Holder Name
                          </Text>
                        </Group>
                        <Text size='sm' fw={500}>
                          {details.bankDetailsInfo?.accountHolderName || 'N/A'}
                        </Text>
                      </Stack>
                    </Paper>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Paper
                      p='md'
                      withBorder
                      radius='md'
                      style={{
                        color: currentThemeConfig.color,
                        borderColor: currentThemeConfig.borderColor
                      }}
                    >
                      <Stack gap='xs'>
                        <Group gap='xs' align='center'>
                          <IconBuildingBank
                            size={16}
                            color={currentThemeConfig.iconColor}
                          />
                          <Text
                            size='xs'
                            c={currentThemeConfig.mutedTextColor}
                            fw={500}
                          >
                            Bank Name
                          </Text>
                        </Group>
                        <Text size='sm' fw={500}>
                          {details.bankDetailsInfo?.bankName || 'N/A'}
                        </Text>
                      </Stack>
                    </Paper>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Paper
                      p='md'
                      withBorder
                      radius='md'
                      style={{
                        color: currentThemeConfig.color,
                        borderColor: currentThemeConfig.borderColor
                      }}
                    >
                      <Stack gap='xs'>
                        <Group gap='xs' align='center'>
                          <IconBuildingBank
                            size={16}
                            color={currentThemeConfig.iconColor}
                          />
                          <Text
                            size='xs'
                            c={currentThemeConfig.mutedTextColor}
                            fw={500}
                          >
                            IFSC Code
                          </Text>
                        </Group>
                        <Text size='sm' fw={500}>
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
