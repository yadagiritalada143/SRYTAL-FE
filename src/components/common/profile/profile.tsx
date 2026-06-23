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
  Title,
  Box,
  ThemeIcon
} from '@mantine/core';
import type { EmployeeInterface } from '@interfaces/employee';
import ProfileImageUploader from '../profile-image/ProfileImage';
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
  IconUserCog,
  IconCreditCard,
  IconAddressBook,
  IconCalendarPlus
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { useState } from 'react';

/** Convert a #rrggbb hex to an rgba() string with the given alpha. */
const hexToRgba = (hex: string, alpha: number): string => {
  if (!hex || !hex.startsWith('#')) return hex;
  let h = hex.slice(1);
  if (h.length === 3)
    h = h
      .split('')
      .map(c => c + c)
      .join('');
  const num = parseInt(h, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/** A single label/value cell with a tinted icon chip. */
const InfoTile: React.FC<{
  icon: React.ReactNode;
  label: string;
  value?: React.ReactNode;
  mutedTextColor: string;
  iconColor: string;
  borderColor: string;
}> = ({ icon, label, value, mutedTextColor, iconColor, borderColor }) => (
  <Paper p='sm' radius='md' withBorder style={{ borderColor, height: '100%' }}>
    <Group gap='sm' wrap='nowrap' align='flex-start'>
      <Box
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 36,
          height: 36,
          flexShrink: 0,
          borderRadius: 10,
          color: iconColor,
          backgroundColor: hexToRgba(iconColor, 0.12)
        }}
      >
        {icon}
      </Box>
      <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
        <Text
          size='xs'
          c={mutedTextColor}
          fw={600}
          tt='uppercase'
          style={{ letterSpacing: 0.4 }}
        >
          {label}
        </Text>
        {typeof value === 'string' || value === undefined ? (
          <Text size='sm' fw={600} lineClamp={1}>
            {value || '—'}
          </Text>
        ) : (
          value
        )}
      </Stack>
    </Group>
  </Paper>
);

/** A card with a consistent icon + title header. */
const SectionCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  color: string;
  borderColor: string;
  children: React.ReactNode;
}> = ({ title, icon, iconColor, color, borderColor, children }) => (
  <Card
    shadow='sm'
    p='lg'
    radius='lg'
    withBorder
    style={{ color, borderColor }}
  >
    <Group gap='sm' mb='md'>
      <ThemeIcon
        variant='light'
        size={34}
        radius='md'
        style={{
          color: iconColor,
          backgroundColor: hexToRgba(iconColor, 0.12)
        }}
      >
        {icon}
      </ThemeIcon>
      <Title order={4} fw={600}>
        {title}
      </Title>
    </Group>
    <Divider mb='md' style={{ borderColor }} />
    {children}
  </Card>
);

