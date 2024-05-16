import { ArrayNotEmpty, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

import IOfferDetail from "./offerDetail.interface";
import IOffering from "./offering.interface";

export default class CreateOfferDto implements IOffering {
    @IsMongoId()
    @IsOptional()
    _id: Schema.Types.ObjectId;

    @IsNotEmpty()
    @IsOptional()
    @IsMongoId()
    user_id: Schema.Types.ObjectId;

    @IsString()
    @IsOptional()
    offer_date?: Date;

    @IsArray()
    @ArrayNotEmpty()
    details: IOfferDetail[];
}
