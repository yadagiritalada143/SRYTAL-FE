import { useEffect, useState } from "react";
import Profile from "../../../common/profile/profile";
import { getUserDetails } from "../../../../services/common-services";
import { toast } from "react-toastify";
import { EmployeeInterface } from "../../../../interfaces/employee";

const EmployeeProfile = () => {
  const [employeeDetails, setEmployeeDetails] = useState<EmployeeInterface>({
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
        setEmployeeDetails({
          ...user,
          dob: user.dateOfBirth ? formatDate(user.dateOfBirth) : "",
        });
      })
      .catch((error) =>
        toast.error(error || error.message || error.response.data.message)
      );
  }, []);
  const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-US", { month: "short" });
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Profile details={employeeDetails} />
    </>
  );
};

export default EmployeeProfile;
