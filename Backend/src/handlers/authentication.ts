import jwt from "jsonwebtoken";

import UserModel from "../models/user";
import IUser from "../Interfaces/IUser";
import config from "../config/defualt.json";

/**
 * The handler class for authentication, (sign in, sign out, register)
 */
export interface IAuthHandler {
  /**
   * Creates and saves a new user into the mongodb user collection
   * @param user the user to be created
   */
  createUser(user: IUser): Promise<{ token: string; uuid: string }>;

  /**
   * Generates an authentication token using user as a payload
   * @param user the payload for jwt generation
   */
  generateAuthToken(user: IUser): string;
}

class AuthHandler implements IAuthHandler {
  constructor() {}

  async createUser(user: IUser): Promise<{ token: string; uuid: string }> {
    return Promise.resolve({ token: "", uuid: "" });
  }

  generateAuthToken(user: IUser): string {
    return jwt.sign(user, config.privateKey, { expiresIn: "1h" });
  }
}

export default AuthHandler;
