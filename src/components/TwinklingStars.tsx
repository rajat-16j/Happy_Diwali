import { useMemo } from 'react';

type Star = { id: number; top: number; left: number; size: number; delay: number; dur: number };

export default function TwinklingStars({ count = 60 }: { count?: number }) {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      delay: Math.random() * 4,
      dur: 2 + Math.random() * 3,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-10" aria-hidden="true">
      {stars.map((s) => (
        <span
          key={s.id}
          className="sparkle-dot animate-twinkle"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.dur}s`,
          }}
        />
      ))}
    </div>
  );
}
