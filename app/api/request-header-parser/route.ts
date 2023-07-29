import { NextResponse } from "next/server";
import type{ NextRequest } from "next/server";
import { headers } from 'next/headers';

export async function GET(request: NextRequest) {
  const headersList = headers()
  const url = request.nextUrl
  const acceptLanguage = headersList.get('accept-language')
  const userAgent = headersList.get('user-agent')
  
  return NextResponse.json({
    url: url,
    language: acceptLanguage,
    software: userAgent
  })
}