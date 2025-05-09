import { useNavigate, useParams } from "react-router-dom";
import {
  TextInput,
  Button,
  Select,
  useMantineTheme,
  MultiSelect,
  Loader,
  Textarea,
} from "@mantine/core";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  EmployeeUpdateForm,
  employeeSchema,
} from "../../../../forms/update-employee";
import {
  getAllBloodGroupByAdmin,
  getEmployeeDetailsByAdmin,
  updateEmployeeDetailsByAdmin,
  deleteEmployeeByAdmin,
  getAllEmploymentTypes,
  getAllEmployeeRoleByAdmin,
  handlePasswordResetByAdmin,
} from "../../../../services/admin-services";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { organizationAdminUrls } from "../../../../utils/common/constants";
import { BgDiv } from "../../../common/style-components/bg-div";
import { useDisclosure } from "@mantine/hooks";
import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../../atoms/organization-atom";
import { useCustomToast } from "../../../../utils/common/toast";
import { DatePickerInput } from "@mantine/dates";
import { DeleteEmployeeModel } from "./delete-model";
import { BackButton } from "../../../common/style-components/buttons";
import {
  employeeDetailsAtom,
  bloodGroupOptionsAtom,
  employmentTypesAtom,
  employeeRolesAtom,
} from "../../../../atoms/employee-atom";
import { useRecoilState } from "recoil";
import PackagesFormComponent from "./add-package";

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const params = useParams();
  const employeeId = params.employeeId as string;
  const theme = useMantineTheme();
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<EmployeeUpdateForm>({
    resolver: zodResolver(employeeSchema),
  });

  const [opened, { open, close }] = useDisclosure(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { showSuccessToast } = useCustomToast();
  const [isLoading, setIsLoading] = useState(false);
  const [bloodGroupOptions, setBloodGroupOptions] = useRecoilState(
    bloodGroupOptionsAtom
  );
  const [employmentRolesOptions, setEmploymentRolesOptions] =
    useRecoilState(employeeRolesAtom);
  const [employmentTypeOptions, setEmploymentTypes] =
    useRecoilState(employmentTypesAtom);
  const [employeeDetails, setEmployeeDetails] =
    useRecoilState(employeeDetailsAtom);

  useEffect(() => {
    if (employmentTypeOptions.length === 0) {
      getAllEmploymentTypes()
        .then((response) => {
          const types = response.map((res: any) => ({
            value: res._id,
            label: res.employmentType,
          }));
          setEmploymentTypes(types);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Something went wrong");
        });
    }
  }, [employmentTypeOptions, setEmploymentTypes]);

  useEffect(() => {
    if (employmentRolesOptions.length === 0) {
      getAllEmployeeRoleByAdmin()
        .then((response) => {
          const roles = response.map((res: any) => ({
            value: res._id,
            label: res.designation,
          }));
          setEmploymentRolesOptions(roles);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Something went wrong");
        });
    }
  }, [employmentRolesOptions, setEmploymentRolesOptions]);

  useEffect(() => {
    if (bloodGroupOptions.length === 0) {
      getAllBloodGroupByAdmin()
        .then((response) => {
          const options = response.map((res: any) => ({
            value: res._id,
            label: res.type,
          }));
          setBloodGroupOptions(options);
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || "Something went wrong");
        });
    }
  }, [bloodGroupOptions, setBloodGroupOptions]);

  const onSubmit = (data: EmployeeUpdateForm) => {
    const updatedData = {
      ...data,
      employeeRole: data.employeeRole?.filter((role) => role),
      packagesInfo: data.packagesInfo?.filter((pkg) => pkg),
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
        showSuccessToast("Employee details updated !");
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
    setIsLoading(true);
    getEmployeeDetailsByAdmin(employeeId)
      .then((emp) => {
        const formatted = {
          ...emp,
          bloodGroup: emp.bloodGroup?.id,
          employmentType: emp.employmentType?.id,
          employeeRole: emp.employeeRole.map((role: any) => role.id),
          dateOfBirth: emp.dateOfBirth
            ? new Date(emp.dateOfBirth).toISOString().split("T")[0]
            : "",
        };
        setEmployeeDetails(formatted);
        reset(formatted);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [employeeId, reset, setEmployeeDetails]);

  const handleDeleteEmployee = () => {
    const payload = {
      id: employeeId,
      confirmDelete: agreeTerms,
    };

    deleteEmployeeByAdmin(payload)
      .then(() => {
        showSuccessToast("Employee deleted successfully !");
        navigate(
          `${organizationAdminUrls(
            organizationConfig.organization_name
          )}/dashboard`
        );
      })
      .catch((error: { response: { data: { message: any } } }) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  const handlePasswordReset = () => {
    handlePasswordResetByAdmin(employeeId)
      .then(() => {
        showSuccessToast("Password reset successfull ");
      })
      .catch((error) =>
        toast.error(error?.response?.data?.message || "Something went wrong")
      );
  };

  return (
    <div className="flex flex-col items-center py-12 space-y-8">
      {isLoading ? (
        <div className="flex justify-center items-center h-48">
          <Loader
            size="xl"
            color={organizationConfig.organization_theme.theme.button.color}
          />
        </div>
      ) : (
      <>
        <BgDiv>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              backgroundColor:
                organizationConfig.organization_theme.theme.backgroundColor,
            }}
            className="rounded-lg shadow-lg w-full max-w-4xl p-8"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold underline text-center sm:text-left w-full sm:w-auto">
                Update Employee Profile
              </h2>

              <div className="w-full sm:w-auto flex justify-center sm:justify-end">
                <BackButton id={employeeId} />
              </div>
            </div>

            <div className="mb-5">
              <TextInput
                label="Employee Id"
                className="w-full"
                {...register("employeeId")}
                error={errors.employeeId?.message}
              />
            </div>

            <h3 className="text-lg font-bold underline mb-2">
              Personal Information
            </h3>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
              <Controller
                name="dateOfBirth"
                control={control}
                render={({ field }) => (
                  <DatePickerInput
                    label="Date of Birth"
                    placeholder="Select date of birth"
                    value={field.value ? new Date(field.value) : null}
                    onChange={(date) => {
                      if (date) {
                        const adjustedDate = new Date(
                          date.getTime() - date.getTimezoneOffset() * 60000
                        )
                          .toISOString()
                          .split("T")[0];
                        field.onChange(adjustedDate);
                      } else {
                        field.onChange(null);
                      }
                    }}
                    error={errors.dateOfBirth?.message}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Textarea
                label="Present Address"
                {...register("presentAddress")}
                error={errors.presentAddress?.message}
                className="h-20"
              />
              <Textarea
                label="Permanent Address"
                {...register("permanentAddress")}
                error={errors.permanentAddress?.message}
                className="h-20"
              />
            </div>

            <h3 className="text-lg font-bold underline mt-8 mb-4">
              Employment Details
            </h3>
            <Controller
              name="employmentType"
              control={control}
              render={({ field }) => (
                <Select
                  className="mb-2"
                  label="Employment Type"
                  placeholder="Enter employment type"
                  data={employmentTypeOptions}
                  {...field}
                  error={errors.employmentType?.message}
                />
              )}
            />
            <Controller
              name="employeeRole"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  className="mb-2"
                  data={employmentRolesOptions}
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

            {/* Bank Details */}
            <h3 className="text-lg font-bold underline mt-5 mb-4">
              Bank Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <TextInput
                label="Account Number"
                {...register("bankDetailsInfo.accountNumber")}
                error={errors.bankDetailsInfo?.accountNumber?.message}
                placeholder="Enter bank account number"
              />
              <TextInput
                label="Account Holder Name"
                {...register("bankDetailsInfo.accountHolderName")}
                error={errors.bankDetailsInfo?.accountHolderName?.message}
                placeholder="Enter account holder name"
              />
              <TextInput
                label="IFSC Code"
                {...register("bankDetailsInfo.ifscCode")}
                error={errors?.bankDetailsInfo?.ifscCode?.message}
                placeholder="Enter IFSC code"
              />
            </div>

            {/* Buttons Section */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-between mt-8">
              <Button
                bg={theme.colors.primary[5]}
                className="w-full sm:w-auto"
                onClick={handlePasswordReset}
              >
                Reset Password
              </Button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded w-full sm:w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  open();
                }}
              >
                Delete Employee
              </button>
              <Button type="submit" className="w-full sm:w-auto">
                Update Employee
              </Button>
            </div>
          </form>
          <div className="w-full mt-5">
            <PackagesFormComponent
              organizationConfig={organizationConfig}
              control={control}
              errors={errors}
            />
          </div>
        </BgDiv>
      </>
      )}

      <DeleteEmployeeModel
        agreeTerms={agreeTerms}
        close={close}
        opened={opened}
        confirmDelete={confirmDelete}
        handleDeleteEmployee={handleDeleteEmployee}
        setAgreeTerms={setAgreeTerms}
        setConfirmDelete={setConfirmDelete}
      />
    </div>
  );
};

export default UpdateEmployee;
