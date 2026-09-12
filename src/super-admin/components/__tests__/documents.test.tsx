import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

jest.mock('@utils/super-admin/menus', () => ({
  documentsMenuSuperadmin: [
    { icon: () => null, text: 'OFFER LETTER', openModel: 'offerletter' },
    { icon: () => null, text: 'SALARY SLIP', openModel: 'salaryslip' }
  ]
}));
const getMenuItems = () =>
  (jest.requireMock('@utils/super-admin/menus') as any)
    .documentsMenuSuperadmin as Array<{ text: string }>;

jest.mock('../documents/utils/offerletter', () => ({
  __esModule: true,
  default: () => <div data-testid='offer-letter-modal'>OfferLetter</div>
}));

jest.mock('../documents/utils/salary-slip', () => ({
  __esModule: true,
  default: () => <div data-testid='salary-slip-modal'>SalarySlip</div>
}));

import DocumentsMenuForSuperadmin from '../documents/documents';

const renderDocuments = () =>
  render(
    <MantineProvider>
      <DocumentsMenuForSuperadmin />
    </MantineProvider>
  );

describe('DocumentsMenuForSuperadmin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the documents menu heading', () => {
    renderDocuments();
    expect(screen.getByText('Documents')).toBeInTheDocument();
  });

  it('renders the menu items', () => {
    renderDocuments();
    expect(screen.getByText('OFFER LETTER')).toBeInTheDocument();
    expect(screen.getByText('SALARY SLIP')).toBeInTheDocument();
  });

  it('opens modal when a known menu item is clicked', async () => {
    renderDocuments();
    fireEvent.click(screen.getByText('OFFER LETTER'));
    await waitFor(() => {
      expect(screen.getByTestId('offer-letter-modal')).toBeInTheDocument();
    });
  });

  it('opens default modal for unknown menu item', async () => {
    // Temporarily add an unknown item
    const menuItems = getMenuItems();
    menuItems.push({ icon: () => null, text: 'UNKNOWN ITEM' } as any);

    renderDocuments();
    fireEvent.click(screen.getByText('UNKNOWN ITEM'));
    await waitFor(() => {
      expect(
        screen.getByText('Oops this is still in progress')
      ).toBeInTheDocument();
    });

    // cleanup
    menuItems.pop();
  });
});
