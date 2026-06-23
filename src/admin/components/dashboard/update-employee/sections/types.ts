import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import type { EmployeeUpdateForm } from '@forms/update-employee';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SectionProps {
  register: UseFormRegister<EmployeeUpdateForm>;
  control: Control<EmployeeUpdateForm>;
  errors: FieldErrors<EmployeeUpdateForm>;
}
