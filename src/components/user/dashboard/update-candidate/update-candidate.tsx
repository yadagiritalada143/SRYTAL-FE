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
import { BackButton } from "../../../common/style-components/buttons";

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
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          style={{
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
          }}
          className="rounded-lg shadow-lg w-full max-w-3xl  mx-auto p-8"
        >
          <Container>
            <div className="px-4 flex justify-between">
              <div></div>
              <Title className="text-center" order={3}>
                Candidate Details
              </Title>
              <BackButton id={candidateId} />
            </div>
            <Grid gutter="md">
              <Grid.Col span={12}>
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
              </Grid.Col>
              <Grid.Col span={6}>
                <Controller
                  name="contact.email"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      label="Email"
                      {...field}
                      error={errors.contact?.email?.message}
                    />
                  )}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Controller
                  name="contact.phone"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      label="Phone"
                      {...field}
                      error={errors.contact?.phone?.message}
                    />
                  )}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Controller
                  name="totalYearsOfExperience"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      label="Total Experience"
                      {...field}
                      min={0}
                      error={errors.totalYearsOfExperience?.message}
                    />
                  )}
                />
              </Grid.Col>
              <Grid.Col span={6}>
                <Controller
                  name="relaventYearsOfExperience"
                  control={control}
                  render={({ field }) => (
                    <NumberInput
                      label="Relevant Experience"
                      {...field}
                      min={0}
                      error={
                        field.value > getValues("totalYearsOfExperience")
                          ? "Relevant experience cannot be more than total experience"
                          : errors.relaventYearsOfExperience?.message
                      }
                    />
                  )}
                />
              </Grid.Col>
              <Grid.Col span={12}>
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
              </Grid.Col>
            </Grid>
          </Container>

          <Group mt="lg" className="m-4 mb-8 flex justify-between">
            <button
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={(e) => {
                e.preventDefault();
                open();
              }}
            >
              Delete Candidate
            </button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating" : "Update Candidate"}
            </Button>
          </Group>
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
