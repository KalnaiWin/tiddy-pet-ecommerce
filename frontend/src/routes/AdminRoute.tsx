import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../page/admin/AdminDashboard";
import AdminLayout from "../layout/AdminLayout";
import AnalyticTable from "../page/admin/AnalyticTable";
import AccountManagement from "../page/admin/AccountManagement";
import ProductStore from "../page/admin/ProductStore";
import OrderInformation from "../page/admin/OrderInformation";
import AdminProtect from "../layout/AdminProtect";

export const AdminRoute = () => {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route element={<AdminProtect />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path={"/admin/analytic"} element={<AnalyticTable />} />
          <Route path="/admin/account" element={<AccountManagement />} />
          <Route path="/admin/store" element={<ProductStore />} />
          <Route path="/admin/order" element={<OrderInformation />} />
        </Route>
      </Route>
    </Routes>
  );
};
