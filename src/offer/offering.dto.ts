import { ArrayNotEmpty, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

import IOffering from "./offering.interface";
import IOfferingProduct from "./offeringProduct.interface";

export default class CreateofferingDto implements IOffering {
    @IsMongoId()
    @IsOptional()
    _id: Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsMongoId()
    user_id: Schema.Types.ObjectId;

    @IsString()
    @IsOptional()
    offer_date?: Date;

    @IsArray()
    @ArrayNotEmpty()
    product_objs: IOfferingProduct[];
}
