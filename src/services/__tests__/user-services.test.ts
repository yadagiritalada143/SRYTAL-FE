import {
  getCompanyDetails,
  addCompanyByRecruiter,
  updateCompanyByRecruiter,
  getCompanyDetailsByIdByRecruiter,
  updatePasswordForEmployee,
  addCommentByRecruiter,
  addPoolCandidateCommentByRecruiter,
  getAllPoolCandidatesByEmployee,
  addPoolCandidateByRecruiter,
  updatePoolCandidateByRecruiter,
  getPoolCandidateByRecruiter,
  getUserDetails,
  getAllCoursesByUser,
  getCourseByIdContentWriter,
  addCourseContentWriter,
  addCourseModuleContentWriter,
  addCourseTaskContentWriter,
  updateCourseContentWriter,
  updateCourseModuleContentWriter,
  updateCourseTaskContentWriter,
  getCourseTaskContentUrl,
  getMyAssignedCourses,
  getMyAssignedCourseById,
  updateMyTaskProgress,
  getEmployeeDashboard,
  saveUserOpenRouterKey,
  getUserOpenRouterKey
} from '../user-services';

jest.mock('@utils/api-client', () => {
  const callable = Object.assign(jest.fn().mockResolvedValue({ data: {} }), {
    get: jest.fn().mockResolvedValue({ data: {} }),
    post: jest.fn().mockResolvedValue({ data: {} }),
    put: jest.fn().mockResolvedValue({ data: {} }),
    delete: jest.fn().mockResolvedValue({ data: {} }),
    request: jest.fn().mockResolvedValue({ data: {} })
  });
  const apiClient = callable;
  return { apiClient };
});

jest.mock('@constants', () => ({
  BASE_URL: 'http://localhost:3000/'
}));

interface ApiClientMock {
  get: jest.Mock;
  post: jest.Mock;
  put: jest.Mock;
  delete: jest.Mock;
}

const getApiClientMock = (): ApiClientMock & jest.Mock => {
  return jest.requireMock('@utils/api-client').apiClient as any;
};

