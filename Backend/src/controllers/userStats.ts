import { Router, Request, Response, RequestHandler } from "express";

import IController from "interfaces/IController";
import IUser from "interfaces/IUser";
import { IError } from "interfaces/IError";
import { IUserStatsHandler } from "handlers/userStats";
import { IAction } from "interfaces/IAction";

class UserStatsController implements IController {
  private router: Router;
  private handler: IUserStatsHandler;

  constructor(handler: IUserStatsHandler, auth: RequestHandler) {
    this.handler = handler;
    this.router = Router();

    this.router.get("/get", auth, this.getUserStats);
    this.router.post("/action", auth, this.createAction);
  }

  public getRouter = (): Router => {
    return this.router;
  };

  private getUserStats = async (req: Request, res: Response) => {
    try {
      const { authenticatedUser }: { authenticatedUser: IUser } = req.body;
      const stats = await this.handler.getStats(authenticatedUser.uuid);
      stats.uuid = undefined;
      res.status(200).send(stats);
    } catch (e) {
      this.handleError(e, res);
    }
  };

  private createAction = async (req: Request, res: Response) => {
    try {
      const {
        authenticatedUser,
        action
      }: { authenticatedUser: IUser; action: IAction } = req.body;
      const newStats = await this.handler.performAction(
        authenticatedUser.uuid,
        action
      );
      res.status(200).send(newStats);
    } catch (e) {
      this.handleError(e, res);
    }
  };

  private handleError = (e: IError, res: Response): void => {
    console.error("Error:", e);
    res.status(e.type || 500).send(e);
  };
}

export default UserStatsController;
