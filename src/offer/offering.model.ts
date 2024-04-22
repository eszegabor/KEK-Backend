import { model, Schema } from "mongoose";

import IOffering from "./offering.interface";
import IOfferingProduct from "./offeringProduct.interface";

// LINK ./offering.model.yml

const offeringProductSchema = new Schema<IOfferingProduct>({
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    },
    unit_price: {
        type: Number,
        min: 0,
    },
    quantity: {
        type: Number,
        min: 0,
    },
});

const offeringSchema = new Schema<IOffering>(
    {
        _id: { type: Schema.Types.ObjectId, ref: "offering" },
        product_objs: [offeringProductSchema],
        offer_date: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const offeringModel = model<IOffering>("offering", offeringSchema, "offering");

export default offeringModel;
