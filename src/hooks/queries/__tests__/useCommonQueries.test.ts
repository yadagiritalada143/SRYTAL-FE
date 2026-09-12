import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import {
  commonQueryKeys,
  useGetVisitorCount,
  useGetOrganizationConfig,
  useGetTimesheetData
} from '@hooks/queries/useCommonQueries';

jest.mock('@services/common-services', () => ({
  getVisitorCount: jest.fn(),
  getOrganizationConfig: jest.fn(),
  getTimesheetData: jest.fn()
}));

const commonService = () =>
  jest.requireMock('@services/common-services') as any;

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } }
  });
  return {
    queryClient,
    wrapper: ({ children }: { children: React.ReactNode }) =>
      React.createElement(
        QueryClientProvider,
        { client: queryClient },
        children
      )
  };
};

describe('useCommonQueries', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('commonQueryKeys', () => {
    it('exposes the expected key shapes', () => {
      expect(commonQueryKeys.visitorCount).toEqual(['visitorCount']);
      expect(commonQueryKeys.organizationConfig('acme')).toEqual([
        'orgConfig',
        'acme'
      ]);

      const start = new Date('2026-09-01');
      const end = new Date('2026-09-30');
      expect(commonQueryKeys.timesheetData(start, end, 'emp1')).toEqual([
        'timesheet',
        start,
        end,
        'emp1'
      ]);
    });
  });

  describe('useGetVisitorCount', () => {
    it('fetches the visitor count', async () => {
      commonService().getVisitorCount.mockResolvedValue(42);
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetVisitorCount(), { wrapper });

      expect(commonService().getVisitorCount).toHaveBeenCalled();
      await waitFor(() => expect(result.current.data).toEqual(42));
    });
  });

  describe('useGetOrganizationConfig', () => {
    it('fetches the organization config', async () => {
      commonService().getOrganizationConfig.mockResolvedValue({
        orgName: 'acme'
      });
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetOrganizationConfig('acme'), {
        wrapper
      });

      expect(commonService().getOrganizationConfig).toHaveBeenCalledWith(
        'acme'
      );
      await waitFor(() =>
        expect(result.current.data).toEqual({ orgName: 'acme' })
      );
    });

    it('does not fetch when enabled is false', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetOrganizationConfig('acme', false),
        { wrapper }
      );

      expect(commonService().getOrganizationConfig).not.toHaveBeenCalled();
    });

    it('does not fetch when the org name is an empty string', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(() => useGetOrganizationConfig(''), {
        wrapper
      });

      expect(commonService().getOrganizationConfig).not.toHaveBeenCalled();
    });
  });

  describe('useGetTimesheetData', () => {
    const start = new Date('2026-09-01');
    const end = new Date('2026-09-30');

    it('fetches timesheet data for the range', async () => {
      commonService().getTimesheetData.mockResolvedValue([
        { date: start, hours: 8 }
      ]);
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetTimesheetData(start, end, 'emp1'),
        { wrapper }
      );

      expect(commonService().getTimesheetData).toHaveBeenCalledWith(
        start,
        end,
        'emp1'
      );
      await waitFor(() =>
        expect(result.current.data).toEqual([{ date: start, hours: 8 }])
      );
    });

    it('does not fetch when enabled is false', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetTimesheetData(start, end, 'emp1', false),
        { wrapper }
      );

      expect(commonService().getTimesheetData).not.toHaveBeenCalled();
    });

    it('does not fetch when the start date is missing', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetTimesheetData(null, end, 'emp1'),
        { wrapper }
      );

      expect(commonService().getTimesheetData).not.toHaveBeenCalled();
    });

    it('does not fetch when the end date is missing', async () => {
      const { wrapper } = createWrapper();

      const { result } = renderHook(
        () => useGetTimesheetData(start, null, 'emp1'),
        { wrapper }
      );

      expect(commonService().getTimesheetData).not.toHaveBeenCalled();
    });
  });
});