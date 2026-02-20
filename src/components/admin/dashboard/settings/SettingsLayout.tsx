import { Tabs, Container } from '@mantine/core';
import { Outlet } from 'react-router-dom';

const SettingsLayout = () => {
  return (
    <Container size="lg" mt="lg" mb="lg">
      <Tabs value="feedback" variant="outline" mb="xs">
        <Tabs.List>
          <Tabs.Tab value="feedback">Feedback</Tabs.Tab>
        </Tabs.List>
      </Tabs>
      <Outlet />
    </Container>
  );
};

export default SettingsLayout;
