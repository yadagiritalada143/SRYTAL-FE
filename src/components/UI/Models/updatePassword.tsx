import { PasswordInput, Button, Text, Title, Stack } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { StandardModal } from './base-model';
import {
  updatePasswordSchema,
  UpdatePasswordForm,
} from '../../../forms/update-password';
import { updatePasswordForEmployee } from '../../../services/user-services';
import { useCustomToast } from '../../../utils/common/toast';
interface ChangePasswordPopupProps {
  opened: boolean;
  close: () => void;
  forceUpdate?: boolean;
}

interface UpdatePasswordResponse {
  success: boolean;
  message?: string;
}

export const ChangePasswordPopup: React.FC<ChangePasswordPopupProps> = ({
  opened,
  close,
  forceUpdate = false,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { showSuccessToast } = useCustomToast();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UpdatePasswordForm>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async (data: UpdatePasswordForm) => {
    if (data.newPassword !== data.confirmNewPassword) {
      toast.error('New password and confirmation do not match');
      return;
    }
    setIsLoading(true);

    try {
      const response: UpdatePasswordResponse =
        await updatePasswordForEmployee(data);

      if (response.success) {
        showSuccessToast('Password updated successfully');
        reset();
        close();
      } else {
        toast.error(response.message || 'Failed to update password');
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          'An error occurred while updating password'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StandardModal
      opened={opened}
      onClose={close}
      forceAction={forceUpdate}
      title={<Title order={3}>Update Your Password</Title>}
    >
      <Text size="sm" color="dimmed" mb="lg">
        For security reasons, please update your password regularly.
      </Text>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <PasswordInput
            {...register('oldPassword')}
            label="Current Password"
            placeholder="Enter your current password"
            error={errors.oldPassword?.message}
            withAsterisk
          />

          <PasswordInput
            {...register('newPassword')}
            label="New Password"
            placeholder="Enter your new password"
            error={errors.newPassword?.message}
            withAsterisk
          />

          <PasswordInput
            {...register('confirmNewPassword')}
            label="Confirm New Password"
            placeholder="Re-enter your new password"
            error={errors.confirmNewPassword?.message}
            withAsterisk
          />

          <div className="flex justify-end gap-3 mt-4">
            {!forceUpdate && (
              <Button variant="outline" onClick={close} disabled={isLoading}>
                Cancel
              </Button>
            )}
            <Button type="submit" loading={isLoading} disabled={isLoading}>
              Update Password
            </Button>
          </div>
        </Stack>
      </form>
    </StandardModal>
  );
};
