import { Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import NotFound from "../components/common/not-found/not-found";

const CommonRoutes: React.FC = () => {
  return (
    <MantineProvider>
      <Routes>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </MantineProvider>
  );
};

export default CommonRoutes;
