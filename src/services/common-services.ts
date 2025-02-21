import axios from "axios";
import { LoginForm } from "../forms/login";
import { ContactForm } from "../forms/contact";

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
export const login = async (Credentials: LoginForm) => {
  try {
    const response = await apiClient.post("/admin/login", Credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgetPassword = async (username: string) => {
  try {
    const response = await apiClient.post("/forgotPassword", {username});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVisitorCount = async () => {
  try {
    const response = await apiClient("/getVisitorCount");
    if (typeof response.data.count === "number") {
      return response.data.visitorCount;
    } else {
      return String(response.data.visitorCount);
    }
  } catch (error) {
    throw error;
  }
};

export const sendContactUsMail = async (data: ContactForm) => {
  try {
    const response = await apiClient.post("/sendContactUsMail", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrganizationConfig = async (organizationName: string) => {
  try {
    const response = await apiClient(
      `/getOrganizationThemes/${organizationName}`
    );
    return response.data.themesResponse;
  } catch (error) {
    throw error;
  }
};

export const getUserDetails = async () => {
  try {
    const userRole = localStorage.getItem("userRole");
    let token;
    if (userRole === "admin") {
      token = localStorage.getItem("adminToken");
    } else {
      token = localStorage.getItem("employeeToken");
    }
    if (!userRole || !token) {
      throw "Not authorized to access";
    }
    const response = await apiClient("/getEmployeeDetails", {
      headers: { auth_token: token },
    });

    return response.data.employeeDetails;
  } catch (error) {
    throw error;
  }
};

export const uploadProfileImage = async (image: File) => {
  try {
    const userRole = localStorage.getItem("userRole");
    let token;
    if (userRole === "admin") {
      token = localStorage.getItem("adminToken");
    } else {
      token = localStorage.getItem("employeeToken");
    }
    if (!userRole || !token) {
      throw "Not authorized to access";
    }
    const response = await apiClient.post(
      "/uploadProfileImage",
      { profileImage: image },
      { headers: { auth_token: token, "Content-Type": "multipart/form-data" } }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfileImage = async () => {
  try {
    const userRole = localStorage.getItem("userRole");
    let token;
    if (userRole === "admin") {
      token = localStorage.getItem("adminToken");
    } else {
      token = localStorage.getItem("employeeToken");
    }

    if (!userRole || !token) {
      throw new Error("Not authorized to access");
    }

    const response = await apiClient.get("/getProfileImage", {
      headers: { auth_token: token },
      responseType: "blob",
    });

    if (response.data.size < 1) {
      throw "NoImage";
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};
