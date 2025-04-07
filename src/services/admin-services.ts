import axios from "axios";
import { AddEmployeeForm } from "../forms/add-employee";
import { EmployeeUpdateForm } from "../forms/update-employee";
import { AddPackageForm } from "../forms/add-package";
import { PackageUpdateForm } from "../forms/update-package";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      throw new Error("No refresh token found.");
    }

    const response = await apiClient.get("/admin/refreshToken", {
      headers: { refresh_token: refreshToken },
    });

    const { token: newAccessToken } = response.data;

    localStorage.setItem("token", newAccessToken);

    return newAccessToken;
  } catch (error) {
    console.error("Refresh Token Expired. Redirecting to Login...");
    logoutUser();
    throw error;
  }
};

const logoutUser = () => {
  const pathnameParts = window.location.pathname.split("/");
  const subdomain = pathnameParts[1];
  const userRole = pathnameParts[2];

  let loginPath = `/`;

  loginPath = `/${subdomain}/${userRole}/login`;

  localStorage.clear();

  window.location.href = loginPath;
};

apiClient.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");

    if (!token) {
      try {
        token = await refreshAccessToken();
      } catch (error) {
        console.error("Failed to refresh token. Redirecting to login...");
        logoutUser();
        return Promise.reject(error);
      }
    }

    config.headers["auth_token"] = token;
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ✅ Check if the refresh token request itself failed (Prevents infinite loop)
    if (originalRequest.url.includes("/admin/refreshToken")) {
      console.error("Refresh Token Expired. Redirecting to login...");
      logoutUser();
      return Promise.reject(error);
    }

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        originalRequest.headers["auth_token"] = newAccessToken;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Session expired. Please log in again.");
        logoutUser();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export const registerEmployee = async (employeeDetails: AddEmployeeForm) => {
  const token = localStorage.getItem("token");

  try {
    if (!token) {
      throw "Not authorized to access";
    }
    const response = await apiClient.post(
      "/admin/registerEmployeeByAdmin",
      employeeDetails,
      { headers: { auth_token: token } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerPackage = async (packageDetails: AddPackageForm) => {
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      throw "Not authorized to access";
    }
    const response = await apiClient.post(
      "/admin/addPackageByAdmin",
      packageDetails,
      { headers: { Auth_token: `Bearer ${token}` } }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEmployeeDetailsByAdmin = async (
  employeeDetails: EmployeeUpdateForm
) => {
  const adminToken = localStorage.getItem("adminToken");
  try {
    const response = await apiClient.put(
      "/admin/updateEmployeeDetailsByAdmin",
      employeeDetails,
      { headers: { auth_token: adminToken } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePackageByAdmin = async (
  packageId: string,
  packageDetails: PackageUpdateForm
) => {
  const adminToken = localStorage.getItem("adminToken");
  try {
    const response = await apiClient.put(
      "/admin/updatePackageByAdmin",
      { id: packageId, detailsToUpdate: packageDetails },
      { headers: { auth_token: `Bearer ${adminToken}` } }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handlePasswordResetByAdmin = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.post(
      "/admin/employeePasswordResetByAdmin",
      { employeeId: id },
      {
        headers: { auth_token: token },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEmployeeByAdmin = async (data: {
  id: string;
  confirmDelete: boolean;
}) => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.post(
      "/admin/deleteEmployeeByAdmin",
      data,
      {
        headers: { auth_token: token },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePackageByAdmin = async (id: string, hardDelete: boolean) => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.delete(
      `/admin/deletePackageByAdmin/${id}`,
      {
        headers: { auth_token: token },
        data: { confirmDelete: hardDelete },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteTaskByAdmin = async (
  taskId: string,
  hardDelete: boolean
) => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.delete(
      `/admin/deleteTaskByAdmin/${taskId}`,
      {
        headers: { auth_token: `Bearer ${token}` },
        data: { confirmDelete: hardDelete },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePoolCandidatesByAdmin = async (data: {
  candidateId: string;
  confirmDelete: boolean;
}) => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.delete(
      `/admin/deletePoolCandidatesByAdmin/${data.candidateId}`,
      {
        headers: { auth_token: token },
        data: { confirmDelete: data.confirmDelete },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePoolCompanyByAdmin = async (data: {
  companyId: string;
  confirmDelete: boolean;
}) => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.delete(
      `/admin/deletePoolCompanyByAdmin/${data.companyId}`,
      {
        headers: { auth_token: token },
        data: { confirmDelete: data.confirmDelete },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEmployeeDetailsByAdmin = async (id: string) => {
  const adminToken = localStorage.getItem("adminToken");
  try {
    const response = await apiClient.get(
      `/admin/getEmployeeDetailsByAdmin/${id}`,
      {
        headers: { auth_token: adminToken },
      }
    );
    return response.data.userDetails;
  } catch (error) {
    throw error;
  }
};

export const getAllEmployeeDetailsByAdmin = async () => {
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      throw "Not authorized to access";
    }
    const response = await apiClient("/admin/getAllEmployeeDetailsByAdmin", {
      headers: { auth_token: token },
    });
    return response.data.usersList;
  } catch (error) {
    throw error;
  }
};

export const getAllPackagesByAdmin = async () => {
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      throw "Not authorized to access";
    }
    const response = await apiClient("/admin/getAllPackagesByAdmin", {
      headers: { auth_token: `Bearer ${token}` },
    });
    return response.data.pacakgesList;
  } catch (error) {
    throw error;
  }
};

export const getPackageDetailsByAdmin = async (packageId: string) => {
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      throw "Not authorized to access";
    }
    const response = await apiClient.get(
      `/admin/getPackageDetailsByAdmin/${packageId}`,
      {
        headers: { auth_token: token },
      }
    );
    return response.data.packageDetails;
  } catch (error) {
    throw error;
  }
};

export const getAllBloodGroupByAdmin = async () => {
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      throw "Not authorized to access";
    }
    const response = await apiClient("/admin/getAllBloodGroupsByAdmin", {
      headers: { auth_token: token },
    });
    return response.data.bloodGroupList;
  } catch (error) {
    throw error;
  }
};

export const addBloodGroupByAdmin = async (data: { type: string }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.post("/admin/addBloodGroupByAdmin", data, {
      headers: { auth_token: token },
    });

    return response.data.bloodGroupList;
  } catch (error) {
    throw error;
  }
};

export const addEmploymentTypeByAdmin = async (data: {
  employmentType: string;
}) => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.post(
      "/admin/addEmploymentTypeByAdmin",
      data,
      {
        headers: { auth_token: token },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addEmployeeRoleByAdmin = async (data: { designation: string }) => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.post(
      "/admin/addEmployeeRoleByAdmin",
      data,
      {
        headers: { auth_token: token },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBloodGroupByAdmin = async (id: string, type: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.put(
      `/admin/updateBloodGroupByAdmin`,
      { id, type },
      {
        headers: { auth_token: token },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEmployeeRoleByAdmin = async (
  id: string,
  designation: string
) => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.put(
      `/admin/updateEmployeeRoleByAdmin`,
      { id, designation },
      {
        headers: { auth_token: token },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateEmploymentTypeByAdmin = async (
  id: string,
  employmentType: string
) => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.put(
      `/admin/updateEmploymentTypeByAdmin`,
      { id, employmentType },
      {
        headers: { auth_token: token },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllEmploymentTypes = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.get(
      "/admin/getAllEmploymentTypesByAdmin",
      { headers: { auth_token: token } }
    );
    console.log(response);
    return response.data.employmentTypesList;
  } catch (error) {
    throw error;
  }
};

export const addTasksByAdmin = async (packageId: string, title: string) => {
  try {
    const response = await apiClient.post("/admin/addTaskByAdmin", {
      packageId,
      title,
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllEmployeeRoleByAdmin = async () => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.get("/admin/getAllEmployeeRoleByAdmin", {
      headers: { auth_token: token },
    });
    return response.data.employeeRoles;
  } catch (error) {
    throw error;
  }
};

export const getAllApproversByAdmin = async () => {
  const token = localStorage.getItem("token");
  try {
    if (!token) {
      throw "Not authorized to access";
    }
    const response = await apiClient.get(
      "/admin/getAllEmployeeDetailsByAdmin",
      {
        headers: { auth_token: token },
      }
    );
    return response.data.approvers;
  } catch (error) {
    throw error;
  }
};

export const deleteEmployeeRoleByAdmin = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.delete(
      `/admin/deleteEmployeeRoleByAdmin/${id}`,
      {
        headers: { auth_token: token },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteBloodGroupByAdmin = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.delete(
      `/admin/deleteBloodGroupByAdmin/${id}`,
      {
        headers: { auth_token: token },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteEmploymentTypeByAdmin = async (id: string) => {
  const token = localStorage.getItem("token");
  try {
    const response = await apiClient.delete(
      `/admin/deleteEmploymentTypeByAdmin/${id}`,
      {
        headers: { auth_token: token },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
