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

    const { token, userRole, refreshToken } = response.data;

    if (token && userRole) {
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("refreshToken", refreshToken);
    }

    return response.data;
  } catch (error) {
    console.error("Login Error:", error);
    throw error;
  }
};

export const forgetPassword = async (username: string) => {
  try {
    const response = await apiClient.post("/forgotPassword", { username });
    return response.data;
  } catch (error) {
    console.error("Forget Password Error:", error);
    throw error;
  }
};

export const getVisitorCount = async () => {
  try {
    const response = await apiClient.get("/getVisitorCount");
    const count = response.data.visitorCount;

    return typeof count === "number" ? count : String(count);
  } catch (error) {
    console.error("Error fetching visitor count:", error);
    throw error;
  }
};

export const sendContactUsMail = async (data: ContactForm) => {
  try {
    const response = await apiClient.post("/sendContactUsMail", data);
    return response.data;
  } catch (error) {
    console.error("Contact Us Mail Error:", error);
    throw error;
  }
};

export const getOrganizationConfig = async (organizationName: string) => {
  try {
    const response = await apiClient.get(
      `/getOrganizationThemes/${organizationName}`
    );
    return response.data.themesResponse;
  } catch (error) {
    console.error("Error fetching organization config:", error);
    throw error;
  }
};
