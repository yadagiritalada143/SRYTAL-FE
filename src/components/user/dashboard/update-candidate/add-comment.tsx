import { BgDiv } from "../../../common/style-components/bg-div";
import { Controller, useForm } from "react-hook-form";
import { DateTimePicker } from "@mantine/dates";
import { Button, Grid, Group, Textarea } from "@mantine/core";
import { OrganizationConfig } from "../../../../interfaces/organization";
import { AddCommentForm, commentSchema } from "../../../../forms/add-candidate";
import { zodResolver } from "@hookform/resolvers/zod";
import { addPoolCandidateCommentByRecruiter } from "../../../../services/user-services";
import { useCustomToast } from "../../../../utils/common/toast";
import { toast } from "react-toastify";

const AddComment = ({
  organizationConfig,
  candidateId,
  setComments,
}: {
  organizationConfig: OrganizationConfig;
  candidateId: string | undefined;
  setComments: any;
  comments: any;
}) => {
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setValue,
  } = useForm<AddCommentForm>({
    resolver: zodResolver(commentSchema),
  });
  const { showSuccessToast } = useCustomToast();

  const handleAddComment = (data: AddCommentForm) => {
    data.id = candidateId;
    addPoolCandidateCommentByRecruiter(data)
      .then((data) => {
        reset();
        showSuccessToast("Comment added successfully");
        setComments(data.comments);
        setValue("comment", "");
      })
      .catch((error) =>
        toast.error(error?.response?.data?.message || "Something went wrong")
      );
  };
  return (
    <div className="w-full max-w-3xl mx-auto my-6">
      <BgDiv>
        <form
          onSubmit={handleSubmit(handleAddComment)}
          style={{
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
          }}
          className="rounded-lg shadow-lg w-full p-8"
        >
          <Grid>
            <Grid.Col span={12}>
              <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                  <Textarea
                    label="Comment"
                    autosize
                    rows={4}
                    {...field}
                    error={errors?.comment?.message}
                  />
                )}
              />
            </Grid.Col>

            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Controller
                name="callStartsAt"
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
                    error={errors?.callStartsAt?.message}
                  />
                )}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, sm: 6 }}>
              <Controller
                name="callEndsAt"
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
                    error={errors?.callEndsAt?.message}
                  />
                )}
              />
            </Grid.Col>
          </Grid>
          <Group justify="right" mt="lg">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adding" : "Add Comment"}
            </Button>
          </Group>
        </form>
      </BgDiv>
    </div>
  );
};

export default AddComment;
