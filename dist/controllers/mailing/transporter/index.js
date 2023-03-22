"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transport = exports.transporter = void 0;
const nodemailer_1 = require("nodemailer");
const transport_1 = __importDefault(require("./transport"));
exports.transport = transport_1.default;
const transporter = (0, nodemailer_1.createTransport)(transport_1.default);
exports.transporter = transporter;
//# sourceMappingURL=index.js.map