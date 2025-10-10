import { useState } from 'react';
import { Button, Textarea, Card, Stack, Group, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconPlus, IconChecklist } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import { OrganizationConfig } from '../../../../interfaces/organization';
import { addTasksByAdmin } from '../../../../services/admin-services';
import { useCustomToast } from '../../../../utils/common/toast';

const AddTasksPackage = ({
  packageId,
  required = false,
  fetchPackageDetails
}: {
  organizationConfig: OrganizationConfig;
  user: any;
  packageId: string;
  required: boolean;
  fetchPackageDetails: () => void;
}) => {
  const { showSuccessToast } = useCustomToast();
  const [newTasks, setNewTasks] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  const handleAddTasks = async () => {
    if (required && !newTasks.trim()) {
      setError('Task description is required');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await addTasksByAdmin(packageId, newTasks.trim());
      showSuccessToast('Task added successfully!');
      setNewTasks('');
      fetchPackageDetails();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to add task');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card shadow="sm" p={isMobile ? 'md' : 'lg'} radius="md" withBorder>
      <Stack gap="md">
        <Group gap="xs">
          <IconChecklist size={20} />
          <Text size="lg" fw={600}>
            Add New Task
          </Text>
        </Group>

        <Textarea
          label="Task Description"
          placeholder="Enter task details..."
          value={newTasks}
          onChange={e => {
            setNewTasks(e.target.value);
            if (error) setError('');
          }}
          error={error}
          minRows={4}
          size="md"
          required={required}
        />

        <Group justify="flex-end">
          <Button
            onClick={handleAddTasks}
            disabled={isLoading || (required && !newTasks.trim())}
            leftSection={<IconPlus size={16} />}
            fullWidth={isSmallMobile}
          >
            {isLoading ? 'Adding...' : 'Add Task'}
          </Button>
        </Group>
      </Stack>
    </Card>
  );
};

export default AddTasksPackage;
