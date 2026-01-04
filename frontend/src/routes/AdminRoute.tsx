import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../page/admin/AdminDashboard";
import AdminLayout from "../layout/AdminLayout";
import AnalyticTable from "../page/admin/AnalyticTable";
import AccountManagement from "../page/admin/AccountManagement";
import ProductStore from "../page/admin/ProductStore";
import OrderInformation from "../page/admin/OrderInformation";
import AdminProtect from "../layout/AdminProtect";
import CreateProductPage from "../page/admin/CreateProductPage";

export const AdminRoute = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route element={<AdminProtect />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="analytic" element={<AnalyticTable />} />
          <Route path="account" element={<AccountManagement />} />
          <Route path="store" element={<ProductStore />} />
          <Route path="create" element={<CreateProductPage />} />
          <Route path="order" element={<OrderInformation />} />
        </Route>
      </Route>
    </Routes>
  );
};
