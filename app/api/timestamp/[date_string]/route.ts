import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: { params: { date_string: string } }) {
  let timestamp: Date = new Date();
  if (params.date_string == null) {
    timestamp = new Date(Date.now())
  } else if (params.date_string != null && /^[0-9]*$/g.test(params.date_string)) {
    timestamp = new Date(parseInt(params.date_string, 10))
  } else {
    timestamp = new Date(params.date_string)
  }

  let unixTime = timestamp.getTime();

  return NextResponse.json(Number.isNaN(unixTime)
    ? { error: "Invalid Date", message: "this code has been refactored to eliminate nested ternary operators!!" }
    : { unix: unixTime, utc: timestamp.toUTCString() })
}