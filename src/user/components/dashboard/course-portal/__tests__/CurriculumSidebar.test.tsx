import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import CurriculumSidebar from '../CurriculumSidebar';
import { AssignedModule } from '@interfaces/course-assignment';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      mutedTextColor: '#868e96',
      primaryColor: '#1971c2',
      accentColor: '#1971c2',
      successColor: '#40c057',
      cardBackground: '#ffffff',
      borderColor: '#dee2e6',
      headerBackgroundColor: '#f1f3f5'
    },
    isDarkTheme: false
  })
}));

const makeTask = (overrides: any = {}) => ({
  _id: 't1',
  taskName: 'Intro to hooks',
  taskDescription: '<p>Watch the video.</p>',
  type: 'FILE',
  isCompleted: false,
  ...overrides
});

const makeModule = (
  overrides: Partial<AssignedModule> = {}
): AssignedModule => ({
  _id: 'm1',
  moduleName: 'React Fundamentals',
  moduleDescription: 'Core concepts',
  tasks: [
    makeTask({ _id: 't1', taskName: 'First task' }),
    makeTask({
      _id: 't2',
      taskName: 'Second task',
      type: 'LINK',
      isCompleted: true
    })
  ],
  totalTasks: 2,
  completedTasks: 1,
  ...overrides
});

const renderSidebar = (
  modules: AssignedModule[],
  props: Partial<Parameters<typeof CurriculumSidebar>[0]> = {}
) => {
  const onSelectTask = jest.fn();
  const onOpenModulesChange = jest.fn();

  const utils = render(
    <MantineProvider>
      <CurriculumSidebar
        modules={modules}
        activeTaskId={props.activeTaskId}
        openModuleIds={props.openModuleIds ?? []}
        onOpenModulesChange={props.onOpenModulesChange ?? onOpenModulesChange}
        onSelectTask={props.onSelectTask ?? onSelectTask}
      />
    </MantineProvider>
  );

  return {
    onSelectTask,
    onOpenModulesChange,
    ...utils
  };
};

describe('CurriculumSidebar', () => {
  it('renders module names with numbering and completion badges', () => {
    renderSidebar(
      [makeModule(), makeModule({ _id: 'm2', moduleName: 'Advanced' })],
      {
        openModuleIds: ['m1', 'm2']
      }
    );

    expect(screen.getByText('1. React Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('2. Advanced')).toBeInTheDocument();
    expect(screen.getAllByText('1/2').length).toBe(2);
  });

  it('shows task names with their type labels', () => {
    renderSidebar([makeModule()], { openModuleIds: ['m1'] });

    expect(screen.getByText('First task')).toBeInTheDocument();
    expect(screen.getByText('Second task')).toBeInTheDocument();
    expect(screen.getAllByText('File').length).toBe(1);
    expect(screen.getAllByText('Link').length).toBe(1);
  });

  it('shows a placeholder for modules with no content', () => {
    renderSidebar(
      [makeModule({ tasks: [], totalTasks: 0, completedTasks: 0 })],
      {
        openModuleIds: ['m1']
      }
    );

    expect(
      screen.getByText('No content in this module yet.')
    ).toBeInTheDocument();
  });

  it('renders module headers for closed modules', () => {
    renderSidebar([makeModule()], { openModuleIds: [] });

    expect(screen.getByText('1. React Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('1/2')).toBeInTheDocument();
  });

  it('selects a task with its module id on click', () => {
    const { onSelectTask } = renderSidebar([makeModule()], {
      openModuleIds: ['m1']
    });

    fireEvent.click(screen.getByText('First task'));

    expect(onSelectTask).toHaveBeenCalledWith(
      expect.objectContaining({ _id: 't1', taskName: 'First task' }),
      'm1'
    );
    expect(onSelectTask).not.toHaveBeenCalledWith(
      expect.objectContaining({ _id: 't2' }),
      expect.any(String)
    );
  });

  it('reports module toggle changes to the parent', () => {
    const { onOpenModulesChange } = renderSidebar([makeModule()], {
      openModuleIds: []
    });

    fireEvent.click(screen.getByText('1. React Fundamentals'));

    expect(onOpenModulesChange).toHaveBeenCalled();
    expect(onOpenModulesChange.mock.calls[0][0]).toContain('m1');
  });
});
