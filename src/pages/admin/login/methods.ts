import { organizationAdminUrls } from '../../../utils/common/constants';
import { login } from '../../../services/common-services';
import axios from 'axios';
import { useCustomToast } from '../../../utils/common/toast';
import { LoginForm } from '../../../forms/login';
import { useNavigate } from 'react-router-dom';

export const useSubmitAdminLogin = () => {
  const { showSuccessToast, showErrorToast } = useCustomToast();
  const navigate = useNavigate();

  const submit = async (formData: LoginForm, name: string) => {
    try {
      const data = await login(formData);

      if (data.userRole === 'admin') {
        showSuccessToast('Login successfully!');
        navigate(`${organizationAdminUrls(name)}/dashboard`);
      } else {
        showErrorToast('Not authorized to access');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        showErrorToast(
          'Login failed: ' + (error.response?.data?.message ?? 'Unknown error')
        );
      } else {
        showErrorToast('An unexpected error occurred.');
      }
    }
  };

  return { submit };
};
