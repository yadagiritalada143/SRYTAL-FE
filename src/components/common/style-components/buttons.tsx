import { IconArrowLeft } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { CommonButton } from '../button/CommonButton';

export const BackButton = ({ id }: { id: string }) => {
  const navigate = useNavigate();
  return (
    <CommonButton
      variant='default'
      leftSection={<IconArrowLeft size={16} />}
      onClick={() => {
        localStorage.setItem('id', id);
        navigate(-1);
      }}
    >
      Back
    </CommonButton>
  );
};
