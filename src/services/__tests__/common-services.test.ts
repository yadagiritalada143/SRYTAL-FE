import {
  getMyNavMenu,
  login,
  forgetPassword,
  getVisitorCount,
  sendContactUsMail,
  sendExpertConsultationMail,
  getOrganizationConfig,
  getTimesheetData,
  submitTimeSheet,
  downloadSalarySlip,
  uploadProfileImage,
  getProfileImage
} from '../common-services';

jest.mock('@utils/api-client', () => {
  const makeApiClient = () => {
    const callable = jest.fn().mockResolvedValue({ data: {} });
    callable.get = jest.fn().mockResolvedValue({ data: {} });
    callable.post = jest.fn().mockResolvedValue({ data: {} });
    callable.put = jest.fn().mockResolvedValue({ data: {} });
    callable.delete = jest.fn().mockResolvedValue({ data: {} });
    return callable;
  };

  return {
    apiClient: makeApiClient(),
    apiClientComm: makeApiClient()
  };
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
  return jest.requireMock('@utils/api-client').apiClient as any;
};

const getApiClientCommMock = (): ApiClientMock => {
  return jest.requireMock('@utils/api-client').apiClientComm as any;
};

const getItem = jest.fn();
const setItem = jest.fn();
const consoleErrorSpy = jest
  .spyOn(console, 'error')
  .mockImplementation(() => {});
const consoleWarnSpy = jest
  .spyOn(console, 'warn')
  .mockImplementation(() => {});

describe('common-services', () => {
  let mock: ApiClientMock & jest.Mock;
  let mockComm: ApiClientMock;

  beforeEach(() => {
    jest.clearAllMocks();
    mock = getApiClientMock();
    mockComm = getApiClientCommMock();
    Object.defineProperty(window, 'localStorage', {
      value: { getItem, setItem, removeItem: jest.fn() },
      writable: true
    });
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
    consoleWarnSpy.mockRestore();
  });

  describe('getMyNavMenu', () => {
    it('fetches the nav menu via apiClient', async () => {
      mock.get.mockResolvedValue({ data: { menu: ['a'] } });

      const result = await getMyNavMenu();

      expect(mock.get).toHaveBeenCalledWith('/getMyNavMenu');
      expect(result).toEqual({ menu: ['a'] });
    });
  });

  describe('login', () => {
    it('posts credentials and stores token data in localStorage', async () => {
      mockComm.post.mockResolvedValue({
        data: { token: 't1', userRole: 'admin', refreshToken: 'r1' }
      });

      const result = await login({
        username: 'user',
        password: 'pass'
      } as any);

      expect(mockComm.post).toHaveBeenCalledWith('/admin/login', {
        username: 'user',
        password: 'pass'
      });
      expect(setItem).toHaveBeenCalledWith('token', 't1');
      expect(setItem).toHaveBeenCalledWith('userRole', 'admin');
      expect(setItem).toHaveBeenCalledWith('refreshToken', 'r1');
      expect(setItem).toHaveBeenCalledWith('createdAt', expect.any(String));
      expect(result).toEqual({
        token: 't1',
        userRole: 'admin',
        refreshToken: 'r1'
      });
    });

    it('rethrows on failure', async () => {
      mockComm.post.mockRejectedValue(new Error('invalid'));

      await expect(
        login({ username: 'u', password: 'p' } as any)
      ).rejects.toThrow('invalid');
    });

    it('does not store tokens when the token is missing', async () => {
      mockComm.post.mockResolvedValue({ data: { userRole: 'admin' } });

      await login({ username: 'u', password: 'p' } as any);

      expect(setItem).not.toHaveBeenCalled();
    });
  });

  describe('forgetPassword', () => {
    it('posts the username and returns data', async () => {
      mockComm.post.mockResolvedValue({ data: { sent: true } });

      const result = await forgetPassword('user1');

      expect(mockComm.post).toHaveBeenCalledWith('/forgotPassword', {
        username: 'user1'
      });
      expect(result).toEqual({ sent: true });
    });

    it('logs and rethrows on failure', async () => {
      mockComm.post.mockRejectedValue(new Error('fail'));

      await expect(forgetPassword('u')).rejects.toThrow('fail');
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('getVisitorCount', () => {
    it('returns the visitor count as a number', async () => {
      mockComm.get.mockResolvedValue({ data: { visitorCount: '123' } });

      const result = await getVisitorCount();

      expect(result).toBe(123);
    });

    it('logs and rethrows on failure', async () => {
      mockComm.get.mockRejectedValue(new Error('net'));

      await expect(getVisitorCount()).rejects.toThrow('net');
      expect(consoleErrorSpy).toHaveBeenCalled();
    });
  });

  describe('sendContactUsMail', () => {
    it('posts the contact form with trimmed company name', async () => {
      mockComm.post.mockResolvedValue({ data: { sent: true } });

      await sendContactUsMail({
        companyName: '  ACME  ',
        customerEmail: 'a@b.com',
        subject: 'Hi',
        message: 'Hello'
      } as any);

      expect(mockComm.post).toHaveBeenCalledWith('/sendContactUsMail', {
        companyName: 'ACME',
        customerEmail: 'a@b.com',
        subject: 'Hi',
        message: 'Hello'
      });
    });

    it('defaults company name to the generic string when empty', async () => {
      mockComm.post.mockResolvedValue({ data: { sent: true } });

      await sendContactUsMail({ companyName: '', customerEmail: '' } as any);

      expect(mockComm.post).toHaveBeenCalledWith(
        '/sendContactUsMail',
        expect.objectContaining({
          companyName: 'Individual / General Enquiry'
        })
      );
    });
  });

  describe('sendExpertConsultationMail', () => {
    const baseConsultationData = {
      fullName: 'Alice',
      email: 'a@b.com',
      countryCode: '+91',
      phone: '1234567890',
      countryIso: 'IN',
      company: 'ACME',
      budget: '50000',
      currency: 'INR',
      timeline: '1-3 months'
    };

    it('posts the consultation form', async () => {
      mockComm.post.mockResolvedValue({ data: { ok: 1 } });

      const result = await sendExpertConsultationMail(
        baseConsultationData as any
      );

      expect(mockComm.post).toHaveBeenCalledWith('/expertconsultation', {
        fullName: 'Alice',
        email: 'a@b.com',
        phoneNumber: '+91 1234567890',
        company: 'ACME',
        projectBudget: 'INR 50000',
        timeline: '1-3 months'
      });
      expect(result).toEqual({ ok: 1 });
    });

    it('defaults company to the fallback string when empty', async () => {
      mockComm.post.mockResolvedValue({ data: { ok: 1 } });

      await sendExpertConsultationMail({
        ...baseConsultationData,
        company: '  '
      } as any);

      expect(mockComm.post).toHaveBeenCalledWith(
        '/expertconsultation',
        expect.objectContaining({
          company: 'Individual / Not specified'
        })
      );
    });

    it('falls back to sendContactUsMail when the expertconsultation endpoint fails', async () => {
      mockComm.post
        .mockRejectedValueOnce(new Error('fail'))
        .mockResolvedValueOnce({ data: { ok: 1 } });

      const result = await sendExpertConsultationMail(
        baseConsultationData as any
      );

      expect(mockComm.post).toHaveBeenCalledTimes(2);
      expect(mockComm.post).toHaveBeenLastCalledWith(
        '/sendContactUsMail',
        expect.objectContaining({
          companyName: 'ACME',
          customerEmail: 'a@b.com'
        })
      );
      expect(result).toEqual({ ok: 1 });
    });
  });

  describe('getOrganizationConfig', () => {
    it('returns the themesResponse', async () => {
      mockComm.get.mockResolvedValue({
        data: { themesResponse: { bg: '#fff' } }
      });

      expect(await getOrganizationConfig('SRYTAL')).toEqual({ bg: '#fff' });
    });

    it('logs and rethrows on failure', async () => {
      mockComm.get.mockRejectedValue(new Error('fail'));

      await expect(getOrganizationConfig('X')).rejects.toThrow('fail');
    });
  });

  describe('getTimesheetData', () => {
    it('posts formatted dates and returns packages', async () => {
      mock.post.mockResolvedValue({
        data: {
          employeePackageDetails: [{ packages: [{ id: 'p1' }] }]
        }
      });

      const result = await getTimesheetData(
        '2026-01-01' as any,
        '2026-01-31' as any,
        'emp1'
      );

      expect(mock.post).toHaveBeenCalledWith(
        '/fetchEmployeePackageDetailsById',
        {
          startDate: '2026-01-01-formatted-YYYY-MM-DD',
          endDate: '2026-01-31-formatted-YYYY-MM-DD',
          employeeId: 'emp1'
        }
      );
      expect(result).toEqual([{ id: 'p1' }]);
    });

    it('omits employeeId when empty', async () => {
      mock.post.mockResolvedValue({
        data: { employeePackageDetails: [{ packages: [] }] }
      });

      await getTimesheetData('2026-01-01' as any, '2026-01-31' as any, '');

      expect(mock.post).toHaveBeenCalledWith(
        '/fetchEmployeePackageDetailsById',
        {
          startDate: '2026-01-01-formatted-YYYY-MM-DD',
          endDate: '2026-01-31-formatted-YYYY-MM-DD'
        }
      );
    });

    it('returns an empty array when there are no packages', async () => {
      mock.post.mockResolvedValue({
        data: { employeePackageDetails: [] }
      });

      const result = await getTimesheetData(
        '2026-01-01' as any,
        '2026-01-31' as any,
        'emp1'
      );

      expect(result).toEqual([]);
    });

    it('returns an empty array when packages field is missing', async () => {
      mock.post.mockResolvedValue({
        data: { employeePackageDetails: [{}] }
      });

      const result = await getTimesheetData(
        '2026-01-01' as any,
        '2026-01-31' as any,
        'emp1'
      );

      expect(result).toEqual([]);
    });
  });

  describe('submitTimeSheet', () => {
    it('puts the timesheet data', async () => {
      mock.put.mockResolvedValue({ data: { ok: 1 } });

      const result = await submitTimeSheet([{ id: 'p1' }], 'emp1');

      expect(mock.put).toHaveBeenCalledWith('updateEmployeeTimesheet', {
        packages: [{ id: 'p1' }],
        employeeId: 'emp1'
      });
      expect(result).toEqual({ ok: 1 });
    });

    it('does not include employeeId when empty', async () => {
      mock.put.mockResolvedValue({ data: { ok: 1 } });

      await submitTimeSheet([], '');

      expect(mock.put).toHaveBeenCalledWith('updateEmployeeTimesheet', {
        packages: []
      });
    });
  });

  describe('downloadSalarySlip', () => {
    it('returns the response data on success', async () => {
      mock.post.mockResolvedValue({ data: { url: 'http://...' } });

      const result = await downloadSalarySlip({
        mongoId: 'm1',
        fullName: 'Alice',
        month: 'January',
        year: '2026'
      });

      expect(result).toEqual({ url: 'http://...' });
    });

    it('returns the error response data when the API fails with a response', async () => {
      mock.post.mockRejectedValue({
        response: { data: { message: 'not found' } }
      });

      const result = await downloadSalarySlip({
        mongoId: 'm1',
        fullName: 'Alice',
        month: 'January',
        year: '2026'
      });

      expect(result).toEqual({ message: 'not found' });
    });
  });

  describe('uploadProfileImage', () => {
    it('posts the multipart form and returns the response', async () => {
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      const file = new File(['x'], 'profile.jpg', { type: 'image/jpeg' });
      const result = await uploadProfileImage(file, 'emp1');

      expect(mock.post).toHaveBeenCalled();
      const [url, formData, config] = mock.post.mock.calls[0];
      expect(url).toBe('/uploadProfileImage');
      expect(formData.get('profileImage')).toBe(file);
      expect(formData.get('userId')).toBe('emp1');
      expect(config.headers['Content-Type']).toBe('multipart/form-data');
      expect(result).toEqual({ ok: 1 });
    });

    it('throws a friendly error on failure', async () => {
      mock.post.mockRejectedValue(new Error('no'));

      await expect(
        uploadProfileImage(new File([''], 'x'), 'emp1')
      ).rejects.toThrow('Failed to upload profile image');
    });
  });

  describe('getProfileImage', () => {
    it('returns the blob response', async () => {
      const blob = new Blob(['x']);
      mock.get.mockResolvedValue({ data: blob });

      const result = await getProfileImage();

      expect(result).toBe(blob);
    });

    it('wraps an empty blob error in a friendly message', async () => {
      mock.get.mockResolvedValue({
        data: new Blob([])
      });

      await expect(getProfileImage()).rejects.toThrow(
        'Failed to fetch profile image'
      );
    });

    it('throws a friendly error on network failure', async () => {
      mock.get.mockRejectedValue(new Error('net'));

      await expect(getProfileImage()).rejects.toThrow(
        'Failed to fetch profile image'
      );
    });
  });
});