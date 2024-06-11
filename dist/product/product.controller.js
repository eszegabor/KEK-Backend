"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const Http_exception_1 = tslib_1.__importDefault(require("../exceptions/Http.exception"));
const IdNotValid_exception_1 = tslib_1.__importDefault(require("../exceptions/IdNotValid.exception"));
const ProductNotFound_exception_1 = tslib_1.__importDefault(require("../exceptions/ProductNotFound.exception"));
const auth_middleware_1 = tslib_1.__importDefault(require("../middleware/auth.middleware"));
const validation_middleware_1 = tslib_1.__importDefault(require("../middleware/validation.middleware"));
const product_dto_1 = tslib_1.__importDefault(require("./product.dto"));
const product_model_1 = tslib_1.__importDefault(require("./product.model"));
class ProductController {
    path = "/products";
    router = (0, express_1.Router)();
    product = product_model_1.default;
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, auth_middleware_1.default, this.getAllProducts);
        this.router.get(`${this.path}/:id`, auth_middleware_1.default, this.getProductById);
        this.router.patch(`${this.path}/:id`, [auth_middleware_1.default, (0, validation_middleware_1.default)(product_dto_1.default, true)], this.modifyProduct);
        this.router.post(this.path, [auth_middleware_1.default, (0, validation_middleware_1.default)(product_dto_1.default)], this.createProduct);
        this.router.delete(`${this.path}/:id`, auth_middleware_1.default, this.deleteProduct);
    }
    // LINK ./product.controller.yml#getAllOrders
    // ANCHOR[id=getAllProducts]
    getAllProducts = async (req, res, next) => {
        try {
            const count = await this.product.countDocuments();
            const products = await this.product.find().sort({ _id: 1 });
            res.append("x-total-count", `${count}`);
            res.send(products);
        }
        catch (error) {
            next(new Http_exception_1.default(400, error.message));
        }
    };
    // LINK ./product.controller.yml#getOrderById
    // ANCHOR[id=getProductById]
    getProductById = async (req, res, next) => {
        try {
            const id = req.params.id;
            if (mongoose_1.Types.ObjectId.isValid(id)) {
                const product = await this.product.findById(id);
                if (product) {
                    res.send(product);
                }
                else {
                    next(new ProductNotFound_exception_1.default(id));
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
    // LINK ./product.controller.yml#modifyProduct
    // ANCHOR[id=modifyProduct]
    modifyProduct = async (req, res, next) => {
        try {
            const id = req.params.id;
            if (mongoose_1.Types.ObjectId.isValid(id)) {
                const productData = req.body;
                const product = await this.product.findByIdAndUpdate(id, productData, { new: true });
                if (product) {
                    res.send(product);
                }
                else {
                    next(new ProductNotFound_exception_1.default(id));
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
    // LINK ./product.controller.yml#createProduct
    // ANCHOR[id=createProduct]
    createProduct = async (req, res, next) => {
        try {
            const productData = req.body;
            const createdProduct = new this.product({
                ...productData,
            });
            const savedProduct = await createdProduct.save();
            const count = await this.product.countDocuments();
            res.append("x-total-count", `${count}`);
            res.send(savedProduct);
        }
        catch (error) {
            next(new Http_exception_1.default(400, error.message));
        }
    };
    // LINK ./product.controller.yml#deleteProduct
    // ANCHOR[id=deleteProduct]
    deleteProduct = async (req, res, next) => {
        try {
            const id = req.params.id;
            if (mongoose_1.Types.ObjectId.isValid(id)) {
                const product = await this.product.findOne({ _id: id });
                if (product) {
                    await this.product.findByIdAndDelete(id);
                    const count = await this.product.countDocuments();
                    res.append("x-total-count", `${count}`);
                    res.sendStatus(200);
                }
                else {
                    next(new ProductNotFound_exception_1.default(id));
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
exports.default = ProductController;
//# sourceMappingURL=product.controller.js.map