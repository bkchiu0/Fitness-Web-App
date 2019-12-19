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
  private EXP_GAIN_CONST: number;
  public constructor(constant?: number) {
    this.EXP_GAIN_CONST = constant ? constant : 100;
  }

  public createNewStats = async (uuid: string): Promise<void> => {
    if (!uuid) {
      throw new TypedError(ErrorType.Validation, "No uuid was provided.");
    }
    const dup = await UserStatsModel.findOne({ uuid });
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
    this.updateStats(stats, action);
    await stats.save();
    return userStatsFactory(
      undefined,
      stats.health,
      stats.healthExp,
      stats.strength,
      stats.strengthExp,
      stats.speed,
      stats.speedExp,
      stats.stamina,
      stats.staminaExp
    );
  };

  private updateStats = (stats: IUserStats, action: IAction): void => {
    const durationMultiplier: number = parseFloat(
      (action.duration / 60).toFixed(1)
    );
    // Add exp based on the type of exercise done
    switch (action.type) {
      case ActionType.BalanceTraining:
        stats.healthExp += 0.1 * this.EXP_GAIN_CONST * durationMultiplier;
        stats.staminaExp += 0.6 * this.EXP_GAIN_CONST * durationMultiplier;
        stats.strengthExp += 0.4 * this.EXP_GAIN_CONST * durationMultiplier;
      case ActionType.EnduranceTraining:
        stats.healthExp += 0.1 * this.EXP_GAIN_CONST * durationMultiplier;
        stats.staminaExp += 0.8 * this.EXP_GAIN_CONST * durationMultiplier;
        stats.speedExp += 0.2 * this.EXP_GAIN_CONST * durationMultiplier;
      case ActionType.FlexibilityTraining:
        stats.healthExp += 0.1 * this.EXP_GAIN_CONST * durationMultiplier;
        stats.speedExp += 0.5 * this.EXP_GAIN_CONST * durationMultiplier;
        stats.staminaExp += 0.5 * this.EXP_GAIN_CONST * durationMultiplier;
      case ActionType.StrengthTraining:
        stats.healthExp += 0.1 * this.EXP_GAIN_CONST * durationMultiplier;
        stats.strengthExp += 0.8 * this.EXP_GAIN_CONST * durationMultiplier;
        stats.speedExp += 0.2 * this.EXP_GAIN_CONST * durationMultiplier;
    }
    // Level up if possible
    while (stats.healthExp >= this.calculateLevelCap(stats.health)) {
      stats.healthExp -= this.calculateLevelCap(stats.health);
      stats.health++;
    }
    while (stats.speedExp >= this.calculateLevelCap(stats.speed)) {
      stats.speedExp -= this.calculateLevelCap(stats.speed);
      stats.speed++;
    }
    while (stats.staminaExp >= this.calculateLevelCap(stats.stamina)) {
      stats.staminaExp -= this.calculateLevelCap(stats.stamina);
      stats.stamina++;
    }
    while (stats.strengthExp >= this.calculateLevelCap(stats.strength)) {
      stats.strengthExp -= this.calculateLevelCap(stats.strength);
      stats.strength++;
    }
  };

  private calculateLevelCap = (level: number): number => {
    return level ** 3 + this.EXP_GAIN_CONST;
  };
}

export default UserStatsHandler;
