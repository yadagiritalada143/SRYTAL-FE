import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import OrgLogo from '../OrgLogo';

jest.mock('@hooks/use-app-theme', () => ({
  useAppTheme: () => ({
    themeConfig: { color: '#1971c2' },
    isDarkTheme: false,
    organizationConfig: { organization_name: 'srytal' }
  })
}));

describe('OrgLogo', () => {
  it('renders the image with logo source and a descriptive alt', () => {
    render(<OrgLogo logo='logo.png' name='srytal' width={100} height={50} />);
    const img = screen.getByAltText('srytal logo');
    expect(img).toHaveAttribute('src', 'logo.png');
    expect(img).toHaveStyle({ width: '100px', height: '50px' });
  });

  it('falls back to a text block when no logo is provided', () => {
    render(<OrgLogo name='My Company' width={100} height={50} />);
    expect(screen.getByLabelText('My Company')).toBeInTheDocument();
    expect(screen.getByTitle('My Company')).toBeInTheDocument();
    expect(screen.getByText('My Company')).toBeInTheDocument();
  });

  it('falls back when the logo image fails to load', () => {
    render(<OrgLogo logo='broken.png' name='srytal' width={100} height={50} />);
    fireEvent.error(screen.getByAltText('srytal logo'));
    expect(screen.queryByAltText('srytal logo')).not.toBeInTheDocument();
    expect(screen.getByLabelText('srytal')).toBeInTheDocument();
  });

  it('shows a monogram for portrait logos and the full name for landscape', () => {
    const { rerender } = render(
      <OrgLogo name='My Org' width={40} height={40} />
    );
    expect(screen.getByText('M')).toBeInTheDocument();
    expect(screen.getByText('My Org')).toBeInTheDocument();

    rerender(<OrgLogo name='My Org' width={150} height={38} />);
    expect(screen.queryByText('M')).not.toBeInTheDocument();
    expect(screen.getByText('My Org')).toBeInTheDocument();
  });

  it('uses the first word initial and uppercase it', () => {
    render(<OrgLogo name='acme corp' width={40} height={40} />);
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('defaults the display name to Organization', () => {
    render(<OrgLogo width={40} height={40} />);
    expect(screen.getByLabelText('Organization')).toBeInTheDocument();
    expect(screen.getByText('O')).toBeInTheDocument();
  });

  it('recovers to an image when the logo prop changes after an error', () => {
    const { rerender } = render(
      <OrgLogo logo='one.png' name='srytal' width={100} height={50} />
    );
    fireEvent.error(screen.getByAltText('srytal logo'));

    rerender(<OrgLogo logo='two.png' name='srytal' width={100} height={50} />);
    expect(screen.getByAltText('srytal logo')).toHaveAttribute(
      'src',
      'two.png'
    );
  });

  it('passes className and style through to the image', () => {
    render(
      <OrgLogo
        logo='logo.png'
        name='srytal'
        width={100}
        height={50}
        className='my-logo'
        style={{ borderRadius: 8 }}
      />
    );
    const img = screen.getByAltText('srytal logo');
    expect(img).toHaveClass('my-logo');
    expect(img).toHaveStyle({ borderRadius: '8px' });
  });
});