import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { TextInput, Textarea, Group, Stack, Text, Card } from '@mantine/core';
import PremiumLoader from '@components/common/loaders/PremiumLoader';
import { DateInput } from '@mantine/dates';
import { useRegisterPackage } from '@hooks/mutations/useAdminMutations';
import { useNavigate, useParams } from 'react-router';
import { BgDiv } from '@common/style-components/bg-div';
import { useCustomToast } from '@utils/common/toast';
import { AddPackageForm, addPackageSchema } from '@forms/add-package';
import { toast } from 'react-toastify';
import { BackButton } from '@common/style-components/buttons';
import { useAppTheme } from '@hooks/use-app-theme';
import { CommonButton } from '@components/common/button/CommonButton';

const AddPackage = () => {
  const navigate = useNavigate();
  const { themeConfig: currentThemeConfig } = useAppTheme();
  const params = useParams();
  const packageId = params.packageId as string;

  const { mutateAsync: registerPackageMutation } = useRegisterPackage();
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting }
  } = useForm<AddPackageForm>({
    resolver: zodResolver(addPackageSchema)
  });
  const { showSuccessToast } = useCustomToast();

  const onSubmit = async (packageDetails: AddPackageForm) => {
    try {
      await registerPackageMutation(packageDetails);
      showSuccessToast(`${packageDetails.title} created successfully!`);

      reset();

      navigate(-1);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className='w-full max-w-3xl mx-auto my-10'>
      <BgDiv>
        <Card
          shadow='md'
          radius='md'
          p='xl'
          withBorder
          style={{ backgroundColor: currentThemeConfig.backgroundColor }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Group justify='space-between' mb='lg' py={4}>
              <Stack gap={4}>
                <Text size='xl' fw={700}>
                  Add New Package
                </Text>
                <Text size='sm' c='dimmed'>
                  Create a new package for your organization
                </Text>
              </Stack>
              <BackButton id={packageId} />
            </Group>

            <Stack gap='md'>
              <TextInput
                label='Package Title'
                placeholder='Enter package title'
                {...register('title')}
                error={errors.title?.message}
              />
              <Group grow>
                <Controller
                  control={control}
                  name='startDate'
                  render={({ field }) => (
                    <DateInput
                      label='Start Date'
                      placeholder='Pick a date'
                      value={field.value ? new Date(field.value) : null}
                      onChange={date =>
                        field.onChange(date ? new Date(date) : null)
                      }
                      error={errors.startDate?.message}
                      valueFormat='YYYY-MM-DD'
                      popoverProps={{ withinPortal: true }}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name='endDate'
                  render={({ field }) => (
                    <DateInput
                      label='End Date'
                      placeholder='Pick a date'
                      value={field.value ? new Date(field.value) : null}
                      onChange={date =>
                        field.onChange(date ? new Date(date) : null)
                      }
                      error={errors.endDate?.message}
                      valueFormat='YYYY-MM-DD'
                      popoverProps={{ withinPortal: true }}
                    />
                  )}
                />
              </Group>

              <Textarea
                label='Description'
                placeholder='Enter package description'
                {...register('description')}
                minRows={4}
                error={errors.description?.message}
              />

              <Group justify='flex-end' mt='md'>
                <CommonButton
                  type='submit'
                  data-testid='submitButton'
                  loading={isSubmitting}
                  leftSection={
                    isSubmitting && <PremiumLoader size='xs' minHeight='20px' />
                  }
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating...' : 'Create Package'}
                </CommonButton>
              </Group>
            </Stack>
          </form>
        </Card>
      </BgDiv>
    </div>
  );
};

export default AddPackage;
