import { Box, Stack, Group, Text, useMantineTheme } from '@mantine/core';
import { Mentee } from '../../../interfaces/mentee';

interface Props {
  mentee: Mentee;
  tasksCount: number;
}

const MenteeDetails = ({ mentee, tasksCount }: Props) => {
  const theme = useMantineTheme();

  const details = [
    { label: 'EMP-ID', value: mentee.empId },
    { label: 'Name', value: mentee.name },
    { label: 'Email', value: mentee.email },
    { label: 'Joining Date', value: mentee.joiningDate },
    { label: 'Total Tasks Assigned', value: tasksCount }
  ];

  return (
    <Box
      mb="xl"
      p="md"
      style={{
        background: theme.colors.gray[0],
        borderRadius: theme.radius.md,
        color: theme.colors.dark[4]
      }}
    >
      <Stack gap="sm">
        {details.map((item, idx) => (
          <Group key={idx} gap="md" grow align="start">
            <Text fw={600} c="dimmed" className="sm:w-1/3 w-1/2">
              {item.label}
            </Text>
            <Text className="break-all w-2/3" c="dark">
              : {item.value}
            </Text>
          </Group>
        ))}
      </Stack>
    </Box>
  );
};

export default MenteeDetails;
