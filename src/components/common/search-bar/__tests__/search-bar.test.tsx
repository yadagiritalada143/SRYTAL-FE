import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';
import { SearchBarFullWidht } from '../search-bar';

const renderSearchBar = (props: any = {}) =>
  render(
    <MantineProvider>
      <SearchBarFullWidht
        search=''
        handleSearch={jest.fn()}
        placeHolder='Search courses...'
        {...props}
      />
    </MantineProvider>
  );

describe('SearchBarFullWidht', () => {
  it('renders the placeholder and forwards input changes', () => {
    const handleSearch = jest.fn();
    renderSearchBar({ handleSearch });

    const input = screen.getByPlaceholderText('Search courses...');
    expect(input).toHaveValue('');

    fireEvent.change(input, { target: { value: 'react' } });
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  it('displays the current search value', () => {
    renderSearchBar({ search: 'typescript' });

    expect(screen.getByPlaceholderText('Search courses...')).toHaveValue(
      'typescript'
    );
  });
});
