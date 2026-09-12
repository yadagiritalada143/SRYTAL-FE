import {
  registerEmployee,
  registerPackage,
  updateEmployeeDetailsByAdmin,
  updatePackageByAdmin,
  handlePasswordResetByAdmin,
  deleteEmployeeByAdmin,
  deletePackageByAdmin,
  deleteTaskByAdmin,
  deleteEmployeePackagesByAdmin,
  deleteEmployeeTasksByAdmin,
  deletePoolCandidatesByAdmin,
  deletePoolCompanyByAdmin,
  getEmployeeDetailsByAdmin,
  getAllEmployeeDetailsByAdmin,
  getDashboardStatsByAdmin,
  getAllPackagesByAdmin,
  getPackageDetailsByAdmin,
  getEmployeePackagesByAdmin,
  getAllBloodGroupByAdmin,
  addBloodGroupByAdmin,
  addEmploymentTypeByAdmin,
  addEmployeeRoleByAdmin,
  addPackagetoEmployeeByAdmin,
  updateBloodGroupByAdmin,
  updateEmployeeRoleByAdmin,
  updateEmploymentTypeByAdmin,
  getAllEmploymentTypes,
  addTasksByAdmin,
  updateTaskByAdmin,
  getAllEmployeeRoleByAdmin,
  getAllApproversByAdmin,
  deleteEmployeeRoleByAdmin,
  deleteBloodGroupByAdmin,
  deleteEmploymentTypeByAdmin,
  updateEmployeePackageByAdmin,
  previewSalarySlip,
  generateSalarySlip,
  getallfeedbackattributesbyadmin,
  addFeedbackAttributeByAdmin,
  updateFeedbackAttributeByAdmin,
  deleteFeedbackAttributeByAdmin,
  getAllDepartmentsByAdmin,
  addDepartmentByAdmin,
  updateDepartmentByAdmin,
  deleteDepartmentByAdmin,
  getNavCatalogByAdmin,
  getNavRoleAccessByAdmin,
  updateNavRoleAccessByAdmin,
  getNavUserAccessByAdmin,
  updateNavUserAccessByAdmin,
  getAllCoursesByAdmin,
  getCourseByIdAdmin,
  assignCourseToEmployee,
  getAllCourseAssignments,
  getCourseAssignmentDetails,
  updateCourseAssignmentDueDate,
  unassignCourse
} from '../admin-services';

jest.mock('@utils/api-client', () => {
  const callable = jest.fn().mockResolvedValue({ data: {} });
  callable.get = jest.fn().mockResolvedValue({ data: {} });
  callable.post = jest.fn().mockResolvedValue({ data: {} });
  callable.put = jest.fn().mockResolvedValue({ data: {} });
  callable.delete = jest.fn().mockResolvedValue({ data: {} });
  const apiClient = callable;
  return { apiClient };
});

jest.mock('@constants', () => ({
  BASE_URL: 'http://localhost:3000/'
}));

jest.mock('moment', () => {
  const moment = (value: any) => ({
    format: (fmt: string) => `${value}-formatted-${fmt}`
  });
  moment.prototype = {};
  return moment;
});

interface ApiClientMock {
  get: jest.Mock;
  post: jest.Mock;
  put: jest.Mock;
  delete: jest.Mock;
}

const getApiClientMock = (): ApiClientMock & jest.Mock => {
  const mock = jest.requireMock('@utils/api-client').apiClient as any;
  return mock;
};

const getItem = jest.fn();

