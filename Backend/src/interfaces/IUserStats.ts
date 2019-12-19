/**
 * Represents the stats of the user of the application.
 */
interface IUserStats {
  uuid: string;
  health: number;
  healthExp: number;
  strength: number;
  strengthExp: number;
  speed: number;
  speedExp: number;
  stamina: number;
  staminaExp: number;
}

export default IUserStats;
