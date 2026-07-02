// Konbini 108 — persistent Spotify player
// Sits fixed bottom-right, collapsible. Stays alive across screen changes.

const SPOTIFY_TRACK_ID = '3cHkS1oZDYBY31NXdqVCLw';
const SPOTIFY_EMBED = `https://open.spotify.com/embed/track/${SPOTIFY_TRACK_ID}?utm_source=oembed`;

function SpotifyPlayer() {
  const [open, setOpen] = React.useState(() => {
    const saved = localStorage.getItem('k108-player-open');
    return saved === '1'; // default CLOSED so it never blocks content
  });
  React.useEffect(() => { localStorage.setItem('k108-player-open', open ? '1' : '0'); }, [open]);

  const [isNarrow, setIsNarrow] = React.useState(() => typeof window !== 'undefined' && window.innerWidth < 500);
  React.useEffect(() => {
    const onR = () => setIsNarrow(window.innerWidth < 500);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);

  // Detect which screen we're on so we can offset above the fixed bottom bar
  // on aisle/cart/receipt, and drop lower on splash where there is no bar.
  const [screen, setScreen] = React.useState(() => localStorage.getItem('k108-screen') || 'splash');
  React.useEffect(() => {
    const onS = () => setScreen(localStorage.getItem('k108-screen') || 'splash');
    window.addEventListener('storage', onS);
    // Also poll (same-tab writes don't fire the storage event)
    const t = setInterval(onS, 400);
    return () => { window.removeEventListener('storage', onS); clearInterval(t); };
  }, []);

  // Splash has no bottom bar → hug the corner.
  // Other screens have a ~90px fixed bar → sit above it.
  const hasBottomBar = screen !== 'splash';
  const bottomOffset = hasBottomBar ? (isNarrow ? 100 : 24) : 20;

  return (
    <div style={{
      position: 'fixed',
      right: isNarrow ? 8 : 20,
      bottom: `calc(env(safe-area-inset-bottom, 0px) + ${bottomOffset}px)`,
      zIndex: 90,
      pointerEvents: 'auto',
    }}>
      {open ? (
        <div style={{
          width: isNarrow ? 'calc(100vw - 16px)' : 'min(320px, calc(100vw - 32px))',
          background: '#0F1419',
          border: '3px solid var(--yellow)',
          boxShadow: '4px 4px 0 var(--red), 0 10px 30px rgba(0,0,0,0.5)',
          position: 'relative',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center',
            background: 'var(--yellow)', color: 'var(--ink)',
            padding: '4px 8px',
            fontFamily: 'Bebas Neue', fontSize: 12, letterSpacing: '0.12em',
            borderBottom: '2px solid var(--ink)',
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span className="blink" style={{ color: 'var(--red)' }}>●</span> NOW PLAYING IN STORE
            </span>
            <span style={{ flex: 1 }}/>
            <button onClick={() => setOpen(false)} style={{
              background: 'var(--ink)', color: 'var(--yellow)',
              width: 22, height: 20, fontFamily: 'Bebas Neue', fontSize: 12,
              border: '1.5px solid var(--ink)', lineHeight: 1,
            }}>−</button>
          </div>
          <iframe
            title="Spotify — Yankee Squat"
            src={SPOTIFY_EMBED}
            width="100%" height="152"
            style={{ display: 'block', border: 0 }}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="press" style={{
          background: 'var(--yellow)',
          color: 'var(--ink)',
          fontFamily: 'Bebas Neue',
          fontSize: 13, letterSpacing: '0.1em',
          padding: '8px 12px',
          border: '3px solid var(--ink)',
          boxShadow: '3px 3px 0 var(--red)',
          display: 'flex', alignItems: 'center', gap: 6,
          cursor: 'pointer',
        }}>
          <span className="blink" style={{ color: 'var(--red)', fontSize: 12 }}>●</span>
          <span style={{ fontSize: 15 }}>♪</span>
          <span>PLAY SONG</span>
        </button>
      )}
    </div>
  );
}

window.SpotifyPlayer = SpotifyPlayer;
