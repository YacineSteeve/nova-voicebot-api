"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
require("./env-config");
require("./multi-processing");
const database_1 = require("./database");
const user_1 = require("./controllers/user");
const mailing_1 = require("./controllers/mailing");
const endpoints_1 = require("./endpoints");
const middlewares_1 = require("./middlewares");
const PORT = process.env.SERVER_PORT || 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.get('/', (req, res) => {
    res.send('Welcome to Nova\'s API!');
});
app.post('/user/signup', user_1.createUser);
app.post('/user/login', user_1.getUser);
app.post('/user/userinfo', user_1.getUserByToken);
app.post('/user/delete', user_1.deleteUser);
app.post('/support/contact', mailing_1.sendEmail);
app.use('/api', middlewares_1.authorizeApiRequest);
app.get('/api/completion', endpoints_1.getCompletion);
app.get('/api/speech', endpoints_1.getSpeech);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield database_1.connection;
    console.log(`\n> Connected to the ${db.connection.name.toUpperCase()} database.` +
        `\n> Server listening on port ${PORT}\n`);
}));
//# sourceMappingURL=main.js.map