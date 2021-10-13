#!/usr/bin/env node

import chalk from 'chalk';
import { CONFIG_FILE, DEFAULT_OUTPUT_FILE } from './constants';
import { Config } from './types';
import { readJsonFile, writeOutputFile } from './utils/filesystem.utils';
import { searchDuplicates } from './utils/translations.utils';

let config: Config = {
  translationFile: './translation.json',
  showTotalCount: false
};

const loadConfig = (): Promise<Config> => {
  return new Promise((resolve, reject) => {
    const config = readJsonFile<Config>(CONFIG_FILE);

    if (config) {
      resolve(config);
    }

    reject(`File ${ CONFIG_FILE } is empty or not exist`);
  });
};

const run = async(): Promise<void> => {
  try {
    config = await loadConfig();
  } catch (e: any) {
    throw new Error(e);
  }

  let duplicates = await searchDuplicates(config.translationFile);

  if (config?.orderByCount) {
    duplicates = Object.fromEntries(
      Object.entries(duplicates).sort(([, a], [, b]) => b.length - a.length)
    );
  }

  const outputFile = config.outputFile ?? DEFAULT_OUTPUT_FILE;

  writeOutputFile(outputFile, duplicates);

  if (config.showTotalCount) {
    console.log(chalk.yellow(`Total: ${ chalk.bold(Object.keys(duplicates).length) }`));
  }
};

run().catch((e) => console.log(chalk.red(e)));
