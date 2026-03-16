import React from 'react';
import { Card, Stack, Group, SimpleGrid, Text } from '@mantine/core';
import {
  IconUser,
  IconMail,
  IconPhone,
  IconCalendar,
  IconBriefcase
} from '@tabler/icons-react';
import { useAppTheme } from '@hooks/use-app-theme';
import { useMediaQuery } from '@mantine/hooks';

interface InfoCardProps {
  employeeDetails: any;
  employeeInfoItems: { label: string; value: string }[];
}

export const InfoCard: React.FC<InfoCardProps> = ({ employeeInfoItems }) => {
  const { themeConfig: currentThemeConfig } = useAppTheme();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const getInfoIcon = (label: string) => {
    const iconSize = isMobile ? 14 : 16;
    switch (label) {
      case 'Name':
        return <IconUser size={iconSize} />;
      case 'Email':
        return <IconMail size={iconSize} />;
      case 'Phone':
        return <IconPhone size={iconSize} />;
      case 'Join Date':
        return <IconCalendar size={iconSize} />;
      case 'Role':
        return <IconBriefcase size={iconSize} />;
      default:
        return <IconUser size={iconSize} />;
    }
  };

  return (
    <Card
      shadow='lg'
      radius='md'
      withBorder
      p={isMobile ? 'md' : 'lg'}
      style={{
        backgroundColor: currentThemeConfig.backgroundColor,
        borderColor: currentThemeConfig.borderColor
      }}
    >
      <Stack gap={isMobile ? 'md' : 'lg'}>
        <Group gap='sm'>
          <IconUser
            size={isMobile ? 18 : 20}
            color={currentThemeConfig.button.color}
          />
          <Text
            size={isMobile ? 'md' : 'lg'}
            fw={600}
            c={currentThemeConfig.color}
          >
            Employee Information
          </Text>
        </Group>

        <SimpleGrid
          cols={{ base: 1, xs: 1, sm: 2, md: 2, lg: 3 }}
          spacing={isMobile ? 'md' : 'lg'}
        >
          {employeeInfoItems.map((item, index) => (
            <Card
              key={index}
              radius='md'
              p={isMobile ? 'sm' : 'md'}
              style={{
                border: `1px solid ${currentThemeConfig.borderColor}`
              }}
            >
              <Stack gap='xs'>
                <Group gap='xs'>
                  {getInfoIcon(item.label)}
                  <Text size={isMobile ? 'xs' : 'sm'} c='dimmed'>
                    {item.label}
                  </Text>
                </Group>
                <Text
                  size={isMobile ? 'sm' : 'md'}
                  fw={500}
                  c={currentThemeConfig.color}
                  className='break-words'
                >
                  {item.value || '-'}
                </Text>
              </Stack>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </Card>
  );
};
