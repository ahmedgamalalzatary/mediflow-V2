// chatService
export class ChatService {
  async getChats() {}
  async sendMessage(data: any) {}
  async markAsRead(chatId: string) {}
}
export const chatService = new ChatService();
export default chatService;