const getItem = jest.fn();
const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('user-services', () => {
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

  afterAll(() => {
    consoleLogSpy.mockRestore();
  });

  describe('company services', () => {
    it('getCompanyDetails returns the pool companies response', async () => {
      mock.mockResolvedValue({
        data: { poolCompaniesResponse: ['co1'] }
      });

      const result = await getCompanyDetails();

      expect(result).toEqual(['co1']);
    });

    it('addCompanyByRecruiter posts the company', async () => {
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      const result = await addCompanyByRecruiter({ name: 'ACME' } as any);

      expect(mock.post).toHaveBeenCalledWith(
        '/recruiter/addCompanyByRecruiter',
        { name: 'ACME' }
      );
      expect(result).toEqual({ ok: 1 });
    });

    it('updateCompanyByRecruiter posts data with the id', async () => {
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      await updateCompanyByRecruiter({ name: 'ACME' } as any, 'co1');

      expect(mock.post).toHaveBeenCalledWith(
        '/recruiter/updateCompanyByRecruiter',
        { name: 'ACME', id: 'co1' }
      );
    });

    it('getCompanyDetailsByIdByRecruiter returns the pool company response', async () => {
      mock.mockResolvedValue({
        data: { poolCompanyResponse: { name: 'ACME' } }
      });

      expect(await getCompanyDetailsByIdByRecruiter('co1')).toEqual({
        name: 'ACME'
      });
    });
  });

  describe('updatePasswordForEmployee', () => {
    it('posts the password form and returns success', async () => {
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      const result = await updatePasswordForEmployee({
        currentPassword: 'old',
        newPassword: 'new'
      } as any);

      expect(mock.post).toHaveBeenCalledWith('/updatePassword', {
        currentPassword: 'old',
        newPassword: 'new'
      });
      expect(result).toEqual({ success: true });
    });

    it('rethrows on failure', async () => {
      mock.post.mockRejectedValue(new Error('fail'));

      await expect(updatePasswordForEmployee({} as any)).rejects.toThrow(
        'fail'
      );
    });
  });

  describe('comment services', () => {
    it('addCommentByRecruiter posts id and comment', async () => {
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      const result = await addCommentByRecruiter('co1', 'Great!');

      expect(mock.post).toHaveBeenCalledWith(
        '/recruiter/addCommentByRecruiter',
        {
          id: 'co1',
          comment: 'Great!'
        }
      );
      expect(result).toEqual({ ok: 1 });
    });

    it('addCommentByRecruiter logs and rethrows on error', async () => {
      mock.post.mockRejectedValue(new Error('boom'));

      await expect(addCommentByRecruiter('co1', 'x')).rejects.toThrow('boom');
      expect(consoleLogSpy).toHaveBeenCalled();
    });

    it('addPoolCandidateCommentByRecruiter returns the comment response', async () => {
      mock.post.mockResolvedValue({
        data: { responseAfterCommentAdded: 'ok' }
      });

      const result = await addPoolCandidateCommentByRecruiter({
        comment: 'c'
      } as any);

      expect(result).toEqual('ok');
    });
  });

  describe('pool candidate services', () => {
    it('getAllPoolCandidatesByEmployee returns the list', async () => {
      mock.get.mockResolvedValue({
        data: { talentPoolCandidatesList: ['c1'] }
      });

      expect(await getAllPoolCandidatesByEmployee()).toEqual(['c1']);
    });

    it('addPoolCandidateByRecruiter posts the candidate', async () => {
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      const result = await addPoolCandidateByRecruiter({ name: 'A' } as any);

      expect(mock.post).toHaveBeenCalledWith(
        '/recruiter/addTalentPoolCandidateToTracker',
        { name: 'A' }
      );
      expect(result).toEqual({ ok: 1 });
    });

    it('updatePoolCandidateByRecruiter posts the update', async () => {
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      await updatePoolCandidateByRecruiter({ id: 'c1' } as any);

      expect(mock.post).toHaveBeenCalledWith(
        '/recruiter/updatePoolCandidateByRecruiter',
        { id: 'c1' }
      );
    });

    it('getPoolCandidateByRecruiter returns the details', async () => {
      mock.get.mockResolvedValue({
        data: { talentPoolCandidateDetails: { name: 'A' } }
      });

      expect(await getPoolCandidateByRecruiter('c1')).toEqual({ name: 'A' });
    });
  });

  describe('getUserDetails', () => {
    it('returns the employee details', async () => {
      mock.get.mockResolvedValue({ data: { employeeDetails: { id: 'e1' } } });

      expect(await getUserDetails()).toEqual({ id: 'e1' });
    });

    it('throws a friendly error on failure', async () => {
      mock.get.mockRejectedValue(new Error('network'));

      await expect(getUserDetails()).rejects.toThrow(
        'Failed to fetch user details'
      );
    });
  });

  describe('course content writer services', () => {
    it('getAllCoursesByUser returns courses', async () => {
      mock.get.mockResolvedValue({ data: { courses: ['c1'] } });

      expect(await getAllCoursesByUser()).toEqual(['c1']);
    });

    it('getCourseByIdContentWriter returns coursadata', async () => {
      mock.get.mockResolvedValue({ data: { coursedata: { id: 'c1' } } });

      expect(await getCourseByIdContentWriter('c1')).toEqual({ id: 'c1' });
    });

    it('addCourseContentWriter posts a multipart form', async () => {
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      const file = new File(['x'], 'thumb.png', { type: 'image/png' });
      await addCourseContentWriter('Course', 'Desc', file);

      expect(mock.post).toHaveBeenCalled();
      const [url, formData, config] = mock.post.mock.calls[0];
      expect(url).toBe('/contentwriter/addCourse');
      expect(formData.get('courseName')).toBe('Course');
      expect(formData.get('courseDescription')).toBe('Desc');
      expect(formData.get('coursethumbnail')).toBe(file);
      expect(config.headers['Content-Type']).toBe('multipart/form-data');
    });

    it('addCourseContentWriter omits the file when null', async () => {
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      await addCourseContentWriter('Course', 'Desc', null);

      const [, formData] = mock.post.mock.calls[0];
      expect(formData.has('coursethumbnail')).toBe(false);
    });

    it('addCourseModuleContentWriter builds the module form', async () => {
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      const thumb = new File(['x'], 'm.png', { type: 'image/png' });
      await addCourseModuleContentWriter({
        courseId: 'c1',
        moduleName: 'M1',
        moduleDescription: 'desc',
        thumbnail: thumb
      } as any);

      const [, formData] = mock.post.mock.calls[0];
      expect(mock.post.mock.calls[0][0]).toBe('/contentwriter/addCourseModule');
      expect(formData.get('courseId')).toBe('c1');
      expect(formData.get('moduleName')).toBe('M1');
      expect(formData.get('coursemodulethumbnail')).toBe(thumb);
    });

    it('addCourseTaskContentWriter sends a file when present', async () => {
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      const file = new File(['x'], 'task.pdf');
      await addCourseTaskContentWriter({
        moduleId: 'm1',
        taskName: 'T1',
        taskDescription: 'desc',
        file
      } as any);

      const [, formData] = mock.post.mock.calls[0];
      expect(formData.get('moduleId')).toBe('m1');
      expect(formData.get('taskName')).toBe('T1');
      expect(formData.get('taskFile')).toBe(file);
      expect(formData.has('link')).toBe(false);
    });

    it('addCourseTaskContentWriter sends a link when no file', async () => {
      mock.post.mockResolvedValue({ data: { ok: 1 } });

      await addCourseTaskContentWriter({
        moduleId: 'm1',
        taskName: 'T1',
        taskDescription: 'desc',
        link: 'https://example.com'
      } as any);

      const [, formData] = mock.post.mock.calls[0];
      expect(formData.get('link')).toBe('https://example.com');
      expect(formData.has('taskFile')).toBe(false);
    });

    it('updateCourseContentWriter puts the updated course', async () => {
      mock.put.mockResolvedValue({ data: { ok: 1 } });

      await updateCourseContentWriter({
        id: 'c1',
        courseName: 'New',
        courseDescription: 'desc',
        status: 'active'
      } as any);

      expect(mock.put).toHaveBeenCalled();
      const [url, formData, config] = mock.put.mock.calls[0];
      expect(url).toBe('/contentwriter/updatecourse');
      expect(formData.get('id')).toBe('c1');
      expect(formData.get('courseName')).toBe('New');
      expect(formData.get('status')).toBe('active');
      expect(config.headers['Content-Type']).toBe('multipart/form-data');
    });

    it('updateCourseModuleContentWriter puts the updated module', async () => {
      mock.put.mockResolvedValue({ data: { ok: 1 } });

      await updateCourseModuleContentWriter({
        id: 'm1',
        moduleName: 'New',
        moduleDescription: 'desc',
        status: 'draft'
      } as any);

      expect(mock.put.mock.calls[0][0]).toBe(
        '/contentwriter/updatecoursemodule'
      );
      const [, formData] = mock.put.mock.calls[0];
      expect(formData.get('id')).toBe('m1');
      expect(formData.get('status')).toBe('draft');
    });

    it('updateCourseTaskContentWriter puts the updated task', async () => {
      mock.put.mockResolvedValue({ data: { ok: 1 } });

      await updateCourseTaskContentWriter({
        id: 't1',
        taskName: 'New',
        taskDescription: 'desc',
        status: 'active'
      } as any);

      expect(mock.put.mock.calls[0][0]).toBe('/contentwriter/updatecoursetask');
      const [, formData] = mock.put.mock.calls[0];
      expect(formData.get('taskName')).toBe('New');
    });
  });

  describe('getCourseTaskContentUrl', () => {
    it('builds a URL with the auth token and no trailing slash', () => {
      getItem.mockReturnValue('tok123');

      const url = getCourseTaskContentUrl('task1');

      expect(url).toBe(
        'http://localhost:3000/contentwriter/getCourseTaskContent/task1?auth_token=tok123'
      );
    });
  });

  describe('assigned course services', () => {
    it('getMyAssignedCourses returns courses', async () => {
      mock.get.mockResolvedValue({ data: { courses: ['c1'] } });

      expect(await getMyAssignedCourses()).toEqual(['c1']);
    });

    it('getMyAssignedCourseById returns the course', async () => {
      mock.get.mockResolvedValue({ data: { course: { id: 'ca1' } } });

      expect(await getMyAssignedCourseById('ca1')).toEqual({ id: 'ca1' });
    });

    it('updateMyTaskProgress puts the payload', async () => {
      mock.put.mockResolvedValue({ data: { progress: 50 } });

      const payload = {
        courseAssignmentId: 'ca1',
        taskId: 't1',
        completed: true
      };
      const result = await updateMyTaskProgress(payload as any);

      expect(mock.put).toHaveBeenCalledWith('/updateMyTaskProgress', payload);
      expect(result).toEqual({ progress: 50 });
    });
  });

  describe('employee dashboard', () => {
    it('getEmployeeDashboard returns the data', async () => {
      mock.get.mockResolvedValue({ data: { hours: 120 } });

      expect(await getEmployeeDashboard()).toEqual({ hours: 120 });
    });
  });

  describe('openrouter key services', () => {
    it('saveUserOpenRouterKey posts the key', async () => {
      mock.post.mockResolvedValue({
        data: { success: true, message: 'saved' }
      });

      const result = await saveUserOpenRouterKey('sk-123');

      expect(mock.post).toHaveBeenCalledWith(
        '/user/validateandsaveopenrouterapikey',
        { openrouterKey: 'sk-123' }
      );
      expect(result).toEqual({ success: true, message: 'saved' });
    });

    it('getUserOpenRouterKey gets the key', async () => {
      mock.get.mockResolvedValue({
        data: { success: true, message: 'ok', data: null }
      });

      expect(await getUserOpenRouterKey()).toEqual({
        success: true,
        message: 'ok',
        data: null
      });
    });
  });
});
