import fs from 'fs';
import { Duplicates } from '../types';
import chalk from 'chalk';

export const readJsonFile = <T = any>(filename: string): T | null => {
  try {
    return JSON.parse(fs.readFileSync(filename, 'utf8'));
  } catch (e) {
    return null;
  }
}

export const writeOutputFile = (filename: string, data: Duplicates): void => {
  if (!filename) {
    return;
  }

  const content = JSON.stringify(data, null, 2);

  try {
    fs.writeFileSync(filename, content);

    console.log(chalk.green(`Result was written to ${ chalk.bold.underline(filename) }`));
  } catch (err) {
    console.error(err)
  }
};
