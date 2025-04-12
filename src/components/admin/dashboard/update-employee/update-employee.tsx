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
import { selectedEmployeeAtom } from "../../../../atoms/organization-atom";

const UpdateEmployee = () => {
  const navigate = useNavigate();
  const params = useParams();
  const employeeId = params.employeeId as string;
  const theme = useMantineTheme();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const selectedEmployee=useRecoilValue(selectedEmployeeAtom);

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
  const [bloodGroupOptions, setBloodGroupOptions] = useState([]);
  const [employmentRolesOptions, setEmploymentRolesOptions] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { showSuccessToast } = useCustomToast();
  const [isLoading, setIsLoading] = useState(false);

  const [employmentTypeOptions, setEmploymentTypes] = useState([]);

  useEffect(() => {
    getAllEmploymentTypes()
      .then((response) => {
        const filteredEmployment = response.map(
          (res: { _id: string; employmentType: string }) => {
            return { value: res._id, label: res.employmentType };
          }
        );
        setEmploymentTypes(filteredEmployment);
      })
      .catch((error) => {
        toast.error(error.response.data.message || "Something went wrong");
      });
  }, []);

  useEffect(() => {
    getAllEmployeeRoleByAdmin().then((response) => {
      const filterEmploymentRoles = response.map(
        (res: { _id: string; designation: string }) => {
          return { value: res._id, label: res.designation };
        }
      );
      setEmploymentRolesOptions(filterEmploymentRoles);
    });
  }, []);

  useEffect(() => {
    getAllBloodGroupByAdmin().then((response) => {
      const filterBloodGroup = response.map(
        (res: { _id: string; type: string }) => {
          return { value: res._id, label: res.type };
        }
      );
      setBloodGroupOptions(filterBloodGroup);
    });
  }, []);

  const onSubmit = (data: EmployeeUpdateForm) => {
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
    if (selectedEmployee && selectedEmployee._id === employeeId) {
      reset({
        employeeId: selectedEmployee.employeeId || "",
        firstName: selectedEmployee.firstName || "",  
        lastName: selectedEmployee.lastName || "",
        email: selectedEmployee.email || "",
        mobileNumber: selectedEmployee.mobileNumber || "",
        presentAddress: selectedEmployee.presentAddress || "",
        permanentAddress: selectedEmployee.permanentAddress || "",
        bloodGroup: selectedEmployee.bloodGroup?._id || "",
        employmentType: selectedEmployee.employmentType?._id || "",
        employeeRole: selectedEmployee.employeeRole?.map(role => role?._id) || [],
        dateOfBirth: selectedEmployee.dob
          ? new Date(selectedEmployee.dob).toISOString().split("T")[0]
          : "",
        bankDetailsInfo: {
          accountNumber: selectedEmployee.bankDetailsInfo?.accountNumber || "",
          accountHolderName: selectedEmployee.bankDetailsInfo?.accountHolderName || "",
          ifscCode: selectedEmployee.bankDetailsInfo?.ifscCode || "",
        },
      });
    } else {
      setIsLoading(true);
      getEmployeeDetailsByAdmin(employeeId)
        .then((emp) => {
          reset({
            employeeId: emp.employeeId || "",
            firstName: emp.firstName || "",
            lastName: emp.lastName || "",
            email: emp.email || "",
            mobileNumber: emp.mobileNumber || "",
            presentAddress: emp.presentAddress || "",
            permanentAddress: emp.permanentAddress || "",
            bloodGroup: emp.bloodGroup?._id || "",
            employmentType: emp.employmentType?._id || "",
            employeeRole: emp.employeeRole?.map((role:any) => role?._id) || [],
            dateOfBirth: emp.dob
              ? new Date(emp.dob).toISOString().split("T")[0]
              : "",
            bankDetailsInfo: {
              accountNumber: emp.bankDetailsInfo?.accountNumber || "",
              accountHolderName: emp.bankDetailsInfo?.accountHolderName || "",
              ifscCode: emp.bankDetailsInfo?.ifscCode || "",
            },
          });
        })
        .catch((error) => {
          toast.error(error.response?.data?.message || "Something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [selectedEmployee, employeeId, reset]);
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
    <div className="flex justify-center items-center py-12">
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
            style={{
              backgroundColor:
                organizationConfig.organization_theme.theme.backgroundColor,
            }}
            className="rounded-lg shadow-lg w-full max-w-4xl p-8"
          >
            <div className="flex items-center justify-between flex-wrap mb-6">
              <h2 className="text-2xl font-bold underline text-center flex-grow">
                Update Employee Profile
              </h2>
              <BackButton id={employeeId} />
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
            <div className="flex flex-wrap justify-between mt-8">
              <Button
                bg={theme.colors.primary[5]}
                onClick={handlePasswordReset}
              >
                Reset Password
              </Button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  open();
                }}
              >
                Delete Employee
              </button>
              <Button type="submit">Update Employee</Button>
            </div>
          </form>
      </BgDiv>
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
