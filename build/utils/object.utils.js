"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = void 0;
const getValue = (obj, path) => {
    return path
        .split('.')
        .reduce((previous, current) => { var _a; return (_a = previous === null || previous === void 0 ? void 0 : previous[current]) !== null && _a !== void 0 ? _a : ''; }, obj);
};
exports.getValue = getValue;
//# sourceMappingURL=object.utils.js.map