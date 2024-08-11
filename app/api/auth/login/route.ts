import { NextRequest, NextResponse } from "next/server";

export function POST() {
    return NextResponse.json({ message: "Hello, Next.js Serverless!" });
}