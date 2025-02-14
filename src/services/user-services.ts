import axios from "axios";
import { AddCompanyForm } from "../forms/add-company";
import { UpdatePasswordForm } from "../forms/update-password";
import {
  AddCandidateForm,
  AddCommentForm,
  UpdateCandidateSchema,
} from "../forms/add-candidate";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const getCompanyDetails = async () => {
  try {
    const response = await apiClient("/recruiter/getCompanyDetails");
    return response.data.poolCompaniesResponse;
  } catch (error) {
    throw error;
  }
};

export const addCompanyByRecruiter = async (data: AddCompanyForm) => {
  try {
    const response = await apiClient.post(
      "/recruiter/addCompanyByRecruiter",
      data
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const updateCompanyByRecruiter = async (
  data: AddCompanyForm,
  id: string
) => {
  try {
    const response = await apiClient.post(
      "/recruiter/updateCompanyByRecruiter",
      { ...data, id: id }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCompanyDetailsByIdByRecruiter = async (id: string) => {
  try {
    const response = await apiClient(
      `/recruiter/getCompanyDetailsByIdByRecruiter/${id}`
    );
    return response.data.poolCompanyResponse;
  } catch (error) {
    throw error;
  }
};

export const updatePasswordForEmployee = async (form: UpdatePasswordForm) => {
  const userRole = localStorage.getItem("userRole");

  let token;

  if (userRole === "admin") {
    token = localStorage.getItem("adminToken");
  } else {
    token = localStorage.getItem("employeeToken");
  }
  try {
    if (!token) {
      throw "Not authorized, Please login and try again";
    }
    await apiClient.post(
      "/updatePassword",
      { ...form },
      { headers: { auth_token: token } }
    );
    return { success: true };
  } catch (error) {
    throw error;
  }
};

export const addCommentByRecruiter = async (id: string, comment: string) => {
  const token = localStorage.getItem("employeeToken");
  const userRole = localStorage.getItem("userRole");

  try {
    if (!token) {
      throw "Not authorized, Please login and try again";
    }
    if (userRole !== "recruiter") {
      throw "Not authorized, Please login and try again";
    }
    const response = await apiClient.post(
      "/recruiter/addCommentByRecruiter",
      {
        id,
        comment,
      },
      { headers: { auth_token: token } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addPoolCandidateCommentByRecruiter = async (
  data: AddCommentForm
) => {
  const userRole = localStorage.getItem("userRole");
  let token;
  if (userRole === "admin") {
    token = localStorage.getItem("adminToken");
  } else {
    token = localStorage.getItem("employeeToken");
  }

  try {
    if (!token) {
      throw "Not authorized, Please login and try again";
    }

    const response = await apiClient.post(
      "/recruiter/addCommentToTalentPoolCandidate",
      data,
      { headers: { auth_token: token } }
    );

    return response.data.responseAfterCommentAdded;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getAllPoolCandidatesByEmployee = async () => {
  const userRole = localStorage.getItem("userRole");
  let token;
  if (userRole === "admin") {
    token = localStorage.getItem("adminToken");
  } else {
    token = localStorage.getItem("employeeToken");
  }

  try {
    const response = await apiClient.get(
      "/recruiter/getAllTalentPoolCandidates",

      { headers: { auth_token: token } }
    );

    return response.data.talentPoolCandidatesList;
  } catch (error) {
    throw error;
  }
};

export const addPoolCandidateByRecruiter = async (data: AddCandidateForm) => {
  const token = localStorage.getItem("employeeToken");

  try {
    const response = await apiClient.post(
      "/recruiter/addTalentPoolCandidateToTracker",
      data,
      { headers: { auth_token: token } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updatePoolCandidateByRecruiter = async (
  data: UpdateCandidateSchema
) => {
  const userRole = localStorage.getItem("userRole");
  let token;
  if (userRole === "admin") {
    token = localStorage.getItem("adminToken");
  } else {
    token = localStorage.getItem("employeeToken");
  }

  try {
    const response = await apiClient.post(
      "/recruiter/updatePoolCandidateByRecruiter",
      data,
      { headers: { auth_token: token } }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getPoolCandidateByRecruiter = async (id: string) => {
  const userRole = localStorage.getItem("userRole");
  let token;
  if (userRole === "admin") {
    token = localStorage.getItem("adminToken");
  } else {
    token = localStorage.getItem("employeeToken");
  }

  try {
    const response = await apiClient.get(
      `/recruiter/getTalentPoolCandidateById/${id}`,
      {
        headers: { auth_token: token },
      }
    );

    return response.data.talentPoolCandidateDetails;
  } catch (error) {
    throw error;
  }
};
