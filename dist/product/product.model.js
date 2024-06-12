"use strict";
// https://mongoosejs.com/docs/validation.html
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// LINK ./product.model.yml
const productSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    category_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    product_name: {
        type: String,
    },
    unit: String,
    picture: String,
}, { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } });
const productModel = (0, mongoose_1.model)("Product", productSchema, "products");
exports.default = productModel;
//# sourceMappingURL=product.model.js.map