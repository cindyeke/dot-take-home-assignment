import express, { Request, Response } from "express";
import * as jsonServer from "json-server";
import { readFileSync } from "fs";
import { join } from "path";
import { Logger } from "tslog";
import "dotenv/config";
import { checkUsername } from "./helpers";

const port = process.env.PORT;
const log: Logger = new Logger();

const server = jsonServer.create();
server.use(jsonServer.defaults());
server.use(jsonServer.bodyParser);
server.use(express.static(__dirname + "/public"));
server.set("views", join(__dirname, "../src/views"));
server.set("view engine", "ejs");

const { users } = JSON.parse(
  readFileSync("./src/users.json", { encoding: "utf-8" }),
);

server.get("/", (req: Request, res: Response) => {
  res.render("index");
});

server.post("/signup", (req: Request, res: Response) => {
  const { username } = req.body;

  const suggestedUsernames: string = checkUsername(users, username);
  res.render("index", {
    suggestedUsernames,
  });
});

server.listen(port, () => {
  log.info(`Server running on PORT ${port}`);
});
