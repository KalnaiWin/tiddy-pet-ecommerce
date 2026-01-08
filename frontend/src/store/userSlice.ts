import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import type { UserState } from "../types/InterfaceUser";
import {
  deleteAccount,
  fetchUser,
  getAccountDetail,
  getAllShippers,
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
  updateProfileAccount,
} from "../feature/userThunk";

const initialState: UserState = {
  currentUser: null,
  users: [],
  status: "idle",
  error: null,
  usersStatus: "idle",

  detailAccount: null,
  statusDetail: "idle",

  deletingStatus: "idle",
  updatingStatus: "idle",
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
      .addCase(updateProfileAccount.pending, (state) => {
        state.updatingStatus = "loading";
      })
      .addCase(updateProfileAccount.fulfilled, (state) => {
        state.updatingStatus = "succeeded";
      })
      .addCase(updateProfileAccount.rejected, (state) => {
        state.updatingStatus = "failed";
      })

    builder
      .addCase(deleteAccount.pending, (state) => {
        state.deletingStatus = "loading";
        state.error = null;
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.deletingStatus = "succeeded";
        state.users = state.users.filter((user) => user._id !== action.payload);
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.deletingStatus = "failed";
        state.error = action.payload ?? "Delete account failed";
      });

    //
    builder
      .addCase(getAccountDetail.pending, (state) => {
        state.statusDetail = "loading";
      })
      .addCase(getAccountDetail.fulfilled, (state, action) => {
        state.statusDetail = "succeeded";
        state.detailAccount = action.payload;
      })
      .addCase(getAccountDetail.rejected, (state) => {
        state.statusDetail = "failed";
      });

    builder

      //  Log out
      .addCase(logoutUser.fulfilled, (state) => {
        state.currentUser = null;
        state.status = "idle";
      })

      // Load Account
      .addMatcher(isPending(getAllShippers, getAllUsers), (state) => {
        state.usersStatus = "loading";
        state.error = null;
      })
      .addMatcher(isFulfilled(getAllShippers, getAllUsers), (state, action) => {
        state.users = action.payload;
        state.usersStatus = "succeeded";
        state.error = null;
      })
      .addMatcher(isRejected(getAllShippers, getAllUsers), (state, action) => {
        state.usersStatus = "failed";
        state.error = action.payload as string;
      })

      // Authenticate
      .addMatcher(
        isFulfilled(fetchUser, loginUser, registerUser),
        (state, action) => {
          state.currentUser = action.payload;
          state.status = "succeeded";
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
          state.status = "failed";
          state.error = action.payload as string;
        }
      );
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
