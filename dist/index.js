"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tslog_1 = require("tslog");
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const log = new tslog_1.Logger();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.set("views", path_1.default.join(__dirname, "../src/views"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("index");
});
app.listen(port, () => {
    log.info(`Server running on PORT ${port}`);
});
//# sourceMappingURL=index.js.map