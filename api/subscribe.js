// ─────────────────────────────────────────────────────────────────────────────
// Konbini 108 · Newsletter subscribe endpoint
// Runs as a Vercel Serverless Function at POST /api/subscribe
//
// REQUIRED VERCEL ENVIRONMENT VARIABLES (set in Vercel dashboard → Settings → Environment Variables):
//   MAILCHIMP_API_KEY   — your Mailchimp API key (format: xxxxxxxxxxxx-us14)
//   MAILCHIMP_AUDIENCE_ID — the audience/list ID (e.g. 9318507adb)
//
// The server-side call keeps the API key SECRET — it is never sent to the browser.
// ─────────────────────────────────────────────────────────────────────────────

module.exports = async (req, res) => {
  // CORS (allow browser POST from same origin; harmless for a same-domain deploy)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method not allowed. Use POST.' });
  }

  // ── Parse body ──
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const email = (body && body.email || '').trim().toLowerCase();
  const matchedMember = (body && body.matched_member || '').trim().toLowerCase();

  // ── Validate email ──
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
  }

  // ── Check env vars ──
  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
  if (!API_KEY || !AUDIENCE_ID) {
    console.error('[subscribe] Missing MAILCHIMP_API_KEY or MAILCHIMP_AUDIENCE_ID env vars');
    return res.status(500).json({ ok: false, error: 'Server not configured. Please contact support.' });
  }

  // Datacenter is the suffix of the API key (e.g. "ca854...-us14" → "us14")
  const dc = API_KEY.split('-')[1];
  if (!dc) {
    console.error('[subscribe] Invalid API key format (no datacenter suffix)');
    return res.status(500).json({ ok: false, error: 'Server not configured properly.' });
  }

  // ── Build Mailchimp payload ──
  // status: "pending" = double opt-in (Mailchimp sends a confirmation email)
  //         "subscribed" = single opt-in (immediate)
  // Switch to 'subscribed' below if Avex prefers single opt-in.
  const payload = {
    email_address: email,
    status: 'pending', // ← double opt-in (recommended, GDPR-safe)
    tags: matchedMember ? [`matched:${matchedMember}`, 'source:konbini108'] : ['source:konbini108'],
    merge_fields: matchedMember ? { MATCHED: matchedMember.toUpperCase() } : {},
  };

  const mailchimpUrl = `https://${dc}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;
  const auth = 'Basic ' + Buffer.from('anystring:' + API_KEY).toString('base64');

  try {
    const mcRes = await fetch(mailchimpUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth,
      },
      body: JSON.stringify(payload),
    });

    const data = await mcRes.json().catch(() => ({}));

    if (mcRes.ok) {
      return res.status(200).json({ ok: true, message: 'Check your inbox to confirm ★' });
    }

    // Already subscribed → friendly message, not an error
    if (data.title === 'Member Exists' || (data.detail && String(data.detail).includes('already a list member'))) {
      return res.status(200).json({ ok: true, message: "You're already on the list ★" });
    }

    // Mailchimp-side error
    console.error('[subscribe] Mailchimp error:', mcRes.status, data);
    return res.status(400).json({
      ok: false,
      error: data.detail || data.title || 'Something went wrong. Please try again.',
    });
  } catch (err) {
    console.error('[subscribe] Network/fetch error:', err);
    return res.status(500).json({ ok: false, error: 'Network error. Please try again.' });
  }
};
