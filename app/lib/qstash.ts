export async function scheduleCall(delaySeconds: number, body: Record<string, unknown>) {
  const baseUrl = process.env.VERCEL_URL || process.env.BASE_URL;
  const response = await fetch("https://qstash.upstash.io/v2/publish/" + baseUrl + "/api/trigger-call", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.QSTASH_TOKEN}`,
      "Content-Type": "application/json",
      "Upstash-Delay": `${delaySeconds}s`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`QStash scheduling failed: ${response.status} ${response.statusText}`);
  }
}