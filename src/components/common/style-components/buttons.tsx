import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";

export const BackButton = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  return (
    <Button
      className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
      onClick={() => {
        localStorage.setItem("id", id);
        navigate(-1);
      }}
    >
      <IconArrowLeft size={20} />
      Back
    </Button>
  );
};
