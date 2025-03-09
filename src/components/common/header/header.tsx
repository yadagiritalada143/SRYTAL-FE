import { Avatar, Menu, rem } from "@mantine/core";
import {
  IconLogout,
  IconSettings,
  IconUser,
  IconPasswordUser,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { commonUrls } from "../../../utils/common/constants";
import { useRecoilState, useRecoilValue } from "recoil";
import { userDetailsAtom } from "../../../atoms/user";
import { useDisclosure } from "@mantine/hooks";

import ChangePasswordPopup from "../updatePassword/updatePassword";
import { useEffect, useState } from "react";
import { getProfileImage, logoutUser } from "../../../services/user-services";
import { profileImageAtom } from "../../../atoms/profile-image";
import { useCustomToast } from "../../../utils/common/toast";
const Header = ({
  color,
  organization,
}: {
  color: string;
  organization: string;
}) => {
  const navigate = useNavigate();
  const user = useRecoilValue(userDetailsAtom);
  const [opened, { open, close }] = useDisclosure(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useRecoilState(profileImageAtom);
  const { showSuccessToast } = useCustomToast();

  const handleLogout = () => {
    logoutUser();
    showSuccessToast("Successfully logged out");
  };

  useEffect(() => {
    setIsLoading(true);

    getProfileImage()
      .then(async (response) => {
        if (!response || !(response instanceof Blob)) {
          throw new Error("Invalid image data");
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result as string;
          setImageUrl(base64Image);
        };
        reader.readAsDataURL(response);
      })
      .catch(() => {
        setImageUrl("");
      })
      .finally(() => setIsLoading(false));
  }, [setImageUrl]);

  return (
    <>
      <div style={{ color }} className="flex justify-between space-x-8 mx-4">
        <div>
          {/* <h1 className="text-2xl uppercase underline">{organization}</h1> */}
        </div>
        <div className="flex ">
          <p className=" flex justify-center items-center px-4 font-bold">
            {user.firstName} {user.lastName}{" "}
          </p>
          <div>
            <Menu shadow="md" width={200} position="bottom-end">
              <Menu.Target>
                {isLoading ? (
                  <Avatar className="cursor-pointer" color={color} />
                ) : (
                  <Avatar className="cursor-pointer" src={imageUrl} />
                )}
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Application</Menu.Label>
                <Menu.Item
                  className="hover:bg-transparent  hover:text-inherit tranform transition-all duration-150 hover:scale-110"
                  leftSection={
                    <IconUser style={{ width: rem(14), height: rem(14) }} />
                  }
                  onClick={() =>
                    navigate(`${commonUrls(organization)}/dashboard/profile`)
                  }
                >
                  Profile
                </Menu.Item>

                <Menu.Item
                  className="hover:bg-transparent  hover:text-inherit tranform transition-all duration-150 hover:scale-110"
                  leftSection={
                    <IconPasswordUser
                      style={{ width: rem(14), height: rem(14) }}
                    />
                  }
                  onClick={open}
                >
                  Change Password
                </Menu.Item>

                <Menu.Item
                  className="hover:bg-transparent  hover:text-inherit tranform transition-all duration-150 hover:scale-110"
                  leftSection={
                    <IconSettings style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Settings
                </Menu.Item>
                <Menu.Label>Actions</Menu.Label>
                <Menu.Item
                  onClick={handleLogout}
                  className="hover:bg-transparent  hover:text-inherit tranform transition-all duration-150 hover:scale-110"
                  leftSection={
                    <IconLogout style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </div>
      <ChangePasswordPopup opened={opened} close={close} />
    </>
  );
};

export default Header;
