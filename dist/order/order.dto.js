"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetails = void 0;
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class OrderDetails {
    _id;
    offer_id;
    product_id;
    quantity;
    stars;
}
exports.OrderDetails = OrderDetails;
tslib_1.__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", mongoose_1.Schema.Types.ObjectId)
], OrderDetails.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", mongoose_1.Schema.Types.ObjectId)
], OrderDetails.prototype, "offer_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", mongoose_1.Schema.Types.ObjectId)
], OrderDetails.prototype, "product_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], OrderDetails.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(5),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], OrderDetails.prototype, "stars", void 0);
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
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayNotEmpty)(),
    (0, class_transformer_1.Type)(() => OrderDetails),
    tslib_1.__metadata("design:type", Array)
], CreateOrderDto.prototype, "details", void 0);
//# sourceMappingURL=order.dto.js.map