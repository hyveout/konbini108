// Konbini 108 — Desktop layout variants
// Used at >= 900px viewport.

function useIsDesktop() {
  const [d, setD] = React.useState(() => typeof window !== 'undefined' && window.innerWidth >= 900);
  React.useEffect(() => {
    const onR = () => setD(window.innerWidth >= 900);
    window.addEventListener('resize', onR);
    return () => window.removeEventListener('resize', onR);
  }, []);
  return d;
}

// ============= DESKTOP SPLASH =============
function SplashDesktop({ onEnter }) {
  return (
    <div className="screen scanlines noise" style={{
      background:
        'radial-gradient(ellipse at 50% 30%, rgba(255,180,77,0.18) 0%, transparent 55%),' +
        'linear-gradient(180deg, #0a0a0a 0%, #1a0f12 40%, #2a1418 100%)',
      color: '#fff',
      position: 'relative',
      overflow: 'hidden',
      paddingBottom: 60,
    }}>
      {/* Top utility bar */}
      <div style={{
        position: 'relative', zIndex: 3,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 40px', color: 'var(--yellow)',
        fontFamily: 'VT323, monospace', fontSize: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Star size={16} color="var(--yellow)" />
          <span>KONBINI 108</span>
        </div>
        <div><span className="blink" style={{color:'#0F0'}}>●</span> NOW OPEN ・ 営業中</div>
      </div>

      {/* HERO grid: poster left, title right */}
      <div style={{
        position: 'relative', zIndex: 3,
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 60,
        padding: '40px max(40px, 6vw) 0',
        maxWidth: 1400, margin: '0 auto',
        alignItems: 'center',
      }}>
        {/* Left: poster */}
        <div style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          position: 'relative',
        }}>
          <div style={{
            background: 'var(--cream)', border: '4px solid #fff',
            padding: 14, transform: 'rotate(-3deg)',
            boxShadow: '12px 12px 0 var(--red), 18px 18px 60px rgba(0,0,0,0.5)',
            width: 'min(440px, 100%)',
          }}>
            <div style={{
              width: '100%', aspectRatio: '1/1',
              position: 'relative', overflow: 'hidden',
            }}>
              <img src="assets/cover-art.jpg" alt="YANKEE SQUAT cover"
                   style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{
                position: 'absolute', top: 14, left: 14,
                background: 'var(--red)', color: '#fff', padding: '4px 14px',
                fontSize: 14, fontFamily: 'Bebas Neue', letterSpacing: '0.22em',
                border: '2px solid #fff',
              }}>NEW SINGLE</div>
            </div>
            <div style={{
              padding: '10px 4px 0', fontFamily: 'VT323, monospace', fontSize: 14,
              color: 'var(--ink)', display: 'flex', justifyContent: 'space-between',
            }}>
              <span>NOW PLAYING IN STORE</span>
              <span>♪ ♪ ♪</span>
            </div>
          </div>
        </div>

        {/* Right: title block */}
        <div style={{ position: 'relative' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: '#fff', color: 'var(--red)',
            padding: '6px 18px',
            fontFamily: 'Bebas Neue', fontSize: 18, letterSpacing: '0.25em',
            marginBottom: 24,
            border: '2px solid var(--red)',
          }}>
            <Star size={16} color="var(--red)" />
            24 HR / 営業中
            <Star size={16} color="var(--red)" />
          </div>

          <div style={{
            fontFamily: 'Bebas Neue',
            fontSize: 'clamp(80px, 11vw, 160px)', lineHeight: 0.82,
            color: 'var(--yellow)',
            letterSpacing: '-0.02em',
            textShadow: '0 0 60px rgba(255,214,10,0.4), 6px 6px 0 var(--red)',
            fontWeight: 900,
          }}>
            KONBINI
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
              <Star size={110} color="var(--red)" />
              <span>108</span>
            </div>
          </div>

          <div style={{
            fontFamily: '"Zen Kaku Gothic New", sans-serif',
            fontSize: 22, color: '#fff', marginTop: 16, fontWeight: 700,
            letterSpacing: '0.3em',
          }}>
            コンビニ・イチマルハチ
          </div>

          <div style={{
            marginTop: 32, color: '#fff', maxWidth: 480,
            fontFamily: '"Zen Kaku Gothic New", sans-serif',
          }}>
            <div style={{ fontSize: 20, letterSpacing: '0.08em', lineHeight: 1.4, opacity: 0.9 }}>
              BUILD YOUR ORDER. GET MATCHED.
            </div>
            <div style={{ fontSize: 15, opacity: 0.55, marginTop: 8 }}>
              Pick up snacks, drinks, and after-hours essentials.<br/>
              Your receipt reveals which member you match with ≧◡≦
            </div>
          </div>

          <button className="press" onClick={onEnter} style={{
            marginTop: 36,
            background: 'var(--yellow)',
            color: 'var(--ink)',
            fontFamily: 'Bebas Neue',
            fontSize: 32, letterSpacing: '0.2em',
            padding: '22px 64px',
            border: '4px solid #fff',
            boxShadow: '6px 6px 0 var(--red)',
            cursor: 'pointer',
          }}>
            ENTER STORE
          </button>
          <div style={{ marginTop: 14, color: 'var(--yellow)', fontFamily: 'VT323, monospace', fontSize: 18 }}>
            いらっしゃいませ <span className="blink">_</span>
          </div>
        </div>
      </div>

      {/* Footer marquee */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2 }}>
        <Marquee items={[
          '★ NEW SINGLE — YANKEE SQUAT — OUT NOW',
          '★ ONE OR EIGHT',
          '★ BUILD YOUR CART & GET MATCHED',
          '★ 24 HOURS / 365 DAYS',
        ]} />
      </div>
    </div>
  );
}

