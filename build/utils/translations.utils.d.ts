import { Content, Duplicates, Translation } from '../types';
export declare const makeTranslationKey: (data: Translation, parentKey?: string) => Content;
export declare const searchDuplicates: (file: string, limit?: number) => Promise<Duplicates>;
