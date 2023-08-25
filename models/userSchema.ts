import { IUser } from '../types/interfaces/schemaTypes'
import { Schema, model, models } from "mongoose";

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    require: true,
    unique: true
  }
})

// Checking if the model exists then use it, otherwise create it.
let User = models.User || model('User', userSchema);

export default User;