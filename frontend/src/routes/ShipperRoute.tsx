import { Route, Routes } from "react-router-dom";
import ShipperProtect from "../layout/ShipperProtect";
import ProfileShipper from "../page/shipper/ProfileShipper";
import { MainLayout } from "../layout/MainLayout";
import HistoryOrder from "../page/shipper/HistoryOrder";
import OrderAssigned from "../page/shipper/OrderAssigned";
import AvailableOrder from "../page/shipper/AvailableOrder";
import DeliveryOrder from "../page/shipper/DeliveryOrder";

export const ShipperRoute = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<ShipperProtect />}>
          <Route path="profile" element={<ProfileShipper />} />
          <Route path="order" element={<OrderAssigned />} />
          <Route path="history" element={<HistoryOrder />} />
          <Route path="available" element={<AvailableOrder />} />
          <Route path="delivery" element={<DeliveryOrder />} />
        </Route>
      </Route>
    </Routes>
  );
};
