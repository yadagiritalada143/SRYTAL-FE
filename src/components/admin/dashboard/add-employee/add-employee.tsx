import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  TextInput,
  Button,
  Select,
  Container,
  Card,
  Stack,
  Group,
  Text,
  Grid,
  Alert,
  Progress
} from '@mantine/core';
import { toast } from 'react-toastify';
import {
  AddEmployeeForm,
  addEmployeeSchema
} from '../../../../forms/add-employee';
import {
  getAllEmployeeDetailsByAdmin,
  registerEmployee
} from '../../../../services/admin-services';
import axios from 'axios';
import {
  IconCircleDashedCheck,
  IconUser,
  IconMail,
  IconPhone,
  IconUserCheck,
  IconArrowLeft,
  IconAlertCircle
} from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { organizationAdminUrls } from '../../../../utils/common/constants';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  organizationEmployeeAtom,
  organizationThemeAtom
} from '../../../../atoms/organization-atom';
import { useMemo, useState } from 'react';
import { themeAtom } from '../../../../atoms/theme';
import { ThemeBackground } from '../../../UI/Theme-background/background';

// Constants
const USER_ROLES = [
  { label: 'Employee', value: 'employee' },
  { label: 'Recruiter', value: 'recruiter' },
  { label: ' Content Writer', value: 'content-writer' }
  // { label: 'Manager', value: 'manager' },
  // { label: 'Admin', value: 'admin' }
];

