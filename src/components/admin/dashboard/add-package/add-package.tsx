import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Button, Loader } from "@mantine/core";
import { toast } from "react-toastify";
import { useMantineTheme } from "@mantine/core";
import { registerPackage } from "../../../../services/admin-services";
import axios from "axios";
import { IconCircleDashedCheck, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { organizationAdminUrls } from "../../../../utils/common/constants";
import { BgDiv } from "../../../common/style-components/bg-div";
import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../../atoms/organization-atom";
import { AddPackageForm, addPackageSchema } from "../../../../forms/add-package";

const AddPackage = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddPackageForm>({
    resolver: zodResolver(addPackageSchema),
  });

  const onSubmit = async (packageDetails: AddPackageForm) => {
    try {
      await registerPackage(packageDetails);
      toast.success(`${packageDetails.title} created successfully!`, {
        style: {
          color: theme.colors.primary[2],
          backgroundColor: organizationConfig.organization_theme.theme.backgroundColor,
        },
        progressStyle: {
          background: theme.colors.primary[8],
        },
        icon: <IconCircleDashedCheck width={32} height={32} />,
      });
  
      reset();
      
      navigate(`${organizationAdminUrls(organizationConfig.organization_name)}/dashboard/packages`);
    } catch (error) {
      throw(error);
    }
  };
  
  return (
    <div className="flex items-center justify-center h-screen">
      <BgDiv>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            backgroundColor: organizationConfig.organization_theme.theme.backgroundColor,
          }}
          className="w-full max-w-2xl p-8 shadow-lg rounded-lg"
        >
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold text-center mb-6 w-full">Add Package</h2>
            <Button
              className="rounded-full"
              onClick={() => navigate(`${organizationAdminUrls(organizationConfig.organization_name)}/dashboard/packages`)}
            >
              <IconX />
            </Button>
          </div>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <TextInput label="Title" placeholder="Enter Title" {...register("title")} error={errors.title?.message} />
            <TextInput label="Description" placeholder="Enter Description" {...register("description")} error={errors.description?.message} />
            <TextInput label="Start Date" type="date" {...register("startDate")} error={errors.startDate?.message} />
            <TextInput label="End Date" type="date" {...register("endDate")} error={errors.endDate?.message} />

            <Button
              className="mt-7 rounded-md"
              type="submit"
              data-testid="submitButton"
              leftSection={isSubmitting && <Loader size="xs" color={organizationConfig.organization_theme.theme.button.color} />}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Package"}
            </Button>
          </div>
        </form>
      </BgDiv>
    </div>
  );
};

export default AddPackage;
