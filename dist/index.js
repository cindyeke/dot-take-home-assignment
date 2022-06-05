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
const express_1 = __importDefault(require("express"));
const jsonServer = __importStar(require("json-server"));
const fs_1 = require("fs");
const path_1 = require("path");
const tslog_1 = require("tslog");
require("dotenv/config");
const helpers_1 = require("./helpers");
const port = process.env.PORT;
const log = new tslog_1.Logger();
const server = jsonServer.create();
server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);
server.use(express_1.default.static(__dirname + "/public"));
server.set("views", (0, path_1.join)(__dirname, "../src/views"));
server.set("view engine", "ejs");
const { users } = JSON.parse((0, fs_1.readFileSync)("./src/users.json", { encoding: "utf-8" }));
server.get("/", (req, res) => {
    res.render("index");
});
server.post("/signup", (req, res) => {
    const { username } = req.body;
    log.info((0, helpers_1.checkUsername)(users, username));
    // if (isUsernameValid(users, username) === false) {
    //   const suggestedUsernames: string = suggestUsernames(username);
    //   log.info(suggestedUsernames);
    //   res.render("index", {
    //     suggestedUsernames,
    //   });
    // }
    // log.info("true");
    // if (isAuthenticated({ email, password }) === false) {
    //   const status = 401;
    //   const message = "Incorrect email or password";
    //   res.status(status).json({ status, message });
    //   return;
    // }
});
server.listen(port, () => {
    log.info(`Server running on PORT ${port}`);
});
//# sourceMappingURL=index.js.map