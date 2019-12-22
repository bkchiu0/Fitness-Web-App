import { Application } from "express";
import { Mongoose } from "mongoose";

import AuthController from "../controllers/authentication";
import AuthHandler, { IAuthHandler } from "../handlers/authentication";
import IController from "../interfaces/IController";
import UserStatsController from "../controllers/userStats";
import UserStatsHandler, { IUserStatsHandler } from "../handlers/userStats";
import authenticate from "../middlewares/auth";

async function loadAll(app: Application, db: Mongoose) {
  const authHdlr: IAuthHandler = new AuthHandler();
  const statsHdlr: IUserStatsHandler = new UserStatsHandler();

  const authCtlr: IController = new AuthController(
    authHdlr,
    statsHdlr,
    authenticate
  );
  app.use("/auth/users", authCtlr.getRouter());

  const statsCtlr: IController = new UserStatsController(
    statsHdlr,
    authenticate
  );
  app.use("/users/stats", statsCtlr.getRouter());
}

export default loadAll;
