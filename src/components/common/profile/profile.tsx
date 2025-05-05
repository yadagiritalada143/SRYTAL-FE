import { Code, Tabs } from "@mantine/core";
import { EmployeeInterface } from "../../../interfaces/employee";
import ProfileImageUploader from "../profile-image/profile-image";
import { useMantineTheme } from "@mantine/core";
import { organizationThemeAtom } from "../../../atoms/organization-atom";
import { useRecoilValue } from "recoil";
import { ColorDiv } from "../style-components/c-div";

const Profile = ({ details }: { details: EmployeeInterface }) => {
  const theme = useMantineTheme();
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  return (
    <ColorDiv>
      <div className="flex flex-col sm:flex-row mx-4 my-4 gap-4">
        <ProfileImageUploader organizationConfig={organizationConfig} />
        <div className="flex-1 p-2">
          <div className=" sm:grid-cols-2 gap-x-4 gap-y-2 ">
            {details?.employeeId && (
              <div className="flex items-center">
                <div className="font-bold w-1/3">Employee Id:</div>
                <div>{details.employeeId}</div>
              </div>
            )}
            {details?.firstName && (
              <div className="flex items-center">
                <div className="font-bold w-1/3">First Name:</div>
                <div>{details.firstName}</div>
              </div>
            )}
            {details?.lastName && (
              <div className="flex items-center">
                <div className="font-bold w-1/3">Last Name:</div>
                <div>{details.lastName}</div>
              </div>
            )}
            {details?.dob && (
              <div className="flex items-center">
                <div className="font-bold w-1/3">Date Of Birth:</div>
                <div>{details.dob}</div>
              </div>
            )}
            {details?.bloodGroup?.type && (
              <div className="flex items-center">
                <div className="font-bold w-1/3">Blood Group:</div>
                <div>{details.bloodGroup.type}</div>
              </div>
            )}
            {details?.email && (
              <div className="flex items-center">
                <div className="font-bold w-1/3">Email:</div>
                <div>{details.email}</div>
              </div>
            )}
            {details?.mobileNumber && (
              <div className="flex items-center">
                <div className="font-bold w-1/3">Mobile:</div>
                <div>{details.mobileNumber}</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="p-2">
        <Tabs
          mt="md"
          variant="pills"
          defaultValue="employment"
          color={theme.colors.primary[4]}
        >
          <Tabs.List className="mb-4" grow>
            <Tabs.Tab className="font-bold" value="address">
              Address
            </Tabs.Tab>
            <Tabs.Tab className="font-bold" value="employment">
              Employment Details
            </Tabs.Tab>
            <Tabs.Tab className="font-bold" value="bankDetails">
              Bank Details
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel className="py-2" value="address">
            <div className="flex justify-start">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left ">
                <div className="font-bold">Present Address:</div>
                <div>{details?.presentAddress}</div>
                <div className="font-bold">Permanent Address:</div>
                <div>{details?.permanentAddress}</div>
              </div>
            </div>
          </Tabs.Panel>
          <Tabs.Panel className="py-2" value="employment">
            <div className="flex justify-center">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                <div className="font-bold">Employment Type:</div>
                <div>{details.employmentType?.employmentType || "N/A"}</div>
                <div className="font-bold">Employment Roles:</div>
                <div className="flex flex-col">
                  {details.employeeRole.length > 0
                    ? details.employeeRole.map((role) => (
                        <Code key={role._id} className="mb-1">
                          {role.designation}
                        </Code>
                      ))
                    : "N/A"}
                </div>
              </div>
            </div>
          </Tabs.Panel>

          <Tabs.Panel className="py-2" value="bankDetails">
            <div className="flex justify-center md:justify-end">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
                <div className="font-bold">Account Number:</div>
                <div>{details.bankDetailsInfo?.accountNumber || "N/A"}</div>
                <div className="font-bold">Account Holder Name:</div>
                <div>{details.bankDetailsInfo?.accountHolderName || "N/A"}</div>
                <div className="font-bold">IFSC Code:</div>
                <div>{details.bankDetailsInfo?.ifscCode || "N/A"}</div>
              </div>
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>
    </ColorDiv>
  );
};

export default Profile;
