// Konbini 108 — Screen components

const SC = React; // alias for clarity

// =============== SPLASH ===============
function SplashScreen({ onEnter }) {
  return (
    <div className="screen splash-bg scanlines noise" style={{
      background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0f12 40%, #2a1418 100%)',
      color: '#fff',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      justifyContent: 'center',
      padding: '16px 20px calc(20px + env(safe-area-inset-bottom))',
      position: 'relative',
      minHeight: '100dvh',
      overflow: 'hidden',
      gap: 14,
    }}>
      <PhoneChrome />

      {/* 24 HR chip */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        background: '#fff', color: 'var(--red)',
        padding: '3px 10px',
        fontFamily: 'Bebas Neue', fontSize: 13, letterSpacing: '0.18em',
        border: '2px solid var(--red)',
        marginTop: 12,
      }}>
        <Star size={11} color="var(--red)" />
        24 HR / 営業中
        <Star size={11} color="var(--red)" />
      </div>

      {/* Title */}
      <div className="splash-title" style={{
        fontFamily: 'Bebas Neue',
        fontSize: 'clamp(56px, 17vw, 82px)', lineHeight: 0.85,
        color: 'var(--yellow)',
        letterSpacing: '-0.02em',
        textShadow: '0 0 30px rgba(255,214,10,0.5), 3px 3px 0 var(--red)',
        fontWeight: 900,
        textAlign: 'center',
        marginTop: -4,
      }}>
        KONBINI
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6 }}>
          <Star size={48} color="var(--red)" />
          <span>108</span>
        </div>
      </div>

      <div className="splash-subtitle" style={{
        fontFamily: '"Zen Kaku Gothic New", sans-serif',
        fontSize: 13, color: '#fff', fontWeight: 700,
        letterSpacing: '0.25em',
        marginTop: -6,
      }}>
        コンビニ・イチマルハチ
      </div>

      {/* Cover poster */}
      <div className="splash-poster-frame" style={{
        width: 'min(180px, 50vw)', padding: 5,
        background: 'var(--cream)', border: '2px solid #fff',
        transform: 'rotate(-2deg)',
        boxShadow: '5px 5px 0 var(--red)',
        marginTop: 4,
      }}>
        <div style={{ width: '100%', aspectRatio: '1/1', position: 'relative', overflow: 'hidden' }}>
          <img src="assets/cover-art.jpg" alt="YANKEE SQUAT cover"
               style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{
            position: 'absolute', top: 6, left: 6,
            background: 'var(--red)', color: '#fff', padding: '2px 6px',
            fontSize: 8, fontFamily: 'Bebas Neue', letterSpacing: '0.18em',
            border: '1px solid #fff',
          }}>NEW SINGLE</div>
        </div>
      </div>

      {/* Tagline */}
      <div className="splash-tag" style={{
        textAlign: 'center', color: '#fff',
        fontFamily: '"Zen Kaku Gothic New", sans-serif',
        marginTop: 4,
      }}>
        <div style={{ fontSize: 12, opacity: 0.8, letterSpacing: '0.08em' }}>
          BUILD YOUR ORDER. GET MATCHED.
        </div>
        <div style={{ fontSize: 10, opacity: 0.55, marginTop: 2 }}>
          ご注文をどうぞ
        </div>
      </div>

      {/* CTA */}
      <button className="press splash-cta" onClick={onEnter} style={{
        background: 'var(--yellow)',
        color: 'var(--ink)',
        fontFamily: 'Bebas Neue',
        fontSize: 22, letterSpacing: '0.15em',
        padding: '14px 44px',
        border: '3px solid #fff',
        boxShadow: '4px 4px 0 var(--red)',
        cursor: 'pointer',
        width: 'min(300px, 100%)',
        marginTop: 6,
      }}>
        ENTER STORE
      </button>
      <div className="splash-cta-line" style={{ color: 'var(--yellow)', fontFamily: 'VT323, monospace', fontSize: 13, marginTop: -6 }}>
        いらっしゃいませ <span className="blink">_</span>
      </div>
    </div>
  );
}

