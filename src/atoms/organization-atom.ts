import { atom } from "recoil";
import { OrganizationConfig } from "../interfaces/organization";
import { EmployeeInterface } from "../interfaces/employee";

export const organizationThemeAtom = atom<OrganizationConfig>({
  key: "organizationTheme",
  default: {
    organization_name: "default",
    organization_theme: {
      logo: "/data-store.png",
      organization: "default",
      theme: {
        primaryColor: "primary",
        colorScheme: "dark",
        fontFamily: "Arial, sans-serif",
        button: {
          color: "#343a40", // Dark gray
          textColor: "#ffffff", // White for contrast
        },
        colors: {
          primary: [
            "#343a40", // Dark gray
            "#2c3136", // Slightly darker gray
            "#23272b", // Darker gray
            "#1d2124", // Even darker gray
            "#16191c", // Almost black gray
            "#0f1214", // Near black
            "#080a0b", // Very dark
            "#030405", // Almost completely black
            "#000000", // Black
            "#000000", // Black
          ],
          secondary: [
            "#adb5bd", // Muted gray
            "#949aa0", // Slightly darker gray
            "#7b8287", // Darker gray
            "#62696f", // Even darker gray
            "#4a5157", // Very dark gray
            "#32383e", // Almost black
            "#1a1f24", // Near black
            "#080a0b", // Very dark
            "#000000", // Black
            "#000000", // Black
          ],
        },
        color: "#ffffff", // White text
        backgroundColor: "#1b1e21", // Dark background
        borderColor: "#4a4e69", // Muted purple for borders
        linkColor: "#ff4d77", // Bright pink for links
        headerBackgroundColor: "#23272b", // Dark header background
      },
    },
  },
});

export const organizationEmployeeAtom = atom<EmployeeInterface[]>({
  key: "organizationEmployees",
  default: [],
});