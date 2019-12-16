import jwt from "jsonwebtoken";
import uuid from "uuid/v4";
import bcrypt from "bcryptjs";

import UserModel from "../models/user";
import IUser from "../interfaces/IUser";
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
}

class AuthHandler implements IAuthHandler {
  constructor() {}

  async createUser(user: IUser): Promise<{ token: string; uuid: string }> {
    const id = uuid();
    user.uuid = id;

    // Create and validate user model
    let model = new UserModel(user);
    await model.validate();

    // Check for duplicates
    let dup = await UserModel.findOne({ email: user.email });
    if (dup) {
      throw new Error("Email already exists");
    }

    model.password = await bcrypt.hash(model.password, 10);
    await model.save();

    // Create a jwt token
    const token = this.generateAuthToken(user);
    return Promise.resolve({ token, uuid: id });
  }

  private generateAuthToken(user: IUser): string {
    return jwt.sign(user, config.privateKey, { expiresIn: "1h" });
  }
}

export default AuthHandler;
