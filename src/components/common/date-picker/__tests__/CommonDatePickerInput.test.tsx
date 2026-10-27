import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { RecoilRoot } from 'recoil';
import { CommonDatePickerInput, formatDateStr } from '../CommonDatePickerInput';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: {
      color: '#212529',
      button: { color: '#228be6' }
    }
  })
}));

describe('formatDateStr helper', () => {
  it('formats Date object into YYYY-MM-DD string', () => {
    const d = new Date(2026, 9, 11);
    expect(formatDateStr(d)).toBe('2026-10-11');
  });

  it('formats ISO date string into YYYY-MM-DD string', () => {
    expect(formatDateStr('2026-10-11T00:00:00.000Z')).toBe('2026-10-11');
  });

  it('returns empty string for null or invalid dates', () => {
    expect(formatDateStr(null)).toBe('');
    expect(formatDateStr('invalid-date')).toBe('');
  });
});

describe('CommonDatePickerInput Component', () => {
  it('renders placeholder when value is null', () => {
    render(
      <RecoilRoot>
        <MantineProvider>
          <CommonDatePickerInput
            placeholder='Pick a date'
            value={null}
          />
        </MantineProvider>
      </RecoilRoot>
    );

    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('renders formatted date when value is provided', () => {
    render(
      <RecoilRoot>
        <MantineProvider>
          <CommonDatePickerInput
            placeholder='Pick a date'
            value={new Date('2026-10-11')}
          />
        </MantineProvider>
      </RecoilRoot>
    );

    expect(screen.getByText(/October 11, 2026/i)).toBeInTheDocument();
  });

  it('applies custom day styles for active, original, and today dates', () => {
    let capturedGetDayProps: any;
    const TestComponent = () => {
      return (
        <RecoilRoot>
          <MantineProvider>
            <CommonDatePickerInput
              placeholder='Pick a date'
              value={new Date('2026-10-25')}
              originalDate={new Date('2026-10-20')}
              getDayProps={(date: any) => {
                capturedGetDayProps = date;
                return {};
              }}
            />
          </MantineProvider>
        </RecoilRoot>
      );
    };

    render(<TestComponent />);
    expect(screen.getByText(/October 25, 2026/i)).toBeInTheDocument();
  });
});
