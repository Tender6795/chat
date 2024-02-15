import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { sliceHelper } from "./sliceHelper";
import { createRoomApi, getAllRoom } from "@/api";
import { RoomCreate } from "@/interfaces/room-create.inteface";

export interface Room {
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

export const createRoom = createAsyncThunk(
  "createRoom",
  async (body: RoomCreate) => {
    try {
      const room = await createRoomApi(body);
      return room;
    } catch (error) {
      throw error;
    }
  }
);

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

    sliceHelper(builder, createRoom).addCase(
      createRoom.fulfilled,
      (state: any, action: any) => {
        state.loading = false;
        state.rooms = [...state.rooms, action.payload];
      }
    );
  },
});

export const selectAllRooms = (state: RootState) => state.allRooms;

export default allRoomsSlice.reducer;
