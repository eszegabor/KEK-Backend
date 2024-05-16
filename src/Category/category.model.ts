// https://mongoosejs.com/docs/validation.html

import { model, Schema } from "mongoose";

import ICatergory from "./category.interface";
import ICategory from "./category.interface";
import categoryDetailSchema from "./CategoryDetail.schema";

// LINK ./category.model.yml
const categorySchema = new Schema<ICatergory>(
    {
        _id: Schema.Types.ObjectId,
        //category_id: { type: Schema.Types.ObjectId, ref: "s" },
        details: [categoryDetailSchema],
        category_name: String,
        main_category: String,
    },
    { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const categoryModel = model<ICategory>("Category", categorySchema, "category");

export default categoryModel;
