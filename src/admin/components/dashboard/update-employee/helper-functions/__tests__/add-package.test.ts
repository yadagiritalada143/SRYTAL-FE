import {
  fetchInitialData,
  loadEmployeePackages,
  formatSubmitData,
  getEmployeeInfoItems
} from '../add-package';

const mockGetEmployeeDetails = jest.fn();
const mockGetEmployeePackages = jest.fn();

jest.mock('@services/admin-services', () => ({
  getEmployeeDetailsByAdmin: (...args: any[]) => mockGetEmployeeDetails(...args),
  getEmployeePackagesByAdmin: (...args: any[]) =>
    mockGetEmployeePackages(...args)
}));

describe('fetchInitialData', () => {
  const setEmployeeDetails = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads employee details and stores them', async () => {
    const details = { firstName: 'John', email: 'john@test.com' };
    mockGetEmployeeDetails.mockResolvedValue(details);

    await fetchInitialData('emp1', setEmployeeDetails);

    expect(mockGetEmployeeDetails).toHaveBeenCalledWith('emp1');
    expect(setEmployeeDetails).toHaveBeenCalledWith(details);
  });

  it('throws the backend message when loading fails', async () => {
    mockGetEmployeeDetails.mockRejectedValue({
      response: { data: { message: 'No employee found' } }
    });

    await expect(fetchInitialData('emp1', setEmployeeDetails)).rejects.toThrow(
      'No employee found'
    );
  });

  it('falls back to a default message', async () => {
    mockGetEmployeeDetails.mockRejectedValue(new Error('boom'));

    await expect(fetchInitialData('emp1', setEmployeeDetails)).rejects.toThrow(
      'Failed to load data'
    );
  });
});

describe('loadEmployeePackages', () => {
  const reset = jest.fn();
  const setSelectedPackagesData = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('formats packages, resets the form and populates selected tasks', async () => {
    let selectedTasks: Record<string, Set<string>> = {};
    const setSelectedTasks = jest.fn(
      (
        updater: (
          prev: Record<string, Set<string>>
        ) => Record<string, Set<string>>
      ) => {
        selectedTasks = updater(selectedTasks);
      }
    );

    mockGetEmployeePackages.mockResolvedValue([
      {
        packageId: { _id: 'pkg1', title: 'Onboarding' },
        tasks: [
          { taskId: { _id: 't1', title: 'Intro' } },
          { taskId: { _id: 't2', title: 'Setup' } },
          { taskId: null }
        ]
      },
      {
        packageId: { _id: 'pkg2', title: 'Compliance' },
        tasks: []
      }
    ]);

    await loadEmployeePackages(
      'emp1',
      reset,
      setSelectedPackagesData,
      setSelectedTasks
    );

    expect(mockGetEmployeePackages).toHaveBeenCalledWith('emp1');

    expect(reset).toHaveBeenCalledWith({
      packagesInfo: ['pkg1', 'pkg2']
    });

    expect(setSelectedPackagesData).toHaveBeenCalledWith({
      employeeId: 'emp1',
      packages: [
        {
          packageId: 'pkg1',
          title: 'Onboarding',
          tasks: [
            { taskId: 't1', title: 'Intro' },
            { taskId: 't2', title: 'Setup' }
          ]
        },
        { packageId: 'pkg2', title: 'Compliance', tasks: [] }
      ]
    });

    expect(selectedTasks['pkg1']).toEqual(new Set(['t1', 't2']));
  });

  it('does not duplicate task ids already selected', async () => {
    let selectedTasks: Record<string, Set<string>> = {
      pkg1: new Set(['t1'])
    };
    const setSelectedTasks = jest.fn(
      (
        updater: (
          prev: Record<string, Set<string>>
        ) => Record<string, Set<string>>
      ) => {
        selectedTasks = updater(selectedTasks);
      }
    );

    mockGetEmployeePackages.mockResolvedValue([
      {
        packageId: { _id: 'pkg1', title: 'Onboarding' },
        tasks: [{ taskId: { _id: 't1', title: 'Intro' } }]
      }
    ]);

    await loadEmployeePackages(
      'emp1',
      reset,
      setSelectedPackagesData,
      setSelectedTasks
    );

    expect(selectedTasks['pkg1']).toEqual(new Set(['t1']));
  });

  it('throws a clear error when the fetch fails', async () => {
    mockGetEmployeePackages.mockRejectedValue(new Error('fail'));

    await expect(
      loadEmployeePackages('emp1', reset, setSelectedPackagesData, jest.fn())
    ).rejects.toThrow('Failed to fetch employee packages');
  });
});

describe('formatSubmitData', () => {
  const options = [
    {
      _id: 'pkg1',
      title: 'Onboarding',
      tasks: [
        { _id: 't1', title: 'Intro' },
        { _id: 't2', title: 'Setup' },
        { _id: 't3', title: 'Wrap up' }
      ]
    },
    {
      _id: 'pkg2',
      title: 'Compliance',
      tasks: []
    }
  ];

  it('maps selected packages to their selected tasks', () => {
    const result = formatSubmitData(
      ['pkg1', 'pkg2'],
      options as any,
      { pkg1: new Set(['t1', 't3']) },
      'emp1'
    );

    expect(result).toEqual({
      employeeId: 'emp1',
      packages: [
        {
          packageId: 'pkg1',
          title: 'Onboarding',
          tasks: [
            { taskId: 't1', title: 'Intro' },
            { taskId: 't3', title: 'Wrap up' }
          ]
        }
      ]
    });
  });

  it('drops packages that ended up with no tasks selected', () => {
    const result = formatSubmitData(
      ['pkg1', 'pkg2'],
      options as any,
      {},
      'emp1'
    );

    expect(result.packages).toEqual([]);
  });

  it('handles missing task sets for a selected package', () => {
    const result = formatSubmitData(['pkg2'], options as any, {}, 'emp1');

    expect(result.packages).toEqual([]);
  });
});

describe('getEmployeeInfoItems', () => {
  it('returns the employee info items', () => {
    expect(
      getEmployeeInfoItems({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@test.com',
        employeeId: 'E-1'
      })
    ).toEqual([
      { label: 'First Name', value: 'John' },
      { label: 'Last Name', value: 'Doe' },
      { label: 'Email', value: 'john@test.com' },
      { label: 'Employee ID', value: 'E-1' }
    ]);
  });

  it('tolerates null employee details', () => {
    expect(getEmployeeInfoItems(null)).toEqual([
      { label: 'First Name', value: undefined },
      { label: 'Last Name', value: undefined },
      { label: 'Email', value: undefined },
      { label: 'Employee ID', value: undefined }
    ]);
  });
});