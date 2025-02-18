import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/landing";
import { MantineProvider } from "@mantine/core";
import AdminRoutes from "./routes/admin";
import EmployeeRoutes from "./routes/user";
import SuperAdminRoutes from "./routes/super-admin";
import { RecoilRoot } from "recoil";
import CommonForgetPassword from "./routes/common";

const App: React.FC = () => {
  return (
    <RecoilRoot>
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
          <Route path="/comm/*" element={<CommonForgetPassword />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

export default App;
