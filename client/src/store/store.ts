import { configureStore } from '@reduxjs/toolkit'
import  currentUserSlice  from './slices/userSlice'
import allRoomsSlice from './slices/allRoomsSlice'
import allUsersSlice from './slices/allUsersSlice'
import currentRoomSlice from './slices/currentRoomSlice'
import websocketMiddleware from '@/middlewares/websocketMiddleware'
import { io, Socket } from 'socket.io-client';

const socket: Socket = io('ws://localhost:5000/chat', {
  extraHeaders: {
    Authorization: typeof window !== "undefined" ? localStorage.getItem("token") || '' : '',
  },
});

const socketMiddleware = websocketMiddleware(socket);

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice ,
    allRooms: allRoomsSlice,
    allUsers: allUsersSlice,
    currentRoom: currentRoomSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat(socketMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch