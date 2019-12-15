import mongoose from "mongoose";
import IUser from "../Interfaces/IUser";

const User = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Error: no first name provided."]
  },
  lastName: {
    type: String,
    required: [true, "Error: no last name provided."]
  },
  email: {
    type: String,
    required: [true, "Error: no email provided."],
    index: true
  },
  password: {
    type: String,
    required: [true, "Error: no password provided."]
  },
  uuid: {
    type: String,
    required: [true, "Error: no email provided."],
    index: true
  }
});

export default mongoose.model<IUser & mongoose.Document>("User", User);
