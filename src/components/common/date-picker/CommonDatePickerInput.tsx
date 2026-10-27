import React from 'react';
import { DatePickerInput, DatePickerInputProps } from '@mantine/dates';
import { useAppTheme } from '@hooks/use-app-theme';

export interface CommonDatePickerInputProps extends DatePickerInputProps {
  activeColor?: string;
  originalDate?: Date | string | null;
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
  originalDate,
  ...props
}) => {
  const { themeConfig } = useAppTheme();
  const effectiveActiveColor =
    activeColor ||
    themeConfig?.accentColor ||
    themeConfig?.color ||
    '#228be6';

  const customGetDayProps = (date: any) => {
    const userDayProps = getDayProps ? getDayProps(date) : {};

    const dateStr = formatDateStr(date);
    const todayStr = formatDateStr(new Date());
    const selectedStr = formatDateStr(
      value
        ? (value as Date | string)
        : defaultDate
          ? (defaultDate as Date | string)
          : null
    );
    const originalStr = formatDateStr(originalDate);

    const isSelected = Boolean(selectedStr && dateStr === selectedStr);
    const isOriginal = Boolean(
      originalStr && dateStr === originalStr && !isSelected
    );
    const isToday = Boolean(dateStr && dateStr === todayStr);

    let computedStyle: React.CSSProperties = {
      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      borderRadius: '8px'
    };

    if (isSelected) {
      computedStyle = {
        ...computedStyle,
        backgroundColor: effectiveActiveColor,
        color: '#ffffff',
        fontWeight: 700,
        boxShadow: `0 3px 10px ${effectiveActiveColor}40`,
        transform: 'scale(1.06)'
      };
    } else if (isOriginal) {
      computedStyle = {
        ...computedStyle,
        border: `2px dashed ${effectiveActiveColor}`,
        backgroundColor: `${effectiveActiveColor}15`,
        color: effectiveActiveColor,
        fontWeight: 700
      };
    } else if (isToday && highlightToday) {
      computedStyle = {
        ...computedStyle,
        backgroundColor: 'var(--mantine-color-blue-1)',
        color: 'var(--mantine-color-blue-7)',
        fontWeight: 700
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

  const resolvedDefaultDate =
    defaultDate ||
    (value
      ? typeof value === 'string'
        ? new Date(value)
        : (value as Date)
      : originalDate
        ? typeof originalDate === 'string'
          ? new Date(originalDate)
          : originalDate
        : new Date());

  return (
    <DatePickerInput
      value={value}
      defaultDate={resolvedDefaultDate}
      highlightToday={highlightToday}
      getDayProps={customGetDayProps}
      {...props}
    />
  );
};

export default CommonDatePickerInput;
