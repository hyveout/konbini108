// Konbini 108 — Newsletter signup component
//
// To wire this up to a real newsletter service:
// 1. Sign up for Beehiiv / Mailchimp / ConvertKit
// 2. Get your "embed form action URL" from their dashboard
// 3. Paste it into NEWSLETTER_ACTION below
// 4. If your provider uses a different field name (e.g. "EMAIL" for Mailchimp
//    or "email_address[email]" for ConvertKit), update EMAIL_FIELD too.
//
// Currently set to a stub that just shows a success message locally.

const NEWSLETTER_ACTION = ''; // e.g. 'https://your-newsletter.beehiiv.com/api/v2/publications/pub_xxxx/subscriptions'
const EMAIL_FIELD = 'email';

function NewsletterSignup({ compact = false }) {
  const [email, setEmail] = React.useState('');
  const [state, setState] = React.useState('idle'); // idle | loading | success | error

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setState('loading');

    if (!NEWSLETTER_ACTION) {
      // Local stub: pretend it worked so the design can be tested
      await new Promise(r => setTimeout(r, 600));
      // Save locally so we know they signed up
      const subs = JSON.parse(localStorage.getItem('k108-newsletter-subs') || '[]');
      if (!subs.includes(email)) subs.push(email);
      localStorage.setItem('k108-newsletter-subs', JSON.stringify(subs));
      setState('success');
      return;
    }

    try {
      const fd = new FormData();
      fd.append(EMAIL_FIELD, email);
      const res = await fetch(NEWSLETTER_ACTION, { method: 'POST', body: fd, mode: 'no-cors' });
      setState('success');
    } catch (err) {
      setState('error');
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
          ありがとうございます ・ WELCOME TO KONBINI 108
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
      {state === 'error' && (
        <div style={{ fontFamily: 'VT323, monospace', fontSize: 12, color: '#FCA5A5', marginTop: 6 }}>
          Something went wrong — try again?
        </div>
      )}
    </div>
  );
}

window.NewsletterSignup = NewsletterSignup;