// ============= DESKTOP AISLE =============
function AisleDesktop({ cart, addItem, removeItem, onCheckout, maxItems }) {
  const [cat, setCat] = React.useState('snacks');
  const products = window.PRODUCTS.filter(p => p.cat === cat);
  const itemCount = Object.values(cart).reduce((a,b) => a+b, 0);
  const subtotal = Object.entries(cart).reduce((acc, [id, qty]) => {
    const prod = window.PRODUCTS.find(p => p.id === id);
    return acc + (prod ? prod.price * qty : 0);
  }, 0);
  const cartItems = Object.entries(cart).map(([id, qty]) => ({
    ...window.PRODUCTS.find(p => p.id === id), qty,
  }));

  return (
    <div className="screen" style={{ background: 'var(--cream)', color: 'var(--ink)' }}>
      {/* Store header */}
      <div style={{
        background: 'var(--red)', color: '#fff',
        padding: '14px 40px',
        display: 'flex', alignItems: 'center', gap: 14,
        borderBottom: '3px solid var(--ink)',
      }}>
        <img src="assets/logo.png" alt="" style={{ height: 40, filter: 'brightness(0) invert(1)' }} />
        <div style={{ fontFamily: 'Bebas Neue', fontSize: 30, letterSpacing: '0.05em' }}>KONBINI 108</div>
        <div style={{ flex: 1 }}/>
        <div style={{ fontFamily: 'VT323, monospace', fontSize: 15, color: 'var(--yellow)', letterSpacing: '0.05em' }}>
          <span className="blink" style={{ color: '#0F0' }}>●</span> OPEN 24H ・ 営業中
        </div>
      </div>

      <Marquee items={[
        '★ NEW SINGLE — YANKEE SQUAT — OUT NOW',
        '★ YANKEE SQUAT / ONE OR EIGHT',
        '★ BUILD YOUR CART & GET MATCHED',
        '★ FREE STAMP WITH EVERY ORDER',
      ]} />

      {/* Main 2-col layout: shop left, cart sidebar right */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0,1fr) 360px',
        gap: 32, padding: '24px 40px 60px',
        maxWidth: 1500, margin: '0 auto',
        alignItems: 'start',
      }}>
        {/* LEFT: shop */}
        <div>
          {/* Category tabs */}
          <div style={{
            display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20,
          }}>
            {window.CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setCat(c.id)} style={{
                background: cat === c.id ? 'var(--ink)' : '#fff',
                color: cat === c.id ? 'var(--yellow)' : 'var(--ink)',
                border: '2px solid var(--ink)',
                padding: '10px 14px',
                display: 'flex', alignItems: 'center', gap: 8,
                boxShadow: cat === c.id ? '3px 3px 0 var(--red)' : 'none',
                cursor: 'pointer',
              }}>
                <span style={{ fontSize: 20 }}>{c.icon}</span>
                <span style={{ fontFamily: 'Bebas Neue', fontSize: 16, letterSpacing: '0.08em' }}>{c.en}</span>
                <span style={{ fontSize: 11, opacity: 0.6 }}>{c.jp}</span>
              </button>
            ))}
          </div>

          {/* Section header */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 42, lineHeight: 1, letterSpacing: '0.05em' }}>
              {window.CATEGORIES.find(c => c.id === cat).en}
            </div>
            <div style={{ fontFamily: '"Zen Kaku Gothic New"', fontSize: 18, fontWeight: 700, color: 'var(--red)' }}>
              {window.CATEGORIES.find(c => c.id === cat).jp}
            </div>
            <div style={{ flex: 1 }}/>
            <div style={{ fontFamily: 'VT323, monospace', fontSize: 14, opacity: 0.6, whiteSpace: 'nowrap' }}>
              {products.length} ITEMS
            </div>
          </div>

          {/* Product grid: 4 cols on desktop */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
            gap: 14,
          }}>
            {products.map(p => (
              <ProductCard
                key={p.id} p={p}
                inCart={cart[p.id] || 0}
                onAdd={() => itemCount < maxItems && addItem(p.id)}
                onRemove={() => removeItem(p.id)}
              />
            ))}
          </div>
        </div>

        {/* RIGHT: cart sidebar */}
        <aside style={{
          position: 'sticky', top: 20,
          background: '#fff', border: '2px solid var(--ink)',
          boxShadow: '6px 6px 0 var(--ink)',
        }}>
          <div style={{
            background: 'var(--ink)', color: 'var(--yellow)',
            padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <span style={{ fontSize: 22 }}>🛒</span>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 20, letterSpacing: '0.08em' }}>YOUR BASKET</div>
            <div style={{ flex: 1 }}/>
            <div style={{ fontFamily: 'VT323, monospace', fontSize: 13 }}>{itemCount}/{maxItems}</div>
          </div>

          <div style={{
            maxHeight: 'min(50vh, 400px)', overflowY: 'auto',
            padding: cartItems.length === 0 ? 0 : 8,
          }}>
            {cartItems.length === 0 ? (
              <div style={{
                padding: '40px 20px', textAlign: 'center',
                fontFamily: 'VT323, monospace', fontSize: 16,
                color: 'var(--ink)', opacity: 0.5,
              }}>
                <div style={{ fontSize: 48, marginBottom: 8 }}>🛒</div>
                BASKET IS EMPTY<br/>
                <span style={{ fontSize: 13 }}>add items from the aisle</span>
              </div>
            ) : cartItems.map(item => (
              <div key={item.id} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: 6, borderBottom: '1px dashed var(--line)',
              }}>
                <div style={{
                  width: 40, height: 40, background: `linear-gradient(135deg, ${item.c2}, ${item.c1}22)`,
                  border: '1px solid var(--ink)',
                  padding: 2, flexShrink: 0,
                }}>
                  <ProductArt product={item} size={34} />
                </div>
                <div style={{ flex: 1, minWidth: 0, lineHeight: 1.1 }}>
                  <div style={{ fontFamily: 'Bebas Neue', fontSize: 13, letterSpacing: '0.05em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.en}</div>
                  <div style={{ fontFamily: 'VT323, monospace', fontSize: 12, color: 'var(--red)' }}>¥{item.price}</div>
                </div>
                <button onClick={() => removeItem(item.id)} aria-label="Remove" style={{
                  width: 22, height: 22, background: 'var(--ink)', color: '#fff',
                  fontFamily: 'Bebas Neue', fontSize: 14, lineHeight: 1, cursor: 'pointer',
                }}>×</button>
              </div>
            ))}
          </div>

          {/* Totals + CTA */}
          <div style={{
            borderTop: '2px solid var(--ink)', padding: 12,
            background: 'var(--cream)',
            fontFamily: 'VT323, monospace', fontSize: 15,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>SUBTOTAL</span>
              <span>¥{subtotal.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', opacity: 0.7 }}>
              <span>TAX (10%)</span>
              <span>¥{Math.round(subtotal*0.1).toLocaleString()}</span>
            </div>
            <DotDivider />
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              fontFamily: 'Bebas Neue', fontSize: 28, color: 'var(--red)', marginTop: 6,
            }}>
              <span>TOTAL</span>
              <span>¥{(subtotal + Math.round(subtotal*0.1)).toLocaleString()}</span>
            </div>
          </div>

          <button onClick={onCheckout} disabled={itemCount === 0} className="press" style={{
            width: '100%',
            background: itemCount === 0 ? '#888' : 'var(--ink)',
            color: itemCount === 0 ? '#ccc' : 'var(--yellow)',
            fontFamily: 'Bebas Neue', fontSize: 22, letterSpacing: '0.15em',
            padding: '16px 0',
            cursor: itemCount === 0 ? 'not-allowed' : 'pointer',
            borderTop: '3px solid var(--yellow)',
          }}>
            {itemCount === 0 ? 'ADD ITEMS' : 'GO TO REGISTER'}
          </button>
        </aside>
      </div>
    </div>
  );
}

