import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Button, Loader, Textarea } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useMantineTheme } from "@mantine/core";
import { registerPackage } from "../../../../services/admin-services";
import { useNavigate } from "react-router";
import { BgDiv } from "../../../common/style-components/bg-div";
import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../../atoms/organization-atom";
import { useCustomToast } from "../../../../utils/common/toast";
import {
  AddPackageForm,
  addPackageSchema,
} from "../../../../forms/add-package";

const AddPackage = () => {
  const navigate = useNavigate();
  const theme = useMantineTheme();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddPackageForm>({
    resolver: zodResolver(addPackageSchema),
  });
  const { showSuccessToast } = useCustomToast();

  const onSubmit = async (packageDetails: AddPackageForm) => {
    try {
      await registerPackage(packageDetails);
      showSuccessToast(`${packageDetails.title} created successfully!`);

      reset();

      navigate(-1);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto my-6">
      <BgDiv>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
          }}
          className="rounded-lg shadow-lg w-full p-8"
        >
          <div className="px-4 py-4 flex justify-between">
            <div></div>
            <h1 className="text-3xl font-extrabold underline text-center">
              Add Package
            </h1>
            <Button bg={theme.colors.primary[5]} onClick={() => navigate(-1)}>
              {" "}
              Cancel
            </Button>
          </div>
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
            <TextInput
              label="Title"
              placeholder="Enter Title"
              {...register("title")}
              error={errors.title?.message}
            />

            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <DateInput
                  label="Start Date"
                  placeholder="Pick a date"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.startDate?.message}
                  valueFormat="YYYY-MM-DD"
                  popoverProps={{ withinPortal: true }}
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
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.endDate?.message}
                  valueFormat="YYYY-MM-DD"
                  popoverProps={{ withinPortal: true }}
                />
              )}
            />
          </div>

          <Textarea
            label="Description"
            placeholder="Enter Description"
            {...register("description")}
            maxRows={4}
            error={errors.description?.message}
          />

          <div className="flex justify-end py-4">
            <Button
              className="rounded-md"
              type="submit"
              data-testid="submitButton"
              leftSection={
                isSubmitting && (
                  <Loader
                    size="xs"
                    color={
                      organizationConfig.organization_theme.theme.button.color
                    }
                  />
                )
              }
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
