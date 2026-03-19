export async function scheduleCall(delaySeconds: number, body: Record<string, unknown>) {
  const vercelUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.BASE_URL;
  const callbackUrl = `${vercelUrl}/api/trigger-call`;
  
  console.log('QStash scheduling:', { delaySeconds, callbackUrl, hasToken: !!process.env.QSTASH_TOKEN });

  const response = await fetch("https://qstash.upstash.io/v2/publish/" + callbackUrl, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.QSTASH_TOKEN}`,
      "Content-Type": "application/json",
      "Upstash-Delay": `${delaySeconds}s`,
    },
    body: JSON.stringify(body),
  });

  const responseText = await response.text();
  console.log('QStash response:', { status: response.status, body: responseText });

  if (!response.ok) {
    throw new Error(`QStash scheduling failed: ${response.status} ${response.statusText} - ${responseText}`);
  }
}