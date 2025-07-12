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
  addEmploymentTypeByAdmin,
  updateEmploymentTypeByAdmin,
  deleteEmploymentTypeByAdmin,
  getAllEmploymentTypes,
} from '../../../../services/admin-services';
import { useRecoilState, useRecoilValue } from 'recoil';
import { organizationThemeAtom } from '../../../../atoms/organization-atom';
import { useMantineTheme } from '@mantine/core';
import { SearchBarFullWidht } from '../../../common/search-bar/search-bar';
import { employeeTypeAtom } from '../../../../atoms/employeetypes-atom';

const isValidEmploymentType = (name: string) => /^[A-Za-z ]+$/.test(name);

const EmploymentTypes = () => {
  const [employmentTypes, setEmploymentTypes] =
    useRecoilState(employeeTypeAtom);
  const [filteredEmployementType, setFilteredEmployementType] = useState<any[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [selectedType, setSelectedType] = useState<any | null>(null);
  const [newTypeName, setNewTypeName] = useState('');
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
    if (employmentTypes.length === 0) {
      fetchEmployementTypes();
    } else {
      setFilteredEmployementType(employmentTypes);
      setIsLoading(false);
    }
  }, []);

  const fetchEmployementTypes = async () => {
    setIsLoading(true);
    try {
      const data = await getAllEmploymentTypes();
      setEmploymentTypes(data);
      setFilteredEmployementType(data);
    } catch (error) {
      toast.error('Failed to fetch employment types');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (group: any) => {
    setSelectedType(group);
    openEditModal();
  };

  const handleDelete = (id: string) => {
    setSelectedType({ id });
    openDeleteModal();
  };

  const confirmEdit = async () => {
    if (!isValidEmploymentType(selectedType?.employmentType)) {
      toast.error('Employment type must contain only alphabets and spaces.');
      return;
    }
    setIsLoading(true);
    try {
      await updateEmploymentTypeByAdmin(
        selectedType.id,
        selectedType.employmentType.trim()
      );
      toast.success('Updated successfully');
      fetchEmployementTypes();
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
      await deleteEmploymentTypeByAdmin(selectedType.id);
      toast.success('Deleted successfully');
      fetchEmployementTypes();
      closeDeleteModal();
      closeEditModal();
    } catch (error) {
      toast.error('Failed to delete');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!isValidEmploymentType(newTypeName)) {
      toast.error('Employment type must contain only alphabets and spaces.');
      return;
    }

    setIsLoading(true);
    try {
      await addEmploymentTypeByAdmin({ employmentType: newTypeName.trim() });
      toast.success('Added successfully');
      fetchEmployementTypes();
      closeAddModal();
      setNewTypeName('');
    } catch (error) {
      toast.error('Failed to add');
    } finally {
      setIsLoading(false);
    }
  };

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredEmployementType.length / itemsPerPage);
  const paginatedData = filteredEmployementType.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    const filtered = employmentTypes.filter(type => {
      type.employmentType.toString().toLowerCase();
      type.employmentType.toString().trim();
      return (
        type.employmentType
          .toLowerCase()
          .toString()
          .includes(query.toLowerCase()) ||
        type.employmentType
          .toLowerCase()
          .toString()
          .includes(query.toLowerCase())
      );
    });
    setFilteredEmployementType(filtered);
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
          Manage Employment Types
        </h1>
        <div className="text-right">
          <Button onClick={openAddModal}>Add Employment Type</Button>
        </div>

        <SearchBarFullWidht
          search={search}
          handleSearch={handleSearch}
          placeHolder="Search by employment type"
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
                  <th className="p-2 border">Employment Type</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {paginatedData.map((employmentT, index) => (
                  <tr key={employmentT._id}>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      {employmentT.employmentType}
                    </td>
                    <td className="px-4 py-2 border whitespace-nowrap overflow-hidden text-ellipsis">
                      <Button onClick={() => handleEdit(employmentT)}>
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
            Add New Employment Type
          </Text>
        }
        centered
      >
        <Box>
          <TextInput
            label="Name"
            value={newTypeName}
            onChange={e => setNewTypeName(e.target.value)}
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
            Edit Employment Type
          </Text>
        }
        centered
      >
        <Box>
          <TextInput
            label="Name"
            value={selectedType?.employmentType || ''}
            onChange={e =>
              setSelectedType({
                ...selectedType,
                employmentType: e.target.value,
              })
            }
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
              onClick={() => handleDelete(selectedType.id)}
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
            Delete Employment Type
          </Text>
        }
        centered
      >
        <Text size="sm">Are you sure you want to delete this type?</Text>
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

export default EmploymentTypes;
