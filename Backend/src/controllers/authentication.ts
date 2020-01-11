import { Router, Request, Response, RequestHandler } from "express";

import IController from "../interfaces/IController";
import { IAuthHandler } from "../handlers/authentication";
import { IError } from "../interfaces/IError";
import { IUserStatsHandler } from "../handlers/userStats";
import IUser from "../interfaces/IUser";

class AuthController implements IController {
  private router: Router;
  private handler: IAuthHandler;
  private statsHandler: IUserStatsHandler;
  private authVerification: RequestHandler;

  constructor(
    authHandler: IAuthHandler,
    statsHandler: IUserStatsHandler,
    auth: RequestHandler
  ) {
    this.router = Router();
    this.handler = authHandler;
    this.statsHandler = statsHandler;
    this.authVerification = auth;

    this.router.post("", this.createUser);
    this.router.post("/login", this.loginUser);
    this.router.delete("", this.authVerification, this.deleteUser);
  }

  public getRouter = (): Router => {
    return this.router;
  };

  private createUser = async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const { token, uuid } = await this.handler.createUser({
        firstName,
        lastName,
        email,
        password,
        uuid: undefined
      });

      await this.statsHandler.createNewStats(uuid);

      res
        .status(201)
        .header("authentication", token)
        .send();
    } catch (e) {
      this.handleError(e, res);
    }
  };

  private deleteUser = async (req: Request, res: Response) => {
    try {
      const {
        authenticatedUser,
        email,
        password
      }: {
        authenticatedUser: IUser;
        email: string;
        password: string;
      } = req.body;
      await this.handler.loginUser({
        email,
        password,
        uuid: undefined,
        firstName: undefined,
        lastName: undefined
      });
      await this.handler.deleteUser(authenticatedUser.email);
      await this.statsHandler.deleteStats(authenticatedUser.uuid);
      res.status(200).send();
    } catch (e) {
      this.handleError(e, res);
    }
  };

  private loginUser = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const token = await this.handler.loginUser({
        email,
        password,
        uuid: undefined,
        firstName: undefined,
        lastName: undefined
      });

      res
        .status(200)
        .header("authentication", token)
        .send();
    } catch (e) {
      this.handleError(e, res);
    }
  };

  private handleError = (e: IError, res: Response): void => {
    console.error("Error:", e);
    res.status(e.type || 500).send(e);
  };
}

export default AuthController;
