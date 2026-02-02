import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const ShipperProtect = () => {
  const { currentUser, status } = useSelector((state: RootState) => state.user);

  if (status === "loading") return <div>Loading...</div>;

  if (currentUser?.role !== "SHIPPER") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ShipperProtect;
