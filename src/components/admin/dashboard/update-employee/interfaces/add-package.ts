import { OrganizationConfig } from '../../../../../interfaces/organization';
import { PackagesList, Task } from '../../../../../interfaces/package';

export interface EmployeePackageForm {
  packagesInfo: string[];
}

export interface SelectedTasks {
  [packageId: string]: Set<string>;
}

export interface FormattedPackageData {
  employeeId: string;
  packages: {
    packageId: string;
    title?: string;
    tasks: {
      taskId: string;
      title?: string;
    }[];
  }[];
}

export interface PackagesFormProps {
  organizationConfig: OrganizationConfig;
  employeeId: string;
}

export interface EmployeeInfoItem {
  label: string;
  value: string | undefined;
}

export interface PackageWithTasks extends PackagesList {
  tasks?: Task[];
}
