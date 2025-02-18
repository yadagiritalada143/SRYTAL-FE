  import { Button, Loader, PasswordInput, TextInput } from "@mantine/core";
  import { useForm } from "react-hook-form";
  import { LoginForm, loginSchema } from "../../../forms/login";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { Link, useNavigate } from "react-router-dom";
  import { login } from "../../../services/common-services";
  import { toast } from "react-toastify";
  import axios from "axios";
  import { BgDiv } from "../../../components/common/style-components/bg-div";
  import { useCustomToast } from "../../../utils/common/toast";
  import { organizationThemeAtom } from "../../../atoms/organization-atom";
  import { useRecoilValue, useSetRecoilState } from "recoil";
  import { organizationEmployeeUrls } from "../../../utils/common/constants";
  import { userDetailsAtom } from "../../../atoms/user";

  const EmployeeLogin = () => {
    const { showSuccessToast } = useCustomToast();
    const organizationConfig = useRecoilValue(organizationThemeAtom);
    const setUser = useSetRecoilState(userDetailsAtom);
    const {
      register,
      formState: { errors, isSubmitting },
      handleSubmit,
    } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
    const navigate = useNavigate();

    const Submit = async (formData: LoginForm) => {
      try {
        const data = await login(formData);
        localStorage.setItem("employeeToken", data.token);
        localStorage.setItem("userRole", data.userRole);
        setUser({
          firstName: data.firstName,
          lastName: data.lastName,
          userRole: data.userRole,
          passwordResetRequired: data.passwordResetRequired,
        });

        if (data.userRole === "recruiter") {
          navigate(
            `${organizationEmployeeUrls(
              organizationConfig.organization_name
            )}/dashboard`
          );
        } else {
          navigate(
            `${organizationEmployeeUrls(
              organizationConfig.organization_name
            )}/dashboard/profile`
          );
        }
        showSuccessToast("Login successfully !");
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
          className=" shadow-lg border rounded-lg p-6 max-w-md w-full"
          style={{
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
          }}
        >
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-center mb-4">
              EMPLOYEE LOGIN
            </h1>
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
              <Link
                to="/comm/forgot-password"
                style={{
                  textDecoration: "underline",
                }}
                className="text-sm"
              >
                Forgot Password
              </Link>
            </div>
            <div className="w-full md:w-auto flex justify-center order-1 md:order-2">
              <Button
                type="submit"
                data-testid="loginButton"
                className="w-1/2 md:w-auto"
                style={{ minWidth: "200px" }}
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
      </BgDiv>
    );
  };

  export default EmployeeLogin;
