"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
class CreateOfferDto {
    _id;
    user_id;
    offer_date;
    details;
}
exports.default = CreateOfferDto;
tslib_1.__decorate([
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", mongoose_1.Schema.Types.ObjectId)
], CreateOfferDto.prototype, "_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    tslib_1.__metadata("design:type", mongoose_1.Schema.Types.ObjectId)
], CreateOfferDto.prototype, "user_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Date)
], CreateOfferDto.prototype, "offer_date", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayNotEmpty)(),
    tslib_1.__metadata("design:type", Array)
], CreateOfferDto.prototype, "details", void 0);
//# sourceMappingURL=offer.dto.js.map