import mongoose from "mongoose";
import IUserStats from "../interfaces/IUserStats";

const UserStats = new mongoose.Schema({
  uuid: {
    type: String,
    required: [true, "Error: no UUID provided."]
  },
  health: {
    type: Number,
    min: 0,
    max: 100,
    required: [true, "Error: no health stat provided."]
  },
  healthExp: {
    type: Number,
    min: 0,
    required: [true, "Error: no health exp provided."]
  },
  strength: {
    type: Number,
    min: 0,
    max: 100,
    required: [true, "Error: no strength stat provided."]
  },
  strengthExp: {
    type: Number,
    min: 0,
    required: [true, "Error: no strength exp provided."]
  },
  speed: {
    type: Number,
    min: 0,
    max: 100,
    required: [true, "Error: no speed stat provided."]
  },
  speedExp: {
    type: Number,
    min: 0,
    required: [true, "Error: no speed exp provided."]
  },
  stamina: {
    type: Number,
    min: 0,
    max: 100,
    required: [true, "Error: no stamina stat provided."]
  },
  staminaExp: {
    type: Number,
    min: 0,
    required: [true, "Error: no stamina exp provided."]
  }
});

UserStats.index({ uuid: 1 }, { unique: true });

export default mongoose.model<IUserStats & mongoose.Document>(
  "UserStats",
  UserStats
);