// =============== AISLE / BROWSE ===============
// Each pair is [background, burst] — chosen so the burst always contrasts
// with the background (never yellow-on-cream, blue-on-sky, etc.)
const BURST_PAIRS = [
  ['bg-pink',  'burst-blue'],
  ['bg-mint',  'burst-red'],
  ['bg-cream', 'burst-red'],
  ['bg-sky',   'burst-red'],
  ['bg-peach', 'burst-blue'],
  ['bg-lilac', 'burst-orange'],
  ['bg-pink',  'burst-orange'],
  ['bg-mint',  'burst-orange'],
  ['bg-sky',   'burst-orange'],
  ['bg-peach', 'burst-red'],
  ['bg-lilac', 'burst-red'],
  ['bg-cream', 'burst-blue'],
];

// Compact horizontal card for mobile aisle — one per row
function ProductCardMobile({ p, inCart, onAdd, onRemove }) {
  const hash = React.useMemo(() => {
    let h = 0;
    for (let i = 0; i < p.id.length; i++) h = (h * 31 + p.id.charCodeAt(i)) | 0;
    return Math.abs(h);
  }, [p.id]);
  const [bgCls, burstCls] = BURST_PAIRS[hash % BURST_PAIRS.length];

  return (
    <div style={{
      display: 'flex', alignItems: 'stretch',
      background: 'var(--yellow)',
      border: '2.5px solid var(--ink)',
      boxShadow: inCart ? '3px 3px 0 var(--pink)' : '3px 3px 0 var(--ink)',
      transform: inCart ? 'translate(-1px,-1px)' : 'none',
      transition: 'all 0.15s',
      position: 'relative',
    }}>
      {/* Thumbnail w/ burst */}
      <div className={'photo-frame ' + bgCls} style={{
        width: 78, height: 78, flexShrink: 0,
        border: 'none', borderRight: '2.5px solid var(--ink)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div className={'burst ' + burstCls} style={{
          width: '95%', height: '95%',
          top: '2.5%', left: '2.5%',
          opacity: 0.9,
        }}/>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          padding: 6,
        }}>
          <ProductArt product={p} size={54} />
        </div>
      </div>

      {/* Info */}
      <div style={{
        flex: 1, minWidth: 0, padding: '6px 10px 6px 10px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <div style={{
          fontFamily: '"Zen Kaku Gothic New", sans-serif', fontSize: 11,
          color: 'var(--ink)', fontWeight: 900, lineHeight: 1.1,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{p.jp}</div>
        <div style={{
          fontFamily: 'Bebas Neue', fontSize: 15, color: 'var(--red)',
          letterSpacing: '0.03em', lineHeight: 1.1, marginTop: 2,
          textShadow: '1px 1px 0 var(--ink)',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{p.en}</div>
        <div style={{
          fontFamily: 'Bebas Neue', fontSize: 18, color: 'var(--ink)',
          lineHeight: 1, marginTop: 4,
        }}>¥{p.price}</div>
      </div>

      {/* Add / Added toggle button */}
      <button onClick={inCart ? onRemove : onAdd} className="press" style={{
        border: 'none', borderLeft: '2.5px solid var(--ink)',
        background: inCart ? 'var(--pink)' : 'var(--ink)',
        color: inCart ? 'var(--ink)' : 'var(--yellow)',
        padding: '0 14px',
        fontFamily: 'Bebas Neue',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2,
        lineHeight: 1,
        cursor: 'pointer',
        minWidth: 62,
      }}>
        <span style={{ fontSize: 22 }}>{inCart ? '\u2713' : '+'}</span>
        <span style={{ fontSize: 11, letterSpacing: '0.08em' }}>{inCart ? 'ADDED' : 'ADD'}</span>
      </button>
    </div>
  );
}

function ProductCard({ p, inCart, onAdd, onRemove }) {
  // Stable hash based on product id so the burst color/bg don't change between renders
  const hash = React.useMemo(() => {
    let h = 0;
    for (let i = 0; i < p.id.length; i++) h = (h * 31 + p.id.charCodeAt(i)) | 0;
    return Math.abs(h);
  }, [p.id]);
  const [bgCls, burstCls] = BURST_PAIRS[hash % BURST_PAIRS.length];

  return (
    <div className={'bento-card halftone' + (inCart ? ' in-cart' : '')}>
      {/* Photo frame */}
      <div className={'photo-frame ' + bgCls}>
        {/* Blast burst behind the emoji */}
        <div className={'burst ' + burstCls} style={{
          width: '78%', height: '78%',
          top: '8%', left: '10%',
          opacity: 0.85,
        }}/>
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          padding: 12,
        }}>
          <ProductArt product={p} size={100} />
        </div>
        {/* Price tag bottom-right */}
        <div style={{
          position: 'absolute', bottom: 4, right: 4, zIndex: 3,
          background: '#fff',
          color: 'var(--red)',
          fontFamily: 'Bebas Neue', fontSize: 18, lineHeight: 1,
          padding: '3px 7px',
          border: '2px solid var(--ink)',
          transform: 'rotate(-3deg)',
          boxShadow: '2px 2px 0 var(--ink)',
        }}>¥{p.price}</div>
      </div>

      {/* RECOMMENDED ticker strip */}
      <div className="recommended-strip">
        <span className="recommended-strip-inner">
          {'\u00BB RECOMMENDED \u00BB RECOMMENDED \u00BB RECOMMENDED \u00BB RECOMMENDED \u00BB RECOMMENDED '}
        </span>
      </div>

      {/* Info bar */}
      <div style={{
        background: 'var(--yellow)',
        padding: '4px 6px 5px',
        display: 'flex', flexDirection: 'column', gap: 1,
      }}>
        <div style={{
          fontFamily: '"Zen Kaku Gothic New", sans-serif', fontSize: 11,
          color: 'var(--ink)', fontWeight: 900, lineHeight: 1.1,
        }}>{p.jp}</div>
        <div style={{
          fontFamily: 'Bebas Neue', fontSize: 14, color: 'var(--red)',
          letterSpacing: '0.04em', lineHeight: 1,
          textShadow: '1px 1px 0 var(--ink)',
        }}>{p.en}</div>
        <div style={{
          display: 'flex', justifyContent: 'flex-end', alignItems: 'center',
          marginTop: 4,
        }}>
          <button onClick={inCart ? onRemove : onAdd} className="press" style={{
            background: inCart ? 'var(--pink)' : 'var(--ink)',
            color: inCart ? 'var(--ink)' : 'var(--yellow)',
            fontFamily: 'Bebas Neue', fontSize: 12, padding: '4px 12px',
            letterSpacing: '0.1em', border: '1.5px solid var(--ink)',
            boxShadow: '2px 2px 0 var(--red)',
            cursor: 'pointer',
          }}>{inCart ? '\u2713 ADDED' : '+ ADD'}</button>
        </div>
      </div>
    </div>
  );
}

