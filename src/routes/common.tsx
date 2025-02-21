import { Route, Routes } from "react-router-dom";
import ForgotPassword from "../components/common/forgetPassword/forgetPassword";
import { MantineProvider } from "@mantine/core";

const CommonRoutes: React.FC = () => {
  return (
    <MantineProvider>
    <Routes>
      <Route path="/forgot-password" element={<ForgotPassword closeModal={()=>""} />}>
      </Route>
    </Routes>
    </MantineProvider>
  )
};

export default CommonRoutes;
