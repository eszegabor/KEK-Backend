import { Schema } from "mongoose";

import IOfferingProduct from "./offeringProduct.interface";

export default interface IOffering {
    _id?: Schema.Types.ObjectId;
    user_id?: Schema.Types.ObjectId;
    offer_date?: Date;
    product_objs: IOfferingProduct[];
}
