import { messages } from '@/lib/messages/vi';

export const getMessage = (messagesKey: unknown): string => {
    try {
      const keyString = String(messagesKey);
      const keys = keyString.split('.');
      let result: unknown = messages;
      
      for (const key of keys) {
        if (result && typeof result === 'object' && key in result) {
          // @ts-expect-error: Index signature
          result = result[key];
        } else {
          return keyString;
        }
      }
      
      return typeof result === 'string' ? result : keyString;
    } catch {
      return String(messagesKey);
    }
}; 