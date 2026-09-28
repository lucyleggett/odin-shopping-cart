import Channel3 from "@channel3/sdk";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const apiKey = process.env.CHANNEL3_API_KEY;
  if (!apiKey) {
    return res
      .status(500)
      .json({ error: "Missing CHANNEL3_API_KEY on Vercel" });
  }

  const {
    query,
    filters = { brand_ids: ["YPRD"] },
    limit = 20,
  } = req.body ?? {};
  if (!query) {
    return res.status(400).json({ error: "Missing query" });
  }

  try {
    const client = new Channel3({ apiKey });
    const results = await client.products.search({ query, filters, limit });
    return res.status(200).json(results);
  } catch (error) {
    return res.status(error.status || 500).json({ error: error.message });
  }
}
