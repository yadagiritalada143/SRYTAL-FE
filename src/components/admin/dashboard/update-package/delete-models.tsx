import { Button, Checkbox, Title } from '@mantine/core';
import { StandardModal } from '../../../UI/Models/base-model';

interface DeletePackageModalProps {
  opened: boolean;
  close: () => void;
  confirmDelete: boolean;
  setConfirmDelete: (value: boolean) => void;
  agreeTerms: boolean;
  setAgreeTerms: (value: boolean) => void;
  handleDeletePackage: (confirmDelete: boolean) => void;
}

export const DeletePackageModel: React.FC<DeletePackageModalProps> = ({
  opened,
  close,
  confirmDelete,
  setConfirmDelete,
  agreeTerms,
  setAgreeTerms,
  handleDeletePackage,
}) => {
  return (
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
          Are you sure you want to delete this Package?
        </h2>
        <p className="mt-4 font-bold text-gray-600">
          This action is irreversible. Deleting an Package will permanently
          remove their details from the system.
        </p>
        <div className="mt-4 space-y-2">
          <Checkbox
            label="I understand the consequences of this action."
            checked={confirmDelete}
            onChange={e => setConfirmDelete(e.currentTarget.checked)}
            required
          />
          <Checkbox
            label="I agree that this package's details will be permanently deleted."
            checked={agreeTerms}
            onChange={e => setAgreeTerms(e.currentTarget.checked)}
          />
        </div>
        <div className="flex justify-between mt-8">
          <button
            className="bg-red-500 text-white py-2 px-4 rounded disabled:opacity-50"
            onClick={() => handleDeletePackage(agreeTerms)}
            disabled={!confirmDelete}
          >
            Delete
          </button>
          <Button onClick={close}>Cancel</Button>
        </div>
      </div>
    </StandardModal>
  );
};
