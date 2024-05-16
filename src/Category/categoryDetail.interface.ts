import { Schema } from "mongoose";
export default interface ICategoryDetail {
    //category_id?: Schema.Types.ObjectId;
    main_category?: string;
    category_name?: string;
    _id?: Schema.Types.ObjectId;
}
