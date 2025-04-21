import { Button, Checkbox, Modal } from "@mantine/core";

interface DeletePackageModalProps {
  opened: boolean;
  close: () => void;
  confirmDelete: boolean;
  setConfirmDelete: (value: boolean) => void;
  agreeTerms: boolean;
  setAgreeTerms: (value: boolean) => void;
  handleDeleteTask: (task: string, hard: boolean) => void;
  selectedTask: string;
}

export const DeleteTaskModel: React.FC<DeletePackageModalProps> = ({
  opened,
  close,
  confirmDelete,
  setConfirmDelete,
  agreeTerms,
  setAgreeTerms,
  handleDeleteTask,
  selectedTask,
}) => {
  return (
    <Modal size="md" opened={opened} onClose={close}>
      <div>
        <h2 className="font-bold text-lg">
          Are you sure you want to delete this Task?
        </h2>
        <p className="mt-4 font-bold text-gray-600">
          This action is irreversible. Deleting an Task will permanently remove
          their details from the system.
        </p>
        <div className="mt-4 space-y-2">
          <Checkbox
            label="I understand the consequences of this action."
            checked={confirmDelete}
            onChange={(e) => setConfirmDelete(e.currentTarget.checked)}
            required
          />
          <Checkbox
            label="I agree that this Tasks's details will be permanently deleted."
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.currentTarget.checked)}
          />
        </div>
        <div className="flex justify-between mt-8">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded disabled:opacity-50"
            onClick={() => handleDeleteTask(selectedTask, agreeTerms)}
            disabled={!confirmDelete}
          >
            Delete
          </button>
          <Button onClick={close}>Cancel</Button>
        </div>
      </div>
    </Modal>
  );
};
