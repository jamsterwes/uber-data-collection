import { NextResponse } from "next/server";

export function GET() {
    // Convert the data to CSV...

    // Turn CSV into response
    const res = new NextResponse("bla,bla,bla");

    // Set MIME type
    res.headers.set('Content-Type', 'text/csv');

    // Return response
    return res;
}