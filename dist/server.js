"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("./app"));
const authentication_controller_1 = tslib_1.__importDefault(require("./authentication/authentication.controller"));
const offer_controller_1 = tslib_1.__importDefault(require("./offer/offer.controller"));
const order_controller_1 = tslib_1.__importDefault(require("./order/order.controller"));
const product_controller_1 = tslib_1.__importDefault(require("./product/product.controller"));
const user_controller_1 = tslib_1.__importDefault(require("./user/user.controller"));
const app = new app_1.default([new authentication_controller_1.default(), new user_controller_1.default(), new order_controller_1.default(), new offer_controller_1.default(), new product_controller_1.default()]);
app.connectToTheDatabase()
    .then(msg => {
    console.log(msg);
})
    .catch(err => {
    console.log(err);
});
//# sourceMappingURL=server.js.map