import { useDispatch } from "react-redux";
import { MainRoute } from "./routes/MainRoute";
import type { AppDispatch } from "./store";
import { useEffect } from "react";
import { fetchUser } from "./feature/userThunk";
import { AdminRoute } from "./routes/AdminRoute";
import { Route, Routes } from "react-router-dom";

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/*" element={<MainRoute />} />
      <Route path="/admin/*" element={<AdminRoute />} />
    </Routes>
  );
};
