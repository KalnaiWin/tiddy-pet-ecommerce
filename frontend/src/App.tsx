import { useDispatch, useSelector } from "react-redux";
import { MainRoute } from "./routes/MainRoute";
import type { AppDispatch, RootState } from "./store";
import { useEffect } from "react";
import { fetchUser } from "./feature/userThunk";
import { AdminRoute } from "./routes/AdminRoute";
import { Route, Routes } from "react-router-dom";
import { getAllItemsFromCart } from "./feature/cartThunk";
import { ShipperRoute } from "./routes/ShipperRoute";

export const App = () => {
  const { currentUser, status } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUser());
    }
  }, [dispatch, currentUser]);

  useEffect(() => {
    if (currentUser && currentUser.role === "CUSTOMER") {
      dispatch(getAllItemsFromCart());
    }
  }, [currentUser, dispatch]);

  return (
    <Routes>
      <Route path="/*" element={<MainRoute />} />
      <Route path="/admin/*" element={<AdminRoute />} />
      <Route path="/shipper/*" element={<ShipperRoute />} />
    </Routes>
  );
};
