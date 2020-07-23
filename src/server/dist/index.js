"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path = require('path');
var cors = require('cors');
var routes_js_1 = __importDefault(require("./routes/routes.js"));
var body_parser_1 = require("body-parser");
var app = express_1.default();
var port = 4000;
app.use(cors());
app.use(body_parser_1.json());
app.use('/', routes_js_1.default);
app.use(function (err, req, res, next) {
    res.status(501).json({ message: err.message });
});
app.listen(port, function () {
    console.log("server started at http://localhost:" + port);
});
