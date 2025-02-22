import { useNavigate, useParams } from "react-router-dom";
import {
  TextInput,
  Button,
  Select,
  useMantineTheme,
  MultiSelect,
  Checkbox,
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
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../../atoms/organization-atom";
import { useCustomToast } from "../../../../utils/common/toast";
import { DatePickerInput } from "@mantine/dates";

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
  const [bloodGroupOptions, setBloodGroupOptions] = useState([]);
  const [employmentRolesOptions, setEmploymentRolesOptions] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { showSuccessToast } = useCustomToast();

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
          <TextInput
            className="mb-2"
            label="Employee Id"
            {...register("employeeId")}
            error={errors.employeeId?.message}
          />
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
                  onChange={(date) =>
                    field.onChange(
                      date ? date.toISOString().split("T")[0] : null
                    )
                  }
                  error={errors.dateOfBirth?.message}
                />
              )}
            />
          </div>

          <div className="mt-8">
            <Controller
              name="employeeRole"
              control={control}
              render={({ field }) => (
                <MultiSelect
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
            <Button bg={theme.colors.primary[5]} onClick={handlePasswordReset}>
              Reset Password
            </Button>
            <button
              className="bg-red-500 py-2 px-4 rounded"
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
      <Modal size="md" opened={opened} onClose={close}>
        <div>
          <h2 className="font-bold text-lg">
            Sure want to delete the employee?{" "}
          </h2>
          <p className="mt-4 font-bold">
            Please be aware of doing this action! Deleting employee is an
            un-reversible action and you should be aware while doing this.
          </p>
          <div className="mt-4">
            <Checkbox
              label="I understand what are the consequences of doing this action!"
              checked={confirmDelete}
              onChange={(e) => setConfirmDelete(e.currentTarget.checked)}
              required
            />
            <Checkbox
              label="I understand that this employee details are not a part of our application forever. I agreed to the Terms and Conditions to perform this action"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.currentTarget.checked)}
            />
          </div>
          <div className=" flex flex-wrap justify-between mt-8">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={handleDeleteEmployee}
              disabled={!confirmDelete}
            >
              Delete
            </button>
            <Button onClick={close}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UpdateEmployee;
