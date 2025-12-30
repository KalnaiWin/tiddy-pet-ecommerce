import { Outlet } from "react-router-dom";
import AdminNavBar from "../components/AdminNavBar";

const AdminLayout = () => {
  return (
    <div className="flex md:flex-row flex-col">
      <div className="md:w-1/4 md:min-h-screen w-full">
        <AdminNavBar />
      </div>
      <div className="md:w-3/4 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
