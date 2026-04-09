import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export const SearchBarFullWidht = ({
  search,
  handleSearch,
  placeHolder
}: {
  search: string;
  handleSearch: any;
  placeHolder: string;
}) => {
  return (
    <div className='w-full my-2'>
      <TextInput
        placeholder={placeHolder}
        rightSection={<IconSearch />}
        value={search}
        onChange={handleSearch}
        className='my-4'
      />
    </div>
  );
};
