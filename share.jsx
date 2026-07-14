// Konbini 108 — share utility
// Captures the receipt as a PNG (html2canvas), then routes to the right sharing flow
// per platform:
//   - Mobile w/ Web Share Level 2 (files): native share sheet → user picks IG/X/TikTok/etc
//   - Desktop or unsupported: download PNG + copy caption + open compose window when possible
//
// Elements marked with data-share-receipt="1" are the capture target.

(function () {
  // ============ Toast ============
  let toastEl = null;
  let toastTimer = null;
  function showToast(msg, opts = {}) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.setAttribute('data-share-toast', '1');
      toastEl.style.cssText = [
        'position:fixed', 'left:50%', 'bottom:24px', 'transform:translate(-50%, 40px)',
        'background:#0f1419', 'color:#fff',
        'border:2px solid #FFD60A', 'padding:12px 18px',
        'font-family:VT323, monospace', 'font-size:16px', 'line-height:1.35',
        'z-index:99999', 'pointer-events:none',
        'max-width:min(88vw, 420px)', 'text-align:center',
        'opacity:0', 'transition:opacity 220ms ease, transform 220ms ease',
        'box-shadow:0 12px 40px rgba(0,0,0,0.5)',
        'white-space:pre-line',
      ].join(';');
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    toastEl.style.borderColor = opts.error ? '#ff4d5a' : (opts.success ? '#3ee6a0' : '#FFD60A');
    // force reflow so the transition actually plays
    void toastEl.offsetWidth;
    toastEl.style.opacity = '1';
    toastEl.style.transform = 'translate(-50%, 0)';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.style.opacity = '0';
      toastEl.style.transform = 'translate(-50%, 40px)';
    }, opts.duration || 3200);
  }

  // ============ Caption builder ============
  function buildCaption(platform, match) {
    const name = match && match.name ? match.name.toUpperCase() : '';
    const tag = name ? `I matched with ${name} of ONE OR EIGHT at KONBINI 108 ★` : `Just got my match at KONBINI 108 ★`;
    const cta = `YANKEE SQUAT — out now on Spotify 🎧`;
    const tags = {
      ig: '#ONEOREIGHT #YANKEESQUAT #KONBINI108 #1OR8',
      x:  '#ONEOREIGHT #YANKEESQUAT #KONBINI108',
      tt: '#oneoreight #yankeesquat #konbini108 #jpop #fyp',
    }[platform] || '#ONEOREIGHT #KONBINI108';
    return `${tag}\n${cta}\n${tags}`;
  }

  // ============ Capture ============
  async function captureReceipt() {
    const node = document.querySelector('[data-share-receipt="1"]');
    if (!node) throw new Error('Receipt not visible — wait for it to finish printing.');
    if (typeof window.html2canvas !== 'function') {
      throw new Error('Share helper not loaded. Please refresh.');
    }
    // Read the actual receipt background from the CSS var so the PNG isn't transparent
    const bg = getComputedStyle(document.body).getPropertyValue('--receipt').trim() || '#f4ead5';
    const canvas = await window.html2canvas(node, {
      backgroundColor: bg,
      scale: Math.min(window.devicePixelRatio || 1, 2), // crisp but capped for perf
      useCORS: true,
      logging: false,
      // The receipt has a jagged clipPath at top; html2canvas doesn't respect
      // clip-path, so we get a clean rectangle — fine for social.
    });
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => blob ? resolve(blob) : reject(new Error('Could not encode PNG.')),
        'image/png',
        0.95
      );
    });
  }

  // ============ Copy caption ============
  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch { return false; }
  }

  // ============ Download ============
  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  // ============ Compose deep-links (desktop fallback) ============
  function openCompose(platform, caption) {
    if (platform === 'x') {
      // X (Twitter) web intent — text only (images must be attached manually from download)
      const u = 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(caption);
      window.open(u, '_blank', 'noopener,noreferrer');
      return true;
    }
    // IG & TikTok don't offer a web compose endpoint that accepts an image.
    // On desktop we can only download + copy caption; the user uploads manually.
    return false;
  }

  // ============ Main entry ============
  async function shareReceipt(platform, match) {
    const platformLabel = { ig: 'Instagram', x: 'X', tt: 'TikTok' }[platform] || platform;

    let blob;
    try {
      showToast('Rendering your receipt…');
      blob = await captureReceipt();
    } catch (err) {
      console.error('[share] capture failed:', err);
      showToast(err.message || 'Could not render receipt.', { error: true });
      return;
    }

    const caption = buildCaption(platform, match);
    const filename = `konbini108-receipt-${match?.id || 'match'}.png`;
    const file = new File([blob], filename, { type: 'image/png' });

    // Preferred path: Web Share API Level 2 (files). Works on iOS Safari, Chrome Android, etc.
    // navigator.canShare({files}) tells us whether the file is shareable.
    const canShareFile =
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({ files: [file] });

    if (canShareFile) {
      try {
        await navigator.share({
          files: [file],
          text: caption,
          title: 'KONBINI 108',
        });
        showToast(`Shared to ${platformLabel} ✓`, { success: true });
        return;
      } catch (err) {
        // User canceled — that's fine, exit silently.
        if (err && (err.name === 'AbortError' || /abort|cancel/i.test(err.message || ''))) return;
        console.warn('[share] navigator.share failed, falling back:', err);
        // fall through to download flow
      }
    }

    // Fallback: download PNG + copy caption + (X only) open compose window
    downloadBlob(blob, filename);
    const copied = await copyText(caption);

    if (platform === 'x') {
      openCompose('x', caption);
      showToast(
        `Receipt saved & caption ${copied ? 'copied' : 'ready'}.\nX compose opened — attach the image.`,
        { success: true, duration: 5000 }
      );
      return;
    }

    if (platform === 'ig') {
      showToast(
        `Receipt saved${copied ? ' & caption copied' : ''}.\nOpen Instagram → new Story → upload the image.`,
        { success: true, duration: 5500 }
      );
      return;
    }

    if (platform === 'tt') {
      showToast(
        `Receipt saved${copied ? ' & caption copied' : ''}.\nOpen TikTok → upload → paste caption.`,
        { success: true, duration: 5500 }
      );
      return;
    }
  }

  // Expose
  window.KonbiniShare = { shareReceipt, showToast };
})();
