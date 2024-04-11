import { ArrayNotEmpty, IsArray, IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

import IOrder from "./order.interface";
import IOrderProduct from "./orderProduct.interface";

export default class CreateOrderDto implements IOrder {
    @IsMongoId()
    @IsOptional()
    _id: Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsMongoId()
    user_id: Schema.Types.ObjectId;

    @IsString()
    @IsOptional()
    basket_id?: string;

    @IsDate()
    order_date?: Date;

    @IsArray()
    @ArrayNotEmpty()
    product_objs: IOrderProduct[];
}
