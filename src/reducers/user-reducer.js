import {createSlice} from "@reduxjs/toolkit";
import {
  findUserByIdThunk,
  findUsersThunk,
  loginThunk,
  logoutThunk,
  profileThunk,
  registerThunk,
  updateUserThunk,
} from "../services/user-thunks";

export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';
export const FIND_USER_ERROR = 'FIND_USER_ERROR';

const userSlice = createSlice({
  name: "user",
  initialState: {currentUser: null, error: null},
  reducers: {},
  extraReducers: {
    [loginThunk.fulfilled]: (state, {payload}) => {
      state.currentUser = payload;
      state.error = null;
    },
    [loginThunk.rejected]: (state, {payload}) => {
      state.error = LOGIN_FAILURE;
    },
    [logoutThunk.fulfilled]: (state) => {
      state.currentUser = null;
      state.error = null;
    },
    [profileThunk.fulfilled]: (state, {payload}) => {
      state.currentUser = payload;
      state.error = null;
    },
    [updateUserThunk.fulfilled]: (state, {payload}) => {
      state.currentUser = payload;
      state.error = null;
    },
    [registerThunk.fulfilled]: (state, {payload}) => {
      state.currentUser = payload;
      state.error = null;
    },
    [registerThunk.rejected]: (state) => {
      state.error = REGISTRATION_FAILURE;
    },
    [findUserByIdThunk.rejected]: (state) => {
      state.error = FIND_USER_ERROR;
    },
    [findUserByIdThunk.fulfilled]: (state) => {
      state.error = null;
    },
    [findUsersThunk.fulfilled]: (state) => {
      state.error = null;
    },
  },
});
export default userSlice.reducer;