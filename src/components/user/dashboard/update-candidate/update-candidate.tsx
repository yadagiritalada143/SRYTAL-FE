import {
  Container,
  Group,
  Button,
  TextInput,
  Grid,
  NumberInput,
  Chip,
  Input,
  Modal,
  Checkbox,
  useMantineTheme,
  Title,
} from "@mantine/core";
import { useCustomToast } from "../../../../utils/common/toast";
import { useEffect, useState } from "react";
import {
  UpdateCandidateSchema,
  updateCandidateSchema,
} from "../../../../forms/add-candidate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  useNavigate,
  //  useNavigate,
  useParams,
} from "react-router-dom";
import {
  // addPoolCandidateByRecruiter,
  getPoolCandidateByRecruiter,
  updatePoolCandidateByRecruiter,
} from "../../../../services/user-services";
import { toast } from "react-toastify";
// import { organizationEmployeeUrls } from "../../../../utils/common/constants";
import { organizationThemeAtom } from "../../../../atoms/organization-atom";
import { useRecoilValue } from "recoil";
import { PoolCandidatesComments } from "../../../../interfaces/candidate";
import { BgDiv } from "../../../common/style-components/bg-div";
import { organizationAdminUrls } from "../../../../utils/common/constants";
import AddComment from "./add-comment";
import CommentsTable from "./comments-table";
import { useDisclosure } from "@mantine/hooks";
import { deletePoolCandidatesByAdmin } from "../../../../services/admin-services";

const UpdatePoolCandidateForm = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<PoolCandidatesComments[]>([]);
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const [opened, { open, close }] = useDisclosure(false);
  const { showSuccessToast } = useCustomToast();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const theme = useMantineTheme();

  const {
    control,
    formState: { errors, isSubmitting },
    reset,
    getValues,
    handleSubmit,
  } = useForm<UpdateCandidateSchema>({
    resolver: zodResolver(updateCandidateSchema),
  });

  const navigate = useNavigate();
  const params = useParams();
  const candidateId = params.candidateId as string;

  useEffect(() => {
    if (candidateId) {
      getPoolCandidateByRecruiter(candidateId)
        .then((data) => {
          setComments(data.comments);
          setSkills(data.evaluatedSkills.split(","));
          reset(data);
        })
        .catch(() => {
          toast.error("Failed to fetch candidate details.");
        })
        .finally(() => setLoading(false));
    }
  }, [candidateId, reset]);

  const handleDeleteCandidate = (candidateId: string, agreeTerms: boolean) => {
    const payload = {
      candidateId: candidateId,
      confirmDelete: agreeTerms,
    };
    deletePoolCandidatesByAdmin(payload)
      .then(() => {
        showSuccessToast("Candidate deleted successfully!");
        navigate(
          `${organizationAdminUrls(
            organizationConfig.organization_name
          )}/dashboard/pool-candidates`
        );
      })
      .catch((error: { response?: { data?: { message?: string } } }) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleUpdateCandidate = (data: UpdateCandidateSchema) => {
    if (skills.length) {
      data.evaluatedSkills = skills.join(",");
    }
    data.id = candidateId;
    updatePoolCandidateByRecruiter(data)
      .then(() => {
        toast.success("Candidate updated successfully!");

        navigate(-1);
      })
      .catch(() => {
        toast.error("Failed to update candidate.");
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full my-6">
      <BgDiv>
        <form
          onSubmit={handleSubmit(handleUpdateCandidate)}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
          style={{
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
          }}
          className="space-y-4 rounded-lg shadow-lg w-full max-w-3xl mx-auto p-8"
        >
          <div className="px-3 flex items-center justify-between gap-4 flex-wrap">
            <Title
              className="text-base sm:text-xl md:text-2xl font-extrabold underline text-left flex-1"
              order={3}
            >
              Candidate Details
            </Title>
            <Button
              bg={theme.colors.primary[5]}
              onClick={() => navigate(-1)}
              className="text-sm sm:text-base self-center sm:self-auto"
            >
              Cancel
            </Button>
          </div>
          <div className="px-4 space-y-4">
            <Controller
              name="candidateName"
              control={control}
              render={({ field }) => (
                <TextInput
                  label="Candidate Name"
                  {...field}
                  error={errors.candidateName?.message}
                />
              )}
            />
            <div className="flex flex-col sm:flex-row sm:items-end sm:gap-4 gap-2">
              <Controller
                name="contact.email"
                control={control}
                render={({ field }) => (
                  <TextInput
                    label="Email"
                    {...field}
                    className="w-full sm:w-1/2 md:w-full"
                    error={errors.contact?.email?.message}
                  />
                )}
              />
              <Controller
                name="contact.phone"
                control={control}
                render={({ field }) => (
                  <TextInput
                    label="Phone"
                    {...field}
                    className="w-full sm:w-1/2 md:w-full"
                    error={errors.contact?.phone?.message}
                  />
                )}
              />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end sm:gap-4 gap-2">
              <Controller
                name="totalYearsOfExperience"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    label="Total Experience"
                    {...field}
                    min={0}
                    className="w-full sm:w-1/2 md:w-full"
                    error={errors.totalYearsOfExperience?.message}
                  />
                )}
              />
              <Controller
                name="relaventYearsOfExperience"
                control={control}
                render={({ field }) => (
                  <NumberInput
                    label="Relevant Experience"
                    {...field}
                    min={0}
                    className="w-full sm:w-1/2 md:w-full"
                    error={
                      field.value > getValues("totalYearsOfExperience")
                        ? "Relevant experience cannot be more than total experience"
                        : errors.relaventYearsOfExperience?.message
                    }
                  />
                )}
              />
            </div>
            <div>
              <Input.Wrapper label="Skills">
                <Group>
                  <TextInput
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSkillAdd()}
                    className="flex-1"
                  />
                  <Button onClick={handleSkillAdd}>Add Skill</Button>
                </Group>
              </Input.Wrapper>
              <Group mt="md">
                {skills.map((skill) => (
                  <Chip key={skill} onClick={() => handleSkillRemove(skill)}>
                    {skill} ✖
                  </Chip>
                ))}
              </Group>
            </div>
          </div>

          <div className="px-4">
            <div className="my-4 flex flex-col sm:flex-row justify-between gap-4 sm:items-center">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded w-full sm:w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  open();
                }}
              >
                Delete Candidate
              </button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Updating..." : "Update Candidate"}
              </Button>
            </div>
          </div>
        </form>
      </BgDiv>
      <Modal size="md" opened={opened} onClose={close}>
        <div>
          <h2 className="font-bold text-lg">
            Sure want to delete this Candidate?{" "}
          </h2>
          <p className="mt-4 font-bold">
            Please be aware of doing this action! Deleting candidate is an
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
              onClick={() => handleDeleteCandidate(candidateId!, agreeTerms)}
              disabled={!confirmDelete}
            >
              Delete
            </button>
            <Button onClick={close}>Cancel</Button>
          </div>
        </div>
      </Modal>

      <AddComment
        organizationConfig={organizationConfig}
        candidateId={candidateId}
        comments={comments}
        setComments={setComments}
      />

      <CommentsTable
        comments={comments}
        organizationConfig={organizationConfig}
      />
    </div>
  );
};

export default UpdatePoolCandidateForm;
