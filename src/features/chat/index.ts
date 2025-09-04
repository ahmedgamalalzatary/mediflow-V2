// Chat feature exports
// This file serves as the main entry point for the chat feature

// Components (selective exports for better tree-shaking)
export { ChatWindow } from './components/ChatWindow';
export { MessageBubble } from './components/MessageBubble';
export { ChatList } from './components/ChatList';

// Hooks
export { useChat } from './hooks/useChat';

// Services
export { chatService } from './services/chatService';

// Store
export { chatSlice } from './store/chatSlice';

// Types
export type * from './types/chat.types';
