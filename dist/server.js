"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const app_1 = tslib_1.__importDefault(require("./app"));
const authentication_controller_1 = tslib_1.__importDefault(require("./authentication/authentication.controller"));
const offer_controller_1 = tslib_1.__importDefault(require("./offer/offer.controller"));
const order_controller_1 = tslib_1.__importDefault(require("./order/order.controller"));
// import PostController from "./post/post.controller";
// import RecipeController from "./recipe/recipe.controller";
// import ReportController from "./report/report.controller";
const user_controller_1 = tslib_1.__importDefault(require("./user/user.controller"));
// const app = new App([new AuthenticationController(), new UserController(), new PostController(), new RecipeController(), new ReportController()]);
const app = new app_1.default([new authentication_controller_1.default(), new user_controller_1.default(), new order_controller_1.default(), new offer_controller_1.default()]);
app.connectToTheDatabase()
    .then(msg => {
    console.log(msg);
})
    .catch(err => {
    console.log(err);
});
//# sourceMappingURL=server.js.map