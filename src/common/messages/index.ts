import { messages } from './en';
export const translate = (key: string, replace?: string | string[]): string => {
  if (!messages[key]) {
    return key;
  }
  if (typeof replace === 'object') {
    return messages[key].replace(/\$\d+/gi, (item: string) => {
      return replace[item.replace('$', '')];
    });
  }
  return messages[key].replace(/[$0]/gi, replace);
};
