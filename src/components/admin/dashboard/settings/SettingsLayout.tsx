import { Tabs, Container, Box } from '@mantine/core';
import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getThemeConfig } from '../../../../utils/common/theme-utils';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { themeAtom } from '../../../../atoms/theme';
import {
  IconBriefcase,
  IconDroplet,
  IconMessage2,
  IconUserCheck
} from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';

const SettingsLayout = () => {
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');

  const currentTab = location.pathname.split('/').pop();

  return (
    <Box pt={{ base: 'xl', sm: 'md' }}>
      <Container size="md" mt={{ base: 'xl', sm: 'lg' }} mb="lg">
        <Tabs
          value={currentTab}
          onChange={value => navigate(value || 'blood-groups')}
          variant="default"
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
          <Tabs.List mb="md">
            <Tabs.Tab
              value="blood-groups"
              leftSection={<IconDroplet size={16} stroke={1.8} />}
            >
              Blood Groups
            </Tabs.Tab>

            <Tabs.Tab
              value="employment-types"
              leftSection={<IconBriefcase size={16} stroke={1.8} />}
            >
              Employment Types
            </Tabs.Tab>

            <Tabs.Tab
              value="employment-roles"
              leftSection={<IconUserCheck size={16} stroke={1.8} />}
            >
              Employment Roles
            </Tabs.Tab>

            <Tabs.Tab
              value="feedback"
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