// ============= DESKTOP RECEIPT (cart screen skipped on desktop — sidebar already shows cart) =============
function ReceiptDesktop({ cart, onShare, onRestart }) {
  const [printing, setPrinting] = React.useState(true);
  const [showMatch, setShowMatch] = React.useState(false);

  const items = Object.entries(cart).map(([id, qty]) => ({
    ...window.PRODUCTS.find(p => p.id === id), qty,
  }));
  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0);
  const tax = Math.round(subtotal * 0.10);
  const total = subtotal + tax;

  const tagCounts = {};
  items.forEach(i => {
    (i.tags || []).forEach(t => { tagCounts[t] = (tagCounts[t] || 0) + i.qty; });
  });
  const matchId = Object.entries(tagCounts).sort((a,b) => b[1]-a[1])[0]?.[0];
  // If no tagged items in cart, pick a random member as a graceful fallback
  const fallbackMember = React.useMemo(
    () => window.MEMBERS[Math.floor(Math.random() * window.MEMBERS.length)],
    []
  );
  const match = window.MEMBERS.find(m => m.id === matchId) || fallbackMember;

  const orderNum = React.useMemo(() => String(Math.floor(Math.random()*900000)+100000), []);
  const branch = React.useMemo(() => window.STORE_BRANCHES[Math.floor(Math.random()*window.STORE_BRANCHES.length)], []);

  React.useEffect(() => {
    const t1 = setTimeout(() => setPrinting(false), 1500);
    const t2 = setTimeout(() => setShowMatch(true), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const now = new Date();
  const dateStr = `${now.getFullYear()}/${String(now.getMonth()+1).padStart(2,'0')}/${String(now.getDate()).padStart(2,'0')}`;
  const timeStr = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  const branchJP = { SHIBUYA:'渋谷', SHINJUKU:'新宿', HARAJUKU:'原宿', NAKANO:'中野', KOENJI:'高円寺', SHIMOKITA:'下北' };

  return (
    <div className="screen scanlines" style={{
      background: 'var(--ink)',
      paddingTop: 0,
      position: 'relative',
    }}>
      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: 'rgba(15,20,25,0.85)', backdropFilter: 'blur(8px)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '14px 40px',
      }}>
        <button onClick={onRestart} style={{
          color: '#fff', fontFamily: 'VT323, monospace', fontSize: 16,
        }}>↻ NEW ORDER</button>
        <div style={{ color: 'var(--yellow)', fontFamily: 'Bebas Neue', fontSize: 16, letterSpacing: '0.15em' }}>
          {printing ? <><span className="blink">●</span> PRINTING...</> : '★ RECEIPT READY ★'}
        </div>
        <div style={{ width: 100 }}/>
      </div>

      {/* Centered receipt with match panel on side */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '440px 1fr',
        gap: 40,
        maxWidth: 1100, margin: '0 auto',
        padding: '40px 40px 80px',
        alignItems: 'start',
      }}>
        {/* Receipt */}
        <div data-share-receipt="1" style={{
          background: 'var(--receipt)',
          color: 'var(--ink)',
          fontFamily: 'VT323, monospace',
          fontSize: 16,
          lineHeight: 1.25,
          padding: '28px 22px 16px',
          maxHeight: printing ? 0 : 3000,
          overflow: 'hidden',
          transition: 'max-height 1.5s cubic-bezier(0.45,0,0.55,1)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.7), 0 0 60px rgba(255,214,10,0.1)',
          clipPath: 'polygon(0% 6px, 4% 0%, 8% 6px, 12% 0%, 16% 6px, 20% 0%, 24% 6px, 28% 0%, 32% 6px, 36% 0%, 40% 6px, 44% 0%, 48% 6px, 52% 0%, 56% 6px, 60% 0%, 64% 6px, 68% 0%, 72% 6px, 76% 0%, 80% 6px, 84% 0%, 88% 6px, 92% 0%, 96% 6px, 100% 0%, 100% 100%, 0% 100%)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: 8 }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 34, letterSpacing: '0.05em' }}>
              <Star size={22} color="var(--red)" /> KONBINI 108 <Star size={22} color="var(--red)" />
            </div>
            <div style={{ fontSize: 14 }}>コンビニ・イチマルハチ</div>
            <div style={{ fontSize: 12, marginTop: 4, opacity: 0.8 }}>
              {branch} BRANCH ・ {branchJP[branch] || ''}店<br/>
              TEL: 03-1080-0108
            </div>
          </div>
          <DotDivider />
          <div style={{ margin: '8px 0', fontSize: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>DATE / 日付</span><span>{dateStr}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>TIME / 時刻</span><span>{timeStr}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>ORDER #</span><span>{orderNum}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>REGISTER</span><span>#108</span></div>
          </div>
          <DotDivider />
          <div style={{ margin: '8px 0' }}>
            {items.map(item => (
              <div key={item.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ flex: 1, paddingRight: 6 }}>{item.en}</span>
                  <span>¥{(item.price * item.qty).toLocaleString()}</span>
                </div>
                <div style={{ fontSize: 12, opacity: 0.6, paddingLeft: 8 }}>
                  {item.jp}
                </div>
              </div>
            ))}
          </div>
          <DotDivider />
          <div style={{ margin: '8px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>SUBTOTAL / 小計</span><span>¥{subtotal.toLocaleString()}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>TAX (10%) / 税</span><span>¥{tax.toLocaleString()}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'Bebas Neue', fontSize: 24, marginTop: 4, color: 'var(--red)' }}>
              <span>TOTAL</span><span>¥{total.toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>CASH / 現金</span><span>¥{total.toLocaleString()}</span></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>CHANGE / おつり</span><span>¥0</span></div>
          </div>
          <DotDivider />
          <div style={{ textAlign: 'center', margin: '10px 0', fontSize: 13 }}>
            <div>★ THANK YOU FOR YOUR PATRONAGE ★</div>
            <div>ありがとうございました ≧◡≦</div>
            <div style={{ marginTop: 4, opacity: 0.7 }}>PLEASE COME AGAIN / またお越しください</div>
          </div>
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center' }}>
            <Barcode width={240} height={50} />
          </div>
          <div style={{ textAlign: 'center', fontSize: 11, opacity: 0.6, marginTop: 4 }}>
            KONBINI108 / 1OR8 / YANKEESQUAT / {orderNum}
          </div>
        </div>

        {/* Match reveal column */}
        <div style={{
          opacity: showMatch ? 1 : 0,
          transform: showMatch ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s, transform 0.8s',
          color: '#fff',
          position: 'sticky', top: 80,
        }}>
          <div style={{ fontSize: 14, opacity: 0.7, letterSpacing: '0.3em', fontFamily: 'VT323, monospace' }}>
            ★ YOU MATCH WITH / 診断結果 ★
          </div>

          {/* Portrait + name row */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 22, marginTop: 14 }}>
            {/* Portrait slot */}
            <div style={{
              width: 200, height: 200, flexShrink: 0,
              background: match.color,
              border: '4px solid #fff',
              boxShadow: `8px 8px 0 var(--ink)`,
              position: 'relative', overflow: 'hidden',
            }}>
              <img src={match.photo} alt={match.name}
                   style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                   onError={(e) => { e.target.style.display = 'none'; }} />
            </div>

            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{
                fontFamily: 'Bebas Neue',
                fontSize: 'clamp(64px, 8vw, 108px)', lineHeight: 0.9,
                color: match.color, letterSpacing: '0.02em',
                textShadow: `5px 5px 0 var(--ink), 0 0 80px ${match.color}66`,
                wordBreak: 'break-all',
              }}>{match.name}</div>
              <div style={{ fontFamily: '"Zen Kaku Gothic New"', fontSize: 28, fontWeight: 900, marginTop: 6 }}>
                {match.jp}
              </div>
              <div style={{ marginTop: 10, fontFamily: 'VT323, monospace', fontSize: 16, color: 'var(--yellow)', letterSpacing: '0.15em' }}>
                of ONE OR EIGHT
              </div>
              <div style={{
                display: 'inline-block', marginTop: 14, padding: '6px 14px',
                background: '#fff', color: 'var(--ink)',
                fontFamily: 'Bebas Neue', fontSize: 16, letterSpacing: '0.1em',
                border: '2px solid var(--ink)',
                boxShadow: `4px 4px 0 ${match.color}`,
              }}>
                YANKEE SQUAT ・ OUT NOW
              </div>
            </div>
          </div>

          {/* Save receipt — desktop uses a single Download action;
              IG/X/TikTok share flows live on mobile only, where the native
              share sheet actually opens the target app. On desktop those
              buttons only produce a downloaded PNG anyway, so we just
              expose that directly. */}
          <div style={{ marginTop: 28 }}>
            <div style={{ fontFamily: 'Bebas Neue', fontSize: 18, color: 'var(--yellow)', letterSpacing: '0.2em', marginBottom: 10 }}>
              SAVE YOUR RECEIPT ・ 保存
            </div>
            <button
              onClick={() => onShare('download', { match, items, subtotal, tax, total, orderNum, branch })}
              className="press"
              style={{
                background: 'var(--yellow)', color: 'var(--ink)',
                padding: '14px 28px',
                fontFamily: 'Bebas Neue', fontSize: 18, letterSpacing: '0.12em',
                border: '3px solid var(--ink)',
                boxShadow: `4px 4px 0 ${match.color}`,
                cursor: 'pointer',
              }}
            >
              DOWNLOAD RECEIPT
            </button>
          </div>

          {/* Newsletter signup */}
          <div style={{ marginTop: 28, maxWidth: 500 }}>
            <NewsletterSignup matchedMember={match.id} />
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { useIsDesktop, SplashDesktop, AisleDesktop, ReceiptDesktop });
