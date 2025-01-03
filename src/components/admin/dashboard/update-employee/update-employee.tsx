import { useNavigate, useParams } from "react-router-dom";
import {
  TextInput,
  Button,
  Select,
  useMantineTheme,
  MultiSelect,
} from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmployeeUpdateForm,
  employeeSchema,
} from "../../../../forms/update-employee";
import {
  getEmployeeDetailsByAdmin,
  updateEmployeeDetailsByAdmin,
} from "../../../../services/admin-services";
import { toast } from "react-toastify";
import { IconCircleDashedCheck } from "@tabler/icons-react";
import { useEffect } from "react";
import { OrganizationConfig } from "../../../../interfaces/organization";
import { organizationAdminUrls } from "../../../../utils/common/constants";
import { BgDiv } from "../../../common/style-components/bg-div";

const UpdateEmployee = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const employeeId = params.employeeId as string;
  const theme = useMantineTheme();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<EmployeeUpdateForm>({
    resolver: zodResolver(employeeSchema),
  });

  const bloodGroupOptions = [
    { value: "66cf1d7b43400091bccfdc7a", label: "O -ve" },
    { value: "66cf1d7b43400091bccfdc79", label: "O +ve" },
    { value: "66cf1d7b43400091bccfdc7b", label: "AB +ve" },
  ];

  const employmentTypeOptions = [
    { value: "66cae2a743400091bccfdc51", label: "FTE" },
    { value: "66cae2a743400091bccfdc52", label: "Contractor" },
  ];

  const employeeRoles = [
    { value: "66d332c2bc7f50be0a7a573f", label: "Trainee" },
    { value: "66d332c2bc7f50be0a7a5740", label: "Trainer" },
    { value: "66d332c2bc7f50be0a7a5741", label: "Junior Software Engineer" },
    { value: "66d332c2bc7f50be0a7a5742", label: "Senior Software Engineer" },
    { value: "66d332c2bc7f50be0a7a5743", label: "Technical Lead" },
    { value: "66d332c2bc7f50be0a7a5744", label: "Senior Executive" },
  ];

  const onSubmit = (data: EmployeeUpdateForm) => {
    console.log("Updateding", data);
    const updatedData = {
      ...data,
      employeeRole: data.employeeRole?.filter((role) => role),
    };

    if (
      !data.bankDetailsInfo?.accountNumber &&
      !data.bankDetailsInfo?.accountHolderName &&
      !data.bankDetailsInfo?.ifscCode
    ) {
      delete updatedData.bankDetailsInfo;
    }

    updateEmployeeDetailsByAdmin(updatedData)
      .then(() => {
        toast("Employee details updated !", {
          style: {
            color: theme.colors.primary[2],
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
          },
          progressStyle: {
            background: theme.colors.primary[8],
          },
          icon: <IconCircleDashedCheck width={32} height={32} />,
        });
        navigate(
          `${organizationAdminUrls(
            organizationConfig.organization_name
          )}/dashboard`
        );
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  useEffect(() => {
    getEmployeeDetailsByAdmin(employeeId)
      .then((emp) => {
        reset({
          ...emp,
          bloodGroup: emp.bloodGroup?.id,
          employmentType: emp.employmentType?.id,
          employeeRole: emp.employeeRole.map(
            (role: { id: string }) => role?.id
          ),
        });
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  }, [employeeId, reset]);

  return (
    <div className="flex justify-center items-center py-12">
      <BgDiv>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
          }}
          className="rounded-lg shadow-lg w-full max-w-4xl p-8"
        >
          <div className="px-4 flex justify-between">
            <div></div>
            <h2 className="text-2xl font-bold text-center mb-6">
              Update Profile
            </h2>
            <Button
              bg={theme.colors.primary[5]}
              onClick={() =>
                navigate(
                  `${organizationAdminUrls(
                    organizationConfig.organization_name
                  )}/dashboard`
                )
              }
            >
              {" "}
              Cancel
            </Button>
          </div>

          <h3 className="text-lg font-bold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <TextInput
              label="First Name"
              {...register("firstName")}
              error={errors.firstName?.message}
            />
            <TextInput
              label="Last Name"
              {...register("lastName")}
              error={errors.lastName?.message}
            />
            <TextInput
              label="Email"
              {...register("email")}
              error={errors.email?.message}
            />
            <TextInput
              label="Mobile Number"
              {...register("mobileNumber")}
              error={errors.mobileNumber?.message}
            />
          </div>

          <div className="grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Controller
              name="bloodGroup"
              control={control}
              render={({ field }) => (
                <Select
                  data={bloodGroupOptions}
                  label="Blood Group"
                  placeholder="Enter blood group"
                  {...field}
                  error={errors.bloodGroup?.message}
                />
              )}
            />
            <div className="mt-8">
              <Controller
                name="employeeRole"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    data={employeeRoles}
                    label="Employee Role"
                    placeholder="Select employee roles"
                    value={
                      field.value?.filter(
                        (role) => role !== undefined
                      ) as string[]
                    }
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={errors.employeeRole?.message}
                  />
                )}
              />
            </div>
          </div>

          <h3 className="text-lg font-bold mt-8 mb-4">Bank Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <TextInput
              label="Account Number"
              {...register("bankDetailsInfo.accountNumber")}
              error={errors.bankDetailsInfo?.accountNumber?.message}
              placeholder="Enter bank account number"
            />
            <TextInput
              label="Account Holder Name"
              placeholder="Enter bank account holder name"
              {...register("bankDetailsInfo.accountHolderName")}
              error={errors.bankDetailsInfo?.accountHolderName?.message}
            />
            <TextInput
              label="IFSC Code"
              placeholder="Enter bank ifsc code"
              {...register("bankDetailsInfo.ifscCode")}
              error={errors?.bankDetailsInfo?.ifscCode?.message}
            />
          </div>

          <h3 className="text-lg font-bold mt-8 mb-4">Employment Details</h3>
          <Controller
            name="employmentType"
            control={control}
            render={({ field }) => (
              <Select
                label="Employment Type"
                placeholder="Enter employment type"
                data={employmentTypeOptions}
                {...field}
                error={errors.employmentType?.message}
              />
            )}
          />

          <div className=" flex flex-wrap justify-between mt-8">
            <Button bg={theme.colors.primary[5]}>Reset Password</Button>
            <Button type="submit">Update Employee</Button>
          </div>
        </form>
      </BgDiv>
    </div>
  );
};

export default UpdateEmployee;
