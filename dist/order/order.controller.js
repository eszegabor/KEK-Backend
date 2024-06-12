"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const Http_exception_1 = tslib_1.__importDefault(require("../exceptions/Http.exception"));
const IdNotValid_exception_1 = tslib_1.__importDefault(require("../exceptions/IdNotValid.exception"));
const OfferNotFount_exception_1 = tslib_1.__importDefault(require("../exceptions/OfferNotFount.exception"));
const OrderDetailNotFound_exception_1 = tslib_1.__importDefault(require("../exceptions/OrderDetailNotFound.exception"));
const OrderNotFound_exception_1 = tslib_1.__importDefault(require("../exceptions/OrderNotFound.exception"));
const ProductNotFound_exception_1 = tslib_1.__importDefault(require("../exceptions/ProductNotFound.exception"));
const UserIdCannotChangeException_1 = tslib_1.__importDefault(require("../exceptions/UserIdCannotChangeException"));
const auth_middleware_1 = tslib_1.__importDefault(require("../middleware/auth.middleware"));
const validation_middleware_1 = tslib_1.__importDefault(require("../middleware/validation.middleware"));
const offer_model_1 = tslib_1.__importDefault(require("../offer/offer.model"));
const product_model_1 = tslib_1.__importDefault(require("../product/product.model"));
const order_dto_1 = tslib_1.__importDefault(require("./order.dto"));
const order_model_1 = tslib_1.__importDefault(require("./order.model"));
class OrderController {
    path = "/orders";
    router = (0, express_1.Router)();
    order = order_model_1.default;
    offer = offer_model_1.default;
    product = product_model_1.default;
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, auth_middleware_1.default, this.getAllOrders);
        this.router.get(`${this.path}/:id`, auth_middleware_1.default, this.getOrderById);
        this.router.patch(`${this.path}/:id`, [auth_middleware_1.default, (0, validation_middleware_1.default)(order_dto_1.default, true)], this.modifyOrder);
        this.router.post(this.path, [auth_middleware_1.default, (0, validation_middleware_1.default)(order_dto_1.default)], this.createOrder);
        this.router.delete(`${this.path}/:id`, auth_middleware_1.default, this.deleteOrder);
        this.router.delete(`${this.path}/:id/:detail_id`, auth_middleware_1.default, this.deleteFromDetails);
    }
    // LINK ./order.controller.yml#getAllOrders
    // ANCHOR[id=getAllOrders]
    getAllOrders = async (req, res, next) => {
        try {
            const count = await this.order.countDocuments();
            const orders = await this.order.find().sort({ _id: 1 });
            res.append("x-total-count", `${count}`);
            res.send(orders);
        }
        catch (error) {
            next(new Http_exception_1.default(400, error.message));
        }
    };
    // LINK ./order.controller.yml#getOrderById
    // ANCHOR[id=getOrderById]
    getOrderById = async (req, res, next) => {
        try {
            const id = req.params.id;
            if (mongoose_1.Types.ObjectId.isValid(id)) {
                const order = await this.order.findById(id);
                if (order) {
                    res.send(order);
                }
                else {
                    next(new OrderNotFound_exception_1.default(id));
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
    // LINK ./order.controller.yml#modifyOrder
    // ANCHOR[id=modifyOrder]
    modifyOrder = async (req, res, next) => {
        try {
            const id = req.params.id;
            if (mongoose_1.Types.ObjectId.isValid(id)) {
                const orderData = req.body;
                if (orderData.user_id) {
                    next(new UserIdCannotChangeException_1.default());
                    return;
                }
                if (orderData.details) {
                    // check offer(s)
                    for (const e of orderData.details) {
                        const offer = await this.offer.findOne({ _id: e.offer_id });
                        if (!offer) {
                            next(new OfferNotFount_exception_1.default(e.offer_id.toString()));
                            return;
                        }
                    }
                    // check product(s)
                    for (const e of orderData.details) {
                        const product = await this.product.findOne({ _id: e.product_id });
                        if (!product) {
                            next(new ProductNotFound_exception_1.default(e.product_id.toString()));
                            return;
                        }
                    }
                }
                const order = await this.order.findByIdAndUpdate(id, orderData, { new: true });
                if (order) {
                    res.send(order);
                }
                else {
                    next(new OrderNotFound_exception_1.default(id));
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
    // LINK ./order.controller.yml#createOrder
    // ANCHOR[id=createOrder]
    createOrder = async (req, res, next) => {
        try {
            const orderData = req.body;
            const uid = req.session.user_id;
            const createdOrder = new this.order({
                ...orderData,
                user_id: [uid],
            });
            // check offer(s)
            for (const e of createdOrder.details) {
                const offer = await this.offer.findOne({ _id: e.offer_id });
                if (!offer) {
                    next(new OfferNotFount_exception_1.default(e.offer_id.toString()));
                    return;
                }
            }
            // check product(s)
            for (const e of createdOrder.details) {
                const product = await this.product.findOne({ _id: e.product_id });
                if (!product) {
                    next(new ProductNotFound_exception_1.default(e.product_id.toString()));
                    return;
                }
            }
            const savedOrder = await createdOrder.save();
            const count = await this.order.countDocuments();
            res.append("x-total-count", `${count}`);
            res.send(savedOrder);
        }
        catch (error) {
            next(new Http_exception_1.default(400, error.message));
        }
    };
    // LINK ./order.controller.yml#deleteOrder
    // ANCHOR[id=deleteOrder]
    deleteOrder = async (req, res, next) => {
        try {
            const id = req.params.id;
            if (mongoose_1.Types.ObjectId.isValid(id)) {
                const order = await this.order.findOne({ _id: id });
                if (order) {
                    await this.order.findByIdAndDelete(id);
                    const count = await this.order.countDocuments();
                    res.append("x-total-count", `${count}`);
                    res.sendStatus(200);
                }
                else {
                    next(new OrderNotFound_exception_1.default(id));
                }
            }
            else
                next(new IdNotValid_exception_1.default(id));
        }
        catch (error) {
            next(new Http_exception_1.default(400, error.message));
        }
    };
    // LINK ./order.controller.yml#deleteFromDetails
    // ANCHOR[id=deleteFromDetails]
    deleteFromDetails = async (req, res, next) => {
        try {
            const id = req.params.id;
            const detail_id = req.params.detail_id;
            if (mongoose_1.Types.ObjectId.isValid(id)) {
                const order = await this.order.findOne({ _id: id });
                if (order) {
                    const orderDetails = await this.order.findOne({ $and: [{ _id: id }, { details: { $elemMatch: { _id: detail_id } } }] });
                    if (orderDetails) {
                        await this.order.findOneAndUpdate({ _id: id }, { $pull: { details: { _id: detail_id } } });
                        res.sendStatus(200);
                    }
                    else {
                        next(new OrderDetailNotFound_exception_1.default(detail_id));
                    }
                }
                else {
                    next(new OrderNotFound_exception_1.default(id));
                }
            }
            else
                next(new IdNotValid_exception_1.default(id));
        }
        catch (error) {
            next(new Http_exception_1.default(400, error.message));
        }
    };
}
exports.default = OrderController;
//# sourceMappingURL=order.controller.js.map