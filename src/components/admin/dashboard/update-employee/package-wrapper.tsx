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
    <div className="flex flex-col items-center py-8 px-4 w-full md:py-12 md:px-0 md:space-y-8">
      <BgDiv className="w-full md:w-auto">
        <div
          style={{
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
          }}
          className="rounded-lg shadow-lg w-full max-w-4xl p-4 sm:p-6 md:p-9"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4 sm:gap-12 md:gap-12 mb-6 sm:mb-8 md:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold underline text-center sm:text-left w-full sm:w-auto break-words">
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
