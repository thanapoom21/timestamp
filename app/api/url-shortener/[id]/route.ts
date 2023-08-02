import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { urls } from "../route"

export async function GET(request: NextRequest, { params }: { params: { id: number } }) {
  let short_url = params.id
  let entry = urls.find(obj => obj.short_url == short_url);

  if (entry) {
    let long_url = entry.original_url;
    
    if (long_url) {
      return NextResponse.redirect(long_url);
    } else {
      return NextResponse.json({ "error": "Not Found." })
    }
  }
}