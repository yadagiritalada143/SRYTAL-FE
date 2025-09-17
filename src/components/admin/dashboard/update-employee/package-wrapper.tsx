import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import PackagesFormComponent from './add-package';

const PackagePageWrapper = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  if (!employeeId) return <div>Invalid employee ID</div>;

  return (
    <PackagesFormComponent
      organizationConfig={organizationConfig}
      employeeId={employeeId}
    />
  );
};

export default PackagePageWrapper;
