import {
  Container,
  Group,
  Button,
  TextInput,
  Title,
  Grid,
  NumberInput,
  Chip,
  Input,
} from "@mantine/core";
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
import { commonUrls } from "../../../../utils/common/constants";
import AddComment from "./add-comment";
import CommentsTable from "./comments-table";

const UpdatePoolCandidateForm = () => {
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<PoolCandidatesComments[]>([]);
  const organizationConfig = useRecoilValue(organizationThemeAtom);

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
  const { candidateId } = useParams();

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

        navigate(
          `${commonUrls(
            organizationConfig.organization_name
          )}/dashboard/pool-candidates`
        );
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
            <Title className="text-center" order={3}>
              Candidate Details
            </Title>
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

          <Group justify="right" mt="lg">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating" : "Update Candidate"}
            </Button>
          </Group>
        </form>
      </BgDiv>

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
