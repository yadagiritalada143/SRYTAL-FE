import { Container, Stack, Group, Grid, Alert, Card } from '@mantine/core';
import DataView from '@components/common/loaders/DataView';
import {
  IconAlertTriangle,
  IconDeviceFloppy,
  IconUser
} from '@tabler/icons-react';
import { BackButton } from '@common/style-components/buttons';
import { useAppTheme } from '@hooks/use-app-theme';
import { CommonButton } from '@components/common/button/CommonButton';
import PageHeader from '@components/common/page-header/PageHeader';
import { useUpdateEmployee } from './useUpdateEmployee';
import EmployeeSidebar from './EmployeeSidebar';
import DeleteEmployeeModal from './DeleteEmployeeModal';
import BasicInfoSection from './sections/BasicInfoSection';
import PersonalDetailsSection from './sections/PersonalDetailsSection';
import EmploymentDetailsSection from './sections/EmploymentDetailsSection';
import StatutoryDetailsSection from './sections/StatutoryDetailsSection';
import BankDetailsSection from './sections/BankDetailsSection';

const UpdateEmployee = () => {
  const { themeConfig: currentThemeConfig } = useAppTheme();
  const {
    employeeId,
    form,
    onSubmit,
    isLoading,
    isSubmitting,
    submitError,
    setSubmitError,
    deleteModal,
    confirmDelete,
    setConfirmDelete,
    agreeTerms,
    setAgreeTerms,
    options,
    handleDeleteEmployee,
    handlePasswordReset,
    handleBack
  } = useUpdateEmployee();

  const {
    register,
    control,
    formState: { errors },
    watch
  } = form;

  return (
    <Container size='xl' py='md' mt='xl'>
      <PageHeader
        title='Update Employee Profile'
        subtitle='Manage employee profile and employment details.'
        icon={<IconUser size={24} />}
        actions={<BackButton id={employeeId} />}
      />

      <DataView isLoading={isLoading} label='employee details'>
        <Stack gap='md' mt='md'>
          {submitError && (
            <Alert
              icon={<IconAlertTriangle size={16} />}
              color='red'
              title='Update Failed'
              variant='light'
              withCloseButton
              onClose={() => setSubmitError(null)}
            >
              {submitError}
            </Alert>
          )}

          <Grid align='start' gutter='lg'>
            {/* LEFT SIDEBAR */}
            <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
              <EmployeeSidebar
                firstName={watch('firstName')}
                lastName={watch('lastName')}
                email={watch('email')}
                mobileNumber={watch('mobileNumber')}
                onPasswordReset={handlePasswordReset}
                onDelete={deleteModal.open}
              />
            </Grid.Col>

            {/* RIGHT: FORM */}
            <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
              <form onSubmit={onSubmit}>
                <Stack gap='md'>
                  <BasicInfoSection
                    register={register}
                    control={control}
                    errors={errors}
                  />
                  <PersonalDetailsSection
                    register={register}
                    control={control}
                    errors={errors}
                    bloodGroupOptions={options.bloodGroupOptions}
                  />
                  <EmploymentDetailsSection
                    register={register}
                    control={control}
                    errors={errors}
                    employmentTypeOptions={options.employmentTypeOptions}
                    employmentRolesOptions={options.employmentRolesOptions}
                    departmentOptions={options.departmentOptions}
                  />
                  <StatutoryDetailsSection
                    register={register}
                    control={control}
                    errors={errors}
                  />
                  <BankDetailsSection
                    register={register}
                    control={control}
                    errors={errors}
                  />

                  <Card
                    shadow='sm'
                    p='md'
                    radius='md'
                    style={{
                      border: `1px solid ${currentThemeConfig.borderColor}`
                    }}
                  >
                    <Group justify='space-between'>
                      <CommonButton variant='subtle' onClick={handleBack}>
                        Cancel
                      </CommonButton>

                      <CommonButton
                        type='submit'
                        loading={isSubmitting}
                        disabled={isSubmitting}
                        leftSection={
                          !isSubmitting && <IconDeviceFloppy size={16} />
                        }
                        style={{
                          backgroundColor: currentThemeConfig.button.color,
                          color: currentThemeConfig.button.textColor
                        }}
                      >
                        {isSubmitting ? 'Updating...' : 'Update Employee'}
                      </CommonButton>
                    </Group>
                  </Card>
                </Stack>
              </form>
            </Grid.Col>
          </Grid>
        </Stack>
      </DataView>

      <DeleteEmployeeModal
        opened={deleteModal.opened}
        onClose={deleteModal.close}
        agreeTerms={agreeTerms}
        setAgreeTerms={setAgreeTerms}
        confirmDelete={confirmDelete}
        setConfirmDelete={setConfirmDelete}
        onConfirm={handleDeleteEmployee}
      />
    </Container>
  );
};

export default UpdateEmployee;
