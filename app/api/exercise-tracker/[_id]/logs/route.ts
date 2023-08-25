import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import dbConnect from '../../../../../lib/dbConnect'
import User from '../../../../../models/userSchema'
import Exercise from '../../../../../models/exerciseSchema'

export async function GET(request: NextRequest, {
  params
}: {
  params: { _id: number }
}) {
  await dbConnect();
  try {
    let userID = params._id;
    let userFound = await User.findById(userID)
    let exercises = await Exercise.find({ user_id: userID }).select({ user_id: 0 })

    if (exercises.length) {
      return NextResponse.json({
        "_id": userFound._id,
        "username": userFound.username,
        "exercises_count": exercises.length,
        "log": exercises.map(ex => ({
          "date": ex.date.toDateString(),
          "duration": ex.duration,
          "description": ex.description,
        }))
      })
    } else {
      return NextResponse.json(userFound)
    }

  } catch (err) {
    return NextResponse.json({ error: err, message: 'There must be something wrong.' })
  }
}

