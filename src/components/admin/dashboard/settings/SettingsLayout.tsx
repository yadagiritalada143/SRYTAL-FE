import { Tabs, Container, Box } from '@mantine/core';
import { useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getThemeConfig } from '../../../../utils/common/theme-utils';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { themeAtom } from '../../../../atoms/theme';

const SettingsLayout = () => {
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);
  const location = useLocation();
  const navigate = useNavigate();

  const currentTab = location.pathname.split('/').pop();

  return (
    <Box pt={{ base: 'xl', sm: 'md' }}>
      <Container size="md" mt={{ base: 'xl', sm: 'lg' }} mb="lg">
        <Tabs
          value={currentTab}
          onChange={value => navigate(value || 'blood-groups')}
          variant="default"
          color={currentThemeConfig.button.color}
          mb="xs"
        >
          <Tabs.List>
            <Tabs.Tab value="blood-groups">Blood Groups</Tabs.Tab>
            <Tabs.Tab value="employment-types">Employment Types</Tabs.Tab>
            <Tabs.Tab value="employment-roles">Employment Roles</Tabs.Tab>
            <Tabs.Tab value="feedback">Feedback Attributes</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Outlet />
      </Container>
    </Box>
  );
};

export default SettingsLayout;
