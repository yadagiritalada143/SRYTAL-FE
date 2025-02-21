import { Button, Loader, PasswordInput, TextInput,Modal } from "@mantine/core";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginForm } from "../../../forms/login";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/common-services";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { BgDiv } from "../../../components/common/style-components/bg-div";
import { organizationThemeAtom } from "../../../atoms/organization-atom";
import { useRecoilValue } from "recoil";
import { useCustomToast } from "../../../utils/common/toast";
import { organizationAdminUrls } from "../../../utils/common/constants";
import ForgotPassword from "../../../components/common/forgetPassword/forgetPassword";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { showSuccessToast } = useCustomToast();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const Submit = async (formData: LoginForm) => {
    try {
      const data = await login(formData);
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("userRole", data.userRole);
      if (data.userRole === "admin") {
        showSuccessToast("Login successfully !");
        navigate(
          `${organizationAdminUrls(
            organizationConfig.organization_name
          )}/dashboard`
        );
      } else {
        toast.error("Not authorized to access");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          "Login failed: " + (error.response?.data?.message || "Unknown error")
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <BgDiv className="flex justify-center items-center h-screen px-4">
      <form
        onSubmit={handleSubmit(Submit)}
        style={{
          backgroundColor:
            organizationConfig.organization_theme.theme.backgroundColor,
        }}
        className="shadow-lg border rounded-lg p-6 max-w-md w-full"
      >
        <div className="flex flex-col items-center">
          <h1 className="text-3xl font-bold text-center mb-4">ADMIN LOGIN</h1>
          <img
            src={organizationConfig.organization_theme.logo}
            className="mb-4 p-4 max-h-40 object-contain"
            alt={organizationConfig.organization_name}
          />
        </div>
        <div className="mb-4">
          <TextInput
            {...register("email")}
            label="Email"
            error={errors.email?.message}
          />
        </div>
        <div className="mb-4">
          <PasswordInput
            {...register("password")}
            label="Password"
            error={errors.password?.message}
          />
        </div>
        <div className="flex flex-wrap justify-between items-center gap-4 mt-8">
          <div className="w-full md:w-auto flex justify-center md:justify-start order-2 md:order-1">
          <button
              type="button"
              onClick={() => setForgotPasswordOpen(true)}
              className="text-sm underline"
            >
              Forgot Password
            </button>
          </div>
          <div className="w-full md:w-auto flex justify-center order-1 md:order-2">
            <Button
              type="submit"
              data-testid="loginButton"
              className="w-1/2 md:w-auto"
              style={{
                minWidth: "200px",
              }}
              disabled={isSubmitting}
              leftSection={
                isSubmitting && (
                  <Loader
                    size="xs"
                    color={
                      organizationConfig.organization_theme.theme.button
                        .textColor
                    }
                  />
                )
              }
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </div>
        </div>
      </form>
      <Modal
        opened={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        title="Forgot Password"
        centered
        size="md"
      >
        <ForgotPassword closeModal={() => setForgotPasswordOpen(false)} />
      </Modal>
    </BgDiv>
  );
};

export default AdminLogin;
