#!/usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const filesystem_utils_1 = require("./utils/filesystem.utils");
const translations_utils_1 = require("./utils/translations.utils");
const chalk_1 = __importDefault(require("chalk"));
const CONFIG_FILE = '.duplicatesconfig';
const DEFAULT_OUTPUT_FILE = './translations_duplicates.json';
let config = {
    translationFile: './translation.json',
    showTotalCount: false
};
const loadConfig = () => {
    return new Promise((resolve, reject) => {
        const config = (0, filesystem_utils_1.readJsonFile)(CONFIG_FILE);
        if (config) {
            resolve(config);
        }
        reject(`File ${CONFIG_FILE} is empty or not exist`);
    });
};
const run = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        config = yield loadConfig();
    }
    catch (e) {
        throw new Error(e);
    }
    const duplicates = yield (0, translations_utils_1.searchDuplicates)(config.translationFile);
    const outputFile = (_a = config.outputFile) !== null && _a !== void 0 ? _a : DEFAULT_OUTPUT_FILE;
    (0, filesystem_utils_1.writeOutputFile)(outputFile, duplicates);
    if (config.showTotalCount) {
        console.log(chalk_1.default.yellow(`Total: ${chalk_1.default.bold(Object.keys(duplicates).length)}`));
    }
});
run().catch((e) => console.log(chalk_1.default.red(e)));
//# sourceMappingURL=index.js.map