import { NextRequest, NextResponse } from "next/server";
import { makeCall } from "@/app/lib/twilio";

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE) {
      return NextResponse.json({ error: 'Twilio credentials not configured' }, { status: 500 });
    }

    await makeCall(phone);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error making call:', error);
    return NextResponse.json({ error: 'Failed to make call' }, { status: 500 });
  }
}