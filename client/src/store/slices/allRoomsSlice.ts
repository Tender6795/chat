import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { sliceHelper } from "./sliceHelper";
import { addUserToRoomApi, createRoomApi, getAllRoom } from "@/api";
import { RoomCreate } from "@/interfaces/room-create.inteface";
import { IMember, IRoom } from "@/interfaces/rooms.interface";
import { AddUserToRoom } from "@/interfaces/add-user-to-room.interface";

interface RoomsState {
  rooms: IRoom[] | [];
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
    return await getAllRoom();
  } catch (error) {
    throw error;
  }
});

export const createRoom = createAsyncThunk(
  "createRoom",
  async (body: RoomCreate) => {
    try {
      return await createRoomApi(body);
    } catch (error) {
      throw error;
    }
  }
);

export const addUserToRoom = createAsyncThunk(
  "addUserToRoom",
  async (body: AddUserToRoom) => {
    try {
      return await addUserToRoomApi(body) as IMember;
    } catch (error) {}
  }
);

const allRoomsSlice = createSlice({
  name: "allRoomsSlice",
  initialState,
  reducers: {
    addRoom(state, action){
      state.rooms =  [...state.rooms, action.payload]
    }
  },
  extraReducers: (builder) => {
    sliceHelper(builder, fetchAllRooms).addCase(
      fetchAllRooms.fulfilled,
      (state: any, action: any) => {
        state.loading = false;
        state.rooms = action.payload as IRoom[];
      }
    );

    sliceHelper(builder, createRoom).addCase(
      createRoom.fulfilled,
      (state: any, action: any) => {
        state.loading = false;
        state.rooms = [...state.rooms, action.payload];
      }
    );

    sliceHelper(builder, addUserToRoom).addCase(
      addUserToRoom.fulfilled,
      (state: any, action: any) => {
        state.loading = false;
        state.rooms = [...state.rooms.map((room: IRoom) => {
          if (room.id === action.payload.userId) {
            room.members = [...room.members, action.payload];
          }
          return room;
        })]
      }
    );


  },
});

export const { addRoom } = allRoomsSlice.actions;


export const selectAllRooms = (state: RootState) => state.allRooms;

export default allRoomsSlice.reducer;
