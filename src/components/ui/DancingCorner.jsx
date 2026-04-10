import { memo } from 'react';

const P = 5; // px per "pixel"
const _ = null;

// ─── Kris palette ────────────────────────────────────────────────────────────
const KD = '#1e0f00'; // dark outline / pants
const KH = '#5c2f00'; // hair fill
const KS = '#d4884a'; // skin
const KY = '#e8d400'; // yellow shirt stripe
const KG = '#4a8c28'; // green shirt stripe
const KW = '#f0f0e0'; // white eyes

// ─── Susie palette ───────────────────────────────────────────────────────────
const SK = '#100814'; // near-black outline
const SP = '#4a1060'; // dark purple hair
const SF = '#d080b8'; // pink face / skin
const SJ = '#1a3d2e'; // dark green jacket
const SL = '#7030a8'; // purple shirt
const SO = '#c89000'; // gold trim / shoes
const SA = '#e890c8'; // pink arms / hands
const ST = '#0a2e20'; // dark teal pants

// ─── Kris frames (12 cols × 16 rows) ─────────────────────────────────────────
const KRIS = [
  [ // Frame 1 — arms to sides
    [_,_,_,KD,KD,KD,KD,KD,_,_,_,_],
    [_,_,KD,KH,KH,KH,KH,KH,KD,_,_,_],
    [_,_,KD,KH,KH,KH,KH,KH,KD,_,_,_],
    [_,_,KD,KH,KW,KS,KW,KH,KD,_,_,_], // eyes
    [_,_,KD,KS,KS,KS,KS,KS,KD,_,_,_],
    [_,_,_,KD,KD,KD,KD,KD,_,_,_,_],   // collar
    [_,_,_,KD,KY,KY,KY,KD,_,_,_,_],
    [_,_,_,KD,KG,KG,KG,KD,_,_,_,_],
    [_,_,_,KD,KY,KY,KY,KD,_,_,_,_],
    [KD,KD,_,KD,KY,KY,KY,KD,_,KD,KD,_], // arms out
    [_,_,_,_,KD,KD,KD,_,_,_,_,_],
    [_,_,_,KD,KD,_,KD,KD,_,_,_,_],
    [_,_,_,KD,KD,_,KD,KD,_,_,_,_],
    [_,_,_,KD,_,_,_,KD,_,_,_,_],
    [_,_,KD,KD,_,_,_,KD,KD,_,_,_],     // feet
    [_,_,_,_,_,_,_,_,_,_,_,_],
  ],
  [ // Frame 2 — arms raised, slight squat
    [_,_,_,KD,KD,KD,KD,KD,_,_,_,_],
    [_,KD,KD,KH,KH,KH,KH,KH,KD,KD,_,_], // arms up
    [_,_,KD,KH,KH,KH,KH,KH,KD,_,_,_],
    [_,_,KD,KH,KW,KS,KW,KH,KD,_,_,_],
    [_,_,KD,KS,KS,KS,KS,KS,KD,_,_,_],
    [_,_,_,KD,KD,KD,KD,KD,_,_,_,_],
    [_,_,_,KD,KY,KY,KY,KD,_,_,_,_],
    [_,_,_,KD,KG,KG,KG,KD,_,_,_,_],
    [_,_,_,KD,KY,KY,KY,KD,_,_,_,_],
    [_,_,_,KD,KY,KY,KY,KD,_,_,_,_],    // arms gone from here
    [_,_,_,_,KD,KD,KD,_,_,_,_,_],
    [_,_,_,KD,KD,_,KD,KD,_,_,_,_],
    [_,_,_,KD,_,_,_,KD,_,_,_,_],       // legs spread (squat)
    [_,_,KD,KD,_,_,_,KD,KD,_,_,_],
    [_,_,KD,_,_,_,_,_,KD,_,_,_],       // feet wide
    [_,_,_,_,_,_,_,_,_,_,_,_],
  ],
];

