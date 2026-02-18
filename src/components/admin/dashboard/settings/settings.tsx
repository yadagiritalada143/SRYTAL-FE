import { Tabs, Card, Container } from '@mantine/core';
import { IconMessage } from '@tabler/icons-react';
import FeedbackForm from './feedback-form';

export default function SettingsPage() {
  return (
    <Container size="lg" py="md" mt="xl">
      <Card shadow="sm" radius="md" withBorder p="lg" mt="xl">
        <Tabs defaultValue="feedback" variant="outline">
          <Tabs.List>
            <Tabs.Tab value="feedback" leftSection={<IconMessage size={16} />}>
              Feedback
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="feedback" pt="md">
            <FeedbackForm />
          </Tabs.Panel>
        </Tabs>
      </Card>
    </Container>
  );
}
