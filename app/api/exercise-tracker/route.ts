import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import dbConnect from '../../../lib/dbConnect'
import User from '../../../models/userSchema'

export async function GET(request: NextRequest) {
  await dbConnect();
  let users = await User.find({});

  if (users.length == 0) {
    return NextResponse.json("No users found!");
  } else {
    return NextResponse.json(users);
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const formData = await request.formData()
    let username = formData.get('username')
    if (!username) {
      return NextResponse.json({ error: 'The username has to be provided.' })
    } else {
      let newUser = await User.create({ username })

      return NextResponse.json({
        username: newUser.username,
        _id: newUser._id,
      })
    }
  } catch (err) {
    return NextResponse.json({ error: err, message: 'The user has already been created.' })
  }
}
