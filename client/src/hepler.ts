import { IUser } from "./interfaces/auth.interface";
import { IChatMessage } from "./interfaces/rooms.interface";

export const normilezedMessages = (
    users: Partial<IUser>[],
    messages: IChatMessage[]
  ) => {
    const userAvatars: Record<string, string | undefined> = {};
    const userNames: Record<string, { firstName?: string; lastName?: string }> = {};
  
    users.forEach((user) => {
      if (user.id !== undefined) {
        userAvatars[user.id] = user.avatar;
        userNames[user.id] = {
          firstName: user.firstName,
          lastName: user.lastName,
        };
      }
    });
  
    const messagesWithDetails = messages.map((message) => {
      const avatar = message.fromId !== undefined ? userAvatars[message.fromId] : undefined;
      const userName = message.fromId !== undefined ? userNames[message.fromId] : undefined;
      return {
        ...message,
        avatar,
        firstName: userName?.firstName || '',
        lastName: userName?.lastName || '',
      };
    });
  
    return messagesWithDetails;
  };