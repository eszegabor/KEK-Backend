import { ArrayNotEmpty, IsArray, IsDate, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

import IOrder from "./order.interface";
import IOrderDetail from "./orderDetail.interface";

export default class CreateOrderDto implements IOrder {
    @IsMongoId()
    @IsOptional()
    _id: Schema.Types.ObjectId;

    // A hitelesített felhasználó lesz a "megrendelő", felesleges megadni
    // @IsNotEmpty()
    // @IsMongoId()
    // user_id: Schema.Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    basket_id?: string;

    @IsDate()
    order_date?: Date;

    @IsArray()
    @ArrayNotEmpty()
    details: IOrderDetail[];
}
