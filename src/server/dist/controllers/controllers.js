"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserDataController = exports.storeUserDataController = exports.loginController = void 0;
var database_1 = require("../database/database");
var db = new database_1.Database();
exports.loginController = function (req, res, next) {
    res.status(201).json({ message: 'It\'s working' });
};
exports.storeUserDataController = function (req, res, next) {
    db.storeUserDetails(req.body.uid, req.body.name, req.body.email).then(function () {
        res.status(201).send({ status: 'User added to database successfully' });
    }).catch(function (err) {
        res.status(501).send(err);
    });
};
exports.getUserDataController = function (req, res, next) {
    var userUID = req.body.uid;
    db.getUserDetails(userUID).then(function (user) {
        res.send(user);
    }).catch(function (err) {
        res.status(501).send(err);
    });
};
