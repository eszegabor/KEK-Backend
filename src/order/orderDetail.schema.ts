import { Schema } from "mongoose";

import IOrderDetail from "./orderDetail.interface";

// LINK ./orderDetail.schema.yml
const orderDetailSchema = new Schema<IOrderDetail>({
    offer_id: {
        type: Schema.Types.ObjectId,
        ref: "Offer",
        required: true,
    },
    product_id: {
        type: Schema.Types.ObjectId,
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

export default orderDetailSchema;
