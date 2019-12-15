import IUser from "../Interfaces/IUser";

export interface IAuthHandler {
  createUser(user: IUser): Promise<void>;
}

class AuthHandler implements IAuthHandler {
  constructor() {}

  async createUser(user: IUser): Promise<void> {}
}

export default AuthHandler;
