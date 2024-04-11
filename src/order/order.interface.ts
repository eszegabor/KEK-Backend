import { Schema } from "mongoose";

import IOrderProduct from "./orderProduct.interface";

export default interface IOrder {
    _id?: Schema.Types.ObjectId;
    user_id?: Schema.Types.ObjectId;
    basket_id?: string;
    order_date?: Date;
    product_objs: IOrderProduct[];
}
