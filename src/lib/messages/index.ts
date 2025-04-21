import { messages as viMessages } from './vi';

export type Messages = typeof viMessages;

export const messages: Record<string, Messages> = {
  vi: viMessages,
  // Add more languages here
};

export const defaultLocale = 'vi';

export function getMessages(locale: string = defaultLocale): Messages {
  return messages[locale] || messages[defaultLocale];
} 