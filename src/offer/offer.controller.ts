import { NextFunction, Request, Response, Router } from "express";
import ISession from "interfaces/session.interface";
import { Schema, Types } from "mongoose";

import HttpException from "../exceptions/Http.exception";
import IdNotValidException from "../exceptions/IdNotValid.exception";
import OfferNotFoundException from "../exceptions/OfferNotFount.exception";
import IController from "../interfaces/controller.interface";
import IRequestWithUser from "../interfaces/requestWithUser.interface";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import CreateOfferDto from "./offering.dto";
import IOffer from "./offering.interface";
import offerModel from "./offering.model";

export default class OfferController implements IController {
    public path = "/offers";
    public router = Router();
    private offer = offerModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, authMiddleware, this.getAllOffers);
        this.router.get(`${this.path}/:id`, authMiddleware, this.getOrderById);
        this.router.patch(`${this.path}/:id`, [authMiddleware, validationMiddleware(CreateOfferDto, true)], this.modifyOffer);
        this.router.post(this.path, [authMiddleware, validationMiddleware(CreateOfferDto)], this.createOffer);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteOffer);
    }

    // LINK ./offer.controller.yml#getAllOffers
    // ANCHOR[id=getAllOffers]
    private getAllOffers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const count = await this.offer.countDocuments();
            const offers = await this.offer.find().sort({ _id: 1 });
            res.append("x-total-count", `${count}`);
            res.send(offers);
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    //LINK ./Offer.controller.yml#getOrderById
    //ANCHOR[id=getOfferById]
    private getOrderById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const order = await this.offer.findById(id);
                if (order) {
                    res.send(order);
                } else {
                    next(new OfferNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    // LINK ./Offer.controller.yml#modifyOrder
    // ANCHOR[id=modifyOffer]
    private modifyOffer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const offerData: IOffer = req.body;
                const offer = await this.offer.findByIdAndUpdate(id, offerData, { new: true });
                if (offer) {
                    res.send(offer);
                } else {
                    next(new OfferNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    // LINK ./offer.controller.yml#createOffer
    // ANCHOR[id=createOffer]
    private createOffer = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
        try {
            const offerData: IOffer = req.body;
            const uid: Schema.Types.ObjectId = (req.session as ISession).user_id;
            const createdOffer = new this.offer({
                ...offerData,
                user_id: [uid],
            });
            const savedOffer = await createdOffer.save();
            const count = await this.offer.countDocuments();
            res.append("x-total-count", `${count}`);
            res.send(savedOffer);
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    // LINK ./Offer.controller.yml#deleteOrder
    // ANCHOR[id=deleteOffer]
    private deleteOffer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const offer = await this.offer.findOne({ _id: id });
                if (offer) {
                    await this.offer.findByIdAndDelete(id);
                    const count = await this.offer.countDocuments();
                    res.append("x-total-count", `${count}`);
                    res.sendStatus(200);
                } else {
                    next(new OfferNotFoundException(id));
                }
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };
}
