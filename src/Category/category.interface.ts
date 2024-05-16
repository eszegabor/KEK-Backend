import { Schema } from "mongoose";

import ICategoryDetail from "./categoryDetail.interface";

export default interface ICategory {
    _id?: Schema.Types.ObjectId;
    main_category?: string;
    category_name?: string;
    details: ICategoryDetail[];
}
