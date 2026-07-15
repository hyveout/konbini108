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
    const cta = `YANKEE SQUAT — out now on Spotify`;
    const tags = {
      ig: '#ONEOREIGHT #YANKEESQUAT #KONBINI108 #1OR8',
      x:  '#ONEOREIGHT #YANKEESQUAT #KONBINI108',
      tt: '#oneoreight #yankeesquat #konbini108 #jpop #fyp',
    }[platform] || '#ONEOREIGHT #KONBINI108';
    return `${tag}\n${cta}\n${tags}`;
  }

  // ============ Bake image to a square data URL ============
  //
  // html2canvas has known bugs with `object-fit: cover` on <img> — it often
  // renders the image at its natural aspect ratio (leaving black bars) or
  // captures a half-loaded state. To guarantee a clean square crop, we
  // pre-render the source image into an off-DOM <canvas> at exactly the
  // target size (using proper cover-crop math), then export as a data URL.
  // The composition then displays this pre-baked data URL — html2canvas
  // captures it perfectly because it's an already-decoded raster in place.
  function bakeImageToSquareDataUrl(src, size = 460) {
    // Bakes the source image into a cropped square PNG and returns it as a
    // blob: URL (NOT a data: URL).
    //
    // Why blob URL instead of data URL: html2canvas has a known bug where it
    // silently fails to render <img src="data:image/png;base64,..."> elements
    // with large data URLs — the img element exists in its cloned DOM with all
    // correct properties, but the actual PNG never draws to the output canvas.
    // Using blob: URLs works around this because the browser treats blob refs
    // like normal same-origin image requests.
    //
    // CORS strategy:
    //   1. Try with crossOrigin='anonymous' — works if server sends CORS.
    //   2. On failure, load without crossOrigin — image displays but canvas
    //      may be tainted (toDataURL throws). We catch that too and return null.
    //   3. If null returned, the composition falls back to the raw match.photo
    async function attempt(useCors) {
      return new Promise((resolve) => {
        if (!src) return resolve(null);
        const img = new Image();
        if (useCors) img.crossOrigin = 'anonymous';
        const timeout = setTimeout(() => resolve(null), 6000);
        img.onerror = () => { clearTimeout(timeout); resolve(null); };
        img.onload = async () => {
          try {
            if (img.decode) { try { await img.decode(); } catch {} }
            const c = document.createElement('canvas');
            c.width = size;
            c.height = size;
            const ctx = c.getContext('2d');
            // Cover-crop math: shorter side fills, longer side centered
            const srcW = img.naturalWidth, srcH = img.naturalHeight;
            let sx, sy, sw, sh;
            if (srcW > srcH) {
              sh = srcH; sw = srcH;
              sx = (srcW - sw) / 2; sy = 0;
            } else {
              sw = srcW; sh = srcW;
              sx = 0; sy = (srcH - sh) / 2;
            }
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, size, size);
            // Convert to blob URL — NOT data URL. Data URLs cause html2canvas to
            // silently drop <img> renders even when the element exists in the
            // cloned DOM with correct src, naturalWidth, and complete=true.
            c.toBlob((blob) => {
              clearTimeout(timeout);
              if (blob) resolve(URL.createObjectURL(blob));
              else resolve(null);
            }, 'image/png', 0.95);
          } catch (err) {
            clearTimeout(timeout);
            // Tainted canvas or SecurityError — try next strategy
            resolve(null);
          }
        };
        img.src = src;
      });
    }

    // Same-origin URLs (or relative paths — which are always same-origin) don't
    // need CORS: browsers treat same-origin fetches as trusted, so the canvas
    // isn't tainted. Cross-origin URLs need crossOrigin='anonymous' + a matching
    // CORS response header from the server.
    const isSameOrigin = (() => {
      try {
        // Relative path — always same-origin
        if (!/^https?:\/\//i.test(src)) return true;
        const u = new URL(src, window.location.href);
        return u.origin === window.location.origin;
      } catch { return true; }
    })();

    return (async () => {
      // Try WITHOUT crossOrigin first for same-origin (safest). For cross-origin,
      // we NEED crossOrigin='anonymous' or the canvas will be tainted.
      const strategies = isSameOrigin ? [false, true] : [true, false];
      for (const useCors of strategies) {
        const result = await attempt(useCors);
        if (result) return result;
      }
      return null; // total failure — composition falls back to plain <img>
    })();
  }

  // ============ Capture the 1080×1920 share composition ============
  //
  // Instead of snapshotting the on-page receipt (which is a long scrollable
  // strip and looks awkward when IG crops it), we mount a purpose-built 9:16
  // ShareComposition into a hidden container, wait for its <img> to load,
  // snapshot it at 1080×1920, then unmount.
  async function captureShareImage(receiptData) {
    if (typeof window.html2canvas !== 'function') {
      throw new Error('Share helper not loaded. Please refresh.');
    }
    if (typeof window.ShareComposition !== 'function' || !window.React || !window.ReactDOM) {
      throw new Error('Share composition unavailable.');
    }

    // STEP 1: Bake the portrait to a pre-cropped square data URL. This
    // sidesteps html2canvas's issues with <img object-fit: cover> — the
    // portrait is now a self-contained, already-decoded raster.
    const portraitSrc = receiptData && receiptData.match && receiptData.match.photo;
    // Bake at exactly the composition's INNER display size (444px = 460 - 8px border × 2).
    // Matching the display size 1:1 gives html2canvas no scaling to do, which is
    // what it handles most reliably.
    const bakedPortrait = await bakeImageToSquareDataUrl(portraitSrc, 444);

    // STEP 2: Create hidden host — off-screen but not display:none (html2canvas needs
    // real layout). Use a fixed 1080×1920 box positioned far off-screen.
    const host = document.createElement('div');
    host.setAttribute('data-share-host', '1');
    host.style.cssText = [
      'position:fixed', 'left:-99999px', 'top:0',
      'width:1080px', 'height:1920px',
      'pointer-events:none', 'z-index:-1',
      'overflow:hidden',
    ].join(';');
    document.body.appendChild(host);

    const root = window.ReactDOM.createRoot(host);
    try {
      // Pass the baked portrait to the composition — it uses this instead of the URL.
      root.render(window.React.createElement(window.ShareComposition, {
        ...receiptData,
        bakedPortrait,
      }));

      // STEP 3: Wait a couple animation frames for React to commit + browser to paint.
      // Since the portrait is a baked data URL, no image-load races to worry about.
      await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
      await new Promise(r => setTimeout(r, 50)); // extra small buffer for font loading

      const compositionNode = host.querySelector('[data-share-composition="1"]');
      if (!compositionNode) throw new Error('Composition failed to render.');

      const canvas = await window.html2canvas(compositionNode, {
        backgroundColor: '#0a0a0a',
        width: 1080,
        height: 1920,
        scale: 1, // composition is already 1080×1920; no upscale needed
        useCORS: true,
        allowTaint: false,
        logging: false,
        // imageTimeout — ensures html2canvas itself waits for image data
        imageTimeout: 8000,
      });

      return await new Promise((resolve, reject) => {
        canvas.toBlob(
          (blob) => blob ? resolve(blob) : reject(new Error('Could not encode PNG.')),
          'image/png',
          0.95
        );
      });
    } finally {
      // Always clean up
      try { root.unmount(); } catch {}
      host.remove();
      // Revoke blob URL for the baked portrait
      if (bakedPortrait && bakedPortrait.startsWith('blob:')) {
        try { URL.revokeObjectURL(bakedPortrait); } catch {}
      }
    }
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
  //
  // `receiptData` shape: { match, items, subtotal, tax, total, orderNum, branch }
  // — everything ShareComposition needs. Callers (the receipt screens) pass this in.
  //
  // Special platform `'download'`: skip all share/social routing, just save the
  // PNG straight to disk. Used by the desktop "DOWNLOAD RECEIPT" button.
  async function shareReceipt(platform, receiptData) {
    const platformLabel = { ig: 'Instagram', x: 'X', tt: 'TikTok', download: 'Download' }[platform] || platform;
    const match = receiptData && receiptData.match;

    let blob;
    try {
      showToast('Rendering your receipt…');
      blob = await captureShareImage(receiptData);
    } catch (err) {
      console.error('[share] capture failed:', err);
      showToast(err.message || 'Could not render receipt.', { error: true });
      return;
    }

    const caption = buildCaption(platform, match);
    const filename = `konbini108-${match?.id || 'match'}-story.png`;

    // ── Explicit download flow (desktop button) ──
    if (platform === 'download') {
      downloadBlob(blob, filename);
      showToast('Receipt saved ✓', { success: true });
      return;
    }

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
