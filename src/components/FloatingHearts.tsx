import { useMemo } from 'react';

const EMOJIS = ['❤️', '💕', '💖', '💗', '💓', '🧡', '✨', '🪔', '💛'];

type FloatItem = {
  id: number;
  left: number;
  emoji: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

export default function FloatingHearts({ count = 18 }: { count?: number }) {
  const items = useMemo<FloatItem[]>(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      size: 16 + Math.random() * 26,
      duration: 7 + Math.random() * 8,
      delay: Math.random() * 8,
      drift: (Math.random() - 0.5) * 80,
    }));
  }, [count]);

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {items.map((it) => (
        <span
          key={it.id}
          className="absolute bottom-[-40px] select-none"
          style={{
            left: `${it.left}%`,
            fontSize: it.size,
            animation: `floatUp ${it.duration}s linear ${it.delay}s infinite`,
            ['--drift' as string]: `${it.drift}px`,
          }}
        >
          {it.emoji}
        </span>
      ))}
    </div>
  );
}
