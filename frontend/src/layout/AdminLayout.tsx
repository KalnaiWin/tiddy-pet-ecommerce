import { Outlet } from "react-router-dom";
import NavBarRole from "../components/NavBarRole";

const AdminLayout = () => {
  return (
    <div className="flex md:flex-row flex-col">
      <div className="md:w-1/4 md:h-screen min-h-screen w-full md:fixed md:left-0 top-0">
        <NavBarRole />
      </div>
      <div className="md:w-3/4 w-full overflow-y-auto absolute md:right-0 top-[10%] md:top-0">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
