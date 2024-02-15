import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { sliceHelper } from "./sliceHelper";
import { getAllUSers } from "@/api";
import { RoomCreate } from "@/interfaces/room-create.inteface";
import { IRoom } from "@/interfaces/rooms.interface";
import { IUser } from "@/interfaces/auth.interface";

interface UsersState {
  users: IUser[] | [];
  loading: boolean;
  error: string | null;
}
const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchAllUsers = createAsyncThunk("fetchAllUsers", async () => {
  try {
    const users = await getAllUSers() as IUser[];
    return users;
  } catch (error) {
    throw error;
  }
});

const allUsersSlice = createSlice({
  name: "allUsersSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    sliceHelper(builder, fetchAllUsers).addCase(
      fetchAllUsers.fulfilled,
      (state: any, action: any) => {
        state.loading = false;
        state.users = action.payload as IUser[];
      }
    );
  },
});

export const selectAllUsers = (state: RootState) => state.allUsers;

export default allUsersSlice.reducer;
