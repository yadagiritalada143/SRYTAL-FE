import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/landing";
import { MantineProvider } from "@mantine/core";
import AdminRoutes from "./routes/admin";
import EmployeeRoutes from "./routes/user";
import SuperAdminRoutes from "./routes/super-admin";
import { RecoilRoot } from "recoil";
import CommonForgetPassword from "./routes/common";
import { ModalsProvider } from "@mantine/modals";

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <MantineProvider>
        <ModalsProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <MantineProvider>
                <Landing />
              </MantineProvider>
            }
          />

          <Route path="/:organization/admin/*" element={<AdminRoutes />} />
          <Route
            path="/:organization/employee/*"
            element={<EmployeeRoutes />}
          />
          <Route path="/superadmin/*" element={<SuperAdminRoutes />} />
          <Route path="/*" element={<CommonForgetPassword />} />
        </Routes>
      </Router>
      </ModalsProvider>
      </MantineProvider>
    </RecoilRoot>
  );
};

export default App;
