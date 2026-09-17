import {
  getOrganizations,
  registerAdmin,
  getAllEmployeeDetailsBySuperAdmin,
  GenerateOfferletterBySuperAdmin
} from '../super-admin-services';

jest.mock('@utils/api-client', () => {
  const callable = Object.assign(jest.fn().mockResolvedValue({ data: {} }), {
    get: jest.fn().mockResolvedValue({ data: {} }),
    post: jest.fn().mockResolvedValue({ data: {} }),
    put: jest.fn().mockResolvedValue({ data: {} }),
    delete: jest.fn().mockResolvedValue({ data: {} })
  });
  const apiClient = callable;
  return { apiClient };
});

interface ApiClientMock {
  get: jest.Mock;
  post: jest.Mock;
}

const getApiClientMock = (): ApiClientMock & jest.Mock => {
  return jest.requireMock('@utils/api-client').apiClient as any;
};

describe('super-admin-services', () => {
  let mock: ApiClientMock & jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mock = getApiClientMock();
  });

  describe('getOrganizations', () => {
    it('fetches the organizations list', async () => {
      mock.get.mockResolvedValue({
        data: { organizations: ['org1'] }
      });

      const result = await getOrganizations();

      expect(mock.get).toHaveBeenCalledWith(
        'superadmin/getAllOrganisationsBySuperadmin'
      );
      expect(result).toEqual({ organizations: ['org1'] });
    });

    it('rethrows on failure', async () => {
      mock.get.mockRejectedValue(new Error('net'));

      await expect(getOrganizations()).rejects.toThrow('net');
    });
  });

  describe('registerAdmin', () => {
    it('posts the admin registration details', async () => {
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      const result = await registerAdmin({
        firstName: 'A',
        lastName: 'B',
        email: 'a@b.com',
        organizationId: 'org1',
        userRole: 'admin'
      } as any);

      expect(mock.post).toHaveBeenCalledWith('/admin/registerEmployeeByAdmin', {
        firstName: 'A',
        lastName: 'B',
        email: 'a@b.com',
        organizationId: 'org1',
        userRole: 'admin'
      });
      expect(result).toEqual({ ok: 1 });
    });

    it('rethrows on failure', async () => {
      mock.post.mockRejectedValue(new Error('fail'));

      await expect(registerAdmin({} as any)).rejects.toThrow('fail');
    });
  });

  describe('getAllEmployeeDetailsBySuperAdmin', () => {
    it('fetches employees by org and returns the list', async () => {
      mock.get.mockResolvedValue({
        data: { superadminEmployeeList: [{ id: 'e1' }] }
      });

      const result = await getAllEmployeeDetailsBySuperAdmin('org1');

      expect(mock.get).toHaveBeenCalledWith(
        '/superadmin/getAllEmployeesBySuperAdmin/org1'
      );
      expect(result).toEqual([{ id: 'e1' }]);
    });

    it('rethrows on failure', async () => {
      mock.get.mockRejectedValue(new Error('fail'));

      await expect(getAllEmployeeDetailsBySuperAdmin('org1')).rejects.toThrow(
        'fail'
      );
    });
  });

  describe('GenerateOfferletterBySuperAdmin', () => {
    it('posts the offer letter data with blob response', async () => {
      mock.post.mockResolvedValue({ data: new Blob(['pdf']) });

      const result = await GenerateOfferletterBySuperAdmin({
        nameOfTheCandidate: 'Alice',
        subject: 'Offer',
        dateOfJoining: '2026-01-01',
        compensation: '100000',
        role: 'employee',
        workLocation: 'Pune'
      } as any);

      expect(mock.post).toHaveBeenCalledWith(
        '/superadmin/generateofferletter',
        {
          nameOfTheCandidate: 'Alice',
          subject: 'Offer',
          dateOfJoining: '2026-01-01',
          compensation: '100000',
          role: 'employee',
          workLocation: 'Pune'
        },
        { responseType: 'blob' }
      );
      expect(result).toBeInstanceOf(Blob);
    });

    it('rethrows on failure', async () => {
      mock.post.mockRejectedValue(new Error('fail'));

      await expect(GenerateOfferletterBySuperAdmin({} as any)).rejects.toThrow(
        'fail'
      );
    });
  });
});
