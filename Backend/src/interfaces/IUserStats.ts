/**
 * Represents the stats of the user of the application.
 */
interface IUserStats {
  uuid: String;
  health: Number;
  healthExp: Number;
  strength: Number;
  strengthExp: Number;
  speed: Number;
  speedExp: Number;
  stamina: Number;
  staminaExp: Number;
}

export default IUserStats;
