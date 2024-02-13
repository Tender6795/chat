import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { currentUser } from "@/api";

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
  'currentUser/fetch',
  async () => {
    try {
      const user = await currentUser();
      return user;
    } catch (error) {
      throw error;
    }
  }
);

const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
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
        state.error = action.error.message || '';
      });
  },
});

export const { } = currentUserSlice.actions;

export const selectCurrentUser = (state: RootState) => state.currentUser.user;

export default currentUserSlice.reducer;