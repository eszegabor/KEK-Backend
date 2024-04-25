import { Schema } from "mongoose";

import IOrderDetail from "./orderDetail.interface";

// LINK ./orderDetail.schema.yml
const orderDetailSchema = new Schema<IOrderDetail>({
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

export default orderDetailSchema;
