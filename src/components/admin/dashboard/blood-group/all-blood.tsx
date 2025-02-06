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
import { useRecoilValue } from "recoil";
import { organizationThemeAtom } from "../../../../atoms/organization-atom";
import { useMantineTheme } from "@mantine/core";
import { SearchBarFullWidht } from "../../../common/search-bar/search-bar";

const BloodGroupTable = () => {
  const [bloodGroups, setBloodGroups] = useState<any[]>([]);
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
    fetchBloodGroups();
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
    try {
      await updateBloodGroupByAdmin();
      toast.success("Blood group updated successfully");
      fetchBloodGroups();
      closeEditModal();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update blood group");
    }
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      await deleteBloodGroupByAdmin();
      toast.success("Blood group deleted successfully");
      fetchBloodGroups();
      closeDeleteModal();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete blood group");
    }
  };

  // Handle add blood group
  const handleAdd = async () => {
    try {
      await addBloodGroupByAdmin({ type: newGroupName });
      toast.success("Blood group added successfully");
      fetchBloodGroups();
      closeAddModal();
      setNewGroupName("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to add blood group");
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
    const query = e.target.value.toLowerCase();
    setSearch(query);

    const filtered = bloodGroups.filter((blood) => {
      blood.type.toString().toLowerCase();
      blood.type.toString().trim();
      return (
        blood.type.toString().includes(query) ||
        blood.id.toString().includes(query)
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
        <div className="flex justify-between items-center mx-4 my-4">
          <h1 className="text-2xl font-bold text-center">
            Manage Blood Groups
          </h1>
          <div>
            <Button onClick={openAddModal}>Add Blood Group</Button>
          </div>
        </div>

        <SearchBarFullWidht search={search} handleSearch={handleSearch} />

        {isLoading ? (
          <div className="flex justify-center items-center h-48">
            <Loader
              size="xl"
              color={organizationConfig.organization_theme.theme.button.color}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed text-center shadow-md">
              <colgroup>
                <col className="w-56" />
                <col className="w-32" />
                <col className="w-32" />
              </colgroup>
              <thead className="text-xs uppercase">
                <tr>
                  <th className="p-2 border">Id</th>
                  <th className="p-2 border">Blood Group</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {paginatedData.map((bloodGroup) => (
                  <tr
                    key={bloodGroup._id}
                    className="hover:bg-slate-200 hover:text-black"
                  >
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      {bloodGroup.id}
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
        title="Add New Blood Group"
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
            <Button variant="outline" onClick={closeAddModal}>
              Cancel
            </Button>
            <Button onClick={handleAdd}>Add</Button>
          </Group>
        </Box>
      </Modal>

      <Modal
        opened={editModalOpened}
        onClose={closeEditModal}
        title="Edit Blood Group"
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
            <Button variant="outline" onClick={closeEditModal}>
              Cancel
            </Button>
            <Button onClick={confirmEdit}>Save Changes</Button>
            <Button bg="red" onClick={confirmDelete}>
              Delete
            </Button>
          </Group>
        </Box>
      </Modal>

      <Modal
        opened={deleteModalOpened}
        onClose={closeDeleteModal}
        title="Confirm Deletion"
        centered
      >
        <Text size="sm">Are you sure you want to delete this blood group?</Text>
        <Group justify="flex-end" mt="md">
          <Button variant="outline" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button color="red" onClick={() => handleDelete("id")}>
            Delete
          </Button>
        </Group>
      </Modal>
    </div>
  );
};

export default BloodGroupTable;
