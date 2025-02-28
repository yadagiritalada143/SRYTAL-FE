import { useEffect, useState } from "react";
import Profile from "../../../common/profile/profile";
import { getUserDetails } from "../../../../services/common-services";
import { toast } from "react-toastify";
import { EmployeeInterface } from "../../../../interfaces/employee";

const AdminProfile = () => {
  const [adminDetails, setAdminDetails] = useState<EmployeeInterface>({
    _id: "",
    employeeId:"",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    dob:"",
    presentAddress:"",
    permanentAddress:"",
    userRole: "",
    passwordResetRequired: "false",
    employeeRole: [{ _id: "", designation: "" }],
    bloodGroup: { _id: "", type: "" },
    employmentType: { _id: "", employmentType: "" },
    bankDetailsInfo: {
      accountNumber: "",
      accountHolderName: "",
      ifscCode: "",
    },
  });

  useEffect(() => {
    getUserDetails()
      .then((user) => {
        setAdminDetails(user);
      })
      .catch((error) =>
        toast.error(error || error.message || error.response.data.message)
      );
  }, []);

  return (
    <>
      <Profile details={adminDetails} />
    </>
  );
};

export default AdminProfile;
