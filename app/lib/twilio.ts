import Twilio from "twilio";

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function makeCall(phone: string) {
  console.log('Twilio makeCall:', {
    phone,
    from: process.env.TWILIO_PHONE,
    hasAccountSid: !!process.env.TWILIO_ACCOUNT_SID,
    hasAuthToken: !!process.env.TWILIO_AUTH_TOKEN,
  });

  try {
    const call = await client.calls.create({
      url: "http://demo.twilio.com/docs/voice.xml",
      to: phone,
      from: process.env.TWILIO_PHONE!,
    });
    console.log('Twilio call created:', { callSid: call.sid, status: call.status });
    return call;
  } catch (error) {
    console.error('Twilio error:', {
      errorMessage: error instanceof Error ? error.message : String(error),
      errorCode: (error as any)?.code,
      errorStatus: (error as any)?.status,
      details: error,
    });
    throw error;
  }
}