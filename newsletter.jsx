// Konbini 108 — Newsletter signup component
//
// Wired to a Vercel serverless function at /api/subscribe which calls Mailchimp.
// The Mailchimp API key + Audience ID live in Vercel env vars — NOT in this file.
// See /api/subscribe.js and .env.example for setup.

function NewsletterSignup({ compact = false, matchedMember = '' }) {
  const [email, setEmail] = React.useState('');
  const [state, setState] = React.useState('idle'); // idle | loading | success | error
  const [message, setMessage] = React.useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
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
          ★ YOU'RE ON THE LIST ★
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
      <form onSubmit={submit} style={{ display: 'flex', gap: 6 }}>
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
        <button type="submit" disabled={state === 'loading'} className="press" style={{
          background: state === 'loading' ? '#888' : 'var(--yellow)',
          color: 'var(--ink)',
          fontFamily: 'Bebas Neue',
          fontSize: compact ? 14 : 15,
          letterSpacing: '0.1em',
          padding: '8px 14px',
          border: '2px solid var(--yellow)',
          cursor: state === 'loading' ? 'wait' : 'pointer',
          whiteSpace: 'nowrap',
        }}>
          {state === 'loading' ? '...' : 'SIGN UP ▶'}
        </button>
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
