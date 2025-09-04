// chat.types
export interface Chat {
  id: string;
  participantIds: string[];
  lastMessage?: Message;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image' | 'file';
  readBy: string[];
  createdAt: string;
}

export interface SendMessageData {
  chatId: string;
  content: string;
  type: 'text' | 'image' | 'file';
}
