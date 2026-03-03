import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import PackagesFormComponent from './add-package';
import { useAppTheme } from '@hooks/use-app-theme';

const PackagePageWrapper = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const { themeConfig: currentThemeConfig, organizationConfig, isDarkTheme } = useAppTheme();
  

  if (!employeeId) return <div>Invalid employee ID</div>;

  return (
    <PackagesFormComponent
      organizationConfig={organizationConfig}
      employeeId={employeeId}
    />
  );
};

export default PackagePageWrapper;
