import { zodResolver } from '@hookform/resolvers/zod';
import {
  AddCompanyForm,
  addCompanySchema
} from '../../../../forms/add-company';
import { useForm } from 'react-hook-form';
import {
  Button,
  TextInput,
  Container,
  Card,
  Stack,
  Text,
  Group,
  Divider,
  Loader
} from '@mantine/core';
import { addCompanyByRecruiter } from '../../../../services/user-services';
import { toast } from 'react-toastify';
import {
  IconCircleDashedCheck,
  IconArrowLeft,
  IconBuilding
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { themeAtom } from '../../../../atoms/theme';
import { useMediaQuery } from '@mantine/hooks';
import { useMemo } from 'react';

const AddCompany = () => {
  const navigate = useNavigate();
  const isDarkTheme = useRecoilValue(themeAtom);
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isSmallMobile = useMediaQuery('(max-width: 500px)');

  // Get the current theme configuration
  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset
  } = useForm<AddCompanyForm>({
    resolver: zodResolver(addCompanySchema)
  });

  const onSubmit = async (data: AddCompanyForm) => {
    try {
      await addCompanyByRecruiter(data);
      reset();
      toast.success('Company added successfully!', {
        icon: <IconCircleDashedCheck width={24} height={24} />
      });
      navigate(-1);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to add company');
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container
      size="xl"
      py="md"
      my="xl"
      px={isSmallMobile ? 'xs' : 'md'}
      style={{
        backgroundColor: currentThemeConfig.backgroundColor
      }}
    >
      <Stack gap="md">
        {/* Header Card */}
        <Card shadow="sm" p={isMobile ? 'md' : 'lg'} radius="md" withBorder>
          <Group justify="space-between" wrap={isMobile ? 'wrap' : 'nowrap'}>
            <Group gap="sm">
              <IconBuilding size={isMobile ? 24 : 28} />
              <Text
                size={isMobile ? 'lg' : 'xl'}
                fw={700}
                ta={isMobile ? 'center' : 'left'}
              >
                Add New Company
              </Text>
            </Group>
            <Button
              leftSection={<IconArrowLeft size={16} />}
              onClick={handleGoBack}
              variant="light"
              size={isMobile ? 'sm' : 'md'}
              fullWidth={isMobile}
            >
              Go Back
            </Button>
          </Group>
        </Card>

        {/* Form Card */}
        <Card shadow="sm" p={isMobile ? 'md' : 'xl'} radius="md" withBorder>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="lg">
              {/* Company Name Section */}
              <div>
                <Text size="lg" fw={600} mb="md">
                  Company Information
                </Text>
                <TextInput
                  {...register('companyName')}
                  label="Company Name"
                  placeholder="Enter company name"
                  error={errors.companyName?.message}
                  size={isMobile ? 'sm' : 'md'}
                  withAsterisk
                  autoComplete="off"
                />
              </div>

              <Divider />

              {/* Primary Contact Section */}
              <div>
                <Text size="lg" fw={600} mb="md">
                  Primary Contact
                </Text>
                <Stack gap="md">
                  <TextInput
                    {...register('primaryContact.name')}
                    label="Name"
                    placeholder="Enter contact name"
                    error={errors.primaryContact?.name?.message}
                    size={isMobile ? 'sm' : 'md'}
                    withAsterisk
                    autoComplete="off"
                  />
                  <TextInput
                    {...register('primaryContact.email')}
                    label="Email"
                    placeholder="Enter email address"
                    error={errors.primaryContact?.email?.message}
                    size={isMobile ? 'sm' : 'md'}
                    type="email"
                    withAsterisk
                    autoComplete="off"
                  />
                  <TextInput
                    {...register('primaryContact.phone')}
                    label="Phone"
                    placeholder="Enter phone number"
                    error={errors.primaryContact?.phone?.message}
                    size={isMobile ? 'sm' : 'md'}
                    withAsterisk
                    autoComplete="off"
                  />
                </Stack>
              </div>

              <Divider />

              {/* Secondary Contacts Section */}
              <div>
                <Text size="lg" fw={600} mb="md">
                  Secondary Contacts (Optional)
                </Text>

                {/* Responsive Grid for Secondary Contacts */}
                <Stack gap="lg">
                  {/* Secondary Contact 1 */}
                  <Card p="md" withBorder>
                    <Stack gap="md">
                      <Text size="md" fw={500} c="dimmed">
                        Secondary Contact 1
                      </Text>
                      <TextInput
                        {...register('secondaryContact_1.name')}
                        label="Name"
                        placeholder="Enter contact name"
                        error={errors.secondaryContact_1?.name?.message}
                        size={isMobile ? 'sm' : 'md'}
                        autoComplete="off"
                      />
                      <TextInput
                        {...register('secondaryContact_1.email')}
                        label="Email"
                        placeholder="Enter email address"
                        error={errors.secondaryContact_1?.email?.message}
                        size={isMobile ? 'sm' : 'md'}
                        type="email"
                        autoComplete="off"
                      />
                      <TextInput
                        {...register('secondaryContact_1.phone')}
                        label="Phone"
                        placeholder="Enter phone number"
                        error={errors.secondaryContact_1?.phone?.message}
                        size={isMobile ? 'sm' : 'md'}
                        autoComplete="off"
                      />
                    </Stack>
                  </Card>

                  {/* Secondary Contact 2 */}
                  <Card p="md" withBorder>
                    <Stack gap="md">
                      <Text size="md" fw={500} c="dimmed">
                        Secondary Contact 2
                      </Text>
                      <TextInput
                        {...register('secondaryContact_2.name')}
                        label="Name"
                        placeholder="Enter contact name"
                        error={errors.secondaryContact_2?.name?.message}
                        size={isMobile ? 'sm' : 'md'}
                        autoComplete="off"
                      />
                      <TextInput
                        {...register('secondaryContact_2.email')}
                        label="Email"
                        placeholder="Enter email address"
                        error={errors.secondaryContact_2?.email?.message}
                        size={isMobile ? 'sm' : 'md'}
                        type="email"
                        autoComplete="off"
                      />
                      <TextInput
                        {...register('secondaryContact_2.phone')}
                        label="Phone"
                        placeholder="Enter phone number"
                        error={errors.secondaryContact_2?.phone?.message}
                        size={isMobile ? 'sm' : 'md'}
                        autoComplete="off"
                      />
                    </Stack>
                  </Card>
                </Stack>
              </div>

              <Divider />

              {/* Submit Button */}
              <Group justify="flex-end" mt="md">
                <Button
                  type="button"
                  variant="light"
                  onClick={handleGoBack}
                  disabled={isSubmitting}
                  size={isMobile ? 'sm' : 'md'}
                  fullWidth={isMobile}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size={isMobile ? 'sm' : 'md'}
                  fullWidth={isMobile}
                  leftSection={
                    isSubmitting ? (
                      <Loader size="xs" color="white" />
                    ) : (
                      <IconBuilding size={16} />
                    )
                  }
                >
                  {isSubmitting ? 'Adding Company...' : 'Add Company'}
                </Button>
              </Group>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Container>
  );
};

export default AddCompany;
