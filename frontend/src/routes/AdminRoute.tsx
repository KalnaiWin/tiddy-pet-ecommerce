import { Route, Routes } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import AnalyticTable from "../page/admin/AnalyticTable";
import AccountManagement from "../page/admin/AccountManagement";
import ProductStore from "../page/admin/ProductStore";
import OrderInformation from "../page/admin/OrderInformation";
import AdminProtect from "../layout/AdminProtect";
import CreateProductPage from "../page/admin/CreateProductPage";
import EditProductPage from "../page/admin/EditProductPage";
import ViewOrderInformation from "../page/admin/ViewOrderInformation";

export const AdminRoute = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route element={<AdminProtect />}>
          <Route path="dashboard" element={<AnalyticTable />} />
          <Route path="account" element={<AccountManagement />} />
          <Route path="store" element={<ProductStore />} />
          <Route path="create" element={<CreateProductPage />} />
          <Route path="edit/:id" element={<EditProductPage />} />
          <Route path="order" element={<OrderInformation />} />
          <Route path="order/:id" element={<ViewOrderInformation />} />
        </Route>
      </Route>
    </Routes>
  );
};
