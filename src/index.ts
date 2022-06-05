import express, { Express, Request, Response } from "express";
import { Logger } from "tslog";
import path from "path";
import "dotenv/config";

const log: Logger = new Logger();

const app: Express = express();
const port = process.env.PORT;

app.use(express.static(__dirname + "/public"));
app.set("views", path.join(__dirname, "../src/views"));
app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.listen(port, () => {
  log.info(`Server running on PORT ${port}`);
});