// ─── Susie frames (12 cols × 20 rows) ────────────────────────────────────────
const SUSIE = [
  [ // Frame 1 — arms to sides
    [_,_,SK,_,SK,_,SK,_,_,_,_,_],       // messy hair tips
    [_,SK,SP,SP,SP,SP,SP,SK,_,_,_,_],
    [SK,SP,SP,SP,SP,SP,SP,SP,SK,_,_,_],
    [SK,SP,SP,SP,SP,SP,SP,SP,SK,_,_,_],
    [SK,SP,SP,SF,SF,SF,SP,SP,SK,_,_,_], // face starts
    [SK,SP,SF,SF,SF,SF,SF,SP,SK,_,_,_],
    [SK,SP,SF,SF,SF,SF,SF,SP,SK,_,_,_],
    [_,SK,SP,SF,SF,SF,SP,SK,_,_,_,_],   // chin
    [_,_,SK,SK,SK,SK,SK,_,_,_,_,_],
    [_,SK,SJ,SL,SL,SL,SJ,SK,_,_,_,_],  // jacket top / purple shirt
    [SK,SJ,SJ,SL,SL,SL,SJ,SJ,SK,_,_,_],
    [SA,SA,SK,SL,SL,SL,SK,SA,SA,_,_,_], // pink arms
    [SA,SA,SK,SL,SL,SL,SK,SA,SA,_,_,_],
    [_,SK,SJ,SO,SO,SO,SJ,SK,_,_,_,_],  // gold belt
    [_,SK,SJ,SJ,SJ,SJ,SJ,SK,_,_,_,_],
    [_,_,SK,ST,ST,ST,SK,_,_,_,_,_],    // pants
    [_,_,SK,ST,_,ST,SK,_,_,_,_,_],
    [_,_,SK,ST,_,ST,SK,_,_,_,_,_],
    [_,_,SK,ST,_,ST,SK,_,_,_,_,_],
    [_,SK,SO,SO,_,SO,SO,SK,_,_,_,_],   // shoes
  ],
  [ // Frame 2 — arms raised, slight squat
    [_,_,SK,_,SK,_,SK,_,_,_,_,_],
    [_,SK,SP,SP,SP,SP,SP,SK,_,_,_,_],
    [SK,SP,SP,SP,SP,SP,SP,SP,SK,_,_,_],
    [SK,SP,SP,SP,SP,SP,SP,SP,SK,_,_,_],
    [SK,SP,SP,SF,SF,SF,SP,SP,SK,_,_,_],
    [SK,SP,SF,SF,SF,SF,SF,SP,SK,_,_,_],
    [SK,SP,SF,SF,SF,SF,SF,SP,SK,_,_,_],
    [_,SK,SP,SF,SF,SF,SP,SK,_,_,_,_],
    [_,_,SK,SK,SK,SK,SK,_,_,_,_,_],
    [SA,SK,SJ,SL,SL,SL,SJ,SK,SA,_,_,_], // arms raised to shoulder
    [SK,SJ,SJ,SL,SL,SL,SJ,SJ,SK,_,_,_],
    [_,SK,SK,SL,SL,SL,SK,SK,_,_,_,_],  // arms gone (they're up)
    [_,SK,SJ,SL,SL,SL,SJ,SK,_,_,_,_],
    [_,SK,SJ,SO,SO,SO,SJ,SK,_,_,_,_],
    [_,SK,SJ,SJ,SJ,SJ,SJ,SK,_,_,_,_],
    [_,_,SK,ST,ST,ST,SK,_,_,_,_,_],
    [_,_,SK,ST,_,ST,SK,_,_,_,_,_],
    [_,SK,ST,ST,_,ST,ST,SK,_,_,_,_],   // legs spread (squat)
    [_,SK,ST,_,_,_,ST,SK,_,_,_,_],
    [SK,SO,SO,_,_,_,SO,SO,SK,_,_,_],   // feet spread
  ],
];

// ─── Sprite renderer ──────────────────────────────────────────────────────────
const Sprite = memo(({ grid }) => (
  <svg
    width={grid[0].length * P}
    height={grid.length * P}
    style={{ display: 'block', imageRendering: 'pixelated' }}
  >
    {grid.flatMap((row, y) =>
      row.map((color, x) =>
        color ? (
          <rect key={`${y}-${x}`} x={x * P} y={y * P} width={P} height={P} fill={color} />
        ) : null
      )
    )}
  </svg>
));

// ─── Individual character with 2-frame flip ───────────────────────────────────
const DancingChar = ({ frames, delay = '0s' }) => (
  <div style={{ position: 'relative', animation: `dc-bob 0.4s steps(1,end) infinite alternate`, animationDelay: delay }}>
    <div style={{ animation: `dc-f1 0.4s steps(1,end) infinite alternate`, animationDelay: delay }}>
      <Sprite grid={frames[0]} />
    </div>
    <div style={{ position: 'absolute', top: 0, left: 0, animation: `dc-f2 0.4s steps(1,end) infinite alternate`, animationDelay: delay }}>
      <Sprite grid={frames[1]} />
    </div>
  </div>
);

// ─── Main export ─────────────────────────────────────────────────────────────
const DancingCorner = () => (
  <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9998, pointerEvents: 'none', display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
    <style>{`
      @keyframes dc-bob {
        from { transform: translateY(0); }
        to   { transform: translateY(-${P}px); }
      }
      @keyframes dc-f1 {
        from { opacity: 1; }
        to   { opacity: 0; }
      }
      @keyframes dc-f2 {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
    `}</style>

    {/* Kris — dances first */}
    <DancingChar frames={KRIS} delay="0s" />

    {/* Susie — dances slightly after Kris */}
    <DancingChar frames={SUSIE} delay="0.2s" />
  </div>
);

export default DancingCorner;
