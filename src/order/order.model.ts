// https://mongoosejs.com/docs/validation.html

import { model, Schema } from "mongoose";

import IOrder from "./order.interface";
import IOrderProduct from "./orderProduct.interface";

// LINK ./recipe.model.yml
const orderSchema = new Schema<IOrder>(
    {
        // _id: Schema.Types.ObjectId,
        user_id: { type: Schema.Types.ObjectId, ref: "User" },
        product_objs: Array<IOrderProduct>,
        order_date: Date,
        basket_id: String,
        // user_id: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const orderModel = model<IOrder>("Order", orderSchema, "orders");

export default orderModel;
