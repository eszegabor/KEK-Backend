import HttpException from "./Http.exception";

export default class OfferDetailNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Offer detail with id ${id} not found`);
    }
}
