import { Router, Request, Response, NextFunction } from "express";

import IController from "../interfaces/IController";
import { IAuthHandler } from "../handlers/authentication";

class AuthController implements IController {
  private router: Router;
  private handler: IAuthHandler;

  constructor(authHandler: IAuthHandler) {
    this.router = Router();
    this.handler = authHandler;

    this.router.post("/create", this.createUser);
  }

  public getRouter(): Router {
    return this.router;
  }

  private async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const { token, uuid } = await this.handler.createUser({
        firstName,
        lastName,
        email,
        password,
        uuid: undefined
      });

      res
        .status(201)
        .header("authentication", token)
        .send({
          id: uuid
        });
    } catch (e) {
      console.error(`Error: ${e.message}`);
      res.status(400).send(e);
    }
  }
}

export default AuthController;