function AisleScreen({ cart, addItem, removeItem, onCheckout, maxItems }) {
  const [cat, setCat] = useState('snacks');
  const products = window.PRODUCTS.filter(p => p.cat === cat);
  const itemCount = Object.values(cart).reduce((a,b) => a+b, 0);
  const subtotal = Object.entries(cart).reduce((acc, [id, qty]) => {
    const prod = window.PRODUCTS.find(p => p.id === id);
    return acc + (prod ? prod.price * qty : 0);
  }, 0);

  const tabsRef = SC.useRef(null);

  return (
    <div className="screen" style={{
      background: 'var(--cream)',
      color: 'var(--ink)',
      paddingBottom: 120,
    }}>
      <PhoneChrome dark />

      {/* Store header */}
      <div style={{
        background: 'var(--red)', color: '#fff',
        padding: '14px 16px',
        position: 'relative',
        borderBottom: '3px solid var(--ink)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="assets/logo.png" alt="" style={{ height: 32, filter: 'brightness(0) invert(1)' }} />
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 26, lineHeight: 1, letterSpacing: '0.05em' }}>KONBINI 108</div>
          <div style={{ flex: 1 }}/>
          <div style={{ fontFamily: 'VT323, monospace', fontSize: 13, color: 'var(--yellow)', letterSpacing: '0.05em' }}>
            <span className="blink" style={{ color: '#0F0' }}>●</span> OPEN 24H
          </div>
        </div>
      </div>

      <Marquee items={[
        '★ NEW SINGLE — YANKEE SQUAT — OUT NOW',
        '★ YANKEE SQUAT / ONE OR EIGHT',
        '★ BUILD YOUR CART & GET MATCHED',
        '★ FREE STAMP WITH EVERY ORDER',
      ]} />

      {/* Category tabs */}
      <div ref={tabsRef} style={{
        display: 'flex', gap: 6, padding: '12px 12px',
        overflowX: 'auto', scrollbarWidth: 'none',
        background: 'var(--cream)',
        borderBottom: '2px solid var(--ink)',
        position: 'sticky', top: 0, zIndex: 30,
      }}>
        {window.CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)} style={{
            flexShrink: 0,
            background: cat === c.id ? 'var(--ink)' : '#fff',
            color: cat === c.id ? 'var(--yellow)' : 'var(--ink)',
            border: '2px solid var(--ink)',
            padding: '6px 12px',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            minWidth: 64,
            boxShadow: cat === c.id ? '2px 2px 0 var(--red)' : 'none',
          }}>
            <span style={{ fontSize: 18 }}>{c.icon}</span>
            <span style={{ fontFamily: 'Bebas Neue', fontSize: 11, letterSpacing: '0.05em', marginTop: 2 }}>{c.en}</span>
            <span style={{ fontSize: 8, opacity: 0.7 }}>{c.jp}</span>
          </button>
        ))}
      </div>

      {/* Section header */}
      <div style={{ padding: '14px 14px 8px', display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <div style={{
          fontFamily: 'Bebas Neue', fontSize: 28, color: 'var(--ink)',
          letterSpacing: '0.05em', lineHeight: 1,
        }}>
          {window.CATEGORIES.find(c => c.id === cat).en}
        </div>
        <div style={{ fontFamily: '"Zen Kaku Gothic New"', fontSize: 14, fontWeight: 700, color: 'var(--red)' }}>
          {window.CATEGORIES.find(c => c.id === cat).jp}
        </div>
        <div style={{ flex: 1 }}/>
        <div style={{ fontFamily: 'VT323, monospace', fontSize: 12, color: 'var(--ink)', opacity: 0.6 }}>
          {products.length} ITEMS
        </div>
      </div>

      {/* Product list — single vertical column, compact rows */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: 8, padding: '0 12px',
      }}>
        {products.map(p => (
          <ProductCardMobile
            key={p.id} p={p}
            inCart={cart[p.id] || 0}
            onAdd={() => itemCount < maxItems && addItem(p.id)}
            onRemove={() => removeItem(p.id)}
          />
        ))}
      </div>

      {/* Floating basket bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 480,
        background: 'var(--ink)', color: '#fff',
        padding: '14px 16px',
        paddingBottom: 'calc(14px + env(safe-area-inset-bottom))',
        display: 'flex', alignItems: 'center', gap: 12,
        borderTop: `3px solid var(--yellow)`,
        zIndex: 40,
      }}>
        {/* Basket count chip */}
        <div style={{
          background: itemCount > 0 ? 'var(--pink)' : 'var(--yellow)',
          color: 'var(--ink)',
          width: 44, height: 44, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'Bebas Neue',
          border: '2px solid var(--ink)',
          transition: 'background 0.2s',
        }}>
          <div style={{ fontSize: 24, lineHeight: 1 }}>{itemCount}</div>
        </div>
        <div style={{ flex: 1, lineHeight: 1.2 }}>
          <div style={{ fontFamily: 'VT323, monospace', fontSize: 12, opacity: 0.7 }}>
            BASKET ({itemCount}/{maxItems})
          </div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, color: 'var(--yellow)' }}>
            ¥{subtotal.toLocaleString()}
          </div>
        </div>
        <button onClick={onCheckout} disabled={itemCount === 0} className="press" style={{
          background: itemCount === 0 ? '#444' : 'var(--red)',
          color: '#fff',
          fontFamily: 'Bebas Neue', fontSize: 16, letterSpacing: '0.1em',
          padding: '12px 20px',
          border: itemCount === 0 ? '2px solid #555' : '2px solid var(--yellow)',
        }}>
          REGISTER
        </button>
      </div>
    </div>
  );
}

