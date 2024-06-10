"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const offerDetail_schema_1 = tslib_1.__importDefault(require("./offerDetail.schema"));
// LINK ./offer.model.yml
const offerSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    details: {
        type: [offerDetail_schema_1.default],
        required: true,
    },
    offer_date: {
        type: Date,
        default: Date.now,
    },
}, { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } });
const offerModel = (0, mongoose_1.model)("Offer", offerSchema, "offers");
exports.default = offerModel;
//# sourceMappingURL=offer.model.js.map