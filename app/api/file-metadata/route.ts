import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import multer from 'multer';

const upload = multer({ dest: 'uploads/' })

export async function GET(request: NextRequest) {
  return NextResponse.json("File Metadata home page on get request.")
}

export async function POST(request: NextRequest) {
  try {
    return NextResponse.json("This app is not ready yet! Try again next time.")
  } catch( err) {
    return NextResponse.json("There must be an error!")
  }
}