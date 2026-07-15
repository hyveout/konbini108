// Konbini 108 — Share Composition
//
// A 1080×1920 (9:16 IG-story ratio) composition rendered off-screen and used
// as the snapshot source when sharing to Instagram / X / TikTok.
//
// This exists because the on-page receipt is a long scrollable strip — when
// captured and shared to IG story, IG crops the middle and it looks awkward
// (see: user feedback screenshot). This composition is purpose-built for the
// 9:16 canvas: hero portrait, matched-member name, and a condensed receipt.
//
// Rendered at 1080×1920 with html2canvas at scale=1 → produces a 1080×1920 PNG
// perfectly sized for IG story upload.

function ShareComposition({ match, items = [], subtotal = 0, tax = 0, total = 0, orderNum = '', branch = '', bakedPortrait = null }) {
  // Star lives on window (set by components.jsx). Alias for clarity in JSX.
  const Star = window.Star;
  const branchJP = { SHIBUYA:'渋谷', SHINJUKU:'新宿', HARAJUKU:'原宿', NAKANO:'中野', KOENJI:'高円寺', SHIMOKITA:'下北' };

  // Cart is capped at 11 items — show all of them. Compact rows so it always fits.
  const shownItems = items;
  // Prefer the pre-baked, cover-cropped portrait (avoids html2canvas <img> issues)
  const portraitSrc = bakedPortrait || match.photo;

  return (
    <div
      data-share-composition="1"
      style={{
        width: 1080, height: 1920,
        // Vertical composition — same night-alley gradient as splash so brand ties together
        background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0f12 30%, #2a1418 100%)',
        color: '#fff',
        fontFamily: '"Zen Kaku Gothic New", sans-serif',
        position: 'relative',
        overflow: 'hidden',
        // Subtle noise via multiple radial gradients — cheap "grain"
        backgroundImage: `
          radial-gradient(circle at 20% 10%, rgba(255,214,10,0.10) 0%, transparent 40%),
          radial-gradient(circle at 80% 90%, rgba(233,25,44,0.15) 0%, transparent 45%),
          linear-gradient(180deg, #0a0a0a 0%, #1a0f12 30%, #2a1418 100%)
        `,
      }}
    >
      {/* ─── HEADER BAR ─── */}
      <div style={{
        position: 'absolute', top: 60, left: 60, right: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 12,
          background: '#fff', color: '#E9192C',
          padding: '10px 22px',
          fontFamily: 'Bebas Neue', fontSize: 26, letterSpacing: '0.18em',
          border: '3px solid #E9192C',
        }}>
          <Star size={18} color="#E9192C" />
          24 HR / 営業中
          <Star size={18} color="#E9192C" />
        </div>
        <div style={{
          fontFamily: 'VT323, monospace', fontSize: 26, color: '#FFD60A',
          letterSpacing: '0.05em', textAlign: 'right',
        }}>
          <div>{branch} #{orderNum}</div>
          <div style={{ fontSize: 20, opacity: 0.7 }}>{branchJP[branch] || ''}店</div>
        </div>
      </div>

      {/* ─── KONBINI 108 TITLE ─── */}
      <div style={{
        position: 'absolute', top: 150, left: 0, right: 0,
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'Bebas Neue',
          fontSize: 96, lineHeight: 0.9,
          color: '#FFD60A',
          letterSpacing: '-0.01em',
          textShadow: '0 0 40px rgba(255,214,10,0.5), 5px 5px 0 #E9192C',
          fontWeight: 900,
        }}>
          KONBINI 108
        </div>
        <div style={{
          fontFamily: '"Zen Kaku Gothic New", sans-serif',
          fontSize: 22, color: '#fff',
          letterSpacing: '0.3em', fontWeight: 700,
          marginTop: 6,
        }}>
          コンビニ・イチマルハチ
        </div>
      </div>

      {/* ─── "YOU MATCHED WITH" LABEL ─── */}
      <div style={{
        position: 'absolute', top: 380, left: 0, right: 0,
        textAlign: 'center',
        fontFamily: 'VT323, monospace',
        fontSize: 32, color: '#FFD60A',
        letterSpacing: '0.35em',
      }}>
        ★ YOU MATCHED WITH / 診断結果 ★
      </div>

      {/* ─── HERO PORTRAIT ─── */}
      {/*
        Rendering strategy — the winning combo:
        - `bakedPortrait` is a PRE-CROPPED square PNG data URL (no object-fit needed)
        - Rendered as a plain <img> at 100% × 100% — this is what html2canvas
          handles most reliably (better than background-image with large data URLs,
          which can render as black).
        - Falls back to `match.photo` if baking failed.
      */}
      {/*
        Portrait frame: outer white border + drop shadow.
        Compute exact positions to make html2canvas happy. Portrait size is
        460×460 including the 8px border, so the inner img area is 444×444.
        Total occupies 460×460 at center. Positioned via explicit `left` in px
        (not with a transform) — html2canvas can render offset transforms
        inconsistently, so we compute the position manually.
        1080 wide composition, portrait 460 wide, so left = (1080-460)/2 = 310.
      */}
      <div style={{
        position: 'absolute', top: 460, left: 310,
        width: 460, height: 460,
        backgroundColor: match.color,
        border: '8px solid #fff',
        boxShadow: `14px 14px 0 #0F1419, 0 0 80px ${match.color}88`,
        overflow: 'hidden',
      }}>
        <img
          src={portraitSrc || ''}
          alt={match.name}
          width={444}
          height={444}
          style={{
            width: 444, height: 444,
            display: 'block',
          }}
        />
      </div>

      {/* ─── MATCHED MEMBER NAME ─── */}
      <div style={{
        position: 'absolute', top: 960, left: 0, right: 0,
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'Bebas Neue',
          fontSize: 180, lineHeight: 0.85,
          color: match.color, letterSpacing: '0.02em',
          textShadow: `8px 8px 0 #0F1419, 0 0 100px ${match.color}66`,
          fontWeight: 900,
        }}>
          {match.name}
        </div>
        <div style={{
          fontFamily: '"Zen Kaku Gothic New", sans-serif',
          fontSize: 48, fontWeight: 900,
          color: '#fff', marginTop: 8,
        }}>
          {match.jp}
        </div>
        <div style={{
          fontFamily: 'VT323, monospace', fontSize: 26,
          color: '#FFD60A', letterSpacing: '0.2em',
          marginTop: 6,
        }}>
          of ONE OR EIGHT
        </div>
      </div>

      {/* ─── RECEIPT SNIPPET ─── */}
      {/*
        Match the on-page desktop receipt palette:
        - Background: #F8F4E8 (bright cream, same as --receipt CSS var)
        - No drop shadow (was making it look grey/muted on dark bg)
        - Solid white outer glow instead, to lift it off the dark background cleanly
      */}
      <div style={{
        position: 'absolute', bottom: 340, left: 90, right: 90,
        background: '#F8F4E8',
        color: '#0F1419',
        fontFamily: 'VT323, monospace',
        padding: '28px 34px 24px',
        // Subtle warm glow so it feels lit, not shadowed
        boxShadow: '0 0 0 4px rgba(255,214,10,0.15), 0 8px 30px rgba(0,0,0,0.3)',
      }}>
        {/* Receipt title */}
        <div style={{
          textAlign: 'center', marginBottom: 10, marginTop: 4,
          fontFamily: 'Bebas Neue', fontSize: 30, letterSpacing: '0.1em',
        }}>
          ★ RECEIPT / レシート ★
        </div>

        {/* Items — each row shows: EN name · · · · price, then JP name below.
            Scale down when many items so an 11-item cart still fits. */}
        {(() => {
          const many = shownItems.length > 8;
          const enSize = many ? 20 : 22;
          const jpSize = many ? 15 : 17;
          const rowGap = many ? 4 : 6;
          return (
            <div style={{ lineHeight: 1.15 }}>
              {shownItems.map((item, i) => (
                <div key={item.id} style={{ marginBottom: i === shownItems.length - 1 ? 0 : rowGap }}>
                  {/* Name + dot-leader + price */}
                  <div style={{ display: 'flex', alignItems: 'baseline', fontSize: enSize, fontFamily: 'VT323, monospace' }}>
                    <span style={{ whiteSpace: 'nowrap' }}>{item.en}</span>
                    {/* Dot leader — a flex-growing span with a dotted bottom border */}
                    <span aria-hidden="true" style={{
                      flex: 1,
                      margin: '0 6px',
                      borderBottom: '2px dotted #0F1419',
                      transform: 'translateY(-4px)',
                      opacity: 0.55,
                    }} />
                    <span style={{ whiteSpace: 'nowrap' }}>¥{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                  {/* Japanese sub-name */}
                  <div style={{
                    fontFamily: '"Zen Kaku Gothic New", sans-serif',
                    fontSize: jpSize, opacity: 0.65, paddingLeft: 12,
                    lineHeight: 1.1, marginTop: 1,
                  }}>
                    {item.jp}
                  </div>
                </div>
              ))}
            </div>
          );
        })()}

        {/* Dot divider */}
        <div style={{
          borderTop: '2px dashed #0F1419',
          margin: '12px 0 10px',
          opacity: 0.5,
        }} />

        {/* Total */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'Bebas Neue', fontSize: 40, letterSpacing: '0.08em' }}>TOTAL</span>
          <span style={{ fontFamily: 'Bebas Neue', fontSize: 44, color: '#E9192C' }}>
            ¥{total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* ─── FOOTER CTA ─── */}
      <div style={{
        position: 'absolute', bottom: 90, left: 0, right: 0,
        textAlign: 'center',
      }}>
        <div style={{
          display: 'inline-block',
          background: '#FFD60A', color: '#0F1419',
          padding: '14px 34px',
          border: '4px solid #fff',
          boxShadow: '8px 8px 0 #E9192C',
          fontFamily: 'Bebas Neue', fontSize: 42, letterSpacing: '0.15em',
        }}>
          YANKEE SQUAT ・ OUT NOW
        </div>
        <div style={{
          marginTop: 14,
          fontFamily: 'VT323, monospace', fontSize: 24,
          color: '#fff', letterSpacing: '0.2em', opacity: 0.85,
        }}>
          konbini108.com ・ #ONEOREIGHT
        </div>
      </div>

      {/* ─── DECORATIVE STARS ─── */}
      <div style={{ position: 'absolute', top: 340, left: 60, opacity: 0.4 }}>
        <Star size={60} color="#FFD60A" />
      </div>
      <div style={{ position: 'absolute', top: 340, right: 60, opacity: 0.4 }}>
        <Star size={60} color="#FFD60A" />
      </div>
    </div>
  );
}

window.ShareComposition = ShareComposition;
