import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { findMoreMessageInRoom, getCurrentRoom } from "@/api";
import {
  IChatMessage,
  IFindMoreMessageInRoom,
  IRoom,
} from "@/interfaces/rooms.interface";
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

export const fetchfindMoreMessageInRoom = createAsyncThunk(
  "findMoreMessageInRoom",
  async (body: IFindMoreMessageInRoom) => {
    try {
      return await findMoreMessageInRoom(body);
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
      state.loading = false;
      state.error = null;
      state.room = null;
    },
    addMessage(state, action: PayloadAction<IChatMessage>) {
      if (state.room && state.room.messages) {
        return {
          ...state,
          room: {
            ...state.room,
            messages: [action.payload, ...state.room.messages],
          },
        };
      }
      return state;
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

    sliceHelper(builder, fetchfindMoreMessageInRoom).addCase(
      fetchfindMoreMessageInRoom.fulfilled,
      (state: any, action: PayloadAction<IChatMessage[]>) => {
        state.room.messages.push(...action.payload)
      }
    );
  },
});

export const { leave, addMessage } = currentRoomSlice.actions;

export const selectCurrentRoom = (state: RootState) => state.currentRoom.room;

export default currentRoomSlice.reducer;
