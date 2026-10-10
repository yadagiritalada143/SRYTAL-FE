import React from 'react';
import { DatePickerInput, DatePickerInputProps } from '@mantine/dates';
import { useAppTheme } from '@hooks/use-app-theme';

export interface CommonDatePickerInputProps extends DatePickerInputProps {
  activeColor?: string;
}

export const formatDateStr = (d: Date | string | null | undefined): string => {
  if (!d) return '';
  const dateObj = typeof d === 'string' ? new Date(d) : d;
  if (isNaN(dateObj.getTime())) return '';
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const CommonDatePickerInput: React.FC<CommonDatePickerInputProps> = ({
  value,
  defaultDate,
  highlightToday = true,
  getDayProps,
  activeColor,
  ...props
}) => {
  const { themeConfig } = useAppTheme();
  const effectiveActiveColor =
    activeColor || themeConfig?.button?.color || 'var(--mantine-color-blue-6)';

  const customGetDayProps = (date: any) => {
    const userDayProps = getDayProps ? getDayProps(date) : {};

    const dateStr = formatDateStr(date);
    const todayStr = formatDateStr(new Date());
    const selectedStr = formatDateStr(
      value
        ? (value as Date | string)
        : defaultDate
          ? (defaultDate as Date | string)
          : new Date()
    );

    const isSelected = Boolean(dateStr && dateStr === selectedStr);
    const isToday = Boolean(dateStr && dateStr === todayStr);

    let computedStyle: React.CSSProperties = {};

    if (isSelected) {
      computedStyle = {
        backgroundColor: effectiveActiveColor,
        color: '#ffffff',
        fontWeight: 700,
        borderRadius: '8px'
      };
    } else if (isToday && highlightToday) {
      computedStyle = {
        backgroundColor: 'var(--mantine-color-blue-1)',
        color: 'var(--mantine-color-blue-7)',
        fontWeight: 700,
        borderRadius: '8px'
      };
    }

    return {
      ...userDayProps,
      style: {
        ...computedStyle,
        ...userDayProps.style
      }
    };
  };

  return (
    <DatePickerInput
      value={value}
      defaultDate={defaultDate || (value ? (value as Date) : new Date())}
      highlightToday={highlightToday}
      getDayProps={customGetDayProps}
      {...props}
    />
  );
};

export default CommonDatePickerInput;
