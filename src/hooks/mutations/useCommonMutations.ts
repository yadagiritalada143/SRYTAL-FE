import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  login,
  forgetPassword,
  sendContactUsMail,
  submitTimeSheet,
  downloadSalarySlip,
  uploadProfileImage
} from '@services/common-services';
import { LoginForm } from '@forms/login';
import { ContactForm } from '@forms/contact';

export const useLogin = () => {
  return useMutation({
    mutationFn: (credentials: LoginForm) => login(credentials)
  });
};

export const useForgetPassword = () => {
  return useMutation({
    mutationFn: (username: string) => forgetPassword(username)
  });
};

export const useSendContactUsMail = () => {
  return useMutation({
    mutationFn: (data: ContactForm) => sendContactUsMail(data)
  });
};

export const useSubmitTimeSheet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, employeeId }: { data: any; employeeId?: string }) =>
      submitTimeSheet(data, employeeId),
    onSuccess: () => {
      // Invalidate all timesheet data
      queryClient.invalidateQueries({ queryKey: ['timesheet'] });
    }
  });
};

export const useDownloadSalarySlip = () => {
  return useMutation({
    mutationFn: (data: {
      mongoId: string;
      fullName: string;
      month: string;
      year: string;
    }) => downloadSalarySlip(data)
  });
};

export const useUploadProfileImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (file: File) => uploadProfileImage(file),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profileImage'] });
    }
  });
};
