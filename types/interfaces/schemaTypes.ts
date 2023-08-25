export interface IUser {
  username: {
    type: string,
    require: boolean,
    unique: boolean
  };
}

export interface IExercise {
  user_id: { type: string, required: boolean },
  description: { type: string, required: boolean },
  duration: { type: number, required: boolean },
  date: { type: Date }
}