import { Router, Request, Response } from "express";

import IController from "../interfaces/IController";
import { IAuthHandler } from "../handlers/authentication";
import { IError } from "../interfaces/IError";

class AuthController implements IController {
  private router: Router;
  private handler: IAuthHandler;

  constructor(authHandler: IAuthHandler) {
    this.router = Router();
    this.handler = authHandler;

    this.router.post("/create", this.createUser);
    this.router.post("/login", this.loginUser);
  }

  public getRouter = (): Router => {
    return this.router;
  };

  private createUser = async (req: Request, res: Response) => {
    try {
      const { firstName, lastName, email, password } = req.body;
      const token = await this.handler.createUser({
        firstName,
        lastName,
        email,
        password,
        uuid: undefined
      });

      res
        .status(201)
        .header("authentication", token)
        .send();
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
