import { model, Schema } from "mongoose";

import offerDetailSchema from "./offerDetail.schema";
import IOffering from "./offering.interface";

// LINK ./offering.model.yml

const offeringSchema = new Schema<IOffering>(
    {
        _id: Schema.Types.ObjectId,
        user_id: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        details: {
            type: [offerDetailSchema],
            required: true,
        },
        offer_date: {
            type: Date,
            default: Date.now,
        },
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const offeringModel = model<IOffering>("Offering", offeringSchema, "offering");

export default offeringModel;
