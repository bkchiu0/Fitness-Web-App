import UserStatsModel from "../models/userStats";
import IUserStats from "../interfaces/IUserStats";
import TypedError from "../classes/TypedError";
import userStatsFactory from "../classes/UserStatsFactory";
import { ErrorType } from "../interfaces/IError";
import { IAction, ActionType } from "../interfaces/IAction";

/**
 * The handler interface for UserStats
 */
export interface IUserStatsHandler {
  /**
   * Creates new entries of stats for the specified user.
   * @param uuid the id of the requested
   */
  createNewStats(uuid: string): Promise<void>;
  /**
   * Retrieves the user stats given the user id.
   * @param uuid the id of the requested
   */
  getStats(uuid: string): Promise<IUserStats>;
  /**
   * Performs an action and updates the user's stats.
   * @param uuid the id of the user performing the action
   * @param action the action done by the user
   */
  performAction(uuid: string, action: IAction): Promise<IUserStats>;
}

class UserStatsHandler implements IUserStatsHandler {
  public constructor() {}

  public createNewStats = async (uuid: String): Promise<void> => {
    if (!uuid) {
      throw new TypedError(ErrorType.Validation, "No uuid was provided.");
    }
    const dup = UserStatsModel.findOne({ uuid });
    if (dup) {
      throw new TypedError(ErrorType.Internal, "UUID already exists.");
    }
    const user = new UserStatsModel(userStatsFactory(uuid));

    await user.save();
  };

  public getStats = async (uuid: String): Promise<IUserStats> => {
    const user = await UserStatsModel.findOne({ uuid });
    return userStatsFactory(
      undefined,
      user.health,
      user.healthExp,
      user.strength,
      user.strengthExp,
      user.speed,
      user.speedExp,
      user.stamina,
      user.staminaExp
    );
  };

  public performAction = async (
    uuid: string,
    action: IAction
  ): Promise<IUserStats> => {
    const stats = await UserStatsModel.findOne({ uuid });
    await stats.save();
    return userStatsFactory(undefined);
  };
}

export default UserStatsHandler;
