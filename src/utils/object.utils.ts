export const getValue = <T extends { [key: string]: any }, U extends keyof T = any>(obj: T, path: string): T[U] => {
  return path
    .split('.')
    .reduce((previous, current) => previous?.[current] ?? '', obj) as T[U];
};
