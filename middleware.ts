import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function middleware(req: NextRequest) {
  // this if block is for testing purpose only.
  if (req.nextUrl.pathname == "/api/hello") {
    if (req.method != 'POST') {
      return new NextResponse("Cannot access this endpoint with " + req.method, { status: 400 })
    }
    return NextResponse.next();
  }
}
