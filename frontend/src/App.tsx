// import { UserRoute } from "./routes/UserRoute";

import { useDispatch } from "react-redux";
import { MainRoute } from "./routes/MainRoute";
import type { AppDispatch } from "./store";
import { useEffect } from "react";
import { fetchUser } from "./feature/userThunk";

export const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div>
      <MainRoute />
    </div>
  );
};
