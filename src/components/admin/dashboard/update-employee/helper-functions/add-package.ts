import { PackagesList } from '../../../../../interfaces/package';
import {
  getAllPackagesByAdmin,
  getEmployeeDetailsByAdmin,
  getEmployeePackagesByAdmin,
} from '../../../../../services/admin-services';
import { EmployeeInfoItem } from '../interfaces/add-package';
import { FormattedPackageData, SelectedTasks } from '../interfaces/add-package';

export const fetchInitialData = async (
  employeeId: string,
  setEmployeeDetails: (data: any) => void,
  setEmploymentPackagesOptions: (data: PackagesList) => void,
  employmentPackagesOptions: PackagesList
) => {
  try {
    const [employeeDetails, packages] = await Promise.all([
      getEmployeeDetailsByAdmin(employeeId),
      employmentPackagesOptions.length === 0
        ? getAllPackagesByAdmin()
        : Promise.resolve(employmentPackagesOptions),
    ]);

    setEmployeeDetails(employeeDetails);
    if (employmentPackagesOptions.length === 0) {
      setEmploymentPackagesOptions(packages);
    }
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || 'Failed to load data');
  }
};

export const loadEmployeePackages = async (
  employeeId: string,
  reset: (data: any) => void,
  setSelectedPackagesData: (data: FormattedPackageData) => void,
  setSelectedTasks: (data: any) => void
) => {
  try {
    const data = await getEmployeePackagesByAdmin(employeeId);

    const formattedData: FormattedPackageData = {
      employeeId: employeeId,
      packages: data.map(
        (pkg: {
          packageId: { _id: string; title: string };
          tasks: { taskId: { _id: string; title: string } }[];
        }) => {
          return {
            packageId: pkg.packageId._id,
            title: pkg.packageId?.title,
            tasks: (pkg?.tasks || [])
              .filter(task => task.taskId)
              .map(task => {
                setSelectedTasks((prev: { [x: string]: any }) => {
                  const newSelectedTasks = { ...prev };
                  const currentSet = new Set(prev[pkg.packageId._id] || []);

                  if (!currentSet.has(task.taskId._id)) {
                    currentSet.add(task.taskId._id);
                  }
                  newSelectedTasks[pkg.packageId._id] = currentSet;
                  return newSelectedTasks;
                });
                return {
                  taskId: task.taskId._id,
                  title: task.taskId.title,
                };
              }),
          };
        }
      ),
    };

    reset({
      packagesInfo: data.map(
        (pkg: { packageId: { _id: string } }) => pkg.packageId._id
      ),
    });

    setSelectedPackagesData(formattedData);
  } catch {
    throw new Error('Failed to fetch employee packages');
  }
};

export const formatSubmitData = (
  selectedPackages: string[],
  employmentPackagesOptions: PackagesList,
  selectedTasks: SelectedTasks,
  employeeId: string
): FormattedPackageData => {
  return {
    employeeId: employeeId,
    packages: selectedPackages
      .map(selectedPackageId => {
        const packageData = employmentPackagesOptions.find(
          pkg => pkg._id === selectedPackageId
        );
        const selectedTaskIds = selectedTasks[selectedPackageId] || new Set();

        return {
          packageId: selectedPackageId,
          title: packageData?.title,
          tasks: (packageData?.tasks || [])
            .filter(task => selectedTaskIds.has(task._id))
            .map(task => ({
              taskId: task._id,
              title: task.title,
            })),
        };
      })
      .filter(pkg => pkg.tasks.length > 0),
  };
};

export const getEmployeeInfoItems = (
  employeeDetails: any | null
): EmployeeInfoItem[] => [
  { label: 'First Name', value: employeeDetails?.firstName },
  { label: 'Last Name', value: employeeDetails?.lastName },
  { label: 'Email', value: employeeDetails?.email },
  { label: 'Employee ID', value: employeeDetails?.employeeId },
];
