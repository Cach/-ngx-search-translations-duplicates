import { Content, Duplicates, Translation } from '../types';
import { readJsonFile } from './filesystem.utils';
import { getValue } from './object.utils';

export const makeTranslationKey = (data: Translation, parentKey = ''): Content => {
  return Object.keys(data).map((key) => {
    const value = data[key];

    if (typeof value === 'string') {
      if (parentKey?.length) {
        return `${ parentKey }.${ key }`;
      }

      return key;
    }

    const prefix = parentKey?.length ? `${ parentKey }.${ key }` : key;

    return makeTranslationKey(value, prefix).flat();
  });
}

export const searchDuplicates = (file: string): Promise<Duplicates> => {
  return new Promise(async (resolve) => {
    const dataJson = readJsonFile<Translation>(file);

    if (!dataJson) {
      throw new Error('File is empty');
    }

    const translations = makeTranslationKey(dataJson).flat();

    const duplicates: Duplicates = {};

    for (const translationKey of translations) {
      const value = getValue<Translation>(dataJson, translationKey);

      if (typeof value !== 'string' && typeof value !== 'number') {
        continue;
      }

      if (!duplicates?.[value]) {
        duplicates[value] = [];
      }

      duplicates[value].push(translationKey);
    }

    Object.entries(duplicates)
      .filter(([, value]) => value.length <= 1)
      .forEach(([key]) => delete duplicates[key]);

    resolve(duplicates);
  });
};
