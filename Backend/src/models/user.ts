import mongoose from "mongoose";
import IUser from "interfaces/IUser";

const User = new mongoose.Schema({
  firstName: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: [true, "Error: no first name provided."]
  },
  lastName: {
    type: String,
    minlength: 2,
    maxlength: 50,
    required: [true, "Error: no last name provided."]
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: [true, "Error: no email provided."]
  },
  password: {
    type: String,
    minlength: 8,
    maxlength: 255,
    required: [true, "Error: no password provided."]
  },
  uuid: {
    type: String,
    required: [true, "Error: no UUID provided."]
  }
});

User.index({ email: 1 }, { unique: true });

export default mongoose.model<IUser & mongoose.Document>("User", User);
