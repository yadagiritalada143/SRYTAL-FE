import { Button, Loader, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { organizationThemeAtom } from "../../../atoms/organization-atom";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = ({ closeModal }: { closeModal: () => void }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/forgotPassword",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      
      toast.success(response.data.message || "Reset Link Sent");
      closeModal(); 
    } catch (error:any) {
      console.error("API Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to send reset link. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <TextInput
        {...register("username", { required: "Email is required" })}
        label="Please Enter Your userName or Email"
        error={errors.email?.message ? String(errors.email?.message) : undefined}
      />
      <div className="flex justify-center">
      <Button
        type="submit"
        className="w-1/2 md:w-auto "
        style={{ maxWidth: "150px", backgroundColor:"lightblue" }}
        disabled={isSubmitting}
        leftSection={
          isSubmitting && (
            <Loader size="xs" color={organizationConfig.organization_theme.theme.button.textColor} />
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
