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
      <div className="flex mx-4 my-4">
        {" "}
        {/* Reduced margin */}
        <ProfileImageUploader organizationConfig={organizationConfig} />
        <div className="ml-4">
          {" "}
          {/* Reduced margin */}
          <div className="grid grid-cols-2 gap-2">
            {" "}
            {/* Reduced gap */}
            {details?.employeeId && (
              <>
                <div className="font-bold">Employee Id:</div>
                <div>{details.employeeId}</div>
              </>
            )}
            {details?.firstName && (
              <>
                <div className="font-bold">First Name:</div>
                <div>{details.firstName}</div>
              </>
            )}
            {details?.lastName && (
              <>
                <div className="font-bold">Last Name:</div>
                <div>{details.lastName}</div>
              </>
            )}
            {details?.dob && (
              <>
                <div className="font-bold">Date Of Birth:</div>
                <div>{details.dob}</div>
              </>
            )}
            {details?.bloodGroup?.type && (
              <>
                <div className="font-bold">Blood Group:</div>
                <div>{details.bloodGroup.type}</div>
              </>
            )}
            {details?.email && (
              <>
                <div className="font-bold">Email:</div>
                <div>{details.email}</div>
              </>
            )}
            {details?.mobileNumber && (
              <>
                <div className="font-bold">Mobile:</div>
                <div>{details.mobileNumber}</div>
              </>
            )}
            {/* <div className="font-bold">Present Address:</div>
            <div>{details?.presentAddress}</div>
            <div className="font-bold">Permanent Address:</div>
            <div>{details?.permanentAddress}</div> */}
          </div>
        </div>
      </div>
      <div style={{ padding: "10px" }}>
        {" "}
        {/* Reduced padding */}
        <Tabs
          mt="md"
          variant="pills"
          defaultValue="employment"
          color={theme.colors.primary[4]}
        >
          <Tabs.List className="my-2" grow>
            {" "}
            {/* Reduced margin */}
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

          <Tabs.Panel style={{ padding: "5px 0" }} value="address">
            {" "}
            {/* Reduced padding */}
            <div className="flex justify-start">
            <div className="grid grid-cols-2 gap-2 text-start">
              {" "}
              {/* Reduced gap */}
              <div className="font-bold">Present Address:</div>
              <div>{details?.presentAddress}</div>
              <div className="font-bold">Permanent Address:</div>
              <div>{details?.permanentAddress}</div>
            </div>
            </div>
          </Tabs.Panel>
            <Tabs.Panel style={{ padding: "5px 0" }} value="employment">
              {/* Centering the panel while keeping content left-aligned */}
              <div className="flex justify-center">
                <div className="grid grid-cols-2 gap-2 text-left">
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

          <Tabs.Panel style={{ padding: "5px 0" }} value="bankDetails">
            {" "}
            {/* Reduced padding */}
            <div className="flex justify-end">
            <div className="grid grid-cols-2 gap-2 text-left">
              {" "}
              {/* Reduced gap */}
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
