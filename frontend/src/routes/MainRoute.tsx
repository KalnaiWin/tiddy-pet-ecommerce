import { Route, Routes } from "react-router-dom";
import { HomePage } from "../page/global/Home/HomePage";
import { MainLayout } from "../layout/MainLayout";
import { StorePage } from "../page/customer/StorePage";
import { ProductDetails } from "../page/global/ProductInformation";
import Cart from "../page/customer/Cart";
import SuccessPage from "../page/global/SuccessPage";
import CancelPage from "../page/global/CancelPage";
import HistoryOrder from "../page/customer/HistoryOrder";
import Profile from "../page/customer/Profile";

export const MainRoute = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/store/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/history" element={<HistoryOrder />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
      </Route>
    </Routes>
  );
};
