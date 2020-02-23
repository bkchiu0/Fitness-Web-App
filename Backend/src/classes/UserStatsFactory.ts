import IUserStats from "interfaces/IUserStats";

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
  uuid: string,
  health: number = 0,
  healthExp: number = 0,
  strength: number = 0,
  strengthExp: number = 0,
  speed: number = 0,
  speedExp: number = 0,
  stamina: number = 0,
  staminaExp: number = 0
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
