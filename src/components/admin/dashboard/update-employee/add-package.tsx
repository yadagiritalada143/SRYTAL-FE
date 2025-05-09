import { Controller, useForm } from 'react-hook-form';
import { MultiSelect, Button, Group } from '@mantine/core';
import { BgDiv } from '../../../common/style-components/bg-div';
import { OrganizationConfig } from '../../../../interfaces/organization';
import { useCustomToast } from '../../../../utils/common/toast';
import { useRecoilState } from 'recoil';
import { employeePackagesAtom } from '../../../../atoms/employee-atom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import {
  getAllPackagesByAdmin,
  updateEmployeePackageByAdmin,
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

  const onSubmit = (data: EmployeePackageForm) => {
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
        const tasks = (packageFromAllPackages.tasks || []).map(task => ({
          taskId: task._id,
          startDate: new Date().toISOString(),
        }));

        formattedData.packages.push({
          packageId: packageFromAllPackages._id,
          tasks: tasks,
        });
      }
    });

    updateEmployeePackageByAdmin(formattedData)
      .then(() => {
        showSuccessToast('Successfully updated !');
      })
      .catch(error =>
        toast.error(error.response?.data?.message || 'Something went wrong')
      );
  };

  return (
    <BgDiv>
      <form
        style={{
          backgroundColor:
            organizationConfig.organization_theme.theme.backgroundColor,
        }}
        className="rounded-lg shadow-lg w-full p-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="packagesInfo"
          control={control}
          render={({ field }) => (
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
