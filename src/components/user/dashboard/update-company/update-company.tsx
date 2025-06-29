import { zodResolver } from '@hookform/resolvers/zod';
import { useDisclosure } from '@mantine/hooks';
import {
  AddCompanyForm,
  addCompanySchema,
} from '../../../../forms/add-company';
import { useForm, Controller } from 'react-hook-form';
import { Button, Checkbox, Select, TextInput, Title } from '@mantine/core';
import {
  getCompanyDetailsByIdByRecruiter,
  updateCompanyByRecruiter,
} from '../../../../services/user-services';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { userDetailsAtom } from '../../../../atoms/user';
import { BgDiv } from '../../../common/style-components/bg-div';
import { useCustomToast } from '../../../../utils/common/toast';
import PoolCompaniesCommentsTable from './comments';
import AddCommentPoolCompany from './add-comment';
import { deletePoolCompanyByAdmin } from '../../../../services/admin-services';
import { BackButton } from '../../../common/style-components/buttons';
import { StandardModal } from '../../../UI/Models/base-model';

const UpdateCompany = () => {
  const params = useParams();
  const companyId = params.companyId as string;
  const navigate = useNavigate();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const user = useRecoilValue(userDetailsAtom);
  const [opened, { open, close }] = useDisclosure(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

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
      .then(response => {
        reset(response);
        if (response.comments) {
          setComments(response.comments);
        } else {
          setComments([]);
        }
      })
      .catch(error => toast.error(error.response.data.message));
  }, [companyId, reset]);

  const onSubmit = async (data: AddCompanyForm) => {
    try {
      await updateCompanyByRecruiter(data, companyId);
      showSuccessToast('Company details updated successfully !');
      navigate(-1);
    } catch (error: any) {
      toast.error(error.response.data.message || 'Something went wrong');
    }
  };

  const handleDeleteCompany = (companyId: string, agreeTerms: boolean) => {
    const payload = {
      companyId: companyId,
      confirmDelete: agreeTerms,
    };
    deletePoolCompanyByAdmin(payload)
      .then(() => {
        showSuccessToast('Company deleted successfully!');
        navigate(-1);
      })
      .catch((error: { response?: { data?: { message?: string } } }) => {
        toast.error(error.response?.data?.message || 'Something went wrong');
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
          <div className="px-3 flex items-center justify-between gap-4 flex-wrap">
            <Title
              className="text-base sm:text-xl md:text-2xl font-extrabold underline text-left flex-1"
              order={3}
            >
              Update Company Details
            </Title>
            <BackButton id={companyId} />
          </div>
          <div className="px-4 flex flex-col sm:flex-row sm:items-end sm:gap-4 gap-2">
            <TextInput
              {...register('companyName')}
              label="Company Name"
              className="w-full sm:w-1/2 md:w-full"
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
                  className="w-full sm:w-1/2 md:w-full"
                  {...field}
                  data={[
                    { value: 'Created', label: 'Created' },
                    { value: 'Followed Up', label: 'Followed Up' },
                    {
                      value: 'Waiting For Response',
                      label: 'Waiting For Response',
                    },
                    { value: 'Not Interested', label: 'Not Interested' },
                    { value: 'On Boarded', label: 'On Boarded' },
                    { value: 'Closed', label: 'Closed' },
                  ]}
                  value={field.value}
                />
              )}
            />
          </div>

          <fieldset className="mx-4  p-4 border">
            <legend className="text-lg font-semibold">Primary Contact</legend>
            <TextInput
              {...register('primaryContact.name')}
              label="Name"
              className="mb-2"
              error={errors.primaryContact?.name?.message}
            />
            <TextInput
              {...register('primaryContact.email')}
              label="Email"
              className="mb-2"
              error={errors.primaryContact?.email?.message}
            />
            <TextInput
              {...register('primaryContact.phone')}
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
                {...register('secondaryContact_1.name')}
                label="Name"
                className="mb-2"
                error={errors.secondaryContact_1?.name?.message}
              />
              <TextInput
                {...register('secondaryContact_1.email')}
                label="Email"
                className="mb-2"
                error={errors.secondaryContact_1?.email?.message}
              />
              <TextInput
                {...register('secondaryContact_1.phone')}
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
                {...register('secondaryContact_2.name')}
                label="Name"
                className="mb-2"
                error={errors.secondaryContact_2?.name?.message}
              />
              <TextInput
                {...register('secondaryContact_2.email')}
                label="Email"
                className="mb-2"
                error={errors.secondaryContact_2?.email?.message}
              />
              <TextInput
                {...register('secondaryContact_2.phone')}
                label="Phone"
                className="mb-2"
                error={errors.secondaryContact_2?.phone?.message}
              />
            </fieldset>
          </div>
          <div className="px-4">
            <div className="my-4 flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded w-full sm:w-auto"
                onClick={e => {
                  e.preventDefault();
                  open();
                }}
              >
                Delete Company
              </button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? 'Loading...' : 'Update Company'}
              </Button>
            </div>
          </div>
        </form>
      </BgDiv>
      <StandardModal
        title={
          <Title order={3} c="red">
            Delete Action
          </Title>
        }
        size="md"
        opened={opened}
        onClose={close}
      >
        <div>
          <h2 className="font-bold text-lg">
            Sure want to delete this Company?{' '}
          </h2>
          <p className="mt-4 font-bold">
            Please be aware of doing this action! Deleting company is an
            un-reversible action and you should be aware while doing this.
          </p>
          <div className="mt-4">
            <Checkbox
              label="I understand what are the consequences of doing this action!"
              checked={confirmDelete}
              onChange={e => setConfirmDelete(e.currentTarget.checked)}
              required
            />
            <Checkbox
              label="I understand that this employee details are not a part of our application forever. I agreed to the Terms and Conditions to perform this action"
              checked={agreeTerms}
              onChange={e => setAgreeTerms(e.currentTarget.checked)}
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
      </StandardModal>

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
