import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { CommonButton } from '../button/CommonButton';

export const BackButton = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  return (
    <CommonButton
      className='flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition'
      onClick={() => {
        localStorage.setItem('id', id);
        navigate(-1);
      }}
    >
      <IconArrowLeft size={20} />
    </CommonButton>
  );
};
