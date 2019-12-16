import { Application } from "express";
import { Mongoose } from "mongoose";

import AuthController from "../controllers/authentication";
import AuthHandler from "../handlers/authentication";

async function loadAll(app: Application, db: Mongoose) {
  const authHdlr = new AuthHandler();
  const authCtlr = new AuthController(authHdlr);
  app.use("/auth/users", authCtlr.getRouter());
}

export default loadAll;
