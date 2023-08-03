import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import dns from 'dns';

export const urls: {
  original_url: string,
  short_url: number
}[] = [];

export async function POST(request: NextRequest) {
  let formData = await request.formData()
  let url = formData.get('url') as string
  let urlNoTrailingSlash = url.replace(/\/*$/, '');
  let domainWithPath = urlNoTrailingSlash.replace(/^https?:\/\//, '')
  let domainName = domainWithPath.split('/')[0]
  let newURL: {
    original_url: string,
    short_url: number
  }

  if (domainName == "") {
    return NextResponse.json(`Domain name is not provided.`)
  } else {
    dns.lookup(domainName, (err, address, family) => {
      console.log(`Address: ${address}, Family: ${family}`)
      if (err || !address) {
        return NextResponse.json({ error: "Invalid URL" })
      } else {
        newURL = {
          original_url: url,
          short_url: urls.length
        }

        urls.push(newURL)
      }
    })

    return NextResponse.json({"Message": "It works."})
  }
}