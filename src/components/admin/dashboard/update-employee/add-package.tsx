import { Controller } from "react-hook-form";
import { MultiSelect, Button, Group } from "@mantine/core";
import { BgDiv } from "../../../common/style-components/bg-div";
import { OrganizationConfig } from "../../../../interfaces/organization";
import { useCustomToast } from "../../../../utils/common/toast";
import { useRecoilState } from "recoil";
import { employeePackagesAtom } from "../../../../atoms/employee-atom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getAllPackagesByAdmin } from "../../../../services/admin-services";

const PackagesFormComponent = ({
  organizationConfig,
  control,
  errors,
}: {
  organizationConfig: OrganizationConfig;
  control: any;
  errors: any;
}) => {
  const [employmentPackagesOptions, setEmploymentPackagesOptions] =
    useRecoilState(employeePackagesAtom);

  const { showSuccessToast } = useCustomToast();

  useEffect(() => {
    if (employmentPackagesOptions.length === 0) {
      getAllPackagesByAdmin()
        .then((response) => {
          const pkgs = response.map((res: any) => ({
            value: res._id,
            label: res.title,
          }));
          setEmploymentPackagesOptions(pkgs);
        })
        .catch((error: any) => {
          toast.error(error?.response?.data?.message || "Something went wrong");
        });
    }
  }, [employmentPackagesOptions, setEmploymentPackagesOptions]);

  return (
    <BgDiv>
      <form
        style={{
          backgroundColor:
            organizationConfig.organization_theme.theme.backgroundColor,
        }}
        className="rounded-lg shadow-lg w-full p-8"
        onSubmit={(e) => {
          e.preventDefault();
          showSuccessToast("Packages added");
        }}
      >
        <Controller
          name="packagesInfo"
          control={control}
          render={({ field }) => (
            <MultiSelect
              className="mb-2"
              data={employmentPackagesOptions}
              label="Packages"
              placeholder="Select Packages"
              value={(field.value ?? []).filter(
                (pkg: any): pkg is string => typeof pkg === "string"
              )}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={errors.packagesInfo?.message}
            />
          )}
        />

        <Group justify="right" mt="lg">
          <Button type="submit">Save Packages</Button>
        </Group>
      </form>
    </BgDiv>
  );
};

export default PackagesFormComponent;
