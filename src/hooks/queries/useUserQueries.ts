import { useQuery } from '@tanstack/react-query';
import {
  getCompanyDetails,
  getCompanyDetailsByIdByRecruiter,
  getAllPoolCandidatesByEmployee,
  getPoolCandidateByRecruiter,
  getUserDetails,
  getAllCoursesByUser,
  getCourseByIdContentWriter,
  getEmployeeDashboard,
  getMyAssignedCourses,
  getMyAssignedCourseById
} from '@services/user-services';
import { getProfileImage } from '@services/common-services';

// Query Keys
export const userQueryKeys = {
  companies: ['poolCompanies'] as const,
  company: (id: string) => ['poolCompany', id] as const,
  candidates: ['poolCandidates'] as const,
  candidate: (id: string) => ['poolCandidate', id] as const,
  userDetails: ['userDetails'] as const,
  profileImage: ['profileImage'] as const,
  courses: ['userCourses'] as const,
  course: (id: string) => ['userCourse', id] as const,
  employeeDashboard: ['employeeDashboard'] as const,
  myCourses: ['myAssignedCourses'] as const,
  myCourse: (courseAssignmentId: string) =>
    ['myAssignedCourse', courseAssignmentId] as const
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

export const useGetCourseById = (id: string, enabled = true) => {
  return useQuery({
    queryKey: userQueryKeys.course(id),
    queryFn: () => getCourseByIdContentWriter(id),
    enabled: !!id && enabled
  });
};

export const useGetEmployeeDashboard = () => {
  return useQuery({
    queryKey: userQueryKeys.employeeDashboard,
    queryFn: getEmployeeDashboard
  });
};

export const useGetMyAssignedCourses = () => {
  return useQuery({
    queryKey: userQueryKeys.myCourses,
    queryFn: getMyAssignedCourses
  });
};

export const useGetMyAssignedCourse = (
  courseAssignmentId: string,
  enabled = true
) => {
  return useQuery({
    queryKey: userQueryKeys.myCourse(courseAssignmentId),
    queryFn: () => getMyAssignedCourseById(courseAssignmentId),
    enabled: !!courseAssignmentId && enabled
  });
};
