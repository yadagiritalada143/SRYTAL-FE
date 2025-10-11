import { Button, Loader, PasswordInput, TextInput, Modal } from '@mantine/core';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginForm } from '../../../forms/login';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useMemo } from 'react';
import { organizationThemeAtom } from '../../../atoms/organization-atom';
import { useRecoilValue } from 'recoil';
import ForgotPassword from '../../../components/common/forgetPassword/forgetPassword';
import { themeAtom } from '../../../atoms/theme';
import { useSubmitAdminLogin } from './methods';
import { ThemeBackground } from '../../../components/UI/Theme-background/background';
import { ThemeForm } from '../../../components/UI/Form/form';
import { useCustomToast } from '../../../utils/common/toast';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { showErrorToast } = useCustomToast();
  const { organization = '' } = useParams<{ organization: string }>();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  });
  const isDarkTheme = useRecoilValue(themeAtom);

  const { submit } = useSubmitAdminLogin();

  const handleLogin = (formData: LoginForm) => {
    submit(formData, organization);
  };

  // Get the current theme configuration for form styling
  const currentThemeConfig = useMemo(() => {
    const orgTheme = organizationConfig.organization_theme;

    return isDarkTheme ? orgTheme.themes.dark : orgTheme.themes.light;
  }, [organizationConfig, isDarkTheme]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    const createdAt = localStorage.getItem('createdAt');

    if (token && userRole === 'admin' && createdAt) {
      const createdAtTime = new Date(createdAt).getTime();
      const now = Date.now();
      const diffInHours = (now - createdAtTime) / (1000 * 60 * 60);

      if (diffInHours <= 24) {
        navigate(`/${organization}/admin/dashboard`);
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('createdAt');
        showErrorToast('Session expired. Please login again.');
      }
    }
  }, [navigate, organization, showErrorToast]);

  return (
    <ThemeBackground className="flex justify-center items-center h-screen px-4">
      <ThemeForm onSubmit={handleSubmit(handleLogin)}>
        <div className="flex flex-col items-center">
          <div className="relative mb-6">
            <img
              src={organizationConfig.organization_theme.logo}
              className="max-h-32 object-contain transition-transform duration-300 hover:scale-105"
              alt={organizationConfig.organization_name}
            />
            <div
              className="absolute -inset-1 rounded-full opacity-20 blur-lg transition-opacity duration-300"
              style={{ backgroundColor: currentThemeConfig.button.color }}
            />
          </div>

          <div className="text-center mb-6">
            <h1
              className="text-2xl font-bold mb-2 transition-colors duration-300 ease-in-out"
              style={{ color: currentThemeConfig.color }}
            >
              Welcome Back
            </h1>
            <div className="flex items-center justify-center gap-2 mb-2">
              <div
                className="w-8 h-0.5 transition-colors duration-300"
                style={{ backgroundColor: currentThemeConfig.button.color }}
              />
              <span
                className="text-sm font-medium uppercase tracking-wider transition-colors duration-300"
                style={{ color: currentThemeConfig.button.color }}
              >
                Admin Portal
              </span>
              <div
                className="w-8 h-0.5 transition-colors duration-300"
                style={{ backgroundColor: currentThemeConfig.button.color }}
              />
            </div>
            <p
              className="text-sm opacity-70 transition-colors duration-300"
              style={{ color: currentThemeConfig.color }}
            >
              {organizationConfig.organization_name}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <TextInput
            {...register('email')}
            label="Email"
            autoComplete="off"
            error={errors.email?.message}
            onChange={e => {
              e.target.value = e.target.value.replace(/\s/g, '');
            }}
          />
        </div>

        <div className="mb-4">
          <PasswordInput
            {...register('password')}
            label="Password"
            error={errors.password?.message}
          />
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4 mt-8">
          <div className="w-full md:w-auto flex justify-center md:justify-start order-2 md:order-1">
            <button
              type="button"
              onClick={() => setForgotPasswordOpen(true)}
              className="text-sm underline hover:opacity-80 transition-all duration-300 ease-in-out"
              style={{ color: currentThemeConfig.linkColor }}
            >
              Forgot Password
            </button>
          </div>
          <div className="w-full md:w-auto flex justify-center order-1 md:order-2">
            <Button
              type="submit"
              data-testid="loginButton"
              className="w-1/2 md:w-auto"
              style={{ minWidth: '200px' }}
              disabled={isSubmitting}
              leftSection={
                isSubmitting && (
                  <Loader
                    size="xs"
                    color={currentThemeConfig.button.textColor}
                  />
                )
              }
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </Button>
          </div>
        </div>
      </ThemeForm>

      <Modal
        opened={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
        title="Reset your password"
        centered
        size="md"
        transitionProps={{
          transition: 'slide-right',
          duration: 300,
          timingFunction: 'ease'
        }}
      >
        <ForgotPassword closeModal={() => setForgotPasswordOpen(false)} />
      </Modal>
    </ThemeBackground>
  );
};

export default AdminLogin;