// =============== CART REVIEW ===============
function CartScreen({ cart, addItem, removeItem, onBack, onCheckout }) {
  const items = Object.entries(cart).map(([id, qty]) => ({
    ...window.PRODUCTS.find(p => p.id === id), qty,
  }));
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.10);
  const total = subtotal + tax;

  return (
    <div className="screen" style={{ background: 'var(--cream)', color: 'var(--ink)', paddingBottom: 120 }}>
      <PhoneChrome dark />

      <div style={{ background: 'var(--ink)', color: 'var(--yellow)', padding: '16px 16px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={onBack} style={{
          background: 'var(--yellow)', color: 'var(--ink)',
          width: 34, height: 34, fontFamily: 'Bebas Neue', fontSize: 18,
        }}>◀</button>
        <div>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 22, letterSpacing: '0.05em', lineHeight: 1 }}>YOUR BASKET</div>
          <div style={{ fontSize: 11, opacity: 0.7, fontFamily: 'VT323, monospace' }}>かごの中身 / {items.length} ITEMS</div>
        </div>
      </div>

      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.map(item => (
          <div key={item.id} style={{
            background: '#fff', border: '2px solid var(--ink)',
            display: 'flex', alignItems: 'center', gap: 10, padding: 8,
            boxShadow: '3px 3px 0 var(--ink)',
          }}>
            <div style={{
              width: 60, height: 60, background: `linear-gradient(135deg, ${item.c2}, ${item.c1}22)`,
              border: '2px solid var(--ink)',
              padding: 4, flexShrink: 0,
            }}>
              <ProductArt product={item} size={48} />
            </div>
            <div style={{ flex: 1, lineHeight: 1.2 }}>
              <div style={{ fontFamily: '"Zen Kaku Gothic New"', fontSize: 12, fontWeight: 700 }}>{item.jp}</div>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 14, letterSpacing: '0.05em' }}>{item.en}</div>
              <div style={{ fontFamily: 'Bebas Neue', fontSize: 16, color: 'var(--red)', marginTop: 2 }}>¥{item.price}</div>
            </div>
            <button onClick={() => removeItem(item.id)} aria-label="Remove" style={{
              width: 34, height: 34, background: 'var(--ink)', color: 'var(--yellow)',
              fontFamily: 'Bebas Neue', fontSize: 18, cursor: 'pointer', flexShrink: 0,
              border: '2px solid var(--ink)',
            }}>×</button>
          </div>
        ))}

        {/* Subtotal */}
        <div style={{
          background: '#fff', border: '2px solid var(--ink)',
          padding: 12, marginTop: 6, fontFamily: 'VT323, monospace', fontSize: 16,
          boxShadow: '3px 3px 0 var(--red)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>SUBTOTAL / 小計</span>
            <span>¥{subtotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.7 }}>
            <span>TAX 10% / 税</span>
            <span>¥{tax.toLocaleString()}</span>
          </div>
          <DotDivider />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22, fontFamily: 'Bebas Neue', color: 'var(--red)', marginTop: 6 }}>
            <span>TOTAL</span>
            <span>¥{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* CTA bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: '100%', maxWidth: 480,
        background: 'var(--ink)', padding: 14,
        paddingBottom: 'calc(14px + env(safe-area-inset-bottom))',
        borderTop: '3px solid var(--yellow)',
        zIndex: 40,
      }}>
        <button onClick={onCheckout} className="press" style={{
          width: '100%', background: 'var(--yellow)', color: 'var(--ink)',
          padding: 16, fontFamily: 'Bebas Neue', fontSize: 22, letterSpacing: '0.15em',
          border: '3px solid #fff', boxShadow: '4px 4px 0 var(--red)',
        }}>
          PAY ¥{total.toLocaleString()}
        </button>
        <div style={{ textAlign: 'center', marginTop: 6, color: 'var(--yellow)', fontFamily: 'VT323, monospace', fontSize: 12 }}>
          会計をする ・ ¥ CASH ONLY ¥
        </div>
      </div>
    </div>
  );
}

