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
exports.createUser = void 0;
const Bcrypt = __importStar(require("bcryptjs"));
const database_1 = require("../../database");
function createUser(request, response) {
    if (!request.body.email || !request.body.password) {
        response
            .status(500)
            .json({
            success: false,
            error: 'SERVER ERROR: Missing credentials parameter to signup.'
        });
        return;
    }
    database_1.User.findOne({ email: request.body.email })
        .then(user => {
        if (user) {
            response
                .status(500)
                .json({
                success: false,
                error: 'SERVER ERROR: User already exists',
                fields: ['email']
            });
            return;
        }
        const newUser = new database_1.User({
            username: request.body.username
                ? request.body.username
                : request.body.email.substring(0, request.body.email.lastIndexOf('@')),
            email: request.body.email,
            password: request.body.password
        });
        const validationError = newUser.validateSync();
        if (validationError) {
            response
                .status(500)
                .json({
                success: false,
                error: 'SERVER ERROR: ' + validationError,
                fields: Object.keys(validationError.errors)
            });
            return;
        }
        database_1.User.create({
            username: request.body.username
                ? request.body.username
                : request.body.email.substring(0, request.body.email.lastIndexOf('@')),
            email: request.body.email,
            password: Bcrypt.hashSync(request.body.password, 10),
        }).then(user => {
            response
                .status(201)
                .json({
                success: true,
                user: {
                    username: user.username,
                    email: user.email
                }
            });
        }).catch(error => {
            response
                .status(500)
                .json({
                success: false,
                error: 'SERVER ERROR: ' + error
            });
        });
    }).catch(error => {
        response
            .status(500)
            .json({
            success: false,
            error: 'SERVER ERROR: ' + error
        });
    });
}
exports.createUser = createUser;
//# sourceMappingURL=create.js.map