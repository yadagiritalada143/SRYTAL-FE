import { Grid, Select, Textarea, Button } from '@mantine/core';
import { DateInput } from '@mantine/dates';

interface Props {
  newTask: {
    title: string | null;
    description: string;
    startDate: Date | null;
    endDate: Date | null;
    priority: string | null;
  };
  setNewTask: React.Dispatch<any>;
  onAssign: () => void;
  buttonColor: string;
  buttonTextColor: string;
}

const AssignNewTaskForm = ({
  newTask,
  setNewTask,
  onAssign,
  buttonColor,
  buttonTextColor
}: Props) => {
  return (
    <div>
      <h3 className="text-lg font-bold underline mb-2">Assign New Task</h3>
      <Select
        label="Task"
        placeholder="Select Option"
        data={['Unit Testing', 'React Time Sheet', 'API Integration']}
        value={newTask.title}
        onChange={val => setNewTask({ ...newTask, title: val || '' })}
      />

      <Textarea
        label="Description"
        placeholder="Enter task description"
        value={newTask.description}
        onChange={e =>
          setNewTask({ ...newTask, description: e.currentTarget.value })
        }
      />

      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <DateInput
            label="Start Date"
            value={newTask.startDate}
            onChange={date => setNewTask({ ...newTask, startDate: date })}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <DateInput
            label="End Date"
            value={newTask.endDate}
            onChange={date => setNewTask({ ...newTask, endDate: date })}
          />
        </Grid.Col>
      </Grid>

      <Grid>
        <Grid.Col span={{ base: 12, sm: 6 }}>
          <Select
            label="Priority"
            placeholder="Select Option"
            data={['High', 'Medium', 'Low']}
            value={newTask.priority}
            onChange={val => setNewTask({ ...newTask, priority: val || '' })}
          />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6 }} className="flex items-end">
          <Button
            fullWidth
            radius="md"
            variant="filled"
            style={{ backgroundColor: buttonColor, color: buttonTextColor }}
            onClick={onAssign}
            disabled={!newTask.title || !newTask.priority}
          >
            Assign
          </Button>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default AssignNewTaskForm;
