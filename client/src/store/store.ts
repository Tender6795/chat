import { configureStore } from '@reduxjs/toolkit'
import  currentUserSlice  from './slices/userSlice'
// ...

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice ,
    // comments: commentsReducer,
    // users: usersReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch