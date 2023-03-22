"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const Bcrypt = __importStar(require("bcryptjs"));
const JWT = __importStar(require("jsonwebtoken"));
const database_1 = require("../../database");
function deleteUser(request, response) {
    if (!request.body.token || request.body.token === '') {
        response
            .status(500)
            .json({
            success: false,
            error: 'SERVER ERROR: Missing token to delete user.',
        });
        return;
    }
    if (!request.body.password || request.body.password === '') {
        response
            .status(500)
            .json({
            success: false,
            error: 'SERVER ERROR: Missing password to delete user.',
            fields: ['password'],
        });
        return;
    }
    const token = request.body.token;
    let decoded = null;
    try {
        decoded = JWT.verify(token, process.env.JWT_SECRET);
    }
    catch (error) {
        response
            .status(500)
            .json({
            success: false,
            error: 'SERVER ERROR: Unable to verify token. ' + error,
        });
        return;
    }
    if (!decoded) {
        response
            .status(500)
            .json({
            success: false,
            error: 'SERVER ERROR: Invalid token.',
        });
        return;
    }
    database_1.User.findOne({ _id: decoded.id })
        .then(user => {
        if (!user) {
            response
                .status(500)
                .json({
                success: false,
                error: 'SERVER ERROR: User not found.',
            });
            return;
        }
        if (!Bcrypt.compareSync(request.body.password, user.password)) {
            response
                .status(500)
                .json({
                success: false,
                error: 'SERVER ERROR: Wrong password.',
                fields: ['password'],
            });
            return;
        }
        database_1.User.deleteOne({ _id: decoded.id })
            .then(() => {
            response
                .json({
                success: true,
            });
        })
            .catch(error => {
            response
                .status(500)
                .json({
                success: false,
                error: 'SERVER ERROR: Unable to delete user. ' + error,
            });
        });
    })
        .catch(error => {
        response
            .status(500)
            .json({
            success: false,
            error: 'SERVER ERROR: Unable to find user. ' + error,
        });
    });
}
exports.deleteUser = deleteUser;
//# sourceMappingURL=delete.js.map