import { Application } from "express";
import { Mongoose } from "mongoose";

import AuthController from "../controllers/authentication";
import AuthHandler, { IAuthHandler } from "../handlers/authentication";
import IController from "../interfaces/IController";

async function loadAll(app: Application, db: Mongoose) {
  const authHdlr: IAuthHandler = new AuthHandler();
  const authCtlr: IController = new AuthController(authHdlr);
  app.use("/auth/users", authCtlr.getRouter());
}

export default loadAll;
