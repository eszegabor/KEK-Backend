import { NextFunction, Request, Response, Router } from "express";
import ISession from "interfaces/session.interface";
import { Schema, Types } from "mongoose";

import CategoryNotFoundException from "../exceptions/CategoryNotFound.exception";
import HttpException from "../exceptions/Http.exception";
import IdNotValidException from "../exceptions/IdNotValid.exception";
import IController from "../interfaces/controller.interface";
import IRequestWithUser from "../interfaces/requestWithUser.interface";
import authMiddleware from "../middleware/auth.middleware";
import validationMiddleware from "../middleware/validation.middleware";
import CreateCategoryDto from "./category.dto";
import ICategory from "./category.interface";
import categoryModel from "./category.model";

export default class RecipeController implements IController {
    public path = "/category";
    public router = Router();
    private order = categoryModel;

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(this.path, authMiddleware, this.getAllCategory);
        this.router.get(`${this.path}/:id`, authMiddleware, this.getOrderById);
        this.router.patch(`${this.path}/:id`, [authMiddleware, validationMiddleware(CreateCategoryDto, true)], this.modifyCategory);
        this.router.post(this.path, [authMiddleware, validationMiddleware(CreateCategoryDto)], this.createCategory);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteCategory);
    }

    // LINK ./order.controller.yml#getAllOrders
    // ANCHOR[id=getAllOrders]
    private getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const count = await this.order.countDocuments();
            const orders = await this.order.find().sort({ _id: 1 });
            res.append("x-total-count", `${count}`);
            res.send(orders);
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    // LINK ./order.controller.yml#getOrderById
    // ANCHOR[id=getOrderById]
    private getOrderById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const order = await this.order.findById(id);
                if (order) {
                    res.send(order);
                } else {
                    next(new OrderNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    // LINK ./order.controller.yml#modifyOrder
    // ANCHOR[id=modifyOrder]
    private modifyOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const orderData: IOrder = req.body;
                const order = await this.order.findByIdAndUpdate(id, orderData, { new: true });
                if (order) {
                    res.send(order);
                } else {
                    next(new OrderNotFoundException(id));
                }
            } else {
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    // LINK ./order.controller.yml#createOrder
    // ANCHOR[id=createOrder]
    private createOrder = async (req: IRequestWithUser, res: Response, next: NextFunction) => {
        try {
            const orderData: IOrder = req.body;
            const uid: Schema.Types.ObjectId = (req.session as ISession).user_id;
            const createdOrder = new this.order({
                ...orderData,
                user_id: [uid],
            });
            const savedOrder = await createdOrder.save();
            const count = await this.order.countDocuments();
            res.append("x-total-count", `${count}`);
            res.send(savedOrder);
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };

    // LINK ./order.controller.yml#deleteOrder
    // ANCHOR[id=deleteOrder]
    private deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id = req.params.id;
            if (Types.ObjectId.isValid(id)) {
                const order = await this.order.findOne({ _id: id });
                if (order) {
                    await this.order.findByIdAndDelete(id);
                    const count = await this.order.countDocuments();
                    res.append("x-total-count", `${count}`);
                    res.sendStatus(200);
                } else {
                    next(new OrderNotFoundException(id));
                }
                next(new IdNotValidException(id));
            }
        } catch (error) {
            next(new HttpException(400, error.message));
        }
    };
}
