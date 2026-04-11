const DeltaruneTransitionOverlay = ({ active }) => {
  if (!active) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes deltarune-cursor-fall {
          0% { transform: translate(-50%, -14vh) scale(1); opacity: 0; }
          10% { opacity: 1; }
          88% { opacity: 1; }
          100% { transform: translate(-50%, 114vh) scale(0.7); opacity: 0; }
        }

        @keyframes deltarune-blackout-fade {
          0% { opacity: 0; }
          58.33% { opacity: 0; }
          58.34% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>

      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: 0,
          height: 0,
          borderTop: '12px solid transparent',
          borderBottom: '12px solid transparent',
          borderLeft: '18px solid #ffffff',
          filter: 'drop-shadow(0 0 6px rgba(255,255,255,0.9))',
          animation: 'deltarune-cursor-fall 0.7s cubic-bezier(0.35, 0, 0.95, 1) forwards',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#000',
          animation: 'deltarune-blackout-fade 1.2s linear forwards',
        }}
      />
    </div>
  );
};

export default DeltaruneTransitionOverlay;
