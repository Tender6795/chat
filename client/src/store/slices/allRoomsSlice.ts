import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { sliceHelper } from "./sliceHelper";
import { getAllRoom } from "@/api";

interface Room {
  id: string;
  name: string;
  description?: string;
  creatorId: string;
}
interface RoomsState {
  rooms: Room[] | [];
  loading: boolean;
  error: string | null;
}
const initialState: RoomsState = {
  rooms: [],
  loading: false,
  error: null,
};

export const fetchAllRooms = createAsyncThunk("fetchAllRooms", async () => {
  try {
    const rooms = await getAllRoom();
    return rooms;
  } catch (error) {
    throw error;
  }
});

const allRoomsSlice = createSlice({
  name: "allRoomsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    sliceHelper(builder, fetchAllRooms).addCase(
      fetchAllRooms.fulfilled,
      (state: any, action: any) => {
        state.loading = false;
        state.rooms = action.payload as Room[];
      }
    );
  },
});


export const selectCurrentUser = (state: RootState) => state.currentUser.user;

export default allRoomsSlice.reducer;