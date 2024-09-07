import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput, Button, Loader } from "@mantine/core";
import { toast } from "react-toastify";
import { useMantineTheme } from "@mantine/core";
import {
  AddEmployeeForm,
  addEmployeeSchema,
} from "../../../../forms/add-employee";
import { OrganizationConfig } from "../../../../interfaces/organization";
import { registerEmployee } from "../../../../services/admin-services";
import axios from "axios";
import { IconCircleDashedCheck } from "@tabler/icons-react";

const AddEmployee = ({
  organizationConfig,
}: {
  organizationConfig: OrganizationConfig;
}) => {
  const theme = useMantineTheme();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddEmployeeForm>({
    resolver: zodResolver(addEmployeeSchema),
  });

  const onSubmit = async (employeeDetails: AddEmployeeForm) => {
    try {
      await registerEmployee(employeeDetails);
      toast("Login Successful!", {
        style: {
          color: theme.colors.primary[2],
          backgroundColor: organizationConfig.theme.backgroundColor,
        },
        progressStyle: {
          background: theme.colors.primary[8],
        },
        icon: <IconCircleDashedCheck width={32} height={32} />,
      });
      reset();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(
          "Failed: " + (error.response?.data?.message || "Unknown error")
        );
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ backgroundColor: organizationConfig.theme.backgroundColor }}
        className="w-full max-w-2xl p-8 shadow-lg rounded-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Add Employee</h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          <TextInput
            label="First Name"
            placeholder="Enter first name"
            {...register("firstName")}
            error={errors.firstName?.message}
          />

          <TextInput
            label="Last Name"
            placeholder="Enter last name"
            {...register("lastName")}
            error={errors.lastName?.message}
          />

          <TextInput
            label="Email"
            placeholder="Enter email"
            {...register("email")}
            error={errors.email?.message}
          />

          <TextInput
            label="Phone Number"
            placeholder="Enter phone number"
            type="tel"
            {...register("mobileNumber")}
            error={errors.mobileNumber?.message}
          />
        </div>

        <Button
          type="submit"
          fullWidth
          className="mt-10"
          data-testid="submitButton"
          leftSection={isSubmitting && <Loader size="xs" color="blue" />}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Create Employee"}
        </Button>
      </form>
    </div>
  );
};

export default AddEmployee;
