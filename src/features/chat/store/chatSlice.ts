// chatSlice - Chat Feature
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ChatState {
  conversations: any[];
  messages: any[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  conversations: [],
  messages: [],
  isLoading: false,
  error: null,
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setConversations: (state, action: PayloadAction<any[]>) => {
      state.conversations = action.payload;
    },
    setMessages: (state, action: PayloadAction<any[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<any>) => {
      state.messages.push(action.payload);
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const chatActions = chatSlice.actions;
export const chatSelectors = {
  selectConversations: (state: { chat: ChatState }) => state.chat.conversations,
  selectMessages: (state: { chat: ChatState }) => state.chat.messages,
  selectIsLoading: (state: { chat: ChatState }) => state.chat.isLoading,
  selectError: (state: { chat: ChatState }) => state.chat.error,
};
export default chatSlice;
