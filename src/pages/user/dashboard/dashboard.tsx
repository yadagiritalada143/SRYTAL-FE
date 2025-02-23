import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { IconMenu2 } from "@tabler/icons-react";
import EmployeeNavbar from "../../../components/common/navbar/navbar";
import { NavLinks } from "../../../utils/user/user-nav-links";
import { Modal, PasswordInput, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  updatePasswordSchema,
  UpdatePasswordForm,
} from "../../../forms/update-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordForEmployee } from "../../../services/user-services";
import { useMantineTheme } from "@mantine/core";
import Header from "../../../components/common/header/header";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { organizationThemeAtom } from "../../../atoms/organization-atom";
import { userDetailsAtom } from "../../../atoms/user";

const EmployeeDashboard = () => {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const theme = useMantineTheme();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const user = useRecoilValue(userDetailsAtom);
  const setUser = useSetRecoilState(userDetailsAtom);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UpdatePasswordForm>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  useEffect(() => {
    if (
      user &&
      user.passwordResetRequired &&
      user.passwordResetRequired === "true"
    ) {
      open();
    }
  }, [user, open]);

  const onSubmit = (data: UpdatePasswordForm) => {
    setIsLoading(true);
    if (data.newPassword === data.confirmNewPassword) {
      updatePasswordForEmployee(data)
        .then((response) => {
          if (response.success) {
            setUser({ ...user, passwordResetRequired: "false" });
            close();
          }
        })
        .catch((error: any) =>
          toast.error(
            error || error.response.data.message || "something went wrong"
          )
        );
    } else {
      toast.error("New password and confirm password doesn't match");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className="flex min-h-screen relative"
        style={{
          color: organizationConfig.organization_theme.theme.color,
        }}
      >
        <div className="lg:hidden fixed top-4 z-50">
          <button onClick={toggleDrawer} className="p-2 rounded-md">
            {!isDrawerOpen && (
              <IconMenu2
                size={24}
                color={
                  organizationConfig.organization_theme.theme.button.textColor
                }
              />
            )}
          </button>
        </div>

        <div
          ref={drawerRef}
          className={`fixed inset-y-0 left-0 w-64 min-w-64 shadow-lg z-40 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
            isDrawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <EmployeeNavbar
            navLinks={NavLinks}
            organizationConfig={organizationConfig}
            isDrawerOpen={isDrawerOpen}
            toggleDrawer={toggleDrawer}
          />
        </div>

        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-gray-900 bg-opacity-50 z-30 lg:hidden"
            onClick={toggleDrawer}
          ></div>
        )}

        <div
          style={{
            color: theme.colors.primary[8],
            backgroundImage: `linear-gradient(to right, ${theme.colors.primary[1]}, ${theme.colors.primary[5]})`,
            fontFamily: theme.fontFamily,
          }}
          className="flex-grow p-6 transition-all duration-300 z-20 overflow-hidden"
        >
          <div className="my-2">
            <Header
              color={
                organizationConfig.organization_theme.theme.button.textColor
              }
              organization={organizationConfig.organization_name}
            />
          </div>
          <div className="h-full overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={() => toast.error("Please update your password")}
        size="md"
        centered
        style={{
          backgroundColor:
            organizationConfig.organization_theme.theme.backgroundColor,
        }}
      >
        <div className=" flex justify-center items-center">
          <form onSubmit={handleSubmit(onSubmit)} className="p-2 w-full">
            <PasswordInput
              {...register("oldPassword")}
              label="Enter the old password"
              error={errors.oldPassword?.message}
            />
            <PasswordInput
              {...register("newPassword")}
              label="Enter the new password"
              error={errors.newPassword?.message}
            />
            <PasswordInput
              {...register("confirmNewPassword")}
              label="Confirm the new password"
              error={errors.confirmNewPassword?.message}
            />
            <div className="text-right mt-4">
              <Button
                bg={organizationConfig.organization_theme.theme.backgroundColor}
                c={organizationConfig.organization_theme.theme.color}
                disabled={isLoading}
                onClick={close}
                type="submit"
              >
                {isLoading ? "Updating " : "Update"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default EmployeeDashboard;
