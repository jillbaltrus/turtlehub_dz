import {createAsyncThunk} from "@reduxjs/toolkit";
import * as userService from "./user-service";

export const loginThunk = createAsyncThunk(
    "auth/login", async (credentials) => {
      return await userService.login(credentials);
    }
);

export const profileThunk = createAsyncThunk(
    "auth/profile", async () => {
      return await userService.profile();
    });

export const logoutThunk = createAsyncThunk(
    "auth/logout", async () => {
      return await userService.logout();
    });

export const updateUserThunk = createAsyncThunk(
    "user/updateUser", async (user) => {
      await userService.updateUser(user);
      return user;
    }
);

export const registerThunk = createAsyncThunk(
    "user/registerUser", async (user) => {
      await userService.register(user);
      return user;
    }
);

export const findUsersThunk = createAsyncThunk(
    "user/findUsers", async () => {
      return await userService.findUsers();
    }
);

export const findUserByIdThunk = createAsyncThunk(
    "user/findUserById", async (uid) => {
      return await userService.findUserById(uid);
    }
);