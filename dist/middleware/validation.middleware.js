"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const Http_exception_1 = tslib_1.__importDefault(require("../exceptions/Http.exception"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
function validationMiddleware(type, skipMissingProp = false) {
    return (req, res, next) => {
        // forbidUnknownValues: false
        // const validatorObject = Object.assign(new type(), req.body);
        (0, class_validator_1.validate)((0, class_transformer_1.plainToInstance)(type, req.body), { skipMissingProperties: skipMissingProp }).then((errors) => {
            if (errors.length > 0) {
                // Break down, if validate nested object in latest version of class-validator
                // const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(", ");
                const message = [];
                for (let i = 0; i < errors.length; i++) {
                    if (errors[i].constraints) {
                        message.push(Object.values(errors[i].constraints).join(", "));
                    }
                    if (errors[i].children.length > 0) {
                        for (let j = 0; j < errors[i].children.length; j++) {
                            if (errors[i].children[j].constraints) {
                                message.push(Object.values(errors[i].children[j].constraints).join(", "));
                            }
                        }
                    }
                }
                next(new Http_exception_1.default(400, "DTO error: " + message.join("; ")));
            }
            else {
                next();
            }
        });
    };
}
exports.default = validationMiddleware;
// Links:
// class-transformer: https://www.jsdocs.io/package/class-transformer#plainToInstance
// class-validator: https://github.com/typestack/class-validator
//# sourceMappingURL=validation.middleware.js.map