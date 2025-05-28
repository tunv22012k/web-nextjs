import { messages } from '@/lib/messages/vi';

export const getMessage = (messagesKey: any): string => {
    try {
      messagesKey = String(messagesKey);
      const keys = messagesKey.split('.');
      let result: any = messages;
      
      for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
          result = result[key];
        } else {
          return messagesKey;
        }
      }
      
      return typeof result === 'string' ? result : messagesKey;
    } catch {
      return messagesKey;
    }
}; 