const AddEmployee = () => {
  const navigate = useNavigate();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);
  const setEmployeeList = useSetRecoilState(organizationEmployeeAtom);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Get current theme configuration
  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    watch,
    formState: { errors, isSubmitting, isValid, isDirty }
  } = useForm<AddEmployeeForm>({
    resolver: zodResolver(addEmployeeSchema),
    mode: 'onChange'
  });

  // Watch form values for progress calculation
  const watchedFields = watch();
  const filledFields = Object.values(watchedFields).filter(
    value => value && value.toString().trim().length > 0
  ).length;
  const totalFields = Object.keys(addEmployeeSchema.shape).length;
  const progressPercentage = Math.round((filledFields / totalFields) * 100);

  const onSubmit = async (employeeDetails: AddEmployeeForm) => {
    try {
      setSubmitError(null);

      await registerEmployee(employeeDetails);

      // Update employee list in state
      const updatedEmployees = await getAllEmployeeDetailsByAdmin();
      setEmployeeList(updatedEmployees);

      // Show success toast with better styling
      const roleName = getValues('userRole');
      const capitalizedRole =
        roleName.charAt(0).toUpperCase() + roleName.slice(1);

      toast.success(
        `${capitalizedRole} "${getValues('firstName')} ${getValues('lastName')}" created successfully!`,
        {
          style: {
            color: currentThemeConfig.color,
            backgroundColor: currentThemeConfig.backgroundColor,
            border: `1px solid ${currentThemeConfig.borderColor}`
          },
          progressStyle: {
            background: currentThemeConfig.button.color
          },
          icon: <IconCircleDashedCheck size={24} />,
          position: 'top-right',
          autoClose: 4000
        }
      );

      // Reset form and navigate
      reset();
      navigate(
        `${organizationAdminUrls(organizationConfig.organization_name)}/dashboard`
      );
    } catch (error) {
      let errorMessage = 'An unexpected error occurred.';

      if (axios.isAxiosError(error)) {
        errorMessage =
          error.response?.data?.message || 'Failed to create employee';
      }

      setSubmitError(errorMessage);
      toast.error(errorMessage, {
        style: {
          color: currentThemeConfig.color,
          backgroundColor: currentThemeConfig.backgroundColor
        }
      });
    }
  };

  const handleCancel = () => {
    navigate(
      `${organizationAdminUrls(organizationConfig.organization_name)}/dashboard`
    );
  };

  const handleReset = () => {
    const confirmReset = window.confirm(
      'Are you sure you want to clear all form data?'
    );
    if (confirmReset) {
      reset();
      setSubmitError(null);
    }
  };

  return (
    <Container size="md" py="xl">
      <ThemeBackground>
        <Card
          shadow="lg"
          radius="md"
          withBorder
          p="xl"
          style={{
            backgroundColor: currentThemeConfig.backgroundColor,
            borderColor: currentThemeConfig.borderColor
          }}
        >
          <Stack gap="lg">
            {/* Header */}
            <Group justify="space-between" align="flex-start">
              <Stack gap="xs">
                <Text size="xl" fw={700} c={currentThemeConfig.color}>
                  Add New Employee
                </Text>
                <Text size="sm" c="dimmed">
                  Fill in the details below to create a new employee account
                </Text>
              </Stack>
            </Group>

            {/* Progress Indicator */}
            {isDirty && (
              <Stack gap="xs">
                <Group justify="space-between">
                  <Text size="sm" c="dimmed">
                    Form Progress
                  </Text>
                  <Text size="sm" c="dimmed">
                    {progressPercentage}%
                  </Text>
                </Group>
                <Progress
                  value={progressPercentage}
                  size="sm"
                  color={currentThemeConfig.button.color}
                  radius="xl"
                />
              </Stack>
            )}

            {/* Error Alert */}
            {submitError && (
              <Alert
                icon={<IconAlertCircle size={16} />}
                color="red"
                title="Error"
                variant="light"
              >
                {submitError}
              </Alert>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack gap="md">
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="First Name"
                      placeholder="Enter first name"
                      leftSection={<IconUser size={16} />}
                      {...register('firstName')}
                      autoComplete="off"
                      error={errors.firstName?.message}
                      required
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Last Name"
                      placeholder="Enter last name"
                      leftSection={<IconUser size={16} />}
                      {...register('lastName')}
                      autoComplete="off"
                      error={errors.lastName?.message}
                      required
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Email Address"
                      placeholder="Enter email address"
                      type="email"
                      leftSection={<IconMail size={16} />}
                      {...register('email')}
                      autoComplete="off"
                      error={errors.email?.message}
                      required
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <TextInput
                      label="Phone Number"
                      placeholder="Enter phone number"
                      type="tel"
                      autoComplete="off"
                      leftSection={<IconPhone size={16} />}
                      {...register('mobileNumber')}
                      error={errors.mobileNumber?.message}
                      required
                    />
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Controller
                      name="userRole"
                      control={control}
                      render={({ field }) => (
                        <Select
                          label="User Role"
                          placeholder="Select user role"
                          leftSection={<IconUserCheck size={16} />}
                          data={USER_ROLES}
                          {...field}
                          error={errors.userRole?.message}
                          required
                          autoComplete="off"
                          searchable
                          clearable
                        />
                      )}
                    />
                  </Grid.Col>
                </Grid>

                {/* Action Buttons */}
                <Group justify="flex-end" gap="md" mt="xl">
                  <Button
                    variant="subtle"
                    leftSection={<IconArrowLeft size={16} />}
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>

                  {isDirty && (
                    <Button
                      variant="light"
                      color="orange"
                      onClick={handleReset}
                    >
                      Reset Form
                    </Button>
                  )}

                  <Button
                    type="submit"
                    loading={isSubmitting}
                    disabled={!isValid || isSubmitting}
                    leftSection={
                      !isSubmitting && <IconCircleDashedCheck size={16} />
                    }
                    loaderProps={{
                      size: 'sm',
                      color: currentThemeConfig.button.textColor
                    }}
                    style={{
                      backgroundColor: currentThemeConfig.button.color,
                      color: currentThemeConfig.button.textColor
                    }}
                  >
                    {isSubmitting ? 'Creating Employee...' : 'Create Employee'}
                  </Button>
                </Group>
              </Stack>
            </form>
          </Stack>
        </Card>
      </ThemeBackground>
    </Container>
  );
};

export default AddEmployee;
