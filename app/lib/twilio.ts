import Twilio from "twilio";

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function makeCall(phone: string) {
  return client.calls.create({
    url: "http://demo.twilio.com/docs/voice.xml",
    to: phone,
    from: process.env.TWILIO_PHONE!,
  });
}