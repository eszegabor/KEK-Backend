"use strict";
// https://mongoosejs.com/docs/validation.html
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const orderDetail_schema_1 = tslib_1.__importDefault(require("./orderDetail.schema"));
// LINK ./order.model.yml
const orderSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    details: {
        type: [orderDetail_schema_1.default],
        required: true,
    },
    order_date: {
        type: Date,
        default: Date.now,
    },
    basket_id: String,
}, { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } });
const orderModel = (0, mongoose_1.model)("Order", orderSchema, "orders");
exports.default = orderModel;
//# sourceMappingURL=order.model.js.map