import { BgDiv } from "../../../common/style-components/bg-div";
import { Button, Grid, Group, Textarea } from "@mantine/core";
import { OrganizationConfig } from "../../../../interfaces/organization";

import { addCommentByRecruiter } from "../../../../services/user-services";
import { useCustomToast } from "../../../../utils/common/toast";
import { toast } from "react-toastify";
import { useState } from "react";

const AddCommentPoolCompany = ({
  organizationConfig,
  setComments,
  companyId,
  user,
}: {
  organizationConfig: OrganizationConfig;
  user: any;
  companyId: string;
  setComments: any;
  comments: any;
}) => {
  const { showSuccessToast } = useCustomToast();
  const [newComment, setNewComment] = useState<string>("");

  const handleAddComment = () => {
    addCommentByRecruiter(companyId, newComment)
      .then(() => {
        showSuccessToast("Your comment has been added !");
        const comment = {
          userId: {
            firstName: user.firstName,
            lastName: user.lastName,
          },
          updateAt: new Date().toLocaleDateString(),
          comment: newComment,
        };
        setComments((prev: any) => [comment, ...prev]);
        setNewComment("");
        close();
      })
      .catch((error) =>
        toast.error(
          error || error.response.data.message || "Something went wrong"
        )
      );
  };
  return (
    <div className="w-full max-w-3xl mx-auto my-6">
      <BgDiv>
        <form
          style={{
            backgroundColor:
              organizationConfig.organization_theme.theme.backgroundColor,
          }}
          className="rounded-lg shadow-lg w-full p-8"
        >
          <Grid>
            <Grid.Col span={12}>
              <Textarea
                label="Comment"
                autosize
                rows={4}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Grid.Col>
          </Grid>
          <Group justify="right" mt="lg">
            <Button onClick={handleAddComment}>Add Comment</Button>
          </Group>
        </form>
      </BgDiv>
    </div>
  );
};

export default AddCommentPoolCompany;
