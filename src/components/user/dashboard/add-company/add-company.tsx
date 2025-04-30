import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddCompanyForm,
  addCompanySchema,
} from "../../../../forms/add-company";
import { useForm } from "react-hook-form";
import { Button, TextInput } from "@mantine/core";
import { addCompanyByRecruiter } from "../../../../services/user-services";
import { toast } from "react-toastify";
import { IconCircleDashedCheck } from "@tabler/icons-react";
import { useMantineTheme } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../../atoms/organization-atom";
import { BgDiv } from "../../../common/style-components/bg-div";

const AddCompany = () => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm<AddCompanyForm>({
    resolver: zodResolver(addCompanySchema),
  });
  const organizationConfig = useRecoilValue(organizationThemeAtom);

  const onSubmit = async (data: AddCompanyForm) => {
    try {
      await addCompanyByRecruiter(data);
      reset();
      toast("Company added successfully !", {
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
      navigate(-1);
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  return (
    <BgDiv>
      <form
        style={{
          backgroundColor:
            organizationConfig.organization_theme.theme.backgroundColor,
        }}
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 rounded-lg shadow-lg w-full max-w-3xl  mx-auto p-8"
      >
        <div className="px-4 flex items-center justify-between gap-4 flex-wrap">
          <h1 className="text-base sm:text-xl md:text-3xl font-extrabold underline text-center">
            Add Company
          </h1>
          <Button
            bg={theme.colors.primary[5]}
            onClick={() => navigate(-1)}
            className="text-sm sm:text-base"
          >
            Cancel
          </Button>
        </div>
        <TextInput
          {...register("companyName")}
          label="Company Name"
          className="m-4 p-4"
          error={errors.companyName?.message}
        />
        <fieldset
          className="m-4 p-4"
          style={{
            border: `1px solid ${organizationConfig.organization_theme.theme.borderColor}`,
          }}
        >
          <legend>
            <h1 className="px-2">Primary Contact</h1>
          </legend>
          <TextInput
            {...register("primaryContact.name")}
            label="Name"
            error={errors.primaryContact?.name?.message}
          />
          <TextInput
            {...register("primaryContact.email")}
            label="Email"
            error={errors.primaryContact?.email?.message}
          />
          <TextInput
            {...register("primaryContact.phone")}
            label="Phone"
            error={errors.primaryContact?.phone?.message}
          />
        </fieldset>

        <div className="flex flex-wrap">
          <fieldset
            className="flex-auto m-4 p-4"
            style={{
              border: `1px solid ${organizationConfig.organization_theme.theme.borderColor}`,
            }}
          >
            <legend>
              <h1 className="px-2">Secondary Contact 1</h1>
            </legend>
            <TextInput
              {...register("secondaryContact_1.name")}
              label="Name"
              error={errors.secondaryContact_1?.name?.message}
            />
            <TextInput
              {...register("secondaryContact_1.email")}
              label="Email"
              error={errors.secondaryContact_1?.email?.message}
            />
            <TextInput
              {...register("secondaryContact_1.phone")}
              label="Phone"
              error={errors.secondaryContact_1?.phone?.message}
            />
          </fieldset>

          <fieldset
            className="flex-auto m-4 p-4"
            style={{
              border: `1px solid ${organizationConfig.organization_theme.theme.borderColor}`,
            }}
          >
            <legend>
              <h1 className="px-2">Secondary Contact 2</h1>
            </legend>
            <TextInput
              {...register("secondaryContact_2.name")}
              label="Name"
              error={errors.secondaryContact_2?.name?.message}
            />
            <TextInput
              {...register("secondaryContact_2.email")}
              label="Email"
              error={errors.secondaryContact_2?.email?.message}
            />
            <TextInput
              {...register("secondaryContact_2.phone")}
              label="Phone"
              error={errors.secondaryContact_2?.phone?.message}
            />
          </fieldset>
        </div>
        <div className="text-right">
          <Button size="md" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Loading..." : "Add Company"}
          </Button>
        </div>
      </form>
    </BgDiv>
  );
};

export default AddCompany;
