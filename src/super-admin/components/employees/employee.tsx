import { Button, Select } from '@mantine/core';
import PremiumLoader from '@components/common/loaders/PremiumLoader';
import DataView from '@components/common/loaders/DataView';
import { IconEdit, IconUser } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { EmployeeInterface } from '@interfaces/employee';
import {
  getAllEmployeeDetailsBySuperAdmin,
  getOrganizations
} from '@services/super-admin-services';
import { toast } from 'react-toastify';
import { Controller, useForm } from 'react-hook-form';
import {
  GetAllEmployeesSearchForm,
  getAllEmployeesSearchForm
} from '@forms/register-admin-superadmin';
import { zodResolver } from '@hookform/resolvers/zod';

interface organization {
  organizationName: string;
  id: string;
}

const EmployeesForSuperadmin = () => {
  const [employees, setEmployees] = useState<EmployeeInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [organizations, setOrganization] = useState<organization[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<GetAllEmployeesSearchForm>({
    resolver: zodResolver(getAllEmployeesSearchForm)
  });

  useEffect(() => {
    getOrganizations()
      .then(org => {
        setOrganization(org.organizations);
      })
      .catch(error => {
        toast.error(error || error.message || error.response.data.message);
      });
  }, []);

  const onSubmit = (search: GetAllEmployeesSearchForm) => {
    setIsLoading(true);
    getAllEmployeeDetailsBySuperAdmin(search.organizationId)
      .then(employeesList => {
        setEmployees(employeesList);
        setIsLoading(false);
      })
      .catch(error => {
        toast(error?.response?.data?.message || 'Something went wrong');
        setIsLoading(false);
      });
  };

  return (
    <div className='h-auto'>
      <div>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='w-full  p-8 shadow-lg rounded-lg'
          >
            <div className='w-full flex justify-between'>
              <Controller
                name='organizationId'
                control={control}
                render={({ field }) => (
                  <Select
                    label='Organization'
                    {...field}
                    error={errors.organizationId?.message}
                    placeholder='Select organization'
                    value={field.value}
                    data={organizations.map((org: organization) => ({
                      label: org.organizationName,
                      value: org.id
                    }))}
                  />
                )}
              />

              <Button
                className=' mt-7 rounded-md'
                type='submit'
                data-testid='submitButton'
                leftSection={
                  isSubmitting && <PremiumLoader size='xs' minHeight='20px' />
                }
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Searching...' : 'Search'}
              </Button>
            </div>
          </form>
        </div>

        <DataView
          isLoading={isLoading}
          label='employees'
          isEmpty={employees?.length === 0 && !isLoading}
        >
          {employees?.length > 0 && (
            <div className='overflow-x-auto mt-4'>
              <table className='min-w-full table-fixed text-center shadow-md'>
                <colgroup>
                  <col className='w-56' />
                  <col className='w-32' />
                  <col className='w-32' />
                  <col className='w-32' />
                  <col className='w-32' />
                  <col className='w-32' />
                  <col className='w-32' />
                  <col className='w-32' />
                </colgroup>
                <thead className='text-xs uppercase'>
                  <tr>
                    <th className='p-2 border'>First Name</th>
                    <th className='p-2 border'>Last Name</th>
                    <th className='p-2 border'>Email</th>
                    <th className='p-2 border'>Mobile Number</th>
                    <th className='p-2 border'>Role</th>
                    <th className='p-2 border'>Employment Type</th>
                    <th className='p-2 border'>Blood Group</th>
                    <th className='p-2 border'>Employee Role</th>
                    <th className='p-2 border'>Update Details</th>
                  </tr>
                </thead>
                <tbody className='text-sm'>
                  {employees?.map(employee => (
                    <tr
                      key={employee.id}
                      className='hover:bg-slate-200 hover:text-black'
                    >
                      <td className='px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis'>
                        {employee.firstName}
                      </td>
                      <td className='px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis'>
                        {employee.lastName}
                      </td>
                      <td className='px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis'>
                        {employee.email}
                      </td>
                      <td className='px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis'>
                        {employee.mobileNumber}
                      </td>
                      <td className='px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis'>
                        {employee.userRole}
                      </td>
                      <td className='px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis'>
                        {employee.employmentType?.employmentType}
                      </td>
                      <td className='px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis'>
                        {employee.bloodGroup?.type}
                      </td>
                      <td className='px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis'>
                        <ul>
                          {employee.employeeRole?.map((role, index) => (
                            <li key={role._id}>
                              {index + 1}. {role.designation}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className='px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis'>
                        <Button
                        // onClick={() =>
                        //   navigate(
                        //     `/admin/${organizationConfig.organization_name}/dashboard/update/${employee._id}`
                        //   )
                        // }
                        >
                          <IconUser /> {'  '}
                          <IconEdit />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </DataView>
      </div>
    </div>
  );
};

export default EmployeesForSuperadmin;
