import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import dbConnect from '../../../../../lib/dbConnect'
import User from '../../../../../models/userSchema'
import Exercise from '../../../../../models/exerciseSchema'

export async function POST(request: NextRequest, { params }: { params: { _id: number } }) {
  await dbConnect();
  try {
    let userID = params._id;
    const formData = await request.formData()
    let description = formData.get('description') as string
    let duration = formData.get('duration') as string
    let date = formData.get('date') as string
    let payloadDate = new Date(date).toDateString();
    let now = new Date(Date.now()).toDateString();

    let userFound = await User.findById(userID)
    let exercise = await Exercise.create({
      user_id: userFound._id,
      description,
      duration,
      date: date ? payloadDate : now
    })

    return NextResponse.json(exercise)
  } catch (err) {
    return NextResponse.json({ error: err, message: 'There must be something wrong.' })
  }
}
