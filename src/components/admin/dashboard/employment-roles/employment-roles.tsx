import { useState, useEffect } from 'react';
import {
  Button,
  Group,
  Text,
  Loader,
  Pagination,
  Modal,
  Box,
  TextInput,
} from '@mantine/core';
import { toast } from 'react-toastify';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit } from '@tabler/icons-react';
import {
  addEmployeeRoleByAdmin,
  deleteEmployeeRoleByAdmin,
  getAllEmployeeRoleByAdmin,
  updateEmployeeRoleByAdmin,
} from '../../../../services/admin-services';
import { useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { useMantineTheme } from '@mantine/core';
import { SearchBarFullWidht } from '../../../common/search-bar/search-bar';

const isValidDesignation = (value: string) =>
  /^([A-Za-z()\-\s_]|[0-9])+$/.test(value) && !/\d{2,}/.test(value);

const EmploymentRoles = () => {
  const [employmentRoles, setEmploymentRoles] = useState<
    { id: string; designation: string }[]
  >([]);
  const [filteredEmployementRole, setFilteredEmployementRole] = useState<any[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [selectedRole, setSelectedRole] = useState<any | null>(null);
  const [newTypeRole, setNewRoleName] = useState('');
  const organizationConfig = useRecoilValue(organizationThemeAtom);
  const [search, setSearch] = useState('');
  const theme = useMantineTheme();

  const [editModalOpened, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [
    deleteModalOpened,
    { open: openDeleteModal, close: closeDeleteModal },
  ] = useDisclosure(false);
  const [addModalOpened, { open: openAddModal, close: closeAddModal }] =
    useDisclosure(false);

  useEffect(() => {
    fetchEmployementRoles();
  }, []);

  const fetchEmployementRoles = async () => {
    setIsLoading(true);
    try {
      const data = await getAllEmployeeRoleByAdmin();
      setEmploymentRoles(data);
      setFilteredEmployementRole(data);
    } catch (error) {
      toast.error('Failed to fetch employment types');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (group: any) => {
    setSelectedRole(group);
    openEditModal();
  };

  const handleDelete = (id: string) => {
    setSelectedRole({ id });
    openDeleteModal();
  };

  const confirmEdit = async () => {
    if (!isValidDesignation(selectedRole.designation)) {
      toast.error('Only letters and spaces are allowed');
      return;
    }
    setIsLoading(true);
    try {
      await updateEmployeeRoleByAdmin(
        selectedRole.id,
        selectedRole.designation
      );
      toast.success('Updated successfully');
      fetchEmployementRoles();
      closeEditModal();
    } catch (error) {
      toast.error('Failed to update');
    } finally {
      setIsLoading(false);
    }
  };

  const confirmDelete = async () => {
    setIsLoading(true);
    try {
      await deleteEmployeeRoleByAdmin(selectedRole.id);
      toast.success('Deleted successfully');
      fetchEmployementRoles();
      closeDeleteModal();
      closeEditModal();
    } catch (error) {
      toast.error('Failed to delete');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!isValidDesignation(newTypeRole)) {
      toast.error('Only letters and spaces are allowed');
      return;
    }
    setIsLoading(true);
    try {
      await addEmployeeRoleByAdmin({ designation: newTypeRole });
      toast.success('Added successfully');
      fetchEmployementRoles();
      closeAddModal();
      setNewRoleName('');
    } catch (error) {
      toast.error('Failed to add');
    } finally {
      setIsLoading(false);
    }
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredEmployementRole.length / itemsPerPage);
  const paginatedData = filteredEmployementRole.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);

    const filtered = employmentRoles.filter(role => {
      role.designation.toString().toLowerCase();
      role.designation.toString().trim();
      return (
        role.designation
          .toLowerCase()
          .toString()
          .includes(query.toLowerCase()) ||
        role.designation.toLowerCase().toString().includes(query.toLowerCase())
      );
    });
    setFilteredEmployementRole(filtered);
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
          Manage Employment Roles
        </h1>
        <div className="text-right">
          <Button onClick={openAddModal}> Add Employment Role</Button>
        </div>

        <SearchBarFullWidht
          search={search}
          handleSearch={handleSearch}
          placeHolder="Search by employment role"
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
                  <th className="p-2 border">Employment Role</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {paginatedData.map((employmentR, index) => (
                  <tr key={employmentR._id}>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      {employmentR.designation}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      <Button onClick={() => handleEdit(employmentR)}>
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
            Add New Employment Role
          </Text>
        }
        centered
      >
        <Box>
          <TextInput
            label="Name"
            value={newTypeRole}
            onChange={e => {
              const value = e.target.value;
              if (value === '' || isValidDesignation(value)) {
                setNewRoleName(value);
              }
            }}
            placeholder="Enter name"
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
            Edit Employment Role
          </Text>
        }
        centered
      >
        <Box>
          <TextInput
            label="Name"
            value={selectedRole?.designation || ''}
            onChange={e => {
              const value = e.target.value;
              if (value === '' || isValidDesignation(value)) {
                setSelectedRole({
                  ...selectedRole,
                  designation: value,
                });
              }
            }}
            required
            mb="md"
          />
          <Group
            justify="flex-end"
            className="flex flex-row flex-wrap gap-2 sm:gap-4 mt-4"
          >
            <Button
              bg={organizationConfig.organization_theme.theme.backgroundColor}
              c={organizationConfig.organization_theme.theme.color}
              variant="outline"
              className="text-sm px-3 py-2"
              onClick={closeEditModal}
            >
              Cancel
            </Button>
            <Button
              bg={organizationConfig.organization_theme.theme.backgroundColor}
              c={organizationConfig.organization_theme.theme.color}
              variant="outline"
              className="text-sm px-3 py-2"
              onClick={confirmEdit}
            >
              Save Changes
            </Button>
            <Button
              bg="red"
              className="text-sm px-3 py-2"
              onClick={() => handleDelete(selectedRole.id)}
            >
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
            Delete Employment Role
          </Text>
        }
        centered
      >
        <Text size="sm">Are you sure you want to delete this role?</Text>
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

export default EmploymentRoles;
