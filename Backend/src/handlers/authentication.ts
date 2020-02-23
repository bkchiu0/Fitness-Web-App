import jwt from "jsonwebtoken";
import uuid from "uuid/v4";
import bcrypt from "bcryptjs";

import UserModel from "models/user";
import IUser from "interfaces/IUser";
import config from "config/default.json";
import TypedError from "classes/TypedError";
import { ErrorType } from "interfaces/IError";

/**
 * The handler class for authentication, (sign in, sign out, register)
 */
export interface IAuthHandler {
  /**
   * Creates and saves a new user into the mongodb user collection
   * @param user the user to be created (all fields need to be within contraints)
   */
  createUser(user: IUser): Promise<{ token: string; uuid: string }>;

  /**
   * Deletes a user and all related entries in all collections in the database
   * @param user The user to be deleted
   */
  deleteUser(user: string): Promise<void>;

  /**
   * Verifies the user's credentials and logs in the user, returning a jwt token that is valid for an hour
   * @param user user info (email and password required)
   */
  loginUser(user: IUser): Promise<string>;
}

class AuthHandler implements IAuthHandler {
  public constructor() {}

  public createUser = async (
    user: IUser
  ): Promise<{ token: string; uuid: string }> => {
    const id = uuid();
    user.uuid = id;

    let model = new UserModel(user);
    try {
      await model.validate();
    } catch (e) {
      throw new TypedError(ErrorType.Validation, e.message);
    }

    let dup = await UserModel.findOne({ email: user.email });
    if (dup) {
      throw new TypedError(ErrorType.Validation, "Email already exists");
    }

    model.password = await bcrypt.hash(model.password, 10);
    await model.save();

    const token = this.generateAuthToken(user);
    return { token, uuid: id };
  };

  public deleteUser = async (email: string): Promise<void> => {
    if (!email) {
      throw new TypedError(
        ErrorType.Internal,
        "Email missing, cannot delete user."
      );
    }
    await UserModel.deleteOne({ email });
  };

  public loginUser = async (user: IUser): Promise<string> => {
    if (!user.email) {
      throw new TypedError(ErrorType.Validation, "Email cannot be blank.");
    } else if (!user.password) {
      throw new TypedError(ErrorType.Validation, "Password cannot be blank.");
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
      return token;
    }
    throw new TypedError(ErrorType.Validation, "Password is incorrect");
  };

  private generateAuthToken(user: IUser): string {
    return jwt.sign(user, config.privateKey, { expiresIn: "1h" });
  }
}

export default AuthHandler;