// =============== RECEIPT (with match reveal) ===============
function ReceiptScreen({ cart, onShare, onRestart }) {
  const [printing, setPrinting] = useState(true);
  const [showMatch, setShowMatch] = useState(false);

  const items = Object.entries(cart).map(([id, qty]) => ({
    ...window.PRODUCTS.find(p => p.id === id), qty,
  }));
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.10);
  const total = subtotal + tax;

  // Match: count tags
  const tagCounts = {};
  items.forEach(i => {
    (i.tags || []).forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + i.qty; });
  });
  const matchId = Object.entries(tagCounts).sort((a,b) => b[1]-a[1])[0]?.[0];
  // If no tagged items in cart, pick a random member as a graceful fallback
  const fallbackMember = useMemo(
    () => window.MEMBERS[Math.floor(Math.random() * window.MEMBERS.length)],
    []
  );
  const match = window.MEMBERS.find(m => m.id === matchId) || fallbackMember;

  const orderNum = useMemo(() => String(Math.floor(Math.random()*900000)+100000), []);
  const branch = useMemo(() => window.STORE_BRANCHES[Math.floor(Math.random()*window.STORE_BRANCHES.length)], []);


  useEffect(() => {
    const t1 = setTimeout(() => setPrinting(false), 1800);
    const t2 = setTimeout(() => setShowMatch(true), 2600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const now = new Date();
  const dateStr = `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')}`;
  const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

  return (
    <div className="screen scanlines" style={{
      background: 'var(--ink)',
      paddingTop: 16, paddingBottom: 40,
      position: 'relative',
    }}>
      <PhoneChrome />

      {/* Top bar with X */}
      <div style={{
        position: 'sticky', top: 0, left: 0, right: 0,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '8px 16px', zIndex: 10,
        background: 'rgba(15,20,25,0.7)', backdropFilter: 'blur(8px)',
      }}>
        <button onClick={onRestart} style={{
          color: '#fff', fontFamily: 'VT323, monospace', fontSize: 14,
        }}>↻ NEW ORDER</button>
        <div style={{ color: 'var(--yellow)', fontFamily: 'VT323, monospace', fontSize: 14 }}>
          {printing ? <><span className="blink">●</span> PRINTING...</> : 'RECEIPT READY ★'}
        </div>
      </div>

      {/* Receipt paper */}
      <div data-share-receipt="1" style={{
        margin: '20px 22px 0',
        background: 'var(--receipt)',
        color: 'var(--ink)',
        fontFamily: 'VT323, monospace',
        fontSize: 15,
        lineHeight: 1.2,
        padding: '24px 18px 12px',
        position: 'relative',
        maxHeight: printing ? 0 : 5000,
        overflow: 'hidden',
        transition: 'max-height 1.8s cubic-bezier(0.45,0,0.55,1)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 40px rgba(255,214,10,0.1)',
        // jagged top edge (tear)
        clipPath: 'polygon(0% 6px, 4% 0%, 8% 6px, 12% 0%, 16% 6px, 20% 0%, 24% 6px, 28% 0%, 32% 6px, 36% 0%, 40% 6px, 44% 0%, 48% 6px, 52% 0%, 56% 6px, 60% 0%, 64% 6px, 68% 0%, 72% 6px, 76% 0%, 80% 6px, 84% 0%, 88% 6px, 92% 0%, 96% 6px, 100% 0%, 100% 100%, 0% 100%)',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <div style={{ fontFamily: 'Bebas Neue', fontSize: 32, letterSpacing: '0.05em', lineHeight: 1 }}>
            <Star size={20} color="var(--red)" /> KONBINI 108 <Star size={20} color="var(--red)" />
          </div>
          <div style={{ fontSize: 14, marginTop: 2 }}>コンビニ・イチマルハチ</div>
          <div style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>
            {branch} BRANCH ・ {branch === 'SHIBUYA' ? '渋谷' : branch === 'SHINJUKU' ? '新宿' : branch === 'HARAJUKU' ? '原宿' : branch === 'NAKANO' ? '中野' : branch === 'KOENJI' ? '高円寺' : '下北'}店<br/>
            TEL: 03-1080-0108
          </div>
        </div>

        <DotDivider />

        {/* Order meta */}
        <div style={{ margin: '8px 0', fontSize: 13 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>DATE / 日付</span><span>{dateStr}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>TIME / 時刻</span><span>{timeStr}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>ORDER # </span><span>{orderNum}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>REGISTER</span><span>#108</span>
          </div>
        </div>

        <DotDivider />

        {/* Items */}
        <div style={{ margin: '8px 0' }}>
          {items.map(item => (
            <div key={item.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ flex: 1, paddingRight: 6 }}>
                  {item.en}
                </span>
                <span style={{ fontFamily: 'VT323, monospace' }}>
                  ¥{(item.price * item.qty).toLocaleString()}
                </span>
              </div>
              <div style={{ fontSize: 11, opacity: 0.6, paddingLeft: 8 }}>
                {item.jp}
              </div>
            </div>
          ))}
        </div>

        <DotDivider />

        {/* Totals */}
        <div style={{ margin: '8px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>SUBTOTAL / 小計</span><span>¥{subtotal.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>TAX (10%) / 税</span><span>¥{tax.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Bebas Neue', fontSize: 22, marginTop: 4, color: 'var(--red)' }}>
            <span>TOTAL</span><span>¥{total.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span>CASH / 現金</span><span>¥{total.toLocaleString()}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>CHANGE / おつり</span><span>¥0</span>
          </div>
        </div>

        <DotDivider />

        {/* Match reveal section */}
        <div style={{
          margin: '12px -18px 0', padding: '14px 18px',
          background: `linear-gradient(180deg, var(--receipt) 0%, ${match.color}22 100%)`,
          opacity: showMatch ? 1 : 0,
          transform: showMatch ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.6s, transform 0.6s',
          textAlign: 'center', position: 'relative',
        }}>
          <div style={{ fontSize: 13, opacity: 0.7, letterSpacing: '0.2em' }}>★ YOU MATCH WITH / 診断結果 ★</div>

          {/* Member portrait slot */}
          <div style={{
            width: 140, height: 140, margin: '10px auto 8px',
            background: match.color,
            border: '3px solid var(--ink)',
            boxShadow: `4px 4px 0 var(--ink)`,
            position: 'relative', overflow: 'hidden',
          }}>
            <img src={match.photo} alt={match.name}
                 style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                 onError={(e) => { e.target.style.display = 'none'; }} />
          </div>

          <div style={{
            fontFamily: 'Bebas Neue', fontSize: 56, lineHeight: 1,
            color: match.color, letterSpacing: '0.02em',
            marginTop: 4, textShadow: '2px 2px 0 var(--ink)',
          }}>{match.name}</div>
          <div style={{ fontFamily: '"Zen Kaku Gothic New"', fontSize: 18, fontWeight: 900, marginTop: 2 }}>
            {match.jp}
          </div>
          <div style={{ fontSize: 12, marginTop: 8, opacity: 0.7, letterSpacing: '0.05em' }}>
            of ONE OR EIGHT
          </div>
          <div style={{
            display: 'inline-block', marginTop: 10,
            border: '2px solid var(--ink)', padding: '3px 12px',
            fontFamily: 'Bebas Neue', fontSize: 14, letterSpacing: '0.1em',
            background: '#fff',
          }}>
            YANKEE SQUAT ・ OUT NOW
          </div>
        </div>

        <DotDivider />

        {/* Footer */}
        <div style={{ textAlign: 'center', margin: '10px 0', fontSize: 12 }}>
          <div>★ THANK YOU FOR YOUR PATRONAGE ★</div>
          <div>ありがとうございました ≧◡≦</div>
          <div style={{ marginTop: 4, opacity: 0.7 }}>PLEASE COME AGAIN / またお越しください</div>
        </div>

        {/* Barcode */}
        <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
          <Barcode width={220} height={50} />
        </div>
        <div style={{ textAlign: 'center', fontSize: 10, opacity: 0.6, marginTop: 4 }}>
          KONBINI108 / 1OR8 / YANKEESQUAT / {orderNum}
        </div>
      </div>

      {/* Newsletter signup card (sits below receipt, above fixed share bar) */}
      <div style={{ margin: '18px 22px 0' }}>
        <NewsletterSignup compact matchedMember={match.id} />
      </div>

      {/* Share bar */}
      <div style={{
        margin: '18px 22px 0',
        background: 'var(--ink)', padding: '14px 16px',
        paddingBottom: 'calc(14px + env(safe-area-inset-bottom))',
        border: '3px solid var(--yellow)',
        display: 'flex', flexDirection: 'column', gap: 8,
      }}>
        <div style={{ textAlign: 'center', color: 'var(--yellow)', fontFamily: 'Bebas Neue', fontSize: 14, letterSpacing: '0.15em' }}>
          SHARE YOUR RECEIPT ・ シェア
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {(() => {
            const shareData = { match, items, subtotal, tax, total, orderNum, branch };
            return <>
              <button onClick={() => onShare('ig', shareData)} className="press" style={{
                flex: 1, background: 'linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)',
                color: '#fff', padding: '10px 4px', fontFamily: 'Bebas Neue', fontSize: 13, letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
              }}>IG STORY</button>
              <button onClick={() => onShare('x', shareData)} className="press" style={{
                flex: 1, background: '#000', color: '#fff', border: '1px solid #fff',
                padding: '10px 4px', fontFamily: 'Bebas Neue', fontSize: 13, letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
              }}>𝕏 POST</button>
              <button onClick={() => onShare('tt', shareData)} className="press" style={{
                flex: 1, background: '#000', color: '#fff', border: '1px solid #25F4EE',
                padding: '10px 4px', fontFamily: 'Bebas Neue', fontSize: 13, letterSpacing: '0.05em',
                whiteSpace: 'nowrap',
              }}>♪ TIKTOK</button>
            </>;
          })()}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { SplashScreen, AisleScreen, CartScreen, ReceiptScreen, ProductCard, ProductCardMobile });
