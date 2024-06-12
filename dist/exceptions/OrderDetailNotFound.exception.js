"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Http_exception_1 = tslib_1.__importDefault(require("./Http.exception"));
class OrderDetailNotFoundException extends Http_exception_1.default {
    constructor(id) {
        super(404, `Order detail with id ${id} not found`);
    }
}
exports.default = OrderDetailNotFoundException;
//# sourceMappingURL=OrderDetailNotFound.exception.js.map