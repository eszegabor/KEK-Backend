import { Schema } from "mongoose";

import ICategoryDetail from "./categoryDetail.interface";

// LINK ./categoryProduct.model.yml
const categoryDetailSchema = new Schema<ICategoryDetail>({
    _id: {
        type: Schema.Types.ObjectId,
        ref: "Nem tudom ",
    },
    main_category: {
        type: String,
        ref: "Nem tudom 2",
    },
    category_name: {
        type: String,
        min: 0,
    },
});

export default categoryDetailSchema;
