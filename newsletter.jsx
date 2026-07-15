// Konbini 108 — Newsletter signup component
//
// Wired to a Vercel serverless function at /api/subscribe which calls Mailchimp.
// The Mailchimp API key + Audience ID live in Vercel env vars — NOT in this file.
// See /api/subscribe.js and .env.example for setup.

function NewsletterSignup({ compact = false, matchedMember = '' }) {
  const [email, setEmail] = React.useState('');
  const [consent, setConsent] = React.useState(false);
  const [state, setState] = React.useState('idle'); // idle | loading | success | error
  const [message, setMessage] = React.useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    if (!consent) {
      setState('error');
      setMessage('Please agree to the terms to continue.');
      return;
    }
    setState('loading');
    setMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          matched_member: matchedMember || '',
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setState('success');
        setMessage(data.message || "You're on the list ★");
      } else {
        setState('error');
        setMessage(data.error || 'Something went wrong — try again?');
      }
    } catch (err) {
      setState('error');
      setMessage('Network error. Check your connection and try again.');
    }
  };

  if (state === 'success') {
    return (
      <div style={{
        background: 'var(--yellow)', color: 'var(--ink)',
        border: '3px solid var(--ink)', boxShadow: '4px 4px 0 var(--red)',
        padding: compact ? '10px 14px' : '14px 18px',
        textAlign: 'center',
        fontFamily: 'Bebas Neue',
      }}>
        <div style={{ fontSize: compact ? 16 : 20, letterSpacing: '0.1em' }}>
          YOU'RE ON THE LIST
        </div>
        <div style={{ fontFamily: 'VT323, monospace', fontSize: compact ? 12 : 14, marginTop: 4, letterSpacing: '0.05em' }}>
          {message || 'ありがとうございます ・ WELCOME TO KONBINI 108'}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'var(--ink)', color: '#fff',
      border: '3px solid var(--yellow)',
      boxShadow: '4px 4px 0 var(--red)',
      padding: compact ? '12px 14px' : '16px 18px',
    }}>
      <div style={{
        fontFamily: 'Bebas Neue',
        fontSize: compact ? 15 : 18,
        color: 'var(--yellow)',
        letterSpacing: '0.12em',
        marginBottom: 4,
      }}>
        ★ JOIN THE MAILING LIST
      </div>
      <div style={{
        fontFamily: 'VT323, monospace',
        fontSize: compact ? 12 : 13,
        opacity: 0.85, marginBottom: 10,
        letterSpacing: '0.04em',
      }}>
        Get first dibs on new drops, merch & tour dates from ONE OR EIGHT.
      </div>
      <form onSubmit={submit}>
        <div style={{ display: 'flex', gap: 6 }}>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            disabled={state === 'loading'}
            style={{
              flex: 1, minWidth: 0,
              background: '#fff', color: 'var(--ink)',
              border: '2px solid var(--yellow)',
              padding: '8px 10px',
              fontFamily: 'VT323, monospace', fontSize: 15,
              outline: 'none',
            }}
          />
          <button type="submit" disabled={state === 'loading' || !consent} className="press" style={{
            background: state === 'loading' || !consent ? '#555' : 'var(--yellow)',
            color: state === 'loading' || !consent ? '#aaa' : 'var(--ink)',
            fontFamily: 'Bebas Neue',
            fontSize: compact ? 14 : 15,
            letterSpacing: '0.1em',
            padding: '8px 14px',
            border: '2px solid var(--yellow)',
            cursor: state === 'loading' ? 'wait' : (!consent ? 'not-allowed' : 'pointer'),
            whiteSpace: 'nowrap',
            opacity: !consent ? 0.6 : 1,
            transition: 'opacity 0.15s, background 0.15s',
          }}>
            {state === 'loading' ? '...' : 'SIGN UP'}
          </button>
        </div>
        {/* Marketing consent — required for GDPR compliance */}
        <label style={{
          display: 'flex', alignItems: 'flex-start', gap: 8,
          marginTop: 10,
          fontFamily: 'VT323, monospace',
          fontSize: compact ? 11 : 12,
          color: '#fff',
          opacity: 0.85,
          letterSpacing: '0.02em',
          lineHeight: 1.35,
          cursor: 'pointer',
        }}>
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => {
              setConsent(e.target.checked);
              if (state === 'error' && e.target.checked) {
                setState('idle'); setMessage('');
              }
            }}
            style={{
              // Custom accent so the tick uses the brand yellow instead of default blue
              accentColor: '#FFD60A',
              width: 14, height: 14,
              marginTop: 2,
              flexShrink: 0,
              cursor: 'pointer',
            }}
          />
          <span>
            I agree to join the ONE OR EIGHT newsletter and accept the{' '}
            <a
              href="https://oneoreight.com/privacypolicy/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'var(--yellow)',
                textDecoration: 'underline',
                textUnderlineOffset: 2,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              Terms &amp; Privacy Policy
            </a>.
          </span>
        </label>
      </form>
      {state === 'error' && message && (
        <div style={{ fontFamily: 'VT323, monospace', fontSize: 12, color: '#FCA5A5', marginTop: 6 }}>
          {message}
        </div>
      )}
    </div>
  );
}

window.NewsletterSignup = NewsletterSignup;
