import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import GlobalLoader from '../GlobalLoader';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: { backgroundColor: '#111' },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

jest.mock('@mantine/core', () => ({
  LoadingOverlay: (props: any) => (
    <div
      data-testid='global-loader'
      data-visible={props.visible}
      data-blur={props.overlayProps?.blur}
      data-opacity={props.overlayProps?.backgroundOpacity}
      data-color={props.overlayProps?.color}
      data-z-index={props.zIndex}
    />
  )
}));

describe('GlobalLoader', () => {
  it('passes the visible flag to the overlay', () => {
    const { rerender } = render(<GlobalLoader visible={false} />);
    expect(
      document.querySelector('[data-testid="global-loader"]')
    ).toHaveAttribute('data-visible', 'false');

    rerender(<GlobalLoader visible />);
    expect(
      document.querySelector('[data-testid="global-loader"]')
    ).toHaveAttribute('data-visible', 'true');
  });

  it('uses default blur and opacity values', () => {
    render(<GlobalLoader visible />);
    const el = document.querySelector('[data-testid="global-loader"]')!;
    expect(el).toHaveAttribute('data-blur', '6');
    expect(el).toHaveAttribute('data-opacity', '0.6');
  });

  it('uses custom blur and opacity values', () => {
    render(<GlobalLoader visible blur={2} opacity={0.9} />);
    const el = document.querySelector('[data-testid="global-loader"]')!;
    expect(el).toHaveAttribute('data-blur', '2');
    expect(el).toHaveAttribute('data-opacity', '0.9');
  });

  it('uses the theme background color for the overlay', () => {
    render(<GlobalLoader visible />);
    expect(
      document.querySelector('[data-testid="global-loader"]')
    ).toHaveAttribute('data-color', '#111');
  });
});