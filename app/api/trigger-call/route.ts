import { NextRequest, NextResponse } from "next/server";
import { makeCall } from "@/app/lib/twilio";

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE) {
      return NextResponse.json({ error: 'Twilio credentials not configured' }, { status: 500 });
    }

    console.log('Trigger call endpoint:', { phone, from: process.env.TWILIO_PHONE });

    const call = await makeCall(phone);

    return NextResponse.json({ success: true, call: { sid: call.sid, status: call.status } });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const errorCode = (error as any)?.code;
    const errorStatus = (error as any)?.status;
    
    console.error('Trigger call error:', { errorMessage, errorCode, errorStatus, error });
    
    return NextResponse.json(
      { 
        error: 'Failed to make call',
        details: errorMessage,
        code: errorCode,
        status: errorStatus,
      },
      { status: 500 }
    );
  }
}