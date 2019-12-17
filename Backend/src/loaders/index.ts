import { Application } from "express";
import { Mongoose } from "mongoose";

import AuthController from "../controllers/authentication";
import AuthHandler, { IAuthHandler } from "../handlers/authentication";
import IController from "../interfaces/IController";

async function loadAuth(app: Application) {
  const authHdlr: IAuthHandler = new AuthHandler();
  const authCtlr: IController = new AuthController(authHdlr);
  app.use("/auth/users", authCtlr.getRouter());
}

async function loadStats(app: Application) {}

async function loadAll(app: Application, db: Mongoose) {
  await loadAuth(app);
}

export default loadAll;
