import { IAuthHandler } from "../handlers/authentication";

class AuthController {
  private handler: IAuthHandler;

  constructor(authHandler: IAuthHandler) {
    this.handler = authHandler;
  }
}
