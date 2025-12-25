import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import type { User } from "../types/InterfaceUser";
import {
  fetchUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../feature/userThunk";

interface UserState {
  currentUser: User | null;
  status: "idle" | "loading" | "success" | "error";
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.status = "idle";
      })

      .addMatcher(
        isFulfilled(fetchUser, loginUser, registerUser),
        (state, action) => {
          state.currentUser = action.payload;
          state.status = "success";
        }
      )
      .addMatcher(
        isPending(fetchUser, loginUser, registerUser, logoutUser),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        isRejected(fetchUser, loginUser, registerUser, logoutUser),
        (state, action) => {
          state.status = "error";
          state.error = action.payload as string;
        }
      );
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
