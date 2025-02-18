import { ReactNode, useEffect } from "react";
import { useRecoilState } from "recoil";
import { userDetailsAtom } from "../atoms/user";
import { getUserDetails } from "../services/common-services";
import { toast } from "react-toastify";
import { EmployeeInterface } from "../interfaces/employee";

interface UserProviderProps {
  children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useRecoilState(userDetailsAtom);

  useEffect(() => {
    const fetchUser = async () => {
      const adminToken = localStorage.getItem("adminToken");
      const employeeToken = localStorage.getItem("employeeToken");
      if (!adminToken && !employeeToken) {
        return;
      }
      try {
        const data: EmployeeInterface = await getUserDetails();
        setUser({
          firstName: data.firstName,
          lastName: data.lastName,
          userRole: data.userRole,
          passwordResetRequired: data.passwordResetRequired,
        });
      } catch (error: any) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    if (user.firstName === "") {
      fetchUser();
    }
  }, [user, setUser]);

  return <>{children}</>;
};

export default UserProvider;
