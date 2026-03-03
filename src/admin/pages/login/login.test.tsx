// import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import "@testing-library/jest-dom";
// import AdminLogin from "./login";
// import { OrganizationConfig } from '@interfaces/organization';
// import { BrowserRouter as Router, useNavigate } from "react-router-dom";
// import { MantineProvider } from "@mantine/core";
// import { login } from '@services/common-services';
// import { toast } from "react-toastify";

// jest.mock("../../../services/common-services", () => ({
//   login: jest.fn(),
// }));

// jest.mock("react-toastify", () => ({
//   toast: {
//     success: jest.fn(),
//     error: jest.fn(),
//   },
// }));
// const mockedUsedNavigate = jest.fn();
// jest.mock("react-router-dom", () => ({
//   ...(jest.requireActual("react-router-dom") as any),
//   useNavigate: () => mockedUsedNavigate,
// }));

// const mockLoginAdmin = login as jest.MockedFunction<typeof login>;

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

// test("renders AdminLogin component", () => {
//   render(
//     <MantineProvider>
//       <Router>
//         <AdminLogin organizationConfig={mockOrganizationConfig} />
//       </Router>
//     </MantineProvider>
//   );

//   expect(screen.getByText(/ADMIN LOGIN/i)).toBeInTheDocument();
//   expect(screen.getByAltText("")).toHaveAttribute("src", "/data-store.png");
//   expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
//   expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
//   expect(screen.getByText(/Forgot Password/i)).toBeInTheDocument();
//   expect(screen.getByTestId("loginButton")).toBeInTheDocument();
// });

// test("Show validation error for invalid email and password", async () => {
//   render(
//     <MantineProvider>
//       <Router>
//         <AdminLogin organizationConfig={mockOrganizationConfig} />
//       </Router>
//     </MantineProvider>
//   );

//   const email = screen.getByLabelText(/Email/i);
//   const password = screen.getByLabelText(/Password/i);

//   fireEvent.change(email, { value: "some-email" });
//   fireEvent.change(password, { value: "no" });

//   fireEvent.click(screen.getByTestId("loginButton"));

//   await waitFor(() => {
//     expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
//     expect(
//       screen.getByText(/Password must be 8 characters long/i)
//     ).toBeInTheDocument();
//   });
// });

// test("Successful login", async () => {
//   mockLoginAdmin.mockResolvedValueOnce({ token: "mock-token" });

//   render(
//     <MantineProvider>
//       <Router>
//         <AdminLogin organizationConfig={mockOrganizationConfig} />
//       </Router>
//     </MantineProvider>
//   );

//   const email = screen.getByLabelText(/Email/i);
//   const password = screen.getByLabelText(/Password/i);

//   fireEvent.change(email, { target: { value: "admin@example.com" } });
//   fireEvent.change(password, { target: { value: "correct-password" } });

//   fireEvent.click(screen.getByTestId("loginButton"));

//   await waitFor(() => {
//     expect(mockLoginAdmin).toHaveBeenCalledWith({
//       email: "admin@example.com",
//       password: "correct-password",
//     });
//     expect(mockLoginAdmin).toHaveBeenCalledTimes(1);
//     expect(toast.success).toHaveBeenCalledWith("Login Successful !");
//     expect(mockedUsedNavigate).toHaveBeenCalledWith(
//       expect.stringMatching(/^\/\w+\/admin\/dashboard$/)
//     );
//   });
// });

// test("handles login failure", async () => {
//   (login as jest.Mock).mockRejectedValueOnce({
//     response: {
//       data: {
//         message: "Invalid credentials",
//       },
//     },
//   });

//   render(
//     <MantineProvider>
//       <Router>
//         <AdminLogin organizationConfig={mockOrganizationConfig} />
//       </Router>
//     </MantineProvider>
//   );

//   fireEvent.change(screen.getByLabelText(/Email/i), {
//     target: { value: "wrong-email@example.com" },
//   });
//   fireEvent.change(screen.getByLabelText(/Password/i), {
//     target: { value: "wrong-password" },
//   });

//   fireEvent.click(screen.getByTestId("loginButton"));

//   await waitFor(() => {
//     expect(login).toHaveBeenCalledWith({
//       email: "wrong-email@example.com",
//       password: "wrong-password",
//     });
//     expect(toast.error).toHaveBeenCalledWith("An unexpected error occurred.");
//   });
// });
