import { configureStore } from '@reduxjs/toolkit'
import  currentUserSlice  from './slices/userSlice'
import allRoomsSlice from './slices/allRoomsSlice'
import allUsersSlice from './slices/allUsersSlice'
import currentRoomSlice from './slices/currentRoomSlice'
// ...

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice ,
    allRooms: allRoomsSlice,
    allUsers: allUsersSlice,
    currentRoom: currentRoomSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch