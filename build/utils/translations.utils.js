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
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchDuplicates = exports.makeTranslationKey = void 0;
const filesystem_utils_1 = require("./filesystem.utils");
const object_utils_1 = require("./object.utils");
const makeTranslationKey = (data, parentKey = '') => {
    return Object.keys(data).map((key) => {
        const value = data[key];
        if (typeof value === 'string') {
            if (parentKey === null || parentKey === void 0 ? void 0 : parentKey.length) {
                return `${parentKey}.${key}`;
            }
            return key;
        }
        const prefix = (parentKey === null || parentKey === void 0 ? void 0 : parentKey.length) ? `${parentKey}.${key}` : key;
        return (0, exports.makeTranslationKey)(value, prefix).flat();
    });
};
exports.makeTranslationKey = makeTranslationKey;
const searchDuplicates = (file, limit = 2) => {
    return new Promise((resolve) => __awaiter(void 0, void 0, void 0, function* () {
        const dataJson = (0, filesystem_utils_1.readJsonFile)(file);
        if (!dataJson) {
            throw new Error('File is empty');
        }
        const translations = (0, exports.makeTranslationKey)(dataJson).flat();
        const duplicates = {};
        for (const translationKey of translations) {
            const value = (0, object_utils_1.getValue)(dataJson, translationKey);
            if (typeof value !== 'string' && typeof value !== 'number') {
                continue;
            }
            if (!(duplicates === null || duplicates === void 0 ? void 0 : duplicates[value])) {
                duplicates[value] = [];
            }
            duplicates[value].push(translationKey);
        }
        Object.entries(duplicates)
            .filter(([, value]) => value.length < limit)
            .forEach(([key]) => delete duplicates[key]);
        resolve(duplicates);
    }));
};
exports.searchDuplicates = searchDuplicates;
//# sourceMappingURL=translations.utils.js.map