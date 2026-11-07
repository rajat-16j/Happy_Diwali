type DiyaProps = {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
};

export default function Diya({ size = 64, className = '', style }: DiyaProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size * 1.3, ...style }}>
      {/* Flame */}
      <div
        className="absolute left-1/2 -translate-x-1/2 origin-bottom animate-flicker"
        style={{ top: 0, width: size * 0.28, height: size * 0.55 }}
      >
        <div
          className="absolute inset-0 rounded-full blur-[6px]"
          style={{
            background: 'radial-gradient(ellipse at 50% 70%, #fff4cf 0%, #ffd86b 35%, #ff8c42 70%, transparent 100%)',
            animation: 'diyaGlow 1.4s ease-in-out infinite',
          }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 rounded-full"
          style={{
            top: '20%',
            width: '50%',
            height: '80%',
            background: 'radial-gradient(ellipse at 50% 80%, #fff8e6 0%, #ffcf5a 50%, #ff7a18 100%)',
          }}
        />
      </div>
      {/* Glow halo */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          top: size * 0.1,
          width: size * 1.1,
          height: size * 0.6,
          background: 'radial-gradient(circle, rgba(255,180,80,0.35) 0%, transparent 70%)',
          filter: 'blur(8px)',
          animation: 'breathe 3s ease-in-out infinite',
        }}
      />
      {/* Lamp bowl */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{ bottom: 0, width: size * 0.85, height: size * 0.42 }}
      >
        <div
          className="w-full h-full"
          style={{
            background: 'linear-gradient(180deg, #d4a017 0%, #b8860b 40%, #6b4f0a 100%)',
            clipPath: 'polygon(8% 0%, 92% 0%, 78% 100%, 22% 100%)',
            borderRadius: '0 0 40% 40%',
            boxShadow: 'inset 0 -4px 8px rgba(0,0,0,0.4), 0 4px 10px rgba(0,0,0,0.5)',
          }}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            top: '4%',
            width: '82%',
            height: '14%',
            background: 'radial-gradient(ellipse, #5a3d05 0%, #3a2803 100%)',
            borderRadius: '50%',
          }}
        />
      </div>
    </div>
  );
}
