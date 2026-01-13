import { Route, Routes } from "react-router-dom";
import { HomePage } from "../page/global/HomePage";
import { MainLayout } from "../layout/MainLayout";
import { StorePage } from "../page/global/StorePage";
import { ProductDetails } from "../components/ProductInformation";
import Cart from "../page/global/Cart";

export const MainRoute = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/store/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Route>
    </Routes>
  );
};
