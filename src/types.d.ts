export interface Config {
  translationFile: string;
  outputFile?: string | null;
  showTotalCount?: boolean;
  orderByCount?: boolean;
}

export interface Translation {
  [key: string]: Translation | string;
}

export type Content = (string|string[])[];

export interface Duplicates {
  [key: string]: string[];
}
