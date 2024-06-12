"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const app_1 = tslib_1.__importDefault(require("../../app"));
const authentication_controller_1 = tslib_1.__importDefault(require("../../authentication/authentication.controller"));
const order_controller_1 = tslib_1.__importDefault(require("../../order/order.controller"));
// let server: Express.Application;
let cookie;
let server;
beforeAll(async () => {
    // create server for test:
    server = new app_1.default([new authentication_controller_1.default(), new order_controller_1.default()]);
    // connect and get cookie for authentication
    await server
        .connectToTheDatabase("5003")
        .then(msg => {
        console.log(msg);
    })
        .catch(err => {
        console.log(err);
    });
    const res = await (0, supertest_1.default)(server.getServer()).post("/auth/login").send({
        email: "esze.gabor@students.jedlik.eu",
        password: "gabor",
    });
    // set cookie
    cookie = res.headers["set-cookie"][0];
});
describe("test orders endpoints", () => {
    let id = "";
    it("GET /orders", async () => {
        // get response with supertest-response:
        const response = await (0, supertest_1.default)(server.getServer()).get("/orders").set("Cookie", cookie);
        // check response with jest:
        expect(response.statusCode).toEqual(200);
        expect(response.header["x-total-count"]).toEqual("7"); // basically 7
    });
    it("GET /orders (missing cookie)", async () => {
        const response = await (0, supertest_1.default)(server.getServer()).get("/orders");
        expect(response.statusCode).toEqual(401);
        expect(response.body.message).toEqual("Session id missing or session has expired, please log in!");
    });
    it("GET /orders/:id  (correct id)", async () => {
        id = "eeee00000000000000000001";
        const response = await (0, supertest_1.default)(server.getServer()).get(`/orders/${id}`).set("Cookie", cookie);
        expect(response.statusCode).toEqual(200);
        expect(response.body.details[0].quantity).toEqual(2.5);
        expect(response.body.details[0].stars).toEqual(5);
    });
    it("GET /orders/:id  (missing, but valid id)", async () => {
        id = "6367f3038ae13010a4c9ab49";
        const response = await (0, supertest_1.default)(server.getServer()).get(`/orders/${id}`).set("Cookie", cookie);
        expect(response.statusCode).toEqual(404);
        expect(response.body.message).toEqual(`Order with id ${id} not found`);
    });
    it("GET /orders/:id  (not valid object id)", async () => {
        id = "körtefa";
        const response = await (0, supertest_1.default)(server.getServer()).get(`/orders/${id}`).set("Cookie", cookie);
        expect(response.statusCode).toEqual(404);
        expect(response.body.message).toEqual(`This ${id} id is not valid.`);
    });
});
//# sourceMappingURL=order.test.js.map