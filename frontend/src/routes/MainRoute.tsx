import { Route, Routes } from "react-router-dom";
import { HomePage } from "../page/HomePage";
import { MainLayout } from "../layout/MainLayout";
import { StorePage } from "../page/StorePage";

export const MainRoute = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} />
      </Route>
    </Routes>
  );
};
