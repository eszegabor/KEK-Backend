"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Http_exception_1 = tslib_1.__importDefault(require("./Http.exception"));
class ReferenceErrorException extends Http_exception_1.default {
    constructor(from) {
        super(409, `Can't DELETE from ${from} collection, because has reference in other collection(s).`);
    }
}
exports.default = ReferenceErrorException;
//# sourceMappingURL=ReferenceError.exception.js.map