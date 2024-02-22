import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCurrentRoom } from "@/api";
import { IRoom } from "@/interfaces/rooms.interface";
import { sliceHelper } from "./sliceHelper";

interface CurrentRoomState {
  room: IRoom | null;
  loading: boolean;
  error: string | null;
}

const initialState: CurrentRoomState = {
  room: null,
  loading: false,
  error: null,
};

export const fetchCurrentRoom = createAsyncThunk(
  "fetchCurrentRoom",
  async (id: string) => {
    try {
      return await getCurrentRoom(id);
    } catch (error) {
      throw error;
    }
  }
);

const currentRoomSlice = createSlice({
  name: "currentRoom",
  initialState,
  reducers: {
    leave(state) {
      state.loading = true;
      state.error = null;
      state.room = null;
    },
  },
  extraReducers: (builder) => {
    sliceHelper(builder, fetchCurrentRoom).addCase(
      fetchCurrentRoom.fulfilled,
      (state: any, action: any) => {
        state.loading = false;
        state.room = action.payload as IRoom;
      }
    );
  },
});


export const { leave } = currentRoomSlice.actions;

export const selectCurrentRoom = (state: RootState) => state.currentRoom.room

export default currentRoomSlice.reducer;