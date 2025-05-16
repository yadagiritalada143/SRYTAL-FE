import { Controller, useForm } from 'react-hook-form';
import { MultiSelect, Button, Group } from '@mantine/core';
import { BgDiv } from '../../../common/style-components/bg-div';
import { OrganizationConfig } from '../../../../interfaces/organization';
import { useCustomToast } from '../../../../utils/common/toast';
import { useRecoilState } from 'recoil';
import { employeePackagesAtom } from '../../../../atoms/employee-atom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import {
  addPackagetoEmployeeByAdmin,
  getAllPackagesByAdmin,
} from '../../../../services/admin-services';
import {
  EmployeePackageForm,
  employeePackageSchema,
} from '../../../../forms/update-employee';
import { zodResolver } from '@hookform/resolvers/zod';

const PackagesFormComponent = ({
  organizationConfig,
  employeeId,
}: {
  organizationConfig: OrganizationConfig;
  employeeId: string;
}) => {
  const [employmentPackagesOptions, setEmploymentPackagesOptions] =
    useRecoilState(employeePackagesAtom);

  const { showSuccessToast } = useCustomToast();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeePackageForm>({
    resolver: zodResolver(employeePackageSchema),
  });
  const [selectedTasks, setSelectedTasks] = useState<{
    [packageId: string]: Set<string>;
  }>({});

  const handleTaskToggle = (packageId: string, taskId: string) => {
    setSelectedTasks(prev => {
      const currentSet = new Set(prev[packageId] || []);
      if (currentSet.has(taskId)) {
        currentSet.delete(taskId);
      } else {
        currentSet.add(taskId);
      }
      return {
        ...prev,
        [packageId]: currentSet,
      };
    });
  };

  useEffect(() => {
    if (employmentPackagesOptions.length === 0) {
      getAllPackagesByAdmin()
        .then(response => {
          setEmploymentPackagesOptions(response);
        })
        .catch((error: any) => {
          toast.error(error?.response?.data?.message || 'Something went wrong');
        });
    }
  }, [employmentPackagesOptions, setEmploymentPackagesOptions]);

  const onSubmit = async (data: EmployeePackageForm) => {
    const formattedData: {
      employeeId: string;
      packages: {
        packageId: string;
        tasks: { taskId: string; startDate: string }[];
      }[];
    } = {
      employeeId: employeeId,
      packages: [],
    };

    data.packagesInfo.forEach(selectedPackageId => {
      const packageFromAllPackages = employmentPackagesOptions.find(
        pack => pack._id === selectedPackageId
      );

      if (packageFromAllPackages) {
        const selectedTaskIds = selectedTasks[selectedPackageId] || new Set();

        const tasks = (packageFromAllPackages.tasks || [])
          .filter(task => selectedTaskIds.has(task._id)) // only selected
          .map(task => ({
            taskId: task._id,
            startDate: new Date().toISOString(),
          }));

        formattedData.packages.push({
          packageId: packageFromAllPackages._id,
          tasks,
        });
      }
    });

    try {
      await addPackagetoEmployeeByAdmin(formattedData);
      showSuccessToast('Successfully updated!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <BgDiv>
      <form
        style={{
          backgroundColor:
            organizationConfig.organization_theme.theme.backgroundColor,
        }}
        className="shadow-lg w-full p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="packagesInfo"
          control={control}
          render={({ field }) => (
            <>
              <MultiSelect
                className="mb-2"
                data={employmentPackagesOptions.map((res: any) => ({
                  value: res._id,
                  label: res.title,
                }))}
                label="Packages"
                placeholder="Select Packages"
                value={(field.value ?? []).filter(
                  (pkg: any): pkg is string => typeof pkg === 'string'
                )}
                onChange={field.onChange}
                onBlur={field.onBlur}
                error={errors.packagesInfo?.message as any}
              />
              {(field.value ?? []).map((selectedPackageId: string) => {
                const selectedPackage = employmentPackagesOptions.find(
                  pkg => pkg._id === selectedPackageId
                );
                if (!selectedPackage) return null;

                return (
                  <div
                    key={selectedPackage._id}
                    className="mb-6 p-4 border rounded bg-white shadow-sm"
                  >
                    <h3 className="text-sm font-semibold mb-2 underline text-black">
                      Tasks In {selectedPackage.title}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedPackage.tasks.map(task => {
                        const isChecked =
                          selectedTasks[selectedPackage._id]?.has(task._id) ??
                          false;

                        return (
                          <label
                            key={task._id}
                            className="flex items-center gap-2 text-sm text-black cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() =>
                                handleTaskToggle(selectedPackage._id, task._id)
                              }
                              className="form-checkbox"
                            />
                            <span>{task.title}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        />

        <Group justify="right" mt="lg">
          <Button type="submit">Save Packages</Button>
        </Group>
      </form>
    </BgDiv>
  );
};

export default PackagesFormComponent;
