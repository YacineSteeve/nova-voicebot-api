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
exports.authorizeApiRequest = void 0;
const JWT = __importStar(require("jsonwebtoken"));
function authorizeApiRequest(request, response, next) {
    const authToken = request.get('authorization').substring(7);
    if (!authToken) {
        response
            .status(401)
            .json({
            success: false,
            error: 'SERVER ERROR: Access denied. No token provided.'
        });
        return;
    }
    try {
        JWT.verify(authToken, process.env.JWT_SECRET);
        next();
    }
    catch (error) {
        response
            .status(500)
            .json({
            success: false,
            error: `SERVER ERROR: Invalid token (${error.message}).`
        });
    }
}
exports.authorizeApiRequest = authorizeApiRequest;
//# sourceMappingURL=authorization.js.map