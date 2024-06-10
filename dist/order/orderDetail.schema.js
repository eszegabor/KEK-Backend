"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// LINK ./orderDetail.schema.yml
const orderDetailSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    offer_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Offer",
        required: true,
    },
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
    stars: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
});
exports.default = orderDetailSchema;
//# sourceMappingURL=orderDetail.schema.js.map