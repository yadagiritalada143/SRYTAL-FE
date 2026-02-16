import { Button, Loader, PasswordInput, TextInput, Modal } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { LoginForm, loginSchema } from '../../../forms/login';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { login } from '../../../services/common-services';
import axios from 'axios';
import { useCustomToast } from '../../../utils/common/toast';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { organizationEmployeeUrls } from '../../../utils/common/constants';
import { userDetailsAtom } from '../../../atoms/user';
import ForgotPassword from '../../../components/common/forgetPassword/forgetPassword';
import { UserDetails } from '../../../interfaces/user';
import { IconLockPassword, IconLogin2, IconMail } from '@tabler/icons-react';
import { themeAtom } from '../../../atoms/theme';
import { ThemeBackground } from '../../../components/UI/Theme-background/background';
import { ThemeForm } from '../../../components/UI/Form/form';
import { getThemeConfig } from '../../../utils/common/theme-utils';

const EmployeeLogin = () => {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const { organization } = useParams<{ organization: string }>();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const setUser = useSetRecoilState(userDetailsAtom);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const isDarkTheme = useRecoilValue(themeAtom);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });
  const navigate = useNavigate();

  // Get the current theme configuration for form styling
  const currentThemeConfig = useMemo(() => {
    return getThemeConfig(organizationConfig, isDarkTheme);
  }, [organizationConfig, isDarkTheme]);

  const { backgroundColor, button, color, linkColor } = currentThemeConfig;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');

    if (token) {
      if (userRole === 'recruiter') {
        navigate(`/${organization}/employee/dashboard/pool-companies`);
      } else if (userRole === 'employee') {
        navigate(`/${organization}/employee/dashboard/profile`);
      }
    }
  }, [navigate, organization]);

  const Submit = async (formData: LoginForm) => {
    try {
      const data: UserDetails = await login(formData);
      setUser({
        firstName: data.firstName,
        lastName: data.lastName,
        userRole: data.userRole,
        passwordResetRequired: data.passwordResetRequired
      });

      if (data.userRole === 'recruiter') {
        navigate(
          `${organizationEmployeeUrls(
            organizationConfig.organization_name
          )}/dashboard/pool-companies`
        );
      } else {
        navigate(
          `${organizationEmployeeUrls(
            organizationConfig.organization_name
          )}/dashboard/profile`
        );
      }
      showSuccessToast('Login successfully !');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showErrorToast(
          'Login failed: ' + (error.response?.data?.message || 'Unknown error')
        );
      } else {
        showErrorToast('An unexpected error occurred.');
      }
    }
  };
  return (
    <ThemeBackground
      className="flex h-screen w-full transition-colors duration-500 ease-out"
      style={{
        background: `linear-gradient(135deg, ${backgroundColor} 0%, #f8f9fa 100%)`
      }}
    >
      {/* Left section */}
      <div
        className="hidden md:flex w-1/2 flex-col items-center justify-center p-8 transition-all duration-500 ease-out"
        style={{
          backgroundColor: backgroundColor,
          color: color,
          borderRadius: '0 100px 100px 0',
          boxShadow: '4px 0 12px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Logo at center */}
        <img
          src={organizationConfig.organization_theme.logo}
          alt={organizationConfig.organization_name}
          className="max-h-28 rounded-3xl object-contain transition-transform duration-300 ease-out hover:scale-105 mb-6"
        />

        {/* Welcome text */}
        <div className="text-center transition-colors duration-500 ease-out">
          <h2 className="text-5xl font-bold mb-5">Welcome Back !</h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div
              className="w-8 h-0.5 transition-colors duration-500 ease-out"
              style={{ backgroundColor: currentThemeConfig.button.color }}
            />
            <span
              className="text-sm font-medium uppercase tracking-wider transition-colors duration-500 ease-out"
              style={{ color: currentThemeConfig.button.color }}
            >
              Employee Portal
            </span>
            <div
              className="w-8 h-0.5 transition-colors duration-500 ease-out"
              style={{ backgroundColor: currentThemeConfig.button.color }}
            />
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex w-full md:w-1/2 justify-center items-center px-6">
        <ThemeForm
          onSubmit={handleSubmit(Submit)}
          className="shadow-lg border rounded-2xl p-8 max-w-md w-full transition-all duration-500 ease-out"
        >
          <h1
            className="text-3xl font-bold text-center mb-6 transition-colors duration-500 ease-out"
            style={{ color }}
          >
            Employee Login
          </h1>

          {/* Email input */}
          <div className="mb-4">
            <TextInput
              {...register('email')}
              label="Email"
              autoComplete="off"
              placeholder="Enter your email"
              error={errors.email?.message}
              classNames={{
                input: 'rounded-xl shadow-sm focus:border-blue-500',
                label: 'font-medium mb-1'
              }}
              leftSection={<IconMail size={18} />}
            />
          </div>

          {/* Password input */}
          <div className="mb-4">
            <PasswordInput
              {...register('password')}
              label="Password"
              placeholder="Password"
              error={errors.password?.message}
              leftSection={
                <span>
                  <IconLockPassword />
                </span>
              }
            />
          </div>

          {/* Forgot password */}
          <div className="flex justify-end items-center mt-4 mb-6">
            <button
              type="button"
              onClick={() => setForgotPasswordOpen(true)}
              className="text-sm hover:underline transition-colors"
              style={{ color: linkColor }}
            >
              Forgot Password?
            </button>
          </div>

          {/* Login button */}
          <Button
            type="submit"
            data-testid="loginButton"
            className="w-full rounded-full font-semibold transition-all duration-200"
            disabled={isSubmitting}
            style={{
              color: button.textColor
            }}
            styles={{
              root: {
                '&:hover': {
                  opacity: 0.9,
                  transform: 'scale(1.01)'
                },
                '&:disabled': {
                  opacity: 0.6,
                  cursor: 'not-allowed'
                }
              }
            }}
            leftSection={
              isSubmitting ? (
                <Loader size="xs" color={button.textColor} />
              ) : (
                <IconLogin2 size={18} />
              )
            }
          >
            {isSubmitting ? 'Logging in...' : 'Log in'}
          </Button>
        </ThemeForm>
      </div>

      {/* Forgot password modal */}
      <Modal
        opened={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        title="Forgot Password"
        centered
        size="md"
      >
        <ForgotPassword closeModal={() => setForgotPasswordOpen(false)} />
      </Modal>
    </ThemeBackground>
  );
};

export default EmployeeLogin;
