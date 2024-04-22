import { model, Schema } from "mongoose";

import IOffering from "./offer.interface";
import IOfferingProduct from "./offeringProduct.interface";

const offeringProductSchema = new Schema<IOfferingProduct>({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "Order",
    },
    unit: {
        type: String,
        required: true,
        maxlength: 50,
    },
    unit_price: {
        type: Number,
        min: 0,
    },
    quantity: {
        type: Number,
        min: 0,
        max: 5,
    },
});

const offeringSchema = new Schema<IOffering>(
    {
        // _id: Schema.Types.ObjectId,
        _id: { type: Schema.Types.ObjectId, ref: "User" },
        product_objs: [offeringProductSchema],
        offer_date: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const orderModel = model<IOffering>("Order", offeringSchema, "orders");

export default orderModel;