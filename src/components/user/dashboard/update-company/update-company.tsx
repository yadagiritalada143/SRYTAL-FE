import { zodResolver } from "@hookform/resolvers/zod";
import { useDisclosure } from "@mantine/hooks";
import {
  AddCompanyForm,
  addCompanySchema,
} from "../../../../forms/add-company";
import { useForm, Controller } from "react-hook-form";
import {
  Button,
  Checkbox,
  Modal,
  Select,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import {
  getCompanyDetailsByIdByRecruiter,
  updateCompanyByRecruiter,
} from "../../../../services/user-services";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  commonUrls,
  organizationAdminUrls,
} from "../../../../utils/common/constants";
import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../../atoms/organization-atom";
import { userDetailsAtom } from "../../../../atoms/user";
import { BgDiv } from "../../../common/style-components/bg-div";
import { useCustomToast } from "../../../../utils/common/toast";
import PoolCompaniesCommentsTable from "./comments";
import AddCommentPoolCompany from "./add-comment";
import { deletePoolCompanyByAdmin } from "../../../../services/admin-services";

const UpdateCompany = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const navigate = useNavigate();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const user = useRecoilValue(userDetailsAtom);
  const [opened, { open, close }] = useDisclosure(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const theme = useMantineTheme();

  const [comments, setComments] = useState<
    {
      updateAt: string;
      userId: { firstName: string; lastName: string };
      comment: string;
    }[]
  >([]);
  const { showSuccessToast } = useCustomToast();

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    control,
    reset,
  } = useForm<AddCompanyForm>({
    resolver: zodResolver(addCompanySchema),
  });

  useEffect(() => {
    getCompanyDetailsByIdByRecruiter(companyId)
      .then((response) => {
        reset(response);
        if (response.comments) {
          setComments(response.comments);
        } else {
          setComments([]);
        }
      })
      .catch((error) => toast.error(error.response.data.message));
  }, [companyId, reset]);

  const onSubmit = async (data: AddCompanyForm) => {
    try {
      await updateCompanyByRecruiter(data, companyId);
      showSuccessToast("Company details updated successfully !");
      navigate(
        `${commonUrls(
          organizationConfig.organization_name
        )}/dashboard/pool-companies`
      );
    } catch (error: any) {
      toast.error(error.response.data.message || "Something went wrong");
    }
  };

  const handleDeleteCompany = (companyId: string, agreeTerms: boolean) => {
    const payload = {
      companyId: companyId,
      confirmDelete: agreeTerms,
    };
    deletePoolCompanyByAdmin(payload)
      .then(() => {
        showSuccessToast("Company deleted successfully!");
        navigate(
          `${organizationAdminUrls(
            organizationConfig.organization_name
          )}/dashboard/pool-companies`
        );
      })
      .catch((error: { response?: { data?: { message?: string } } }) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  return (
    <div>
      <BgDiv>
        <form
          style={{
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
          }}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 rounded-lg shadow-lg w-full max-w-3xl  mx-auto p-8"
        >
          <div className="px-4 flex justify-between">
            <div></div>
            <Title className="text-center" order={3}>
              Update Company Details
            </Title>
            <Button
              bg={theme.colors.primary[5]}
              onClick={() =>
                navigate(
                  `${organizationAdminUrls(
                    organizationConfig.organization_name
                  )}/dashboard/pool-companies`
                )
              }
            >
              {" "}
              Cancel
            </Button>
          </div>
          <div className="px-4 flex flex-wrap space-x-10 ">
            <TextInput
              {...register("companyName")}
              label="Company Name"
              className="w-1/3"
              disabled
              error={errors.companyName?.message}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select
                  label="Select Status"
                  placeholder="Pick value"
                  className="w-1/3"
                  {...field}
                  data={[
                    { value: "Created", label: "Created" },
                    { value: "Followed Up", label: "Followed Up" },
                    {
                      value: "Waiting For Response",
                      label: "Waiting For Response",
                    },
                    { value: "Not Interested", label: "Not Interested" },
                    { value: "On Boarded", label: "On Boarded" },
                    { value: "Closed", label: "Closed" },
                  ]}
                  value={field.value}
                />
              )}
            />
          </div>

          <fieldset className="mx-4  p-4 border">
            <legend className="text-lg font-semibold">Primary Contact</legend>
            <TextInput
              {...register("primaryContact.name")}
              label="Name"
              className="mb-2"
              error={errors.primaryContact?.name?.message}
            />
            <TextInput
              {...register("primaryContact.email")}
              label="Email"
              className="mb-2"
              error={errors.primaryContact?.email?.message}
            />
            <TextInput
              {...register("primaryContact.phone")}
              label="Phone"
              className="mb-2"
              error={errors.primaryContact?.phone?.message}
            />
          </fieldset>

          <div className="flex flex-wrap">
            <fieldset className="flex-auto m-4 p-4 border">
              <legend className="text-lg font-semibold">
                Secondary Contact 1
              </legend>
              <TextInput
                {...register("secondaryContact_1.name")}
                label="Name"
                className="mb-2"
                error={errors.secondaryContact_1?.name?.message}
              />
              <TextInput
                {...register("secondaryContact_1.email")}
                label="Email"
                className="mb-2"
                error={errors.secondaryContact_1?.email?.message}
              />
              <TextInput
                {...register("secondaryContact_1.phone")}
                label="Phone"
                className="mb-2"
                error={errors.secondaryContact_1?.phone?.message}
              />
            </fieldset>

            <fieldset className="flex-auto m-4 p-4 border">
              <legend className="text-lg font-semibold">
                Secondary Contact 2
              </legend>
              <TextInput
                {...register("secondaryContact_2.name")}
                label="Name"
                className="mb-2"
                error={errors.secondaryContact_2?.name?.message}
              />
              <TextInput
                {...register("secondaryContact_2.email")}
                label="Email"
                className="mb-2"
                error={errors.secondaryContact_2?.email?.message}
              />
              <TextInput
                {...register("secondaryContact_2.phone")}
                label="Phone"
                className="mb-2"
                error={errors.secondaryContact_2?.phone?.message}
              />
            </fieldset>
          </div>
          <div className="text-right">
            <div className="m-4 mb-8 flex justify-between">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded"
                onClick={(e) => {
                  e.preventDefault();
                  open();
                }}
              >
                Delete Company
              </button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Update Company"}
              </Button>
            </div>
          </div>
        </form>
      </BgDiv>
      <Modal size="md" opened={opened} onClose={close}>
        <div>
          <h2 className="font-bold text-lg">
            Sure want to delete this Company?{" "}
          </h2>
          <p className="mt-4 font-bold">
            Please be aware of doing this action! Deleting company is an
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
              onClick={() => handleDeleteCompany(companyId!, agreeTerms)}
              disabled={!confirmDelete}
            >
              Delete
            </button>
            <Button onClick={close}>Cancel</Button>
          </div>
        </div>
      </Modal>

      <AddCommentPoolCompany
        organizationConfig={organizationConfig}
        comments={comments}
        setComments={setComments}
        user={user}
        companyId={companyId}
      />
      <PoolCompaniesCommentsTable
        organizationConfig={organizationConfig}
        comments={comments}
      />
    </div>
  );
};

export default UpdateCompany;
