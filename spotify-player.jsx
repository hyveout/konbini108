// Konbini 108 — persistent Spotify player
// Sits fixed bottom-left (out of the way of the RIGHT-side REGISTER button and match reveal).
// Small icon-only collapsed state; expandable to full Spotify embed.

const SPOTIFY_TRACK_ID = '3cHkS1oZDYBY31NXdqVCLw';
const SPOTIFY_EMBED = `https://open.spotify.com/embed/track/${SPOTIFY_TRACK_ID}?utm_source=oembed`;

function SpotifyPlayer() {
  const [open, setOpen] = React.useState(() => {
    const saved = localStorage.getItem('k108-player-open');
    return saved === '1'; // default CLOSED
  });
  React.useEffect(() => { localStorage.setItem('k108-player-open', open ? '1' : '0'); }, [open]);

  const [isNarrow, setIsNarrow] = React.useState(() => typeof window !== 'undefined' && window.innerWidth < 500);
  React.useEffect(() => {
    const onR = () => setIsNarrow(window.innerWidth < 500);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);

  // Track current screen so we can offset above the bottom bar on aisle/cart/receipt
  const [screen, setScreen] = React.useState(() => localStorage.getItem('k108-screen') || 'splash');
  React.useEffect(() => {
    const onS = () => setScreen(localStorage.getItem('k108-screen') || 'splash');
    window.addEventListener('storage', onS);
    const t = setInterval(onS, 400);
    return () => { window.removeEventListener('storage', onS); clearInterval(t); };
  }, []);

  // Bottom offset:
  // - Aisle / cart / receipt have a ~90px fixed bottom bar → sit above it on mobile
  // - Splash has no bottom bar → sit near the corner
  const hasBottomBar = screen !== 'splash';
  const bottomOffset = hasBottomBar
    ? (isNarrow ? 96 : 24)
    : (isNarrow ? 16 : 20);

  // Position: bottom-LEFT on mobile (so it doesn't cover the REGISTER button on the right)
  //           bottom-right on desktop (traditional spot)
  const positionSide = isNarrow ? { left: 12 } : { right: 20 };

  return (
    <div style={{
      position: 'fixed',
      ...positionSide,
      bottom: `calc(env(safe-area-inset-bottom, 0px) + ${bottomOffset}px)`,
      zIndex: 90,
      pointerEvents: 'auto',
    }}>
      {open ? (
        <div style={{
          width: isNarrow ? 'min(280px, calc(100vw - 24px))' : 300,
          background: '#0F1419',
          border: '2.5px solid var(--yellow)',
          boxShadow: '3px 3px 0 var(--red), 0 8px 24px rgba(0,0,0,0.5)',
          position: 'relative',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            background: 'var(--yellow)', color: 'var(--ink)',
            padding: '3px 8px',
            fontFamily: 'Bebas Neue', fontSize: 11, letterSpacing: '0.1em',
            borderBottom: '2px solid var(--ink)',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span className="blink" style={{ color: 'var(--red)', fontSize: 10 }}>●</span>
              NOW PLAYING
            </span>
            <span style={{ flex: 1 }}/>
            <button onClick={() => setOpen(false)} aria-label="Close player" style={{
              background: 'var(--ink)', color: 'var(--yellow)',
              width: 20, height: 18, fontFamily: 'Bebas Neue', fontSize: 11,
              border: '1.5px solid var(--ink)', lineHeight: 1, cursor: 'pointer',
            }}>×</button>
          </div>
          <iframe
            title="Spotify — Yankee Squat"
            src={SPOTIFY_EMBED}
            width="100%" height="80"
            style={{ display: 'block', border: 0 }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      ) : (
        <button onClick={() => setOpen(true)}
          aria-label="Open music player"
          className="press" style={{
            background: 'var(--yellow)',
            color: 'var(--ink)',
            width: 44, height: 44,
            border: '2.5px solid var(--ink)',
            boxShadow: '2.5px 2.5px 0 var(--red)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
        }}>
          <span style={{ fontSize: 22, lineHeight: 1 }}>♪</span>
          <span className="blink" style={{
            position: 'absolute', top: -4, right: -4,
            width: 10, height: 10, background: 'var(--red)',
            border: '2px solid var(--ink)', borderRadius: '50%',
          }}/>
        </button>
      )}
    </div>
  );
}

window.SpotifyPlayer = SpotifyPlayer;
