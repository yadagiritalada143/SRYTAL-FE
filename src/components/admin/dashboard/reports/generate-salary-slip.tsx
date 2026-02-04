import { Container, Stack, Card, Title } from '@mantine/core';

const GenerateSalarySlipReport = () => {
  return (
    <Container size="lg" py="xl">
      <Stack gap="md">
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={2} className="text-center">
              Generate Salary Slip
            </Title>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};

export default GenerateSalarySlipReport;
