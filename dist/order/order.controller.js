"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const Http_exception_1 = tslib_1.__importDefault(require("../exceptions/Http.exception"));
const IdNotValid_exception_1 = tslib_1.__importDefault(require("../exceptions/IdNotValid.exception"));
const OrderNotFound_exception_1 = tslib_1.__importDefault(require("../exceptions/OrderNotFound.exception"));
const auth_middleware_1 = tslib_1.__importDefault(require("../middleware/auth.middleware"));
const validation_middleware_1 = tslib_1.__importDefault(require("../middleware/validation.middleware"));
const order_dto_1 = tslib_1.__importDefault(require("./order.dto"));
const order_model_1 = tslib_1.__importDefault(require("./order.model"));
class OrderController {
    path = "/orders";
    router = (0, express_1.Router)();
    order = order_model_1.default;
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, auth_middleware_1.default, this.getAllOrders);
        this.router.get(`${this.path}/:id`, auth_middleware_1.default, this.getOrderById);
        this.router.patch(`${this.path}/:id`, [auth_middleware_1.default, (0, validation_middleware_1.default)(order_dto_1.default, true)], this.modifyOrder);
        this.router.post(this.path, [auth_middleware_1.default, (0, validation_middleware_1.default)(order_dto_1.default)], this.createOrder);
        this.router.delete(`${this.path}/:id`, auth_middleware_1.default, this.deleteOrder);
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
                next(new IdNotValid_exception_1.default(id));
            }
        }
        catch (error) {
            next(new Http_exception_1.default(400, error.message));
        }
    };
}
exports.default = OrderController;
//# sourceMappingURL=order.controller.js.map