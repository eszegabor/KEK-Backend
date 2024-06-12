"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const Http_exception_1 = tslib_1.__importDefault(require("../exceptions/Http.exception"));
const IdNotValid_exception_1 = tslib_1.__importDefault(require("../exceptions/IdNotValid.exception"));
const OfferNotFount_exception_1 = tslib_1.__importDefault(require("../exceptions/OfferNotFount.exception"));
const ReferenceError_exception_1 = tslib_1.__importDefault(require("../exceptions/ReferenceError.exception"));
const auth_middleware_1 = tslib_1.__importDefault(require("../middleware/auth.middleware"));
const validation_middleware_1 = tslib_1.__importDefault(require("../middleware/validation.middleware"));
const order_model_1 = tslib_1.__importDefault(require("../order/order.model"));
const offer_dto_1 = tslib_1.__importDefault(require("./offer.dto"));
const offer_model_1 = tslib_1.__importDefault(require("./offer.model"));
class OfferController {
    path = "/offers";
    router = (0, express_1.Router)();
    offer = offer_model_1.default;
    order = order_model_1.default;
    constructor() {
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(this.path, auth_middleware_1.default, this.getAllOffer);
        this.router.get(`${this.path}/:id`, auth_middleware_1.default, this.getOfferById);
        this.router.patch(`${this.path}/:id`, [auth_middleware_1.default, (0, validation_middleware_1.default)(offer_dto_1.default, true)], this.modifyOffer);
        this.router.post(this.path, [auth_middleware_1.default, (0, validation_middleware_1.default)(offer_dto_1.default)], this.createOffer);
        this.router.delete(`${this.path}/:id`, auth_middleware_1.default, this.deleteOffer);
    }
    // LINK ./offer.controller.yml#getAllOffer
    // ANCHOR[id=getAllOffer]
    getAllOffer = async (req, res, next) => {
        try {
            const count = await this.offer.countDocuments();
            const offer = await this.offer.find().sort({ _id: 1 });
            res.append("x-total-count", `${count}`);
            res.send(offer);
        }
        catch (error) {
            next(new Http_exception_1.default(400, error.message));
        }
    };
    //LINK ./Offer.controller.yml#getOrderById
    //ANCHOR[id=getOfferById]
    getOfferById = async (req, res, next) => {
        try {
            const id = req.params.id;
            if (mongoose_1.Types.ObjectId.isValid(id)) {
                const offer = await this.offer.findById(id);
                if (offer) {
                    res.send(offer);
                }
                else {
                    next(new OfferNotFount_exception_1.default(id));
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
    // LINK ./Offer.controller.yml#modifyOrder
    // ANCHOR[id=modifyOffer]
    modifyOffer = async (req, res, next) => {
        try {
            const id = req.params.id;
            if (mongoose_1.Types.ObjectId.isValid(id)) {
                const offerData = req.body;
                const offer = await this.offer.findByIdAndUpdate(id, offerData, { new: true });
                if (offer) {
                    res.send(offer);
                }
                else {
                    next(new OfferNotFount_exception_1.default(id));
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
    // LINK ./offer.controller.yml#createOffer
    // ANCHOR[id=createOffer]
    createOffer = async (req, res, next) => {
        try {
            const offerData = req.body;
            const uid = req.session.user_id;
            const createdOffer = new this.offer({
                ...offerData,
                user_id: [uid],
            });
            const savedOffer = await createdOffer.save();
            const count = await this.offer.countDocuments();
            res.append("x-total-count", `${count}`);
            res.send(savedOffer);
        }
        catch (error) {
            next(new Http_exception_1.default(400, error.message));
        }
    };
    // LINK ./Offer.controller.yml#deleteOffer
    // ANCHOR[id=deleteOffer]
    deleteOffer = async (req, res, next) => {
        try {
            const id = req.params.id;
            if (mongoose_1.Types.ObjectId.isValid(id)) {
                const isOfferHasReference = await this.order.findOne({ details: { $elemMatch: { offer_id: id } } });
                if (isOfferHasReference) {
                    next(new ReferenceError_exception_1.default("offer"));
                }
                else {
                    const offer = await this.offer.findOne({ _id: id });
                    if (offer) {
                        await this.offer.findByIdAndDelete(id);
                        const count = await this.offer.countDocuments();
                        res.append("x-total-count", `${count}`);
                        res.sendStatus(200);
                    }
                    else {
                        next(new OfferNotFount_exception_1.default(id));
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
exports.default = OfferController;
//# sourceMappingURL=offer.controller.js.map