describe('admin-services', () => {
  let mock: ApiClientMock & jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mock = getApiClientMock();
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem,
        setItem: jest.fn(),
        removeItem: jest.fn()
      },
      writable: true
    });
  });

  describe('registerEmployee', () => {
    it('posts employee details with the token header', async () => {
      getItem.mockReturnValue('token123');
      mock.post.mockResolvedValue({ data: { success: true } });

      const result = await registerEmployee({ firstName: 'John' } as any);

      expect(mock.post).toHaveBeenCalledWith(
        '/admin/registerEmployeeByAdmin',
        { firstName: 'John' },
        { headers: { auth_token: 'token123' } }
      );
      expect(result).toEqual({ success: true });
    });

    it('throws when no token is present', async () => {
      getItem.mockReturnValue(null);
      await expect(
        registerEmployee({ firstName: 'John' } as any)
      ).rejects.toBe('Not authorized to access');
    });

    it('rethrows backend errors', async () => {
      getItem.mockReturnValue('token123');
      mock.post.mockRejectedValue(new Error('backend failed'));
      await expect(
        registerEmployee({ firstName: 'John' } as any)
      ).rejects.toThrow('backend failed');
    });
  });

  describe('registerPackage', () => {
    it('posts the package with formatted dates', async () => {
      getItem.mockReturnValue('token123');
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      const result = await registerPackage({
        title: 'Onboarding',
        startDate: '2026-01-01' as any,
        endDate: '2026-12-31' as any
      } as any);

      expect(mock.post).toHaveBeenCalledWith(
        '/admin/addPackageByAdmin',
        expect.objectContaining({
          title: 'Onboarding',
          startDate: expect.stringContaining('-formatted-'),
          endDate: expect.stringContaining('-formatted-')
        }),
        { headers: { Auth_token: 'Bearer token123' } }
      );
      expect(result).toEqual({ ok: 1 });
    });

    it('throws when not authorized', async () => {
      getItem.mockReturnValue(null);
      await expect(registerPackage({ title: 'X' } as any)).rejects.toBe(
        'Not authorized to access'
      );
    });
  });

  describe('updateEmployeeDetailsByAdmin', () => {
    it('puts the employee update', async () => {
      getItem.mockReturnValue('adminToken');
      mock.put.mockResolvedValue({ data: { updated: true } });

      const result = await updateEmployeeDetailsByAdmin({ id: 'e1' } as any);

      expect(mock.put).toHaveBeenCalledWith(
        '/admin/updateEmployeeDetailsByAdmin',
        { id: 'e1' },
        { headers: { auth_token: 'adminToken' } }
      );
      expect(result).toEqual({ updated: true });
    });
  });

  describe('updatePackageByAdmin', () => {
    it('puts the package update with formatted dates', async () => {
      getItem.mockReturnValue('adminToken');
      mock.put.mockResolvedValue({ data: { updated: true } });

      const result = await updatePackageByAdmin(
        'pkg1',
        {
          title: 'New',
          startDate: '2026-02-01' as any,
          endDate: '2026-03-01' as any
        } as any
      );

      expect(mock.put).toHaveBeenCalledWith(
        '/admin/updatePackageByAdmin',
        {
          id: 'pkg1',
          detailsToUpdate: expect.objectContaining({ title: 'New' })
        },
        { headers: { auth_token: 'Bearer adminToken' } }
      );
      expect(result).toEqual({ updated: true });
    });
  });

  describe('handlePasswordResetByAdmin', () => {
    it('posts the password reset with employee id', async () => {
      getItem.mockReturnValue('token');
      mock.post.mockResolvedValue({ data: { done: true } });

      const result = await handlePasswordResetByAdmin('emp1');

      expect(mock.post).toHaveBeenCalledWith(
        '/admin/employeePasswordResetByAdmin',
        { employeeId: 'emp1' },
        { headers: { auth_token: 'token' } }
      );
      expect(result).toEqual({ done: true });
    });
  });

  describe('deleteEmployeeByAdmin', () => {
    it('posts the deletion', async () => {
      getItem.mockReturnValue('token');
      mock.post.mockResolvedValue({ data: { deleted: true } });

      const result = await deleteEmployeeByAdmin({
        id: 'emp1',
        confirmDelete: true
      });

      expect(mock.post).toHaveBeenCalledWith(
        '/admin/deleteEmployeeByAdmin',
        { id: 'emp1', confirmDelete: true },
        { headers: { auth_token: 'token' } }
      );
      expect(result).toEqual({ deleted: true });
    });
  });

  describe('deletePackageByAdmin', () => {
    it('deletes the package with confirm flag', async () => {
      getItem.mockReturnValue('token');
      mock.delete.mockResolvedValue({ data: { deleted: 1 } });

      const result = await deletePackageByAdmin('pkg1', true);

      expect(mock.delete).toHaveBeenCalledWith(
        '/admin/deletePackageByAdmin/pkg1',
        { headers: { auth_token: 'token' }, data: { confirmDelete: true } }
      );
      expect(result).toEqual({ deleted: 1 });
    });
  });

  describe('deleteTaskByAdmin', () => {
    it('deletes a task with a bearer token', async () => {
      getItem.mockReturnValue('token');
      mock.delete.mockResolvedValue({ data: { ok: true } });

      const result = await deleteTaskByAdmin('task1', false);

      expect(mock.delete).toHaveBeenCalledWith('/admin/deleteTaskByAdmin/task1', {
        headers: { auth_token: 'Bearer token' },
        data: { confirmDelete: false }
      });
      expect(result).toEqual({ ok: true });
    });
  });

  describe('deleteEmployeePackagesByAdmin', () => {
    it('deletes an employee package', async () => {
      getItem.mockReturnValue('token');
      mock.delete.mockResolvedValue({ data: { ok: true } });

      await deleteEmployeePackagesByAdmin('emp1', 'pkg1');

      expect(mock.delete).toHaveBeenCalledWith(
        '/admin/deleteEmployeePackagesByAdmin',
        {
          headers: { auth_token: 'Bearer token' },
          data: { employeeId: 'emp1', packageId: 'pkg1' }
        }
      );
    });
  });

  describe('deleteEmployeeTasksByAdmin', () => {
    it('deletes an employee task', async () => {
      getItem.mockReturnValue('token');
      mock.delete.mockResolvedValue({ data: { ok: true } });

      await deleteEmployeeTasksByAdmin('emp1', 'pkg1', 'task1');

      expect(mock.delete).toHaveBeenCalledWith(
        '/admin/deleteEmployeeTaskByAdmin',
        {
          headers: { auth_token: 'Bearer token' },
          data: { employeeId: 'emp1', packageId: 'pkg1', taskId: 'task1' }
        }
      );
    });
  });

  describe('deletePoolCandidatesByAdmin', () => {
    it('deletes a pool candidate', async () => {
      getItem.mockReturnValue('token');
      mock.delete.mockResolvedValue({ data: { ok: true } });

      await deletePoolCandidatesByAdmin({
        candidateId: 'c1',
        confirmDelete: true
      });

      expect(mock.delete).toHaveBeenCalledWith(
        '/admin/deletePoolCandidatesByAdmin/c1',
        { headers: { auth_token: 'token' }, data: { confirmDelete: true } }
      );
    });
  });

  describe('deletePoolCompanyByAdmin', () => {
    it('deletes a pool company', async () => {
      getItem.mockReturnValue('token');
      mock.delete.mockResolvedValue({ data: { ok: true } });

      await deletePoolCompanyByAdmin({
        companyId: 'co1',
        confirmDelete: true
      });

      expect(mock.delete).toHaveBeenCalledWith(
        '/admin/deletePoolCompanyByAdmin/co1',
        { headers: { auth_token: 'token' }, data: { confirmDelete: true } }
      );
    });
  });

  describe('getEmployeeDetailsByAdmin', () => {
    it('gets an employee and returns user details', async () => {
      getItem.mockReturnValue('adminToken');
      mock.get.mockResolvedValue({ data: { userDetails: { firstName: 'A' } } });

      const result = await getEmployeeDetailsByAdmin('emp1');

      expect(mock.get).toHaveBeenCalledWith(
        '/admin/getEmployeeDetailsByAdmin/emp1',
        { headers: { auth_token: 'adminToken' } }
      );
      expect(result).toEqual({ firstName: 'A' });
    });
  });

  describe('getAllEmployeeDetailsByAdmin', () => {
    it('returns the users list', async () => {
      getItem.mockReturnValue('token');
      mock.mockResolvedValue({ data: { usersList: [1, 2] } });

      const result = await getAllEmployeeDetailsByAdmin();

      expect(mock).toHaveBeenCalledWith('/admin/getAllEmployeeDetailsByAdmin', {
        headers: { auth_token: 'token' }
      });
      expect(result).toEqual([1, 2]);
    });

    it('throws when no token', async () => {
      getItem.mockReturnValue(null);
      await expect(getAllEmployeeDetailsByAdmin()).rejects.toBe(
        'Not authorized to access'
      );
    });
  });

  describe('getDashboardStatsByAdmin', () => {
    it('returns the dashboard stats payload', async () => {
      getItem.mockReturnValue('token');
      mock.mockResolvedValue({ data: { headcount: 5 } });

      const result = await getDashboardStatsByAdmin();

      expect(mock).toHaveBeenCalledWith('/admin/getDashboardStatsByAdmin', {
        headers: { auth_token: 'token' }
      });
      expect(result).toEqual({ headcount: 5 });
    });

    it('throws when no token', async () => {
      getItem.mockReturnValue(null);
      await expect(getDashboardStatsByAdmin()).rejects.toBe(
        'Not authorized to access'
      );
    });
  });

  describe('getAllPackagesByAdmin', () => {
    it('returns the packages list', async () => {
      getItem.mockReturnValue('token');
      mock.mockResolvedValue({ data: { packagesList: ['p1'] } });

      const result = await getAllPackagesByAdmin();

      expect(mock).toHaveBeenCalledWith('/admin/getAllPackagesByAdmin', {
        headers: { auth_token: 'Bearer token' }
      });
      expect(result).toEqual(['p1']);
    });

    it('throws when no token', async () => {
      getItem.mockReturnValue(null);
      await expect(getAllPackagesByAdmin()).rejects.toBe(
        'Not authorized to access'
      );
    });
  });

  describe('getPackageDetailsByAdmin', () => {
    it('returns package details', async () => {
      getItem.mockReturnValue('token');
      mock.get.mockResolvedValue({ data: { packageDetails: { title: 'P' } } });

      const result = await getPackageDetailsByAdmin('pkg1');

      expect(result).toEqual({ title: 'P' });
    });
  });

  describe('getEmployeePackagesByAdmin', () => {
    it('returns the first employee package list', async () => {
      getItem.mockReturnValue('token');
      mock.get.mockResolvedValue({
        data: { employeePackageDetails: [{ packages: [{ a: 1 }] }] }
      });

      const result = await getEmployeePackagesByAdmin('emp1');

      expect(result).toEqual([{ a: 1 }]);
    });

    it('returns an empty array when no packages exist', async () => {
      getItem.mockReturnValue('token');
      mock.get.mockResolvedValue({ data: { employeePackageDetails: [] } });

      const result = await getEmployeePackagesByAdmin('emp1');

      expect(result).toEqual([]);
    });
  });

  describe('blood group functions', () => {
    it('getAllBloodGroupByAdmin returns the list', async () => {
      getItem.mockReturnValue('token');
      mock.mockResolvedValue({ data: { bloodGroupList: ['A+'] } });

      expect(await getAllBloodGroupByAdmin()).toEqual(['A+']);
    });

    it('addBloodGroupByAdmin posts and returns the list', async () => {
      getItem.mockReturnValue('token');
      mock.post.mockResolvedValue({ data: { bloodGroupList: ['B+'] } });

      expect(await addBloodGroupByAdmin({ type: 'B+' })).toEqual(['B+']);
    });

    it('updateBloodGroupByAdmin puts the update', async () => {
      getItem.mockReturnValue('token');
      mock.put.mockResolvedValue({ data: { ok: 1 } });

      await updateBloodGroupByAdmin('bg1', 'O+');

      expect(mock.put).toHaveBeenCalledWith(
        '/admin/updateBloodGroupByAdmin',
        { id: 'bg1', type: 'O+' },
        { headers: { auth_token: 'token' } }
      );
    });

    it('deleteBloodGroupByAdmin deletes via the api', async () => {
      getItem.mockReturnValue('token');
      mock.delete.mockResolvedValue({ data: { ok: 1 } });

      await deleteBloodGroupByAdmin('bg1');

      expect(mock.delete).toHaveBeenCalledWith(
        '/admin/deleteBloodGroupByAdmin/bg1',
        { headers: { auth_token: 'token' } }
      );
    });
  });

  describe('employment type functions', () => {
    it('getAllEmploymentTypes returns the list', async () => {
      getItem.mockReturnValue('token');
      mock.get.mockResolvedValue({ data: { employmentTypesList: ['FT'] } });

      expect(await getAllEmploymentTypes()).toEqual(['FT']);
    });

    it('addEmploymentTypeByAdmin posts', async () => {
      getItem.mockReturnValue('token');
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      await addEmploymentTypeByAdmin({ employmentType: 'FT' });

      expect(mock.post).toHaveBeenCalledWith(
        '/admin/addEmploymentTypeByAdmin',
        { employmentType: 'FT' },
        { headers: { auth_token: 'token' } }
      );
    });

    it('updateEmploymentTypeByAdmin puts', async () => {
      getItem.mockReturnValue('token');
      mock.put.mockResolvedValue({ data: { ok: 1 } });

      await updateEmploymentTypeByAdmin('et1', 'PT');

      expect(mock.put).toHaveBeenCalledWith(
        '/admin/updateEmploymentTypeByAdmin',
        { id: 'et1', employmentType: 'PT' },
        { headers: { auth_token: 'token' } }
      );
    });

    it('deleteEmploymentTypeByAdmin deletes', async () => {
      getItem.mockReturnValue('token');
      mock.delete.mockResolvedValue({ data: { ok: 1 } });

      await deleteEmploymentTypeByAdmin('et1');

      expect(mock.delete).toHaveBeenCalledWith(
        '/admin/deleteEmploymentTypeByAdmin/et1',
        { headers: { auth_token: 'token' } }
      );
    });
  });

  describe('employee role functions', () => {
    it('getAllEmployeeRoleByAdmin returns the roles', async () => {
      getItem.mockReturnValue('token');
      mock.get.mockResolvedValue({ data: { employeeRoles: ['dev'] } });

      expect(await getAllEmployeeRoleByAdmin()).toEqual(['dev']);
    });

    it('addEmployeeRoleByAdmin posts the designation', async () => {
      getItem.mockReturnValue('token');
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      await addEmployeeRoleByAdmin({ designation: 'dev' });

      expect(mock.post).toHaveBeenCalledWith(
        '/admin/addEmployeeRoleByAdmin',
        { designation: 'dev' },
        { headers: { auth_token: 'token' } }
      );
    });

    it('updateEmployeeRoleByAdmin puts', async () => {
      getItem.mockReturnValue('token');
      mock.put.mockResolvedValue({ data: { ok: 1 } });

      await updateEmployeeRoleByAdmin('role1', 'senior');

      expect(mock.put).toHaveBeenCalledWith(
        '/admin/updateEmployeeRoleByAdmin',
        { id: 'role1', designation: 'senior' },
        { headers: { auth_token: 'token' } }
      );
    });

    it('deleteEmployeeRoleByAdmin deletes', async () => {
      getItem.mockReturnValue('token');
      mock.delete.mockResolvedValue({ data: { ok: 1 } });

      await deleteEmployeeRoleByAdmin('role1');

      expect(mock.delete).toHaveBeenCalledWith(
        '/admin/deleteEmployeeRoleByAdmin/role1',
        { headers: { auth_token: 'token' } }
      );
    });
  });

  describe('addPackagetoEmployeeByAdmin', () => {
    it('posts the package assignment', async () => {
      getItem.mockReturnValue('token');
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      const result = await addPackagetoEmployeeByAdmin({ employeeId: 'e1' });

      expect(mock.post).toHaveBeenCalledWith(
        '/admin/addPackagetoEmployeeByAdmin',
        { employeeId: 'e1' },
        { headers: { auth_token: 'Bearer token' } }
      );
      expect(result).toEqual({ ok: 1 });
    });

    it('throws an Error instance when not authorized', async () => {
      getItem.mockReturnValue(null);
      await expect(addPackagetoEmployeeByAdmin({})).rejects.toThrow(
        'Not authorized'
      );
    });
  });

  describe('task functions', () => {
    it('addTasksByAdmin posts without a token', async () => {
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      await addTasksByAdmin('pkg1', 'task title');

      expect(mock.post).toHaveBeenCalledWith('/admin/addTaskByAdmin', {
        packageId: 'pkg1',
        title: 'task title'
      });
    });

    it('updateTaskByAdmin puts', async () => {
      getItem.mockReturnValue('token');
      mock.put.mockResolvedValue({ data: { ok: 1 } });

      await updateTaskByAdmin('t1', 'new title');

      expect(mock.put).toHaveBeenCalledWith(
        '/admin/updateTaskByAdmin',
        { id: 't1', title: 'new title' },
        { headers: { auth_token: 'token' } }
      );
    });
  });

  describe('getAllApproversByAdmin', () => {
    it('returns the approvers list', async () => {
      getItem.mockReturnValue('token');
      mock.get.mockResolvedValue({ data: { approvers: ['a1'] } });

      expect(await getAllApproversByAdmin()).toEqual(['a1']);
    });

    it('throws when no token', async () => {
      getItem.mockReturnValue(null);
      await expect(getAllApproversByAdmin()).rejects.toBe(
        'Not authorized to access'
      );
    });
  });

  describe('updateEmployeePackageByAdmin', () => {
    it('posts the employee package payload', async () => {
      getItem.mockReturnValue('token');
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      await updateEmployeePackageByAdmin({ employeeId: 'emp1', packages: [] });

      expect(mock.post).toHaveBeenCalledWith(
        '/admin/addPackageToEmployeeByAdmin',
        { employeeId: 'emp1', packages: [] },
        { headers: { auth_token: 'token' } }
      );
    });
  });

  describe('salary slip functions', () => {
    it('previewSalarySlip posts the data', async () => {
      getItem.mockReturnValue('token');
      mock.post.mockResolvedValue({ data: { preview: 1 } });

      expect(await previewSalarySlip({ employeeId: 'e1' })).toEqual({
        preview: 1
      });
    });

    it('generateSalarySlip posts with blob response type', async () => {
      getItem.mockReturnValue('token');
      mock.post.mockResolvedValue({ data: { blob: 1 } });

      await generateSalarySlip({ employeeId: 'e1' });

      expect(mock.post).toHaveBeenCalledWith(
        '/admin/generateSalarySlip',
        { employeeId: 'e1' },
        { headers: { auth_token: 'token' }, responseType: 'blob' }
      );
    });
  });

  describe('feedback attribute functions', () => {
    it('getallfeedbackattributesbyadmin returns the attributes', async () => {
      getItem.mockReturnValue('token');
      mock.mockResolvedValue({
        data: { data: { feedbackAttributeResponse: ['attr'] } }
      });

      expect(await getallfeedbackattributesbyadmin()).toEqual(['attr']);
    });

    it('addFeedbackAttributeByAdmin posts', async () => {
      getItem.mockReturnValue('token');
      mock.post.mockResolvedValue({ data: { data: { created: 1 } } });

      expect(await addFeedbackAttributeByAdmin({ name: 'x' })).toEqual({
        created: 1
      });
    });

    it('updateFeedbackAttributeByAdmin puts', async () => {
      getItem.mockReturnValue('token');
      mock.put.mockResolvedValue({ data: { ok: 1 } });

      await updateFeedbackAttributeByAdmin('f1', 'new name');

      expect(mock.put).toHaveBeenCalledWith(
        '/admin/updatefeedbackattributebyadmin',
        { id: 'f1', name: 'new name' },
        { headers: { auth_token: 'token' } }
      );
    });

    it('deleteFeedbackAttributeByAdmin deletes', async () => {
      getItem.mockReturnValue('token');
      mock.delete.mockResolvedValue({ data: { ok: 1 } });

      await deleteFeedbackAttributeByAdmin('f1');

      expect(mock.delete).toHaveBeenCalledWith(
        '/admin/deletefeedbackattributebyadmin/f1',
        { headers: { auth_token: 'token' } }
      );
    });
  });

  describe('department functions', () => {
    it('getAllDepartmentsByAdmin returns departments', async () => {
      getItem.mockReturnValue('token');
      mock.mockResolvedValue({ data: { data: { departments: ['eng'] } } });

      expect(await getAllDepartmentsByAdmin()).toEqual(['eng']);
    });

    it('addDepartmentByAdmin posts', async () => {
      getItem.mockReturnValue('token');
      mock.post.mockResolvedValue({ data: { data: { ok: 1 } } });

      expect(await addDepartmentByAdmin({ departmentName: 'eng' })).toEqual({
        ok: 1
      });
    });

    it('updateDepartmentByAdmin puts', async () => {
      getItem.mockReturnValue('token');
      mock.put.mockResolvedValue({ data: { ok: 1 } });

      await updateDepartmentByAdmin('d1', 'eng');

      expect(mock.put).toHaveBeenCalledWith(
        '/admin/updatedepartmentbyadmin',
        { _id: 'd1', departmentName: 'eng' },
        { headers: { auth_token: 'token' } }
      );
    });

    it('deleteDepartmentByAdmin deletes', async () => {
      getItem.mockReturnValue('token');
      mock.delete.mockResolvedValue({ data: { ok: 1 } });

      await deleteDepartmentByAdmin('d1');

      expect(mock.delete).toHaveBeenCalledWith(
        '/admin/deletedepartmentbyadmin/d1',
        { headers: { auth_token: 'token' } }
      );
    });
  });

  describe('navigation access functions', () => {
    it('getNavCatalogByAdmin gets the catalog with the surface param', async () => {
      getItem.mockReturnValue('token');
      mock.get.mockResolvedValue({ data: { catalog: ['item'] } });

      expect(await getNavCatalogByAdmin('admin')).toEqual(['item']);

      expect(mock.get).toHaveBeenCalledWith('/admin/getNavCatalog', {
        params: { surface: 'admin' },
        headers: { auth_token: 'token' }
      });
    });

    it('getNavCatalogByAdmin omits the surface param when undefined', async () => {
      getItem.mockReturnValue('token');
      mock.get.mockResolvedValue({ data: { catalog: ['item'] } });

      await getNavCatalogByAdmin();

      expect(mock.get).toHaveBeenCalledWith('/admin/getNavCatalog', {
        params: undefined,
        headers: { auth_token: 'token' }
      });
    });

    it('getNavRoleAccessByAdmin gets role access', async () => {
      getItem.mockReturnValue('token');
      mock.get.mockResolvedValue({ data: { navKeys: [] } });

      expect(await getNavRoleAccessByAdmin('admin')).toEqual({ navKeys: [] });
    });

    it('updateNavRoleAccessByAdmin puts the keys', async () => {
      getItem.mockReturnValue('token');
      mock.put.mockResolvedValue({ data: { ok: 1 } });

      await updateNavRoleAccessByAdmin('admin', ['a', 'b']);

      expect(mock.put).toHaveBeenCalledWith(
        '/admin/updateNavRoleAccess',
        { role: 'admin', navKeys: ['a', 'b'] },
        { headers: { auth_token: 'token' } }
      );
    });

    it('getNavUserAccessByAdmin gets user access', async () => {
      getItem.mockReturnValue('token');
      mock.get.mockResolvedValue({ data: { keys: ['k'] } });

      expect(await getNavUserAccessByAdmin('u1')).toEqual({ keys: ['k'] });
    });

    it('updateNavUserAccessByAdmin puts added and removed keys', async () => {
      getItem.mockReturnValue('token');
      mock.put.mockResolvedValue({ data: { ok: 1 } });

      await updateNavUserAccessByAdmin('u1', ['add'], ['remove']);

      expect(mock.put).toHaveBeenCalledWith(
        '/admin/updateNavUserAccess',
        { userId: 'u1', addedKeys: ['add'], removedKeys: ['remove'] },
        { headers: { auth_token: 'token' } }
      );
    });
  });

  describe('course functions', () => {
    it('getAllCoursesByAdmin returns courses', async () => {
      mock.get.mockResolvedValue({ data: { courses: ['c1'] } });

      expect(await getAllCoursesByAdmin()).toEqual(['c1']);
    });

    it('getCourseByIdAdmin returns coursedata', async () => {
      mock.get.mockResolvedValue({ data: { coursedata: { id: 'c1' } } });

      expect(await getCourseByIdAdmin('c1')).toEqual({ id: 'c1' });
    });

    it('assignCourseToEmployee posts the assignment', async () => {
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      await assignCourseToEmployee({
        employeeId: 'e1',
        courseId: 'c1',
        dueDate: '2026-01-01'
      });

      expect(mock.post).toHaveBeenCalledWith('/admin/createcourseassignment', {
        employeeId: 'e1',
        courseId: 'c1',
        dueDate: '2026-01-01'
      });
    });

    it('getAllCourseAssignments returns the data list', async () => {
      mock.get.mockResolvedValue({ data: { data: ['a1'] } });

      const result = await getAllCourseAssignments();

      expect(mock.get).toHaveBeenCalledWith('/admin/getallcourseassignments', {
        params: { limit: 100000 }
      });
      expect(result).toEqual(['a1']);
    });

    it('getCourseAssignmentDetails returns the detail', async () => {
      mock.get.mockResolvedValue({ data: { data: { detail: 1 } } });

      expect(await getCourseAssignmentDetails('ca1')).toEqual({ detail: 1 });
    });

    it('updateCourseAssignmentDueDate puts the due date', async () => {
      mock.put.mockResolvedValue({ data: { ok: 1 } });

      await updateCourseAssignmentDueDate('ca1', '2026-02-01');

      expect(mock.put).toHaveBeenCalledWith(
        '/admin/courses/assignments/ca1/duedate',
        { dueDate: '2026-02-01' }
      );
    });

    it('unassignCourse deletes the assignment', async () => {
      mock.delete.mockResolvedValue({ data: { ok: 1 } });

      expect(await unassignCourse('ca1')).toEqual({ ok: 1 });
    });
  });
});