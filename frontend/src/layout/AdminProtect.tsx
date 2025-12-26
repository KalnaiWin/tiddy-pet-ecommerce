import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const AdminProtect = () => {
  const { currentUser, status } = useSelector((state: RootState) => state.user);

  if (status === "loading") return null;

  if (currentUser?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default AdminProtect;
