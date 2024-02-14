import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { currentUser, login, register } from "@/api";
import { Auth } from "@/interfaces/auth.interface";

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
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as User;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      });

    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as User;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      });

    builder
      .addCase(fetchRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload as User;
      })
      .addCase(fetchRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "";
      });
  },
});

export const { logout } = currentUserSlice.actions;

export const selectCurrentUser = (state: RootState) => state.currentUser.user;

export default currentUserSlice.reducer;
