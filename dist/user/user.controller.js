"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const mongoose_1 = require("mongoose");
// import authorModel from "../author/author.model";
const Http_exception_1 = tslib_1.__importDefault(require("../exceptions/Http.exception"));
const IdNotValid_exception_1 = tslib_1.__importDefault(require("../exceptions/IdNotValid.exception"));
const ReferenceError_exception_1 = tslib_1.__importDefault(require("../exceptions/ReferenceError.exception"));
const UserNotFound_exception_1 = tslib_1.__importDefault(require("../exceptions/UserNotFound.exception"));
const auth_middleware_1 = tslib_1.__importDefault(require("../middleware/auth.middleware"));
const validation_middleware_1 = tslib_1.__importDefault(require("../middleware/validation.middleware"));
const offer_model_1 = tslib_1.__importDefault(require("../offer/offer.model"));
const order_model_1 = tslib_1.__importDefault(require("../order/order.model"));
// import postModel from "../post/post.model";
const user_dto_1 = tslib_1.__importDefault(require("./user.dto"));
const user_model_1 = tslib_1.__importDefault(require("./user.model"));
class UserController {
    path = "/users";
    router = (0, express_1.Router)();
    user = user_model_1.default;
    // private post = postModel;
    order = order_model_1.default;
    offer = offer_model_1.default;
    // private author = authorModel;
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        // this.router.get(`${this.path}/posts/:id`, authMiddleware, this.getAllPostsOfUserByID);
        this.router.get(`${this.path}/:id`, auth_middleware_1.default, this.getUserById);
        this.router.get(this.path, auth_middleware_1.default, this.getAllUsers);
        this.router.patch(`${this.path}/:id`, [auth_middleware_1.default, (0, validation_middleware_1.default)(user_dto_1.default, true)], this.modifyUser);
        this.router.delete(`${this.path}/:id`, auth_middleware_1.default, this.deleteUser);
    }
    // LINK ./user.controller.yml#getAllUsers
    // ANCHOR[id=getAllUsers]
    getAllUsers = async (req, res, next) => {
        try {
            const count = await this.user.countDocuments();
            this.user
                .find()
                // .populate("recipes")
                .sort({ _id: 1 })
                .then(users => {
                res.append("x-total-count", `${count}`);
                res.send(users);
            });
        }
        catch (error) {
            next(new Http_exception_1.default(400, error.message));
        }
    };
    // LINK ./user.controller.yml#getUserById
    // ANCHOR[id=getUserById]
    getUserById = async (req, res, next) => {
        try {
            const id = req.params.id;
            if (mongoose_1.Types.ObjectId.isValid(id)) {
                // const userQuery = this.user.findById(id);
                // if (request.query.withPosts === "true") {
                //     userQuery.populate("posts").exec();
                // }
                // Multiple populates:
                // const user = await this.user.findById(id).populate("recipes").populate("recipes");
                const user = await this.user.findById(id);
                if (user) {
                    res.send(user);
                }
                else {
                    next(new UserNotFound_exception_1.default(id));
                }
            }
            else {
                next(new IdNotValid_exception_1.default(id));
            }
        }
        catch (error) {
            next(new Http_exception_1.default(400, error.message));
        }
    };
    modifyUser = async (req, res, next) => {
        try {
            const id = req.params.id;
            if (mongoose_1.Types.ObjectId.isValid(id)) {
                const userData = req.body;
                const user = await this.user.findByIdAndUpdate(id, userData, { new: true });
                if (user) {
                    res.send(user);
                }
                else {
                    next(new UserNotFound_exception_1.default(id));
                }
            }
            else {
                next(new IdNotValid_exception_1.default(id));
            }
        }
        catch (error) {
            next(new Http_exception_1.default(400, error.message));
        }
    };
    deleteUser = async (req, res, next) => {
        try {
            const id = req.params.id;
            if (mongoose_1.Types.ObjectId.isValid(id)) {
                const isUserHasOrder = await this.order.findOne({ user_id: id });
                const isUserHasOffer = await this.offer.findOne({ user_id: id });
                if (isUserHasOrder || isUserHasOffer) {
                    next(new ReferenceError_exception_1.default("users"));
                }
                else {
                    const successResponse = await this.user.findByIdAndDelete(id);
                    if (successResponse) {
                        res.sendStatus(200);
                    }
                    else {
                        next(new UserNotFound_exception_1.default(id));
                    }
                }
            }
            else {
                next(new IdNotValid_exception_1.default(id));
            }
        }
        catch (error) {
            next(new Http_exception_1.default(400, error.message));
        }
    };
}
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map