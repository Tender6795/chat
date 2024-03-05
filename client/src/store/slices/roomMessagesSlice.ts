import { IMessage } from "@/interfaces/message.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface roomMessageState {
  messages: IMessage[] | [];
  loading: boolean;
  error: string | null;
}
const initialState: roomMessageState = {
  messages: [],
  loading: false,
  error: null,
};

const roomMessagesSlice = createSlice({
  name: "roomMessages",
  initialState,
  reducers: {
    // addMessage(state, action: PayloadAction<IMessage>) {
    //   state.messages = [...state.messages, action.payload];
    // },
    setMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export const {  setMessages } = roomMessagesSlice.actions;
export default roomMessagesSlice.reducer;
