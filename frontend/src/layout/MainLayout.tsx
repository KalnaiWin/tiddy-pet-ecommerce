import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <main>
        <Outlet />
      </main>
    </div>
  );
};
