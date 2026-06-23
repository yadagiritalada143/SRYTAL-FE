import { useEffect, useMemo, useState } from 'react';
import { useRecoilState } from 'recoil';
import { toast } from 'react-toastify';
import { organizationEmployeeAtom } from '@atoms/organization-atom';
import { getAllEmployeeDetailsByAdmin } from '@services/admin-services';
import { downloadSalarySlip } from '@services/common-services';
import type { EmployeeInterface } from '@interfaces/employee';

/**
 * Encapsulates all payroll page state: employee list (cached in Recoil),
 * search filtering, the selected employee/month, and lazily fetching the
 * salary-slip preview whenever the employee or month changes.
 */
export const usePayroll = () => {
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [employees, setEmployees] = useRecoilState<EmployeeInterface[]>(
    organizationEmployeeAtom
  );
  const [selectedEmployee, setSelectedEmployee] =
    useState<EmployeeInterface | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<Date | null>(null);
  const [previewLoading, setPreviewLoading] = useState(false);
  const [slipError, setSlipError] = useState<string | null>(null);

  // Load the org's employees once (cached in Recoil across visits).
  useEffect(() => {
    if (employees.length > 0) {
      setIsLoading(false);
      return;
    }

    const fetchEmployees = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const employeesList = await getAllEmployeeDetailsByAdmin();
        setEmployees(employeesList);
      } catch (err: any) {
        const errorMessage =
          err?.response?.data?.message || 'Failed to load employees';
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, [employees.length, setEmployees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const firstName = emp.firstName?.toLowerCase() || '';
      const lastName = emp.lastName?.toLowerCase() || '';
      const employeeId = emp.employeeId?.toLowerCase() || '';
      const searchValue = search.toLowerCase();

      return (
        `${firstName} ${lastName}`.includes(searchValue) ||
        employeeId.includes(searchValue)
      );
    });
  }, [search, employees]);

  // Fetch the salary-slip preview when employee or month changes.
  useEffect(() => {
    const fetchSlipOnMonthChange = async () => {
      if (!selectedEmployee || !selectedMonth) return;

      setSlipError(null);
      setPreviewUrl(null);
      setPreviewLoading(true);

      const formattedMonth = selectedMonth.toLocaleString('en-US', {
        month: 'short'
      });
      const formattedYear = selectedMonth.getFullYear().toString();

      try {
        const res = await downloadSalarySlip({
          mongoId: selectedEmployee.id,
          fullName: `${selectedEmployee.firstName} ${selectedEmployee.lastName}`,
          month: formattedMonth,
          year: formattedYear
        });

        if (!res?.success) throw new Error();

        setPreviewUrl(res.data.downloadUrl);
      } catch {
        setSlipError('Salary slip not available for selected pay period.');
      } finally {
        setPreviewLoading(false);
      }
    };

    fetchSlipOnMonthChange();
  }, [selectedEmployee, selectedMonth]);

  useEffect(() => {
    setSlipError(null);
  }, [selectedMonth, selectedEmployee]);

  return {
    search,
    setSearch,
    isLoading,
    error,
    filteredEmployees,
    selectedEmployee,
    setSelectedEmployee,
    previewUrl,
    selectedMonth,
    setSelectedMonth,
    previewLoading,
    slipError
  };
};
