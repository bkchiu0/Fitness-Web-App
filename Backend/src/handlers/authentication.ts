import jwt from "jsonwebtoken";
import uuid from "uuid/v4";
import bcrypt from "bcryptjs";

import UserModel from "../models/user";
import IUser from "../interfaces/IUser";
import config from "../config/defualt.json";
import TypedError from "../classes/TypedError";
import { ErrorType } from "../interfaces/IError";

/**
 * The handler class for authentication, (sign in, sign out, register)
 */
export interface IAuthHandler {
  /**
   * Creates and saves a new user into the mongodb user collection
   * @param user the user to be created (all fields need to be within contraints)
   */
  createUser(user: IUser): Promise<string>;

  /**
   * Verifies the user's credentials and logs in the user, returning a jwt token that is valid for an hour
   * @param user user info (email and password required)
   */
  loginUser(user: IUser): Promise<string>;
}

class AuthHandler implements IAuthHandler {
  constructor() {}

  createUser = async (user: IUser): Promise<string> => {
    const id = uuid();
    user.uuid = id;

    let model = new UserModel(user);
    await model.validate();

    let dup = await UserModel.findOne({ email: user.email });
    if (dup) {
      return Promise.reject(
        new TypedError(ErrorType.Validation, "Email already exists")
      );
    }

    model.password = await bcrypt.hash(model.password, 10);
    await model.save();

    const token = this.generateAuthToken(user);
    return Promise.resolve(token);
  };

  loginUser = async (user: IUser): Promise<string> => {
    if (!user.email) {
      return Promise.reject(
        new TypedError(ErrorType.Validation, "Email cannot be blank.")
      );
    } else if (!user.password) {
      return Promise.reject(
        new TypedError(ErrorType.Validation, "Password cannot be blank.")
      );
    }

    const account = await UserModel.findOne({ email: user.email });
    const passMatch = await bcrypt.compare(user.password, account.password);

    if (passMatch) {
      const token = this.generateAuthToken({
        firstName: account.firstName,
        lastName: account.lastName,
        email: account.email,
        password: account.password,
        uuid: account.uuid
      });
      return Promise.resolve(token);
    }
    return Promise.reject(
      new TypedError(ErrorType.Validation, "Password is incorrect")
    );
  };

  private generateAuthToken(user: IUser): string {
    return jwt.sign(user, config.privateKey, { expiresIn: "1h" });
  }
}

export default AuthHandler;
