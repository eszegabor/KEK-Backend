import { Schema } from "mongoose";
export default interface IOfferingProduct {
    product_id?: Schema.Types.ObjectId;
    unit?: string;
    unit_price?: number;
    quantity?: number;
}