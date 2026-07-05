// Konbini 108 — App entry
const { useState, useEffect } = React;

const MAX_ITEMS = 11;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "night",
  "showScanlines": true
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  // Restore screen but skip 'receipt' on fresh load (would be confusing)
  const [screen, setScreen] = useState(() => {
    const s = localStorage.getItem('k108-screen');
    return (s && s !== 'receipt') ? s : 'splash';
  });
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('k108-cart') || '{}'); } catch { return {}; }
  });

  useEffect(() => { localStorage.setItem('k108-screen', screen); }, [screen]);
  useEffect(() => { localStorage.setItem('k108-cart', JSON.stringify(cart)); }, [cart]);

  // Quantities are always 1 per item — the cart is a SET.
  const itemCount = Object.keys(cart).length;

  const addItem = (id) => {
    if (cart[id]) return; // already in cart
    if (itemCount >= MAX_ITEMS) return;
    setCart(c => ({ ...c, [id]: 1 }));
  };
  const removeItem = (id) => {
    setCart(c => {
      const next = { ...c };
      delete next[id];
      return next;
    });
  };
  const toggleItem = (id) => {
    if (cart[id]) removeItem(id);
    else addItem(id);
  };
  const restart = () => {
    setCart({});
    setScreen('splash');
  };

  const onShare = (platform) => {
    // Placeholder: in real build, would generate image
    alert(`Share to ${platform.toUpperCase()}\n\n(Placeholder — will generate shareable image of the receipt.)`);
  };

  // Apply theme class to body
  useEffect(() => {
    document.body.classList.toggle('theme-day', tweaks.theme === 'day');
    document.body.classList.toggle('no-scanlines', !tweaks.showScanlines);
  }, [tweaks.theme, tweaks.showScanlines]);

  const isDesktop = useIsDesktop();

  // On desktop, "cart" is shown as sidebar in aisle — skip to receipt
  const goCheckout = () => setScreen(isDesktop ? 'receipt' : 'cart');

  return (
    <>
      {screen === 'splash' && (
        isDesktop
          ? <SplashDesktop onEnter={() => setScreen('aisle')} />
          : <SplashScreen onEnter={() => setScreen('aisle')} />
      )}
      {screen === 'aisle' && (
        isDesktop
          ? <AisleDesktop
              cart={cart}
              addItem={addItem}
              removeItem={removeItem}
              maxItems={MAX_ITEMS}
              onCheckout={goCheckout}
            />
          : <AisleScreen
              cart={cart}
              addItem={addItem}
              removeItem={removeItem}
              maxItems={MAX_ITEMS}
              onCheckout={() => setScreen('cart')}
            />
      )}
      {screen === 'cart' && !isDesktop && (
        <CartScreen
          cart={cart}
          addItem={addItem}
          removeItem={removeItem}
          onBack={() => setScreen('aisle')}
          onCheckout={() => setScreen('receipt')}
        />
      )}
      {screen === 'cart' && isDesktop && (
        // If on desktop and somehow on cart screen, redirect to receipt
        <ReceiptDesktop cart={cart} onShare={onShare} onRestart={restart} />
      )}
      {screen === 'receipt' && (
        isDesktop
          ? <ReceiptDesktop cart={cart} onShare={onShare} onRestart={restart} />
          : <ReceiptScreen cart={cart} onShare={onShare} onRestart={restart} />
      )}

      <SpotifyPlayer />

      <TweaksPanel title="TWEAKS / 設定">
        <TweakSection title="Visual Direction">
          <TweakRadio
            label="Aesthetic"
            value={tweaks.theme}
            onChange={v => setTweak('theme', v)}
            options={[
              { value: 'night', label: 'Night Alley' },
              { value: 'day',   label: 'Daytime Pop' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Display">
          <TweakToggle label="CRT scanlines" value={tweaks.showScanlines} onChange={v => setTweak('showScanlines', v)} />
        </TweakSection>
        <TweakSection title="Navigation">
          <TweakButton onClick={() => setScreen('splash')}>Go to Splash</TweakButton>
          <TweakButton onClick={() => setScreen('aisle')}>Go to Aisle</TweakButton>
          <TweakButton onClick={() => setScreen('cart')}>Go to Cart</TweakButton>
          <TweakButton onClick={() => {
            // seed sample cart for receipt preview
            const sample = {r01:1,d01:1,d08:1,h01:1,w01:1,b01:1,s01:1,n01:1};
            setCart(sample);
            setScreen('receipt');
          }}>Preview Receipt (sample cart)</TweakButton>
          <TweakButton onClick={restart}>Reset everything</TweakButton>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
