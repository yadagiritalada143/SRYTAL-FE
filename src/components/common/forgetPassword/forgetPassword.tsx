import { Button, Loader, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { organizationThemeAtom } from "../../../atoms/organization-atom";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import { toast } from "react-toastify";
import { forgetPassword } from "../../../services/common-services";
import { useCustomToast } from "../../../utils/common/toast";

const ForgotPassword = ({ closeModal }: { closeModal: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const { showSuccessToast } = useCustomToast();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    forgetPassword(data.username)
      .then((response) => {
        showSuccessToast(response.message || "Reset Link Sent");
        closeModal();
        setIsSubmitting(false);
      })
      .catch((error) => {
        toast.error(
          error.response?.data?.message ||
            "Failed to send reset link. Try again."
        );
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <TextInput
        {...register("username", { required: "Email is required" })}
        label="Please Enter Your Email"
        error={
          errors.email?.message ? String(errors.email?.message) : undefined
        }
      />
      <div className="flex justify-center">
        <Button
          type="submit"
          disabled={isSubmitting}
          bg={organizationConfig.organization_theme.theme.backgroundColor}
          c={organizationConfig.organization_theme.theme.color}
          variant="outline"
          leftSection={
            isSubmitting && (
              <Loader
                size="xs"
                color={
                  organizationConfig.organization_theme.theme.button.textColor
                }
              />
            )
          }
        >
          {isSubmitting ? "Sending..." : "Send"}
        </Button>
      </div>
    </form>
  );
};

export default ForgotPassword;
