import React, { useEffect, useState } from 'react';
import { Button } from '@mantine/core';
import { IconUser, IconUpload, IconLoader } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import {
  getProfileImage,
  uploadProfileImage
} from '../../../services/user-services';
import { useCustomToast } from '../../../utils/common/toast';
import { useRecoilState } from 'recoil';
import { profileImageAtom } from '../../../atoms/profile-image';

const ProfileImageUploader = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useRecoilState(profileImageAtom);
  const { showSuccessToast } = useCustomToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newImageUrl = URL.createObjectURL(file);
      setImage(file);
      setImageUrl(newImageUrl);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (imageUrl) {
      setIsLoading(false);
    }
  }, [imageUrl]);

  const handleUploadImage = () => {
    if (!image) {
      toast.warning('Please select an image before uploading.');
      return;
    }
    setIsLoading(true);
    uploadProfileImage(image)
      .then(() => {
        const newImageUrl = URL.createObjectURL(image);
        setImageUrl(newImageUrl);
        setImage(null);

        showSuccessToast('Profile image uploaded successfully !');
      })
      .catch(error => {
        console.error('Upload failed:', error);
        toast.error(error?.response?.data?.message || 'Something went wrong');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    setIsLoading(true);

    getProfileImage()
      .then(async response => {
        if (!response || !(response instanceof Blob)) {
          throw new Error('Invalid image data');
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          const base64Image = reader.result as string;
          setImageUrl(base64Image);
        };
        reader.readAsDataURL(response);
      })
      .catch(() => {
        setImageUrl('');
      })
      .finally(() => setIsLoading(false));
  }, [setImageUrl]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative group w-32 h-32 mx-5 mb-4">
        {isLoading ? (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
            <IconLoader className="animate-spin text-gray-500" size={40} />
          </div>
        ) : imageUrl ? (
          <img
            src={imageUrl}
            className="w-full h-full object-cover rounded-lg"
            onError={() => setImageUrl('')}
            alt="Profile"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-lg">
            <IconUser className="text-gray-500" size={40} />
          </div>
        )}

        <div
          className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
            imageUrl ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          } transition-opacity rounded-lg`}
        >
          <label className="cursor-pointer flex flex-col items-center justify-center">
            <IconUpload className="text-white" size={24} />
            <span className="text-white text-sm">Upload Image</span>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
        </div>
      </div>

      {image && (
        <Button onClick={handleUploadImage} className="mt-2">
          <IconUpload size={20} /> Upload Image
        </Button>
      )}
    </div>
  );
};

export default ProfileImageUploader;
