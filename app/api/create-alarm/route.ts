import { NextRequest, NextResponse } from "next/server";
import { scheduleCall } from "@/app/lib/qstash";

export async function POST(req: NextRequest) {
  try {
    const { phone, delaySeconds, calls } = await req.json();

    if (!process.env.QSTASH_TOKEN) {
      return NextResponse.json({ error: 'QStash token not configured' }, { status: 500 });
    }

    for (let i = 0; i < calls; i++) {
      await scheduleCall(delaySeconds + i * 60, { phone });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error scheduling alarm:', error);
    return NextResponse.json({ error: 'Failed to schedule alarm' }, { status: 500 });
  }
}