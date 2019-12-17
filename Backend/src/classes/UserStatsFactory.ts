import IUserStats from "../interfaces/IUserStats";

/**
 * Creates a new IUserStats object
 * @param uuid
 * @param health
 * @param healthExp
 * @param strength
 * @param strengthExp
 * @param speed
 * @param speedExp
 * @param stamina
 * @param staminaExp
 */
const createUserStatsObj = (
  uuid: String,
  health: Number = 0,
  healthExp: Number = 0,
  strength: Number = 0,
  strengthExp: Number = 0,
  speed: Number = 0,
  speedExp: Number = 0,
  stamina: Number = 0,
  staminaExp: Number = 0
): IUserStats => ({
  uuid,
  health,
  healthExp,
  strength,
  strengthExp,
  speed,
  speedExp,
  stamina,
  staminaExp
});

export default createUserStatsObj;
