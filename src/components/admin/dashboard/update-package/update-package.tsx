import { useNavigate, useParams } from "react-router-dom";
import {
  TextInput,
  Button,
  Textarea,
  Loader,
  useMantineTheme,
} from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  packageSchema,
  PackageUpdateForm,
} from "../../../../forms/update-package";

import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { organizationAdminUrls } from "../../../../utils/common/constants";
import { BgDiv } from "../../../common/style-components/bg-div";
import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../../atoms/organization-atom";
import { DateInput } from "@mantine/dates";
import {
  deletePackageByAdmin,
  getPackageDetailsByAdmin,
  updatePackageByAdmin,
} from "../../../../services/admin-services";
import { useDisclosure } from "@mantine/hooks";
import { useCustomToast } from "../../../../utils/common/toast";
import { DeletePackageModel } from "./delete-models";
import AddTasksPackage from "./add-tasks";
import PackageTasksTable from "./tasks";
import { userDetailsAtom } from "../../../../atoms/user";

const UpdatePackage = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const params = useParams();
  const packageId = params.packageId as string;
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { showSuccessToast } = useCustomToast();
  const user = useRecoilValue(userDetailsAtom);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const [tasks, setTasks] = useState<
    {
      updateAt: string;
      userId: { firstName: string; lastName: string };
      tasks: string;
    }[]
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<PackageUpdateForm>({
    resolver: zodResolver(packageSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!packageId) return;

    setIsLoading(true);

    getPackageDetailsByAdmin(packageId)
      .then((packageDetails: any) => {
        if (!packageDetails) {
          toast.error("Package not found.");
          return;
        }

        reset({
          ...packageDetails,
          startDate: packageDetails.startDate
            ? new Date(packageDetails.startDate)
            : null,
          endDate: packageDetails.endDate
            ? new Date(packageDetails.endDate)
            : null,
        });
      })
      .catch((error) => {
        toast.error(
          error?.response?.data?.message || "Failed to fetch package details."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [packageId, reset]);

  const handleDeletePackage = () => {
    if (!packageId) {
      toast.error("Invalid package ID.");
      return;
    }
    deletePackageByAdmin(packageId)
      .then(() => {
        showSuccessToast("Package deleted successfully!");
        navigate(
          `${organizationAdminUrls(
            organizationConfig.organization_name
          )}/dashboard/packages`
        );
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Something went wrong");
      });
  };

  const onSubmit = async (data: PackageUpdateForm) => {
    if (!packageId) return;
  
    try {
      setIsLoading(true);
      await updatePackageByAdmin(packageId, data);
      toast.success("Package updated successfully!");
      const updatedPackageDetails = await getPackageDetailsByAdmin(packageId);
      if (updatedPackageDetails) {
        navigate(
          `${organizationAdminUrls(
            organizationConfig.organization_name
          )}/dashboard/packages/${packageId}`
        );
      } else {
        toast.error("Failed to fetch updated package details.");
      }
    } catch (error:any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader
            size="xl"
            color={organizationConfig.organization_theme.theme.button.color}
          />
        </div>
      ) : (
        <BgDiv>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-lg shadow-lg w-full max-w-2xl p-8 ml-auto mr-auto"
            style={{
              backgroundColor: organizationConfig.organization_theme.theme.backgroundColor,
            }}
          >
            <div className="flex items-center justify-between flex-wrap mb-6">
              <h2 className="text-2xl font-bold underline text-center flex-grow">
                Update Package
              </h2>
              <Button
                style={{ backgroundColor: theme.colors.primary[5] }}
                onClick={() =>
                  navigate(
                    `${organizationAdminUrls(organizationConfig.organization_name)}/dashboard/packages`
                  )
                }
              >
                Cancel
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-6">
              <TextInput
                label="Title"
                {...register("title")}
                error={errors.title?.message}
                className="w-full"
              />
              <Textarea
                label="Description"
                {...register("description")}
                error={errors.description?.message}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Controller
                control={control}
                name="startDate"
                render={({ field }) => (
                  <DateInput
                    label="Start Date"
                    placeholder="Pick a date"
                    value={field.value || null}
                    onChange={field.onChange}
                    error={errors.startDate?.message}
                    valueFormat="YYYY-MM-DD"
                  />
                )}
              />
              <Controller
                control={control}
                name="endDate"
                render={({ field }) => (
                  <DateInput
                    label="End Date"
                    placeholder="Pick a date"
                    value={field.value || null}
                    onChange={field.onChange}
                    error={errors.endDate?.message}
                    valueFormat="YYYY-MM-DD"
                  />
                )}
              />
            </div>

            <div className="flex flex-wrap justify-between mt-8">
              <Button type="submit">Update Package</Button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  open();
                }}
              >
                Delete Package
              </button>
            </div>
          </form>
        </BgDiv>
      )}

      <DeletePackageModel
        agreeTerms={agreeTerms}
        close={close}
        opened={opened}
        confirmDelete={confirmDelete}
        handleDeletePackage={handleDeletePackage}
        setAgreeTerms={setAgreeTerms}
        setConfirmDelete={setConfirmDelete}
      />
      <AddTasksPackage
        organizationConfig={organizationConfig}
        tasks={tasks}
        setTasks={setTasks}
        user={user}
        packageId={packageId}
        required={true}
      />
      <PackageTasksTable
        organizationConfig={organizationConfig}
        tasks={tasks}
      />
    </div>
  );
};

export default UpdatePackage;