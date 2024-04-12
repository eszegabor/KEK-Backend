// https://mongoosejs.com/docs/validation.html

import { model, Schema } from "mongoose";

import IOrder from "./order.interface";
import IOrderProduct from "./orderProduct.interface";

const orderProductSchema = new Schema<IOrderProduct>({
    offer_id: {
        type: Schema.Types.ObjectId,
        ref: "Offer",
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    quantity: {
        type: Number,
        min: 0,
    },
    stars: {
        type: Number,
        min: 0,
        max: 5,
    },
});

// LINK ./recipe.model.yml
const orderSchema = new Schema<IOrder>(
    {
        // _id: Schema.Types.ObjectId,
        user_id: { type: Schema.Types.ObjectId, ref: "User" },
        product_objs: [orderProductSchema],
        order_date: {
            type: Date,
            default: Date.now,
        },
        basket_id: String,
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const orderModel = model<IOrder>("Order", orderSchema, "orders");

export default orderModel;