const Profile = ({ details }: { details: EmployeeInterface }) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { themeConfig, isDarkTheme } = useAppTheme();
  const [activeTab, setActiveTab] = useState<string | null>('employment');

  const {
    color,
    borderColor,
    mutedTextColor,
    accentColor,
    iconColor,
    successColor,
    cardBackground
  } = themeConfig;

  const formatDate = (isoDate: string): string => {
    if (!isoDate) return '';
    try {
      const date = new Date(isoDate);
      if (isNaN(date.getTime())) return isoDate;
      return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
      });
    } catch {
      return isoDate;
    }
  };

  const fullName = [details.firstName, details.lastName]
    .filter(Boolean)
    .join(' ');

  // Quick-glance chips shown in the header.
  const headerChips = [
    { icon: <IconMail size={14} />, value: details.email },
    { icon: <IconPhone size={14} />, value: details.mobileNumber },
    {
      icon: <IconCalendarPlus size={14} />,
      value: details.dateOfJoining
        ? `Joined ${formatDate(details.dateOfJoining)}`
        : undefined
    }
  ].filter(c => c.value);

  const tabStyles = {
    list: {
      flexWrap: isMobile ? ('wrap' as const) : ('nowrap' as const),
      gap: isMobile ? 8 : 4
    },
    tab: {
      fontWeight: 500,
      transition: 'color 0.2s ease',
      ...(isDarkTheme && {
        color,
        '&[data-active]': { color: '#ffffff' },
        '&[data-active] svg': { color: '#ffffff' }
      })
    }
  };

  return (
    <Container size='lg' py='xl' px={isMobile ? 'xs' : 'md'}>
      <Stack gap='lg'>
        {/* ===== Hero header ===== */}
        <Card
          shadow='sm'
          p={0}
          radius='lg'
          withBorder
          style={{ color, borderColor, overflow: 'hidden' }}
        >
          {/* Gradient cover banner */}
          <Box
            style={{
              height: isMobile ? 96 : 120,
              position: 'relative',
              background: `linear-gradient(120deg, ${accentColor} 0%, ${iconColor} 100%)`
            }}
          >
            <Box
              style={{
                position: 'absolute',
                top: -40,
                right: -20,
                width: 160,
                height: 160,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)'
              }}
            />
            <Box
              style={{
                position: 'absolute',
                bottom: -50,
                right: 120,
                width: 110,
                height: 110,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)'
              }}
            />
          </Box>

          {/* Identity row */}
          <Box px={isMobile ? 'md' : 'xl'} pb='lg'>
            <Group
              align='flex-end'
              justify='space-between'
              wrap={isMobile ? 'wrap' : 'nowrap'}
              gap='md'
              style={{ marginTop: isMobile ? -56 : -48 }}
            >
              <Group
                align={isMobile ? 'center' : 'flex-end'}
                gap='md'
                wrap='nowrap'
                style={{
                  flexDirection: isMobile ? 'column' : 'row',
                  width: isMobile ? '100%' : 'auto'
                }}
              >
                {/* Avatar */}
                <Box
                  style={{
                    borderRadius: '50%',
                    padding: 4,
                    backgroundColor: cardBackground,
                    boxShadow: '0 6px 20px rgba(0,0,0,0.18)'
                  }}
                >
                  <ProfileImageUploader />
                </Box>

                <Stack
                  gap={6}
                  pb={isMobile ? 0 : 'sm'}
                  align={isMobile ? 'center' : 'flex-start'}
                >
                  <Title
                    order={isMobile ? 3 : 2}
                    fw={700}
                    ta={isMobile ? 'center' : 'left'}
                  >
                    {fullName || 'Unnamed User'}
                  </Title>
                  <Group gap='sm' justify={isMobile ? 'center' : 'flex-start'}>
                    {details.userRole && (
                      <Badge
                        size='md'
                        variant='light'
                        color={accentColor}
                        leftSection={<IconUserCog size={12} />}
                      >
                        {details.userRole}
                      </Badge>
                    )}
                    {details.employeeId && (
                      <Group gap={4}>
                        <IconId size={15} color={mutedTextColor} />
                        <Text size='sm' c={mutedTextColor} fw={500}>
                          {details.employeeId}
                        </Text>
                      </Group>
                    )}
                  </Group>
                </Stack>
              </Group>
            </Group>

            {/* Quick contact chips */}
            {headerChips.length > 0 && (
              <Group
                gap='sm'
                mt='md'
                justify={isMobile ? 'center' : 'flex-start'}
              >
                {headerChips.map((chip, i) => (
                  <Group
                    key={i}
                    gap={6}
                    px='sm'
                    py={4}
                    wrap='nowrap'
                    style={{
                      border: `1px solid ${borderColor}`,
                      borderRadius: 999,
                      color: mutedTextColor,
                      maxWidth: '100%'
                    }}
                  >
                    <Box style={{ color: iconColor, display: 'flex' }}>
                      {chip.icon}
                    </Box>
                    <Text size='xs' fw={500} lineClamp={1}>
                      {chip.value}
                    </Text>
                  </Group>
                ))}
              </Group>
            )}
          </Box>
        </Card>

        {/* ===== Personal information ===== */}
        <SectionCard
          title='Personal Information'
          icon={<IconUser size={18} />}
          iconColor={accentColor}
          color={color}
          borderColor={borderColor}
        >
          <Grid gutter='md'>
            {[
              {
                icon: <IconUser size={18} />,
                label: 'First Name',
                value: details.firstName
              },
              {
                icon: <IconUser size={18} />,
                label: 'Last Name',
                value: details.lastName
              },
              {
                icon: <IconCalendar size={18} />,
                label: 'Date of Birth',
                value: formatDate(details.dateOfBirth)
              },
              {
                icon: <IconDroplet size={18} />,
                label: 'Blood Group',
                value: details.bloodGroup?.type
              },
              {
                icon: <IconMail size={18} />,
                label: 'Email',
                value: details.email
              },
              {
                icon: <IconPhone size={18} />,
                label: 'Mobile',
                value: details.mobileNumber
              },
              {
                icon: <IconFingerprint size={18} />,
                label: 'Aadhar Number',
                value: details.aadharNumber
              },
              {
                icon: <IconId size={18} />,
                label: 'PAN Card Number',
                value: details.panCardNumber
              },
              {
                icon: <IconFingerprint size={18} />,
                label: 'UAN Number',
                value: details.uanNumber
              },
              {
                icon: <IconCalendar size={18} />,
                label: 'Date of Joining',
                value: formatDate(details.dateOfJoining)
              }
            ].map(item => (
              <Grid.Col key={item.label} span={{ base: 12, xs: 6, md: 4 }}>
                <InfoTile
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                  mutedTextColor={mutedTextColor}
                  iconColor={iconColor}
                  borderColor={borderColor}
                />
              </Grid.Col>
            ))}
          </Grid>
        </SectionCard>

        {/* ===== Tabbed details ===== */}
        <Card
          shadow='sm'
          p='lg'
          radius='lg'
          withBorder
          style={{ color, borderColor }}
        >
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            variant='default'
            classNames={{ tab: 'settings-tab' }}
            styles={tabStyles}
          >
            <Tabs.List mb='lg'>
              <Tabs.Tab
                value='employment'
                leftSection={<IconBriefcase size={16} stroke={1.8} />}
              >
                Employment
              </Tabs.Tab>
              <Tabs.Tab
                value='address'
                leftSection={<IconAddressBook size={16} stroke={1.8} />}
              >
                Address
              </Tabs.Tab>
              <Tabs.Tab
                value='bankDetails'
                leftSection={<IconCreditCard size={16} stroke={1.8} />}
              >
                Bank Details
              </Tabs.Tab>
            </Tabs.List>

            {/* Employment */}
            <Tabs.Panel value='employment'>
              <Grid gutter='md'>
                <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                  <InfoTile
                    icon={<IconBriefcase size={18} />}
                    label='Employment Type'
                    mutedTextColor={mutedTextColor}
                    iconColor={iconColor}
                    borderColor={borderColor}
                    value={
                      details.employmentType?.employmentType ? (
                        <Badge
                          size='md'
                          variant='light'
                          color={successColor}
                          w='fit-content'
                        >
                          {details.employmentType.employmentType}
                        </Badge>
                      ) : undefined
                    }
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
                  <InfoTile
                    icon={<IconBuildingBank size={18} />}
                    label='Department'
                    mutedTextColor={mutedTextColor}
                    iconColor={iconColor}
                    borderColor={borderColor}
                    value={
                      details.department?.departmentName ? (
                        <Badge
                          size='md'
                          variant='outline'
                          color={accentColor}
                          w='fit-content'
                        >
                          {details.department.departmentName}
                        </Badge>
                      ) : undefined
                    }
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <InfoTile
                    icon={<IconUserCog size={18} />}
                    label='Designations'
                    mutedTextColor={mutedTextColor}
                    iconColor={iconColor}
                    borderColor={borderColor}
                    value={
                      details.employeeRole &&
                      details.employeeRole.length > 0 ? (
                        <Group gap={6} wrap='wrap'>
                          {details.employeeRole.map(role => (
                            <Badge
                              key={role._id}
                              size='sm'
                              variant='outline'
                              color={accentColor}
                            >
                              {role.designation}
                            </Badge>
                          ))}
                        </Group>
                      ) : undefined
                    }
                  />
                </Grid.Col>
              </Grid>
            </Tabs.Panel>

            {/* Address */}
            <Tabs.Panel value='address'>
              <Grid gutter='md'>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <InfoTile
                    icon={<IconMapPin size={18} />}
                    label='Present Address'
                    value={details.presentAddress}
                    mutedTextColor={mutedTextColor}
                    iconColor={iconColor}
                    borderColor={borderColor}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6 }}>
                  <InfoTile
                    icon={<IconMapPin size={18} />}
                    label='Permanent Address'
                    value={details.permanentAddress}
                    mutedTextColor={mutedTextColor}
                    iconColor={iconColor}
                    borderColor={borderColor}
                  />
                </Grid.Col>
              </Grid>
            </Tabs.Panel>

            {/* Bank Details */}
            <Tabs.Panel value='bankDetails'>
              <Grid gutter='md'>
                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                  <InfoTile
                    icon={<IconUser size={18} />}
                    label='Account Holder'
                    value={details.bankDetailsInfo?.accountHolderName}
                    mutedTextColor={mutedTextColor}
                    iconColor={iconColor}
                    borderColor={borderColor}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                  <InfoTile
                    icon={<IconCreditCard size={18} />}
                    label='Account Number'
                    value={details.bankDetailsInfo?.accountNumber}
                    mutedTextColor={mutedTextColor}
                    iconColor={iconColor}
                    borderColor={borderColor}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                  <InfoTile
                    icon={<IconBuildingBank size={18} />}
                    label='Bank Name'
                    value={details.bankDetailsInfo?.bankName}
                    mutedTextColor={mutedTextColor}
                    iconColor={iconColor}
                    borderColor={borderColor}
                  />
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
                  <InfoTile
                    icon={<IconBuildingBank size={18} />}
                    label='IFSC Code'
                    value={details.bankDetailsInfo?.ifscCode}
                    mutedTextColor={mutedTextColor}
                    iconColor={iconColor}
                    borderColor={borderColor}
                  />
                </Grid.Col>
              </Grid>
            </Tabs.Panel>
          </Tabs>
        </Card>
      </Stack>
    </Container>
  );
};

export default Profile;
