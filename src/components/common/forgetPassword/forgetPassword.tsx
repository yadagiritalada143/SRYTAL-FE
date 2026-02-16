import { Button, Loader, TextInput, Text, Group, Stack } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { useRecoilValue } from 'recoil';
import { useState, useMemo } from 'react';
import { forgetPassword } from '../../../services/common-services';
import { useCustomToast } from '../../../utils/common/toast';
import { themeAtom } from '../../../atoms/theme';
import { IconMail, IconLock, IconArrowLeft } from '@tabler/icons-react';
import { CancelStyledButton } from '../../UI/Buttons/buttons';

interface ForgotPasswordProps {
  closeModal: () => void;
}

const ForgotPassword = ({ closeModal }: ForgotPasswordProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<{ username: string }>();

  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const isDarkTheme = useRecoilValue(themeAtom);
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const emailValue = watch('username');

  // Get current theme configuration
  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;
    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  const onSubmit = async (data: { username: string }) => {
    setIsSubmitting(true);

    try {
      const response = await forgetPassword(data.username);
      showSuccessToast(
        response.message || 'Password reset link sent successfully!'
      );
      setEmailSent(true);
      setIsSubmitting(false);

      // Auto-close modal after 3 seconds on success
      setTimeout(() => {
        closeModal();
      }, 3000);
    } catch (error: any) {
      showErrorToast(
        error.response?.data?.message ||
          'Failed to send reset link. Please try again.'
      );
      setIsSubmitting(false);
    }
  };

  const handleBackToLogin = () => {
    setEmailSent(false);
    closeModal();
  };

  if (emailSent) {
    return (
      <Stack gap="lg" align="center" className="py-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
          style={{
            backgroundColor: `${currentThemeConfig.button.color}20`,
            border: `2px solid ${currentThemeConfig.button.color}`
          }}
        >
          <IconMail
            size={28}
            style={{ color: currentThemeConfig.button.color }}
          />
        </div>

        <div className="text-center">
          <Text
            size="lg"
            fw={600}
            mb="xs"
            style={{ color: currentThemeConfig.color }}
          >
            Check Your Email
          </Text>
          <Text
            size="sm"
            c="dimmed"
            mb="md"
            style={{ color: `${currentThemeConfig.color}80` }}
          >
            We've sent a temporary password to ${emailValue}
          </Text>
          <Text
            size="sm"
            fw={500}
            style={{ color: currentThemeConfig.button.color }}
          >
            {emailValue}
          </Text>
        </div>

        <Text
          size="xs"
          ta="center"
          c="dimmed"
          style={{ color: `${currentThemeConfig.color}60` }}
        >
          Didn't receive the email? Check your spam folder or try again.
        </Text>

        <Button
          variant="subtle"
          leftSection={<IconArrowLeft size={16} />}
          onClick={handleBackToLogin}
          style={{
            color: currentThemeConfig.linkColor,
            ':hover': {
              backgroundColor: `${currentThemeConfig.button.color}10`
            }
          }}
        >
          Back to Login
        </Button>
      </Stack>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack gap="lg">
        <div className="text-center mb-2">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3"
            style={{
              backgroundColor: `${currentThemeConfig.button.color}15`
            }}
          >
            <IconLock
              size={24}
              style={{ color: currentThemeConfig.button.color }}
            />
          </div>

          <Text
            size="sm"
            c="dimmed"
            style={{ color: `${currentThemeConfig.color}70` }}
          >
            Enter your email address and we'll send you a temporary password to
            reset your password.
          </Text>
        </div>

        {/* Email Input */}
        <TextInput
          {...register('username', {
            required: 'Email address is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Please enter a valid email address'
            }
          })}
          label="Email Address"
          autoComplete="off"
          placeholder="Enter your email address"
          size="md"
          leftSection={<IconMail size={16} />}
          error={errors.username?.message}
          onChange={e => {
            e.target.value = e.target.value.replace(/\s/g, '');
          }}
        />

        {/* Action Buttons */}
        <Group justify="space-between" mt="md">
          <CancelStyledButton
            size="md"
            label="Cancel"
            variant="subtle"
            onClick={(e: { preventDefault: () => void }) => {
              e.preventDefault();
              closeModal();
            }}
            disabled={isSubmitting}
            color={currentThemeConfig.button.color}
          >
            Cancel
          </CancelStyledButton>

          <Button
            type="submit"
            disabled={isSubmitting}
            loading={isSubmitting}
            style={{
              backgroundColor: currentThemeConfig.button.color,
              color: currentThemeConfig.button.textColor,
              minWidth: '120px'
            }}
            leftSection={
              isSubmitting ? (
                <Loader size="xs" color={currentThemeConfig.button.textColor} />
              ) : (
                <IconMail size={16} />
              )
            }
          >
            {isSubmitting ? 'Sending...' : 'Send '}
          </Button>
        </Group>

        {/* Helper Text */}
        <Text
          size="xs"
          ta="center"
          c="dimmed"
          style={{ color: `${currentThemeConfig.color}50` }}
        >
          Remember your password?{' '}
          <button
            type="button"
            onClick={closeModal}
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: currentThemeConfig.linkColor }}
          >
            Back to Login
          </button>
        </Text>
      </Stack>
    </form>
  );
};

export default ForgotPassword;
