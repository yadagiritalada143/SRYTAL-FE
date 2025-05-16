import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import PackagesFormComponent from './add-package';
import { BgDiv } from '../../../common/style-components/bg-div';
import { BackButton } from '../../../common/style-components/buttons';

const PackagePageWrapper = () => {
  const { employeeId } = useParams<{ employeeId: string }>();
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  if (!employeeId) return <div>Invalid employee ID</div>;

  return (
    <div className="flex flex-col items-center py-12 space-y-8">
      <BgDiv>
        <div
          style={{
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
          }}
          className="rounded-lg shadow-lg w-full max-w-4xl p-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-12 mb-8">
            <h2 className="text-lg sm:text-2xl md:text-3xl font-bold underline text-center sm:text-left w-full sm:w-auto">
              Assign Employee Packages
            </h2>
            <div className="w-full sm:w-auto flex justify-center sm:justify-end">
              <BackButton id={employeeId} />
            </div>
          </div>

          <PackagesFormComponent
            organizationConfig={organizationConfig}
            employeeId={employeeId}
          />
        </div>
      </BgDiv>
    </div>
  );
};

export default PackagePageWrapper;
