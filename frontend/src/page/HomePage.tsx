import { useSelector } from "react-redux";
import type { RootState } from "../store";

export const HomePage = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  if (!currentUser) return <p>Not logged in</p>;

  return (
    <div className="bg-slate-800 text-white p-10">
      <div>
        <h2>Hello, {currentUser.name}</h2>
        <p>Email: {currentUser.email}</p>
        <p>Role: {currentUser.role}</p>
      </div>
    </div>
  );
};
