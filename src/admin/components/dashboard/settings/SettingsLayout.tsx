import { Tabs, Container, Box } from '@mantine/core';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  IconBriefcase,
  IconDroplet,
  IconMessage2,
  IconUserCheck,
  IconBuildingBank
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { useAppTheme } from '@hooks/use-app-theme';

const SettingsLayout = () => {
  const location = useLocation();
  const { themeConfig: currentThemeConfig, isDarkTheme } = useAppTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const currentTab = location.pathname.split('/').pop();

  return (
    <Box pt={{ base: 'xl', sm: 'md' }}>
      <Container size='md' mt={{ base: 'xl', sm: 'lg' }} mb='lg'>
        <Tabs
          value={currentTab}
          onChange={value => navigate(value || 'blood-groups')}
          variant='default'
          color={currentThemeConfig.button.color}
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
              value='blood-groups'
              leftSection={<IconDroplet size={16} stroke={1.8} />}
            >
              Blood Groups
            </Tabs.Tab>

            <Tabs.Tab
              value='employment-types'
              leftSection={<IconBriefcase size={16} stroke={1.8} />}
            >
              Employment Types
            </Tabs.Tab>

            <Tabs.Tab
              value='employment-roles'
              leftSection={<IconUserCheck size={16} stroke={1.8} />}
            >
              Employment Roles
            </Tabs.Tab>
            <Tabs.Tab
              value='department-names'
              leftSection={<IconBuildingBank size={16} stroke={1.8} />}
            >
              Department
            </Tabs.Tab>

            <Tabs.Tab
              value='feedback'
              leftSection={<IconMessage2 size={16} stroke={1.8} />}
            >
              Feedback Attributes
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Outlet />
      </Container>
    </Box>
  );
};

export default SettingsLayout;
