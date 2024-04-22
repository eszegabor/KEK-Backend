import { Schema } from "mongoose";
export default interface IOrderDetail {
    product_id?: Schema.Types.ObjectId;
    offer_id?: Schema.Types.ObjectId;
    quantity?: number;
    stars?: number;
}
