import { useEffect } from 'react';

// 16 evenly-spaced directions, alternating colours and sizes for a pixel-art look
const PARTICLES = [
  { dx:  0.00, dy: -1.00, size: 10, color: '#ffcc00', delay:  0  },
  { dx:  0.38, dy: -0.92, size:  6, color: '#ff9900', delay: 30  },
  { dx:  0.71, dy: -0.71, size:  9, color: '#ff6600', delay: 10  },
  { dx:  0.92, dy: -0.38, size:  5, color: '#ffff00', delay: 40  },
  { dx:  1.00, dy:  0.00, size: 11, color: '#ff3300', delay:  0  },
  { dx:  0.92, dy:  0.38, size:  6, color: '#ffcc00', delay: 20  },
  { dx:  0.71, dy:  0.71, size:  8, color: '#ff9900', delay: 50  },
  { dx:  0.38, dy:  0.92, size:  5, color: '#ff6600', delay:  0  },
  { dx:  0.00, dy:  1.00, size: 10, color: '#ffff00', delay: 35  },
  { dx: -0.38, dy:  0.92, size:  6, color: '#ff3300', delay: 15  },
  { dx: -0.71, dy:  0.71, size:  9, color: '#ffcc00', delay: 45  },
  { dx: -0.92, dy:  0.38, size:  5, color: '#ff9900', delay:  0  },
  { dx: -1.00, dy:  0.00, size: 11, color: '#ff6600', delay: 25  },
  { dx: -0.92, dy: -0.38, size:  6, color: '#ffff00', delay: 55  },
  { dx: -0.71, dy: -0.71, size:  8, color: '#ff3300', delay: 10  },
  { dx: -0.38, dy: -0.92, size:  5, color: '#ffcc00', delay: 40  },
  // Extra inner-ring sparks
  { dx:  0.50, dy: -0.87, size:  4, color: '#ffffff', delay: 60  },
  { dx:  0.87, dy:  0.50, size:  4, color: '#ffffff', delay: 60  },
  { dx: -0.50, dy:  0.87, size:  4, color: '#ffffff', delay: 60  },
  { dx: -0.87, dy: -0.50, size:  4, color: '#ffffff', delay: 60  },
];

const DISTANCE = 90; // px particles travel

const ExplosionEffect = ({ x, y, onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 800);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      <style>{`
        @keyframes _expl_center {
          0%   { transform: scale(0.1); opacity: 1; }
          40%  { transform: scale(1.6); opacity: 0.9; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes _expl_ring {
          0%   { transform: scale(0.3); opacity: 0.7; }
          60%  { transform: scale(1.8); opacity: 0.4; }
          100% { transform: scale(2.6); opacity: 0; }
        }
        @keyframes _expl_particle {
          0%   { transform: translate(0, 0) scale(1);   opacity: 1; }
          70%  { opacity: 0.8; }
          100% { transform: translate(var(--px), var(--py)) scale(0.2); opacity: 0; }
        }
      `}</style>

      {/* Central flash */}
      <div style={{
        position: 'fixed',
        left: x - 36,
        top:  y - 36,
        width:  72,
        height: 72,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #ffffff 0%, #ffff88 25%, #ffcc00 55%, #ff6600 80%, transparent 100%)',
        imageRendering: 'pixelated',
        animation: '_expl_center 0.55s ease-out forwards',
      }} />

      {/* Outer ring */}
      <div style={{
        position: 'fixed',
        left: x - 55,
        top:  y - 55,
        width:  110,
        height: 110,
        borderRadius: '50%',
        border: '4px solid #ff9900',
        boxShadow: '0 0 8px 2px #ff6600',
        imageRendering: 'pixelated',
        animation: '_expl_ring 0.65s ease-out forwards',
      }} />

      {/* Pixel particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            left: x - p.size / 2,
            top:  y - p.size / 2,
            width:  p.size,
            height: p.size,
            background: p.color,
            imageRendering: 'pixelated',
            '--px': `${p.dx * DISTANCE}px`,
            '--py': `${p.dy * DISTANCE}px`,
            animation: `_expl_particle 0.75s ease-out ${p.delay}ms forwards`,
          }}
        />
      ))}
    </div>
  );
};

export default ExplosionEffect;
