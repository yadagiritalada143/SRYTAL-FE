import { Button, Loader, TextInput } from "@mantine/core";
import { useForm } from "react-hook-form";
import { organizationThemeAtom } from "../../../atoms/organization-atom";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
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
    } catch (error:any) {
      console.error("API Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Failed to send reset link. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen px-4" id="forgot-password">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="shadow-lg border rounded-lg p-6 max-w-md w-full"
        style={{
          backgroundColor: organizationConfig.organization_theme.theme.backgroundColor,
        }}
      >
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center mb-4">FORGOT PASSWORD</h1>
          <img
            src={organizationConfig.organization_theme.logo}
            className="mb-4 p-4 max-h-40 object-contain"
            alt={organizationConfig.organization_name}
          />
        </div>
        <div className="mb-4">
          <TextInput
            {...register("email", { required: "Email is required" })}
            label="UserName or Email"
            error={errors.email?.message ? String(errors.email?.message) : undefined}
          />
        </div>
        <div className="flex justify-center items-center gap-4 mt-8">
          <Button
            type="submit"
            className="w-1/2 md:w-auto"
            style={{ minWidth: "150px" }}
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
    </div>
  );
};

export default ForgotPassword;
