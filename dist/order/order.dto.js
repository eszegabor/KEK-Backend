"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class CreateOrderDto {
    _id;
    // A hitelesített felhasználó lesz a "megrendelő", felesleges megadni
    // @IsNotEmpty()
    // @IsMongoId()
    // user_id: Schema.Types.ObjectId;
    basket_id;
    // @IsDate()
    order_date;
    details;
}
exports.default = CreateOrderDto;
tslib_1.__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", mongoose_1.Schema.Types.ObjectId)
], CreateOrderDto.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateOrderDto.prototype, "basket_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Date)
], CreateOrderDto.prototype, "order_date", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], CreateOrderDto.prototype, "details", void 0);
//# sourceMappingURL=order.dto.js.map