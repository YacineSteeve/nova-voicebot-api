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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const process = __importStar(require("process"));
const transporter_1 = require("./transporter");
const template_1 = __importDefault(require("./template"));
function sendEmail(request, response) {
    if (!request.body.email || request.body.email === '') {
        response
            .status(500)
            .json({
            success: false,
            error: 'SERVER ERROR: Email is required',
            fields: ['email'],
        });
        return;
    }
    if (!request.body.message || request.body.message === '') {
        response
            .status(500)
            .json({
            success: false,
            error: 'SERVER ERROR: Message is required',
            fields: ['message'],
        });
        return;
    }
    let canSendEmail = true;
    transporter_1.transporter.verify((error) => {
        if (error) {
            response
                .status(500)
                .json({
                success: false,
                error: 'SERVER ERROR: Email could not be sent',
            });
            canSendEmail = false;
            return;
        }
    });
    if (!canSendEmail) {
        return;
    }
    const mailOptions = {
        to: process.env.SMTP_TO_EMAIL,
        replyTo: request.body.email,
        subject: request.body.subject || 'New message from Nova user',
        text: request.body.message,
        html: (0, template_1.default)({
            email: request.body.email,
            name: request.body.name,
            subject: request.body.subject || 'Unspecified',
            content: request.body.message,
        }),
    };
    transporter_1.transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            response
                .status(500)
                .json({
                success: false,
                error: 'SERVER ERROR: Email could not be sent',
            });
            return;
        }
        response
            .status(200)
            .json({
            success: true,
            message: 'Message sent successfully',
            info,
        });
    });
}
exports.sendEmail = sendEmail;
//# sourceMappingURL=send.js.map