import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Grid,
  NumberInput,
  TextInput,
  Group,
  Chip,
  Input,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import {
  AddCandidateForm,
  candidateSchema,
} from "../../../../forms/add-candidate";
import { BgDiv } from "../../../common/style-components/bg-div";
import { toast } from "react-toastify";
import { addPoolCandidateByRecruiter } from "../../../../services/user-services";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomToast } from "../../../../utils/common/toast";
import { DateTimePicker } from "@mantine/dates";
import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../../atoms/organization-atom";
import { BackButton } from "../../../common/style-components/buttons";

const AddPoolCandidate = () => {
  const params = useParams();
  const candidateId = params.candidateId as string;
  const {
    control,
    formState: { errors, isLoading },
    getValues,
    handleSubmit,
  } = useForm<AddCandidateForm>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      candidateName: "",
      contact: { email: "", phone: "" },
      evaluatedSkills: "",
      relaventYearsOfExperience: 0,
      totalYearsOfExperience: 0,
      comments: [{ callEndsAt: "", callStartsAt: "", comment: "" }],
    },
  });
  const navigate = useNavigate();
  const { showSuccessToast } = useCustomToast();
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const theme = useMantineTheme();

  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");

  const handleSkillAdd = () => {
    if (skillInput.trim() && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const onSubmit = (formData: AddCandidateForm) => {
    if (skills.length) {
      formData.evaluatedSkills = skills.join(",");
    }
    addPoolCandidateByRecruiter(formData)
      .then(() => {
        showSuccessToast("Candidate added successfully !");
        navigate(-1);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "Something went wrong");
      });
  };
  console.log(errors);
  return (
    <div className="w-full max-w-3xl mx-auto my-6">
      <BgDiv>
        <form
          style={{
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
          }}
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
          className="rounded-lg shadow-lg w-full p-8"
        >
          <div className="px-4 flex justify-between">
            <div></div>
            <h1 className="text-3xl font-extrabold underline text-center">
              Add Candidate
            </h1>
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

            <Grid.Col span={12}>
              <Controller
                name="comments.0.comment"
                control={control}
                render={({ field }) => (
                  <Textarea
                    label="Comment"
                    autosize
                    rows={4}
                    {...field}
                    error={errors.comments?.[0]?.comment?.message}
                  />
                )}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Controller
                name="comments.0.callStartsAt"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    {...field}
                    value={field.value ? new Date(field.value) : null}
                    onChange={(date) =>
                      field.onChange(date ? date.toISOString() : null)
                    }
                    clearable
                    label="Call Start Time"
                    placeholder="Pick date and time"
                    error={errors.comments?.[0]?.callStartsAt?.message}
                  />
                )}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Controller
                name="comments.0.callEndsAt"
                control={control}
                render={({ field }) => (
                  <DateTimePicker
                    {...field}
                    value={field.value ? new Date(field.value) : null}
                    onChange={(date) =>
                      field.onChange(date ? date.toISOString() : null)
                    }
                    clearable
                    label="Call End Time"
                    placeholder="Pick date and time"
                    error={errors.comments?.[0]?.callEndsAt?.message}
                  />
                )}
              />
            </Grid.Col>
          </Grid>

          <Group justify="flex-end" className="my-6">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Candidate"}
            </Button>
          </Group>
        </form>
      </BgDiv>
    </div>
  );
};

export default AddPoolCandidate;
