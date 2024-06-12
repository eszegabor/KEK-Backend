"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Http_exception_1 = tslib_1.__importDefault(require("./Http.exception"));
class UserIdCannotChangeException extends Http_exception_1.default {
    constructor() {
        super(404, "The user_id cannot change!");
    }
}
exports.default = UserIdCannotChangeException;
//# sourceMappingURL=UserIdCannotChangeException.js.map