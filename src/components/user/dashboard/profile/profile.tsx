import { useEffect, useState } from "react";
import Profile from "../../../common/profile/profile";
import { getUserDetails } from "../../../../services/common-services";
import { toast } from "react-toastify";
import { EmployeeInterface } from "../../../../interfaces/employee";

const EmployeeProfile = () => {
  const [employeeDetails, setEmployeeDetails] = useState<EmployeeInterface>({
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    userRole: "",
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
        setEmployeeDetails(user);
      })
      .catch((error) =>
        toast.error(error || error.message || error.response.data.message)
      );
  }, []);

  return (
    <>
      <Profile details={employeeDetails} />
    </>
  );
};

export default EmployeeProfile;
