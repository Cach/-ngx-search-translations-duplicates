export declare const getValue: <T extends {
    [key: string]: any;
}, U extends keyof T = any>(obj: T, path: string) => T[U];
