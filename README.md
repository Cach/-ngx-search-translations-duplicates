# NgxSearchTranslationsDuplicates

The library for searching a duplicate in translations

[![NPM Version](https://img.shields.io/npm/v/ngx-search-translations-duplicates)](https://www.npmjs.com/package/ngx-search-translations-duplicates)
[![NPM Size](https://img.shields.io/bundlephobia/min/ngx-search-translations-duplicates?color=successg)](https://www.npmjs.com/package/ngx-search-translations-duplicates)

## Install

```bash
$ npm install ngx-search-translations-duplicates --save-dev
```

- create config file (JSON format):

```bash
$ touch .duplicatesconfig
```

## Usage

- add command to package.json:

```bash
"scripts": {
    "translations:duplicates": "npx ngx-search-translations-duplicates"
}
```

```bash
npm run translations:duplicates
```

- or

```bash
npx ngx-search-translations-duplicates
```

## Configuration

| Key | Value | Required | Default | Description |
| --- | --- | --- | --- | --- |
| translationFile | string | yes | | path to file with translations |
| showTotalCount | boolean | no | false | show total of searched zombies keys |
| orderByCount | boolean | no | false | sorting a keys from a most number of duplicates to the less |
| outputFile | string | no | ./translations_duplicates.json | path to file where result should be written |

#### Example

```json
{
  "translationFile": "./src/assets/translations/en.json",
  "showTotalCount": true,
  "outputFile": "./zombies_translations.txt"
}

```
