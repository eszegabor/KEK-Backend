"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// LINK ./user.model.yml
const userSchema = new mongoose_1.Schema({
    _id: mongoose_1.Schema.Types.ObjectId,
    email: {
        type: String,
        required: true,
    },
    email_verified: {
        type: Boolean,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    roles: {
        type: [String], // Array of string
        required: true,
    },
    mobil_number: {
        type: String,
        required: true,
    },
}, { versionKey: false, id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } });
const userModel = (0, mongoose_1.model)("User", userSchema, "users");
exports.default = userModel;
//# sourceMappingURL=user.model.js.map