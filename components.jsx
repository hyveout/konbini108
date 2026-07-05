// Konbini 108 — shared components

const { useState, useEffect, useRef, useMemo } = React;

// Star icon (the brand mark from press photo)
function Star({ size = 24, color = '#E63946', fill = true, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}
         style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path
        d="M12 2 L14.6 9.2 L22 9.5 L16.2 14.1 L18.3 21.5 L12 17.3 L5.7 21.5 L7.8 14.1 L2 9.5 L9.4 9.2 Z"
        fill={fill ? color : 'none'}
        stroke={color}
        strokeWidth={fill ? 0 : 1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Barcode SVG
function Barcode({ width = 200, height = 50, dark = '#0F1419' }) {
  const bars = useMemo(() => {
    const arr = [];
    let x = 0;
    while (x < 100) {
      const w = Math.random() > 0.5 ? 0.5 : (Math.random() > 0.7 ? 2 : 1);
      const gap = Math.random() > 0.6 ? 1.2 : 0.6;
      arr.push({ x, w });
      x += w + gap;
    }
    return arr;
  }, []);
  return (
    <svg width={width} height={height} viewBox={`0 0 100 50`} preserveAspectRatio="none">
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w} height={42} fill={dark} />
      ))}
      <text x="50" y="49" textAnchor="middle" fontSize="5" fontFamily="VT323, monospace" fill={dark}>
        4 901234 567890
      </text>
    </svg>
  );
}

// No phone chrome — this is a real website now.
function PhoneChrome() { return null; }

// Marquee ticker
function Marquee({ items, speed = 30, color = 'var(--yellow)' }) {
  const sep = '  \u2605  ';
  const content = items.join(sep) + sep;
  return (
    <div className="marquee" style={{ background: 'var(--red)', color, fontFamily: 'Bebas Neue', fontSize: 14, letterSpacing: '0.1em', padding: '6px 0' }}>
      <div className="marquee-inner" style={{ animationDuration: `${speed}s` }}>
        <span>{content}</span>
        <span>{content}</span>
      </div>
    </div>
  );
}

// Dotted divider (receipt style)
function DotDivider({ color = '#0F1419', char = '\u00B7' }) {
  return (
    <div style={{
      color, overflow: 'hidden', height: '1em', lineHeight: '1em',
      fontFamily: 'VT323, monospace', fontSize: 18, letterSpacing: '2px',
      whiteSpace: 'nowrap', opacity: 0.7
    }}>
      {char.repeat(80)}
    </div>
  );
}

Object.assign(window, { Star, Barcode, PhoneChrome, Marquee, DotDivider });
