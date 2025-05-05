import { useState, useEffect } from "react";
import {
  Button,
  Group,
  Text,
  Loader,
  Pagination,
  Modal,
  Box,
  TextInput,
} from "@mantine/core";
import { toast } from "react-toastify";
import { useDisclosure } from "@mantine/hooks";
import { IconEdit } from "@tabler/icons-react";
import {
  getAllBloodGroupByAdmin,
  addBloodGroupByAdmin,
  updateBloodGroupByAdmin,
  deleteBloodGroupByAdmin,
} from "../../../../services/admin-services";
import { useRecoilState, useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../../atoms/organization-atom";
import { useMantineTheme } from "@mantine/core";
import { SearchBarFullWidht } from "../../../common/search-bar/search-bar";
import { bloodGroupAtom } from "../../../../atoms/bloodgroup-atom";

const BloodGroupTable = () => {
  const [bloodGroups, setBloodGroups] = useRecoilState(bloodGroupAtom);
  const [filteredBloodGroups, setFilteredBloodGroups] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [selectedGroup, setSelectedGroup] = useState<any | null>(null);
  const [newGroupName, setNewGroupName] = useState("");
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const [search, setSearch] = useState("");
  const theme = useMantineTheme();

  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);

  // Fetch blood groups on mount
  useEffect(() => {
    if (bloodGroups.length === 0) {
      fetchBloodGroups();
    } else {
      setFilteredBloodGroups(bloodGroups);
      setIsLoading(false);
    }
  }, []);

  const fetchBloodGroups = async () => {
    setIsLoading(true);
    try {
      const data = await getAllBloodGroupByAdmin();
      setBloodGroups(data);
      setFilteredBloodGroups(data);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to fetch blood groups");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (group: any) => {
    setSelectedGroup(group);
    openEditModal();
  };

  const handleDelete = (id: string) => {
    setSelectedGroup({ id });
    openDeleteModal();
  };

  const confirmEdit = async () => {
    setIsLoading(true);
    try {
      await updateBloodGroupByAdmin(selectedGroup.id, selectedGroup.type);
      toast.success("Blood group updated successfully");
      fetchBloodGroups();
      closeEditModal();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update blood group");
    } finally {
      setIsLoading(false);
    }
  };

  // Confirm delete
  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      await deleteBloodGroupByAdmin(selectedGroup.id);
      toast.success("Blood group deleted successfully");
      fetchBloodGroups();
      closeDeleteModal();
      closeEditModal();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete blood group");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle add blood group
  const handleAdd = async () => {
    setIsLoading(true);
    try {
      await addBloodGroupByAdmin({ type: newGroupName });
      toast.success("Blood group added successfully");
      fetchBloodGroups();
      closeAddModal();
      setNewGroupName("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to add blood group");
    } finally {
      setIsLoading(false);
    }
  };

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredBloodGroups.length / itemsPerPage);
  const paginatedData = filteredBloodGroups.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);

    const filtered = bloodGroups.filter((blood) => {
      blood.type.toString().toLowerCase();
      blood.type.toString().trim();
      return (
        blood.type.toString().toLowerCase().includes(query.toLowerCase()) ||
        blood.id.toString().toLowerCase().includes(query.toLowerCase())
      );
    });
    setFilteredBloodGroups(filtered);
  };

  return (
    <div
      style={{
        color: organizationConfig.organization_theme.theme.button.textColor,
        fontFamily: theme.fontFamily,
      }}
      className="h-auto"
    >
      <div>
        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold underline text-center px-2 py-4">
          Manage Blood Groups
        </h1>
        <div className="text-right">
          <Button onClick={openAddModal}>Add Blood Group</Button>
        </div>

        <SearchBarFullWidht
          search={search}
          handleSearch={handleSearch}
          placeHolder="Search by blood group"
        />

        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader
              size="xl"
              color={organizationConfig.organization_theme.theme.button.color}
            />
          </div>
        ) : (
          <div className="overflow-auto max-w-full shadow-lg rounded-lg">
            <table className="w-full text-center shadow-md border table-auto">
              <colgroup>
                <col className="w-16" />
                <col className="w-32" />
                <col className="w-32" />
              </colgroup>
              <thead
                className="text-xs"
                style={{
                  backgroundColor:
                    organizationConfig.organization_theme.theme.backgroundColor,
                  color: organizationConfig.organization_theme.theme.color,
                }}
              >
                <tr>
                  <th className="p-2 border">Id</th>
                  <th className="p-2 border">Blood Group</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {paginatedData.map((bloodGroup, index) => (
                  <tr key={bloodGroup._id}>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      {bloodGroup.type}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      <Button onClick={() => handleEdit(bloodGroup)}>
                        <IconEdit />
                      </Button>
                    </td>
                  </tr>
                ))}
                {totalPages > 1 && (
                  <Pagination
                    total={totalPages}
                    value={activePage}
                    onChange={setActivePage}
                    mt="md"
                  />
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        opened={addModalOpened}
        onClose={closeAddModal}
        title={
          <Text className="text-center font-bold text-xl">
            Add New Blood Group
          </Text>
        }
        centered
      >
        <Box>
          <TextInput
            label="Blood Group Name"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="Enter blood group name"
            required
            mb="md"
          />
          <Group justify="flex-end">
            <Button
              bg={organizationConfig.organization_theme.theme.backgroundColor}
              c={organizationConfig.organization_theme.theme.color}
              variant="outline"
              onClick={closeAddModal}
            >
              Cancel
            </Button>
            <Button
              bg={organizationConfig.organization_theme.theme.backgroundColor}
              onClick={handleAdd}
              c={organizationConfig.organization_theme.theme.color}
              disabled={isLoading}
            >
              Add
            </Button>
          </Group>
        </Box>
      </Modal>
      <Modal
        opened={editModalOpened}
        onClose={closeEditModal}
        title={
          <Text className="text-center font-bold text-xl">
            Edit Blood Group
          </Text>
        }
        centered
      >
        <Box>
          <TextInput
            label="Blood Group Name"
            value={selectedGroup?.type || ""}
            onChange={(e) =>
              setSelectedGroup({ ...selectedGroup, type: e.target.value })
            }
            required
            mb="md"
          />
          <Group justify="flex-end">
            <Button
              bg={organizationConfig.organization_theme.theme.backgroundColor}
              c={organizationConfig.organization_theme.theme.color}
              variant="outline"
              onClick={closeEditModal}
            >
              Cancel
            </Button>
            <Button
              bg={organizationConfig.organization_theme.theme.backgroundColor}
              c={organizationConfig.organization_theme.theme.color}
              variant="outline"
              onClick={confirmEdit}
            >
              Save Changes
            </Button>
            <Button bg="red" onClick={() => handleDelete(selectedGroup.id)}>
              Delete
            </Button>
          </Group>
        </Box>
      </Modal>
      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title={
          <Text className="text-center font-bold text-xl">
            Delete Blood Group
          </Text>
        }
        centered
      >
        <Text size="sm">Are you sure you want to delete this blood group?</Text>
        <Group justify="flex-end" mt="md">
          <Button
            bg={organizationConfig.organization_theme.theme.backgroundColor}
            c={organizationConfig.organization_theme.theme.color}
            variant="outline"
            onClick={closeDeleteModal}
          >
            Cancel
          </Button>
          <Button bg="red" onClick={confirmDelete}>
            Delete
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default BloodGroupTable;
