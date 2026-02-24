import { Tabs, Container, Box } from '@mantine/core';
import { Outlet } from 'react-router-dom';

const SettingsLayout = () => {
  return (
    <Box pt={{ base: 'xl', sm: 'md' }}>
      <Container size="md" mt={{ base: 'xl', sm: 'lg' }} mb="lg">
        <Tabs value="feedback" variant="outline" mb="xs">
          <Tabs.List>
            <Tabs.Tab value="feedback">Feedback Attributes</Tabs.Tab>
          </Tabs.List>
        </Tabs>
        <Outlet />
      </Container>
    </Box>
  );
};

export default SettingsLayout;
