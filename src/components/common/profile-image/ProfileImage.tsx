import React, { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { IconUser, IconUpload, IconLoader } from '@tabler/icons-react';
import { useGetProfileImage } from '@hooks/queries/useUserQueries';
import { useCustomToast } from '@utils/common/toast';
import { useUploadProfileImage } from '@hooks/mutations/useCommonMutations';
import { useRecoilValue } from 'recoil';
import { userDetailsAtom } from '@atoms/user';

const ProfileImage = () => {
  const user = useRecoilValue(userDetailsAtom);
  const {
    data: imageBlob,
    isLoading: isFetching,
    isError
  } = useGetProfileImage();
  const { mutateAsync: uploadImage, isPending: isUploading } =
    useUploadProfileImage();
  const { showSuccessToast, showErrorToast } = useCustomToast();

  const [localImageUrl, setLocalImageUrl] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (imageBlob && imageBlob instanceof Blob) {
      const url = URL.createObjectURL(imageBlob);
      setLocalImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageBlob]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const previewUrl = URL.createObjectURL(file);
      setLocalImageUrl(previewUrl);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    try {
      await uploadImage({ file: selectedFile, userId: user.id });
      showSuccessToast('Profile image updated successfully');
      setSelectedFile(null);
    } catch (error: any) {
      showErrorToast(
        error?.response?.data?.message || 'Failed to upload image'
      );
    }
  };

  const isLoading = isFetching || isUploading;
  console.log('render', selectedFile);

  return (
    <div className='flex flex-col items-center' style={{ width: '155px' }}>
      <div className='relative group w-28 h-28 mx-3 mb-2'>
        {isLoading ? (
          <div className='flex items-center justify-center w-full h-full bg-gray-200 rounded-full border-3 shadow-md'>
            <IconLoader className='animate-spin text-gray-500' size={40} />
          </div>
        ) : localImageUrl ? (
          <img
            src={localImageUrl}
            className='w-full h-full object-cover rounded-full border-3 shadow-md'
            alt='Profile'
          />
        ) : (
          <div className='flex items-center justify-center w-full h-full bg-gray-200 rounded-full border-3 shadow-md'>
            <IconUser className='text-gray-500' size={40} />
          </div>
        )}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
            localImageUrl ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          } transition-opacity`}
          style={{
            borderRadius: '55px',
            overflow: 'hidden'
          }}
        >
          <label className='cursor-pointer flex flex-col items-center justify-center'>
            <IconUpload className='text-white' size={24} />
            <span className='text-white text-sm'>Upload Image</span>
            <input
              type='file'
              className='hidden'
              accept='image/*'
              onChange={handleFileChange}
            />
          </label>
        </div>
      </div>

      {selectedFile && (
        <Button
          onClick={handleUpload}
          loading={isUploading}
          size='xs'
          radius='xl'
          variant='light'
          leftSection={<IconUpload size={14} />}
        >
          Confirm Upload
        </Button>
      )}
    </div>
  );
};

export default ProfileImage;
