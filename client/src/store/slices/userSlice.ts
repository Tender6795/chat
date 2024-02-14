import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { currentUser, login, register } from "@/api";
import { Auth } from "@/interfaces/auth.interface";
import { sliceHelper } from "./sliceHelper";

interface User {
  id: string;
  email: string;
  roles: string;
}

interface CurrentUserState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const initialState: CurrentUserState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchCurrentUser = createAsyncThunk(
  "currentUser/fetch",
  async () => {
    try {
      const user = await currentUser();
      return user;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchLogin = createAsyncThunk(
  "currentUser/login",
  async (body: Auth) => {
    try {
      await login(body);
      const user = await currentUser();
      return user;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchRegistration = createAsyncThunk(
  "currentUser/register",
  async (body: Auth) => {
    try {
      await register(body);
      const user = await currentUser();
      return user;
    } catch (error) {
      throw error;
    }
  }
);

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    logout(state) {
      state.loading = true;
      state.error = null;
      state.user = null;
      localStorage.setItem("token", "");
    },
  },
  extraReducers: (builder) => {
    sliceHelper(builder, fetchCurrentUser).addCase(
      fetchCurrentUser.fulfilled,
      (state: any, action: any) => {
        state.loading = false;
        state.user = action.payload as User;
      }
    );
    sliceHelper(builder, fetchLogin).addCase(
      fetchLogin.fulfilled,
      (state: any, action: any) => {
        state.loading = false;
        state.user = action.payload as User;
      }
    );
    sliceHelper(builder, fetchRegistration).addCase(
      fetchRegistration.fulfilled,
      (state: any, action: any) => {
        state.loading = false;
        state.user = action.payload as User;
      }
    );
  },
});

export const { logout } = currentUserSlice.actions;

export const selectCurrentUser = (state: RootState) => state.currentUser.user;

export default currentUserSlice.reducer;
