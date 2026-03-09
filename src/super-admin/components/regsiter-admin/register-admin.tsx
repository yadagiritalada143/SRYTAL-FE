import { Button, Select, TextInput } from '@mantine/core';
import PremiumLoader from '@components/common/loaders/PremiumLoader';
import { IconX } from '@tabler/icons-react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  getOrganizations,
  registerAdmin
} from '@services/super-admin-services';
import {
  RegisterAdminBySuperAdminForm,
  registerAdminBySuperAdminForm
} from '@forms/register-admin-superadmin';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CommonButton } from '@components/common/button/CommonButton';

interface organization {
  organizationName: string;
  id: string;
}

const RegisterAdminBySuperAdmin = () => {
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<RegisterAdminBySuperAdminForm>({
    resolver: zodResolver(registerAdminBySuperAdminForm)
  });
  const [organizations, setOrganization] = useState<organization[]>([]);

  useEffect(() => {
    getOrganizations()
      .then(org => {
        setOrganization(org.organizations);
      })
      .catch(error => {
        toast.error(error || error.message || error.response.data.message);
      });
  }, []);

  const onSubmit = (adminDetails: RegisterAdminBySuperAdminForm) => {
    console.log(adminDetails);
    registerAdmin(adminDetails)
      .then(res => {
        reset();
        toast.success(res.message);
      })

      .catch(error =>
        toast.error(error || error.message || error.response.data.message)
      );
  };

  return (
    <div className='flex items-center justify-center h-screen '>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-2xl p-8 shadow-lg rounded-lg'
      >
        <div className='flex justify-between'>
          <div></div>
          <h2 className='text-2xl font-bold text-center mb-6'>
            Register admin
          </h2>
          <Button
            className='rounded-full'
            onClick={() => navigate(`/superadmin/dashboard`)}
          >
            <IconX />
          </Button>
        </div>

        <div className='grid gap-4 grid-cols-1 sm:grid-cols-2'>
          <TextInput
            label='First Name'
            placeholder='Enter first name'
            {...register('firstName')}
            error={errors.firstName?.message}
          />

          <TextInput
            label='Last Name'
            placeholder='Enter last name'
            {...register('lastName')}
            error={errors.lastName?.message}
          />

          <TextInput
            label='Email'
            placeholder='Enter email'
            {...register('email')}
            error={errors.email?.message}
          />

          <TextInput
            label='Phone Number'
            placeholder='Enter phone number'
            type='tel'
            {...register('mobileNumber')}
            error={errors.mobileNumber?.message}
          />
          <Controller
            name='userRole'
            control={control}
            render={({ field }) => (
              <Select
                label='User Role'
                {...field}
                error={errors.userRole?.message}
                placeholder='Select user role'
                value={field.value}
                data={[{ label: 'Admin', value: 'admin' }]}
              />
            )}
          />
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
          <div></div>

          <CommonButton
            className=' mt-7 rounded-md'
            type='submit'
            data-testid='submitButton'
            leftSection={
              isSubmitting && <PremiumLoader size='xs' minHeight='20px' />
            }
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Admin'}
          </CommonButton>
        </div>
      </form>
    </div>
  );
};

export default RegisterAdminBySuperAdmin;
