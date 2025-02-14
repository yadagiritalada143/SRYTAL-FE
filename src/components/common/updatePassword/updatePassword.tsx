import { Modal, PasswordInput, Button } from "@mantine/core";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { organizationThemeAtom } from "../../../atoms/organization-atom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  updatePasswordSchema,
  UpdatePasswordForm,
} from "../../../forms/update-password";
import { updatePasswordForEmployee } from "../../../services/user-services";
import { useRecoilValue } from "recoil";

interface ChangePasswordPopupProps {
  opened: boolean;
  close: () => void;
}

interface UpdatePasswordResponse {
  success: boolean;
  message?: string;
}

const ChangePasswordPopup: React.FC<ChangePasswordPopupProps> = ({
  opened,
  close,
}) => {
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const [isLoading, setIsLoading] = useState(false);

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
      toast.error("New password and confirm password do not match !");
      return;
    }
    setIsLoading(true);

    try {
      const response: UpdatePasswordResponse = await updatePasswordForEmployee(
        data
      );

      if (response.success) {
        close();
        toast.success("Password updated successfully");
        reset();
        close();
      } else {
        toast.error(response.message || "Failed to update password !");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong !");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal opened={opened} onClose={close} size="md" centered>
      <div className="flex justify-center items-center p-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full">
          <PasswordInput
            {...register("oldPassword")}
            label="Enter the old password"
            error={errors.oldPassword?.message}
          />
          <PasswordInput
            {...register("newPassword")}
            label="Enter the new password"
            error={errors.newPassword?.message}
          />
          <PasswordInput
            {...register("confirmNewPassword")}
            label="Confirm the new password"
            error={errors.confirmNewPassword?.message}
          />
          <div className="text-right mt-4">
            <Button
              bg={organizationConfig.organization_theme.theme.backgroundColor}
              c={organizationConfig.organization_theme.theme.color}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Updating... " : "Update"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ChangePasswordPopup;
