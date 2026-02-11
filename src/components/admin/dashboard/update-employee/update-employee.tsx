import { useNavigate, useParams } from 'react-router-dom';
import {
  TextInput,
  Button,
  Select,
  MultiSelect,
  Loader,
  Textarea,
  Container,
  Card,
  Stack,
  Group,
  Text,
  Grid,
  Divider,
  Alert,
  Modal,
  Checkbox,
  Avatar
} from '@mantine/core';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  EmployeeUpdateForm,
  employeeSchema
} from '../../../../forms/update-employee';
import {
  getAllBloodGroupByAdmin,
  getEmployeeDetailsByAdmin,
  updateEmployeeDetailsByAdmin,
  deleteEmployeeByAdmin,
  getAllEmploymentTypes,
  getAllEmployeeRoleByAdmin,
  handlePasswordResetByAdmin,
  getAllEmployeeDetailsByAdmin
} from '../../../../services/admin-services';
import { toast } from 'react-toastify';
import { useEffect, useState, useMemo } from 'react';
import { organizationAdminUrls } from '../../../../utils/common/constants';
import { useDisclosure } from '@mantine/hooks';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import {
  organizationEmployeeAtom,
  organizationThemeAtom
} from '../../../../atoms/organization-atom';
import { useCustomToast } from '../../../../utils/common/toast';
import { DatePickerInput } from '@mantine/dates';
import {
  employeeDetailsAtom,
  bloodGroupOptionsAtom,
  employmentTypesAtom,
  employeeRolesAtom
} from '../../../../atoms/employee-atom';
import {
  IconUser,
  IconMail,
  IconPhone,
  IconCalendar,
  IconMapPin,
  IconBuildingBank,
  IconKey,
  IconTrash,
  IconDeviceFloppy,
  IconAlertTriangle,
  IconBriefcase,
  IconDroplet,
  IconId,
  IconFingerprint,
  IconIdBadge2,
  IconUserCog,
  IconCreditCard
} from '@tabler/icons-react';
import { themeAtom } from '../../../../atoms/theme';
import { BackButton } from '../../../common/style-components/buttons';

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const params = useParams();
  const employeeId = params.employeeId as string;

  const setEmployeeList = useSetRecoilState(organizationEmployeeAtom);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);

  const [opened, { open, close }] = useDisclosure(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { showSuccessToast } = useCustomToast();

  // Recoil state for options
  const [bloodGroupOptions, setBloodGroupOptions] = useRecoilState(
    bloodGroupOptionsAtom
  );
  const [employmentRolesOptions, setEmploymentRolesOptions] =
    useRecoilState(employeeRolesAtom);
  const [employmentTypeOptions, setEmploymentTypes] =
    useRecoilState(employmentTypesAtom);
  const setEmployeeDetails = useSetRecoilState(employeeDetailsAtom);

  // Get current theme configuration
  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    control,
    reset,
    watch
  } = useForm<EmployeeUpdateForm>({
    resolver: zodResolver(employeeSchema),
    mode: 'onChange'
  });
  const panRegister = register('panCardNumber');

  // Load dropdown options
  useEffect(() => {
    const loadOptions = async () => {
      try {
        const [employmentTypes, employeeRoles, bloodGroups] = await Promise.all(
          [
            getAllEmploymentTypes(),
            getAllEmployeeRoleByAdmin(),
            getAllBloodGroupByAdmin()
          ]
        );

        setEmploymentTypes(
          employmentTypes.map((res: any) => ({
            value: res._id,
            label: res.employmentType
          }))
        );

        setEmploymentRolesOptions(
          employeeRoles.map((res: any) => ({
            value: res._id,
            label: res.designation
          }))
        );

        setBloodGroupOptions(
          bloodGroups.map((res: any) => ({
            value: res._id,
            label: res.type
          }))
        );
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Failed to load options');
      }
    };

    loadOptions();
  }, [setEmploymentTypes, setEmploymentRolesOptions, setBloodGroupOptions]);

  // Load employee details
  useEffect(() => {
    const loadEmployeeDetails = async () => {
      setIsLoading(true);
      try {
        const emp = await getEmployeeDetailsByAdmin(employeeId);
        const formatted = {
          ...emp,
          bloodGroup: emp.bloodGroup?.id,
          employmentType: emp.employmentType?.id,
          employeeRole: emp.employeeRole.map((role: any) => role.id),
          dateOfBirth: emp.dateOfBirth ? new Date(emp.dateOfBirth) : null,
          presentAddress: emp.presentAddress ?? '',
          permanentAddress: emp.permanentAddress ?? '',
          mobileNumber: emp.mobileNumber?.toString()
        };

        setEmployeeDetails(formatted);
        reset(formatted);
      } catch (error: any) {
        toast.error(
          error.response?.data?.message || 'Failed to load employee details'
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadEmployeeDetails();
  }, [employeeId, reset, setEmployeeDetails]);

  const onSubmit = async (data: EmployeeUpdateForm) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const updatedData = {
        ...data,
        employeeRole: data.employeeRole?.filter(role => role),
        mobileNumber: Number(data.mobileNumber),
        dateOfBirth: data.dateOfBirth ?? undefined
      };

      // Remove empty bank details
      if (
        !data.bankDetailsInfo?.accountNumber &&
        !data.bankDetailsInfo?.accountHolderName &&
        !data.bankDetailsInfo?.ifscCode
      ) {
        delete updatedData.bankDetailsInfo;
      }

      await updateEmployeeDetailsByAdmin(updatedData);
      const updatedEmployees = await getAllEmployeeDetailsByAdmin();
      setEmployeeList(updatedEmployees);
      localStorage.setItem('id', employeeId);

      showSuccessToast('Employee details updated successfully!');
      navigate(-1);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'Failed to update employee';
      setSubmitError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteEmployee = async () => {
    try {
      const payload = { id: employeeId, confirmDelete: agreeTerms };
      await deleteEmployeeByAdmin(payload);

      const updatedEmployees = await getAllEmployeeDetailsByAdmin();
      setEmployeeList(updatedEmployees);

      showSuccessToast('Employee deleted successfully!');
      navigate(
        `${organizationAdminUrls(organizationConfig.organization_name)}/dashboard`
      );
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete employee');
    }
  };

  const handlePasswordReset = async () => {
    try {
      await handlePasswordResetByAdmin(employeeId);
      showSuccessToast('Password reset successful!');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to reset password');
    }
  };

  const handleBack = () => {
    if (isDirty) {
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?'
      );
      if (!confirmLeave) return;
    }
    navigate(-1);
  };

  if (isLoading) {
    return (
      <Container size="lg" py="xl">
        <Card shadow="sm" p="xl" radius="md" withBorder>
          <Stack align="center" gap="md">
            <Loader size="xl" color={currentThemeConfig.button.color} />
            <Text c="dimmed">Loading employee details...</Text>
          </Stack>
        </Card>
      </Container>
    );
  }

  return (
    <Container size="xl" py="md">
      <Card shadow="sm" p="lg" radius="md" withBorder>
        <Group justify="space-between" align="center">
          <Group gap="md">
            <div>
              <Text size="xl" fw={700} c={currentThemeConfig.color}>
                Update Employee Profile
              </Text>
              <Text size="sm" c="dimmed">
                Manage employee profile and employment details
              </Text>
            </div>
          </Group>
          <BackButton id={employeeId} />
        </Group>
      </Card>

      {/* Error Alert */}
      {submitError && (
        <Alert
          icon={<IconAlertTriangle size={16} />}
          color="red"
          title="Update Failed"
          variant="light"
          withCloseButton
          onClose={() => setSubmitError(null)}
        >
          {submitError}
        </Alert>
      )}

      <Grid align="start" gutter="lg" mt="md">
        {/* LEFT SIDEBAR */}
        <Grid.Col span={{ base: 12, md: 4, lg: 3 }}>
          <Stack>
            <Card withBorder shadow="sm" p="lg" radius="md">
              <Stack align="center" gap="xs">
                <Avatar size={80} radius="xl" />

                <Text fw={700}>
                  {watch('firstName')} {watch('lastName')}
                </Text>

                <Group gap={6}>
                  <IconMail size={14} color={currentThemeConfig.dangerColor} />
                  <Text size="sm" c="dimmed">
                    {watch('email')}
                  </Text>
                </Group>

                <Group gap={6}>
                  <IconPhone
                    size={14}
                    color={currentThemeConfig.successColor}
                  />
                  <Text size="sm" c="dimmed">
                    {watch('mobileNumber')}
                  </Text>
                </Group>

                <Divider my="sm" />

                <Button
                  variant="light"
                  color="blue"
                  fullWidth
                  leftSection={<IconKey size={16} />}
                  onClick={handlePasswordReset}
                  radius="md"
                >
                  Reset Password
                </Button>
              </Stack>
            </Card>

            <Card withBorder shadow="xs" p="lg" radius="md">
              <Group gap="xs" mb="xs">
                <IconAlertTriangle size={16} color="red" />
                <Text fw={600} c="red">
                  Delete Employee
                </Text>
              </Group>

              <Text size="sm" c="dimmed" mb="sm">
                Permanently delete this employee and all associated records.
              </Text>

              <Button
                color="red"
                variant="light"
                radius="md"
                leftSection={<IconTrash size={16} />}
                onClick={open}
              >
                Delete Employee
              </Button>
            </Card>
          </Stack>
        </Grid.Col>

        {/* RIGHT SIDE*/}
        <Grid.Col span={{ base: 12, md: 8, lg: 9 }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="md">
              <Card withBorder shadow="xs" p="lg">
                <Group gap="xs" mb={4}>
                  <IconUser size={18} />
                  <Text fw={600} size="lg">
                    Basic Information
                  </Text>
                </Group>
                <Text size="sm" c="dimmed" mb="md">
                  Employee identity and contact information.
                </Text>

                <Grid>
                  <Grid.Col span={12}>
                    <TextInput
                      label="Employee ID"
                      placeholder="Enter employee ID"
                      styles={{
                        input: {
                          backgroundColor:
                            currentThemeConfig.headerBackgroundColor,
                          color: currentThemeConfig.color,
                          borderColor: currentThemeConfig.borderColor
                        },
                        label: {
                          color: currentThemeConfig.color
                        }
                      }}
                      leftSection={
                        <IconIdBadge2
                          size={16}
                          color={currentThemeConfig.iconColor}
                        />
                      }
                      {...register('employeeId')}
                      autoComplete="off"
                      required
                      error={errors.employeeId?.message}
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="First Name"
                      placeholder="Enter first name"
                      leftSection={
                        <IconUser
                          size={16}
                          color={currentThemeConfig.iconColor}
                        />
                      }
                      {...register('firstName')}
                      error={errors.firstName?.message}
                      autoComplete="off"
                      required
                    />{' '}
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Last Name"
                      placeholder="Enter last name"
                      leftSection={
                        <IconUser
                          size={16}
                          color={currentThemeConfig.iconColor}
                        />
                      }
                      {...register('lastName')}
                      error={errors.lastName?.message}
                      autoComplete="off"
                      required
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Email Address"
                      placeholder="Enter email address"
                      type="email"
                      leftSection={
                        <IconMail
                          size={16}
                          color={currentThemeConfig.dangerColor}
                        />
                      }
                      {...register('email')}
                      error={errors.email?.message}
                      autoComplete="off"
                      required
                    />{' '}
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <TextInput
                      label="Mobile Number"
                      placeholder="Enter mobile number"
                      type="tel"
                      leftSection={
                        <IconPhone
                          size={16}
                          color={currentThemeConfig.successColor}
                        />
                      }
                      {...register('mobileNumber')}
                      error={errors.mobileNumber?.message}
                      required
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="AadharCard Number"
                      placeholder="Enter Aadhaar number"
                      type="tel"
                      leftSection={
                        <IconFingerprint
                          size={16}
                          color={currentThemeConfig.iconColor}
                        />
                      }
                      {...register('aadharNumber')}
                      maxLength={12}
                      error={errors.aadharNumber?.message}
                      onChange={e => {
                        e.target.value = e.target.value.replace(/\D/g, '');
                      }}
                      required
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="PANCard Number"
                      placeholder="Enter PANCard number"
                      type="text"
                      leftSection={
                        <IconId
                          size={16}
                          color={currentThemeConfig.iconColor}
                        />
                      }
                      {...panRegister}
                      onChange={e => {
                        e.target.value = e.target.value.toUpperCase();
                        panRegister.onChange(e);
                      }}
                      maxLength={10}
                      error={errors.panCardNumber?.message}
                      required
                    />
                  </Grid.Col>
                </Grid>
              </Card>

              <Card withBorder shadow="xs" p="lg">
                <Group justify="space-between" mb="md">
                  <Group gap="xs">
                    <IconCalendar size={18} />
                    <Text fw={600} size="lg">
                      Personal Details
                    </Text>
                  </Group>

                  <Text size="sm" c="dimmed">
                    (Optional)
                  </Text>
                </Group>

                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Controller
                      name="bloodGroup"
                      control={control}
                      render={({ field }) => (
                        <Select
                          label="Blood Group"
                          placeholder="Select blood group"
                          leftSection={
                            <IconDroplet
                              size={16}
                              color={currentThemeConfig.dangerColor}
                            />
                          }
                          data={bloodGroupOptions || []}
                          {...field}
                          value={field.value ?? null}
                          onChange={value =>
                            field.onChange(value === null ? undefined : value)
                          }
                          error={errors.bloodGroup?.message}
                          searchable
                          clearable
                          autoComplete="off"
                        />
                      )}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Controller
                      name="dateOfBirth"
                      control={control}
                      render={({ field }) => (
                        <DatePickerInput
                          label="Date of Birth"
                          placeholder="Select date of birth"
                          leftSection={
                            <IconCalendar
                              size={16}
                              color={currentThemeConfig.iconColor}
                            />
                          }
                          value={field.value}
                          maxDate={new Date()}
                          onChange={date => {
                            if (date) {
                              const d = new Date(date);

                              if (!isNaN(d.getTime())) {
                                const adjustedDate = new Date(
                                  d.getTime() - d.getTimezoneOffset() * 60000
                                )
                                  .toISOString()
                                  .split('T')[0];

                                field.onChange(adjustedDate);
                              }
                            } else {
                              field.onChange(null);
                            }
                          }}
                          error={errors.dateOfBirth?.message}
                        />
                      )}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Textarea
                      label="Present Address"
                      placeholder="Enter present address"
                      leftSection={
                        <IconMapPin
                          size={16}
                          color={currentThemeConfig.iconColor}
                        />
                      }
                      {...register('presentAddress')}
                      error={errors.presentAddress?.message}
                      minRows={3}
                      styles={{
                        input: {
                          paddingTop: 29
                        }
                      }}
                      autoComplete="off"
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Textarea
                      label="Permanent Address"
                      placeholder="Enter permanent address"
                      leftSection={
                        <IconMapPin
                          size={16}
                          color={currentThemeConfig.iconColor}
                        />
                      }
                      {...register('permanentAddress')}
                      error={errors.permanentAddress?.message}
                      minRows={3}
                      styles={{
                        input: {
                          paddingTop: 29
                        }
                      }}
                      autoComplete="off"
                    />
                  </Grid.Col>
                </Grid>
              </Card>

              <Card withBorder shadow="xs" p="lg">
                <Group gap="xs" mb={4}>
                  <IconBriefcase size={18} />
                  <Text fw={600} size="lg">
                    Employment Details
                  </Text>
                </Group>
                <Text size="sm" c="dimmed" mb="md">
                  Manage role and employment type
                </Text>

                <Grid>
                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Controller
                      name="employmentType"
                      control={control}
                      render={({ field }) => (
                        <Select
                          label="Employment Type"
                          placeholder="Select employment type"
                          leftSection={
                            <IconBriefcase
                              size={16}
                              color={currentThemeConfig.iconColor}
                            />
                          }
                          data={employmentTypeOptions || []}
                          {...field}
                          value={field.value ?? null}
                          onChange={value => field.onChange(value ?? undefined)}
                          error={errors.employmentType?.message}
                          searchable
                          autoComplete="off"
                          required
                          clearable
                        />
                      )}
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, md: 6 }}>
                    <Controller
                      name="employeeRole"
                      control={control}
                      render={({ field }) => (
                        <MultiSelect
                          label="Employee Roles"
                          placeholder={
                            field.value && field.value.length > 0
                              ? ''
                              : 'Select employee roles'
                          }
                          leftSection={
                            <IconUserCog
                              size={16}
                              color={currentThemeConfig.iconColor}
                            />
                          }
                          data={employmentRolesOptions || []}
                          value={field.value ?? []}
                          onChange={values =>
                            field.onChange(
                              values.filter(v => v && v.trim() !== '')
                            )
                          }
                          onBlur={field.onBlur}
                          autoComplete="off"
                          required
                          error={errors.employeeRole?.message}
                          searchable
                          clearable
                        />
                      )}
                    />
                  </Grid.Col>
                </Grid>
              </Card>

              <Card withBorder shadow="xs" p="lg">
                <Group justify="space-between" mb="md">
                  <Group gap="xs">
                    <IconBuildingBank size={18} />
                    <Text fw={600} size="lg">
                      Bank Details
                    </Text>
                  </Group>

                  <Text size="sm" c="dimmed">
                    (Optional)
                  </Text>
                </Group>

                <Grid>
                  <Grid.Col span={12}>
                    <TextInput
                      placeholder="Enter account number"
                      leftSection={
                        <IconCreditCard
                          size={16}
                          color={currentThemeConfig.accentColor}
                        />
                      }
                      {...register('bankDetailsInfo.accountNumber')}
                      autoComplete="off"
                      error={errors.bankDetailsInfo?.accountNumber?.message}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <TextInput
                      label="Account Holder Name"
                      placeholder="Enter account holder name"
                      leftSection={
                        <IconUser
                          size={16}
                          color={currentThemeConfig.accentColor}
                        />
                      }
                      autoComplete="off"
                      {...register('bankDetailsInfo.accountHolderName')}
                      error={errors.bankDetailsInfo?.accountHolderName?.message}
                    />
                  </Grid.Col>

                  <Grid.Col span={12}>
                    <TextInput
                      label="IFSC Code"
                      placeholder="Enter IFSC code"
                      leftSection={
                        <IconBuildingBank
                          size={16}
                          color={currentThemeConfig.accentColor}
                        />
                      }
                      {...register('bankDetailsInfo.ifscCode')}
                      error={errors.bankDetailsInfo?.ifscCode?.message}
                      autoComplete="off"
                    />
                  </Grid.Col>
                </Grid>
              </Card>

              <Card
                shadow="sm"
                p="md"
                radius="md"
                style={{
                  border: `1px solid ${currentThemeConfig.borderColor}`
                }}
              >
                <Group justify="space-between">
                  <Button variant="subtle" onClick={handleBack} radius="lg">
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={!isValid || isSubmitting}
                    radius="lg"
                    leftSection={
                      !isSubmitting && <IconDeviceFloppy size={16} />
                    }
                    style={{
                      backgroundColor: currentThemeConfig.button.color,
                      color: currentThemeConfig.button.textColor
                    }}
                  >
                    {isSubmitting ? 'Updating...' : 'Update Employee'}
                  </Button>
                </Group>
              </Card>
            </Stack>
          </form>
        </Grid.Col>
      </Grid>
      {/* Delete Confirmation Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title="Delete Employee"
        centered
        size="md"
      >
        <Stack gap="md">
          <Alert
            icon={<IconAlertTriangle size={16} />}
            mt="md"
            color="red"
            title="Warning"
            variant="filled"
          >
            This action cannot be undone. The employee and all associated data
            will be permanently deleted.
          </Alert>

          <Checkbox
            label="I understand that this action is irreversible"
            checked={agreeTerms}
            onChange={event => setAgreeTerms(event.currentTarget.checked)}
          />

          <Checkbox
            label="Confirm Permanent Deletion"
            checked={confirmDelete}
            onChange={event => setConfirmDelete(event.currentTarget.checked)}
          />

          <Group justify="flex-end" gap="sm">
            <Button variant="subtle" onClick={close} radius="md">
              Cancel
            </Button>
            <Button
              color="red"
              radius="md"
              disabled={!agreeTerms || !confirmDelete}
              onClick={() => {
                handleDeleteEmployee();
                close();
              }}
              leftSection={<IconTrash size={16} />}
            >
              Delete Employee
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
};

export default UpdateEmployee;
