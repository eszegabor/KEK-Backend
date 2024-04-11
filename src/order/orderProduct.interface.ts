import { Schema } from "mongoose";
export default interface IOrderProduct {
    product_id?: Schema.Types.ObjectId;
    stars?: number;
    offer_id?: Schema.Types.ObjectId;
    quantity?: number;
}
