"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// LINK ./offerDetail.schema.yml
const offerDetailSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    product_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        min: 0,
        required: true,
    },
    unit_price: {
        type: Number,
        min: 0,
        default: 0,
    },
});
exports.default = offerDetailSchema;
//# sourceMappingURL=offerDetail.schema.js.map