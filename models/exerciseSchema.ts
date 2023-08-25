import { IExercise } from '../types/interfaces/schemaTypes'
import { Schema, model, models } from "mongoose";

const exerciseSchema = new Schema<IExercise>({
  user_id: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
  date: { type: Date },
})

let Exercise = models.Exercise || model('Exercise', exerciseSchema);

export default Exercise;