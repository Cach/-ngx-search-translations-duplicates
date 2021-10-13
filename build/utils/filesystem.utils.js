"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeOutputFile = exports.readJsonFile = void 0;
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const readJsonFile = (filename) => {
    try {
        return JSON.parse(fs_1.default.readFileSync(filename, 'utf8'));
    }
    catch (e) {
        return null;
    }
};
exports.readJsonFile = readJsonFile;
const writeOutputFile = (filename, data) => {
    if (!filename) {
        return;
    }
    const content = JSON.stringify(data, null, 2);
    try {
        fs_1.default.writeFileSync(filename, content);
        console.log(chalk_1.default.green(`Result was written to ${chalk_1.default.bold.underline(filename)}`));
    }
    catch (err) {
        console.error(err);
    }
};
exports.writeOutputFile = writeOutputFile;
//# sourceMappingURL=filesystem.utils.js.map