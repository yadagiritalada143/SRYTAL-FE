import { useQuery } from '@tanstack/react-query';
import {
  getCompanyDetails,
  getCompanyDetailsByIdByRecruiter,
  getAllPoolCandidatesByEmployee,
  getPoolCandidateByRecruiter,
  getUserDetails,
  getProfileImage,
  getAllCoursesByUser
} from '@services/user-services';

// Query Keys
export const userQueryKeys = {
  companies: ['poolCompanies'] as const,
  company: (id: string) => ['poolCompany', id] as const,
  candidates: ['poolCandidates'] as const,
  candidate: (id: string) => ['poolCandidate', id] as const,
  userDetails: ['userDetails'] as const,
  profileImage: ['profileImage'] as const,
  courses: ['userCourses'] as const
};

export const useGetCompanyDetails = () => {
  return useQuery({
    queryKey: userQueryKeys.companies,
    queryFn: getCompanyDetails
  });
};

export const useGetCompanyById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: userQueryKeys.company(id),
    queryFn: () => getCompanyDetailsByIdByRecruiter(id),
    enabled: !!id && enabled
  });
};

export const useGetAllPoolCandidates = () => {
  return useQuery({
    queryKey: userQueryKeys.candidates,
    queryFn: getAllPoolCandidatesByEmployee
  });
};

export const useGetPoolCandidateById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: userQueryKeys.candidate(id),
    queryFn: () => getPoolCandidateByRecruiter(id),
    enabled: !!id && enabled
  });
};

export const useGetUserDetails = () => {
  return useQuery({
    queryKey: userQueryKeys.userDetails,
    queryFn: getUserDetails
  });
};

export const useGetProfileImage = () => {
  return useQuery({
    queryKey: userQueryKeys.profileImage,
    queryFn: getProfileImage
  });
};

export const useGetAllCoursesByUser = () => {
  return useQuery({
    queryKey: userQueryKeys.courses,
    queryFn: getAllCoursesByUser
  });
};
