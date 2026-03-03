// import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import AddEmployee from "./add-employee";
// import { OrganizationConfig } from '@interfaces/organization';
// import { MantineProvider } from "@mantine/core";
// import { registerEmployee } from '@services/admin-services';
// import { toast } from "react-toastify";

// jest.mock("../../../../services/admin-services", () => ({
//   registerEmployee: jest.fn(),
// }));

// jest.mock("react-toastify", () => ({
//   toast: {
//     success: jest.fn(),
//     error: jest.fn(),
//   },
// }));

// const mockRegisterEmployee = registerEmployee as jest.MockedFunction<
//   typeof registerEmployee
// >;

// const mockOrganizationConfig: OrganizationConfig = {
//   logo: "/data-store.png",
//   organization: "data",
//   theme: {
//     primaryColor: "blue",
//     colorScheme: "light",
//     fontFamily: "Arial, sans-serif",
//     button: {
//       color: "blue",
//       textColor: "white",
//     },
//     colors: {
//       primary: [
//         "#007bff",
//         "#0056b3",
//         "#004085",
//         "#003065",
//         "#002352",
//         "#001a39",
//         "#001126",
//         "#000a19",
//         "#000006",
//         "#000000",
//       ],
//     },
//     color: "black",
//     backgroundColor: "white",
//     borderColor: "#ccc",
//     linkColor: "blue",
//     headerBackgroundColor: "lightgray",
//   },
// };

// test("renders AddEmployee component", () => {
//   render(
//     <MantineProvider>
//       <AddEmployee organizationConfig={mockOrganizationConfig} />
//     </MantineProvider>
//   );

//   expect(screen.getByText(/Add Employee/i)).toBeInTheDocument();
//   expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
//   expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
//   expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
//   expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
//   expect(screen.getByTestId("submitButton")).toBeInTheDocument();
// });

// test("shows validation errors for invalid input", async () => {
//   render(
//     <MantineProvider>
//       <AddEmployee organizationConfig={mockOrganizationConfig} />
//     </MantineProvider>
//   );

//   fireEvent.change(screen.getByLabelText(/First Name/i), {
//     target: { value: "" },
//   });
//   fireEvent.change(screen.getByLabelText(/Email/i), {
//     target: { value: "invalid-email" },
//   });

//   fireEvent.click(screen.getByTestId("submitButton"));

//   await waitFor(() => {
//     expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
//     expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
//   });
// });

// test("successful form submission", async () => {
//   mockRegisterEmployee.mockResolvedValueOnce({});

//   render(
//     <MantineProvider>
//       <AddEmployee organizationConfig={mockOrganizationConfig} />
//     </MantineProvider>
//   );

//   fireEvent.change(screen.getByLabelText(/First Name/i), {
//     target: { value: "John" },
//   });
//   fireEvent.change(screen.getByLabelText(/Last Name/i), {
//     target: { value: "Doe" },
//   });
//   fireEvent.change(screen.getByLabelText(/Email/i), {
//     target: { value: "john.doe@example.com" },
//   });
//   fireEvent.change(screen.getByLabelText(/Phone Number/i), {
//     target: { value: "1234567890" },
//   });

//   fireEvent.click(screen.getByTestId("submitButton"));

//   await waitFor(() => {
//     expect(mockRegisterEmployee).toHaveBeenCalledWith({
//       firstName: "John",
//       lastName: "Doe",
//       email: "john.doe@example.com",
//       mobileNumber: "1234567890",
//     });
//     expect(mockRegisterEmployee).toHaveBeenCalledTimes(1);
//     expect(toast.success).toHaveBeenCalledWith("Employee added successfully!");
//   });
// });

// test("handles form submission failure", async () => {
//   mockRegisterEmployee.mockRejectedValueOnce({
//     response: {
//       data: {
//         message: "Failed to add employee",
//       },
//     },
//   });

//   render(
//     <MantineProvider>
//       <AddEmployee organizationConfig={mockOrganizationConfig} />
//     </MantineProvider>
//   );

//   fireEvent.change(screen.getByLabelText(/First Name/i), {
//     target: { value: "John" },
//   });
//   fireEvent.change(screen.getByLabelText(/Last Name/i), {
//     target: { value: "Doe" },
//   });
//   fireEvent.change(screen.getByLabelText(/Email/i), {
//     target: { value: "john.doe@example.com" },
//   });
//   fireEvent.change(screen.getByLabelText(/Phone Number/i), {
//     target: { value: "1234567890" },
//   });

//   fireEvent.click(screen.getByTestId("submitButton"));

//   await waitFor(() => {
//     expect(mockRegisterEmployee).toHaveBeenCalledWith({
//       firstName: "John",
//       lastName: "Doe",
//       email: "john.doe@example.com",
//       mobileNumber: "1234567890",
//     });
//     expect(toast.error).toHaveBeenCalledWith("An unexpected error occurred.");
//   });
// });
