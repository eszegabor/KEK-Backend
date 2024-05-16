import { ArrayNotEmpty, IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Schema } from "mongoose";

import ICategory from "./category.interface";
import ICategoryDetail from "./categoryDetail.interface";

export default class CreateCategoryDto implements ICategory {
    @IsMongoId()
    @IsOptional()
    _id: Schema.Types.ObjectId;

    // A hitelesített felhasználó lesz a "megrendelő", felesleges megadni
    // @IsNotEmpty()
    // @IsMongoId()
    // user_id: Schema.Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    category_name?: string;

    @IsString()
    @IsNotEmpty()
    main_Category?: string;

    @IsArray()
    @ArrayNotEmpty()
    details: ICategoryDetail[];
}
