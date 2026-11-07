import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  gravity: number;
  trail: boolean;
  flicker: boolean;
};

type FireworkType = 'chrysanthemum' | 'peony' | 'ring' | 'willow' | 'crackle' | 'heart' | 'star' | 'spiral';

const PALETTES = [
  ['#ffd86b', '#f4a93a', '#ff8c42', '#ffefc1'],
  ['#ff5e7e', '#ff8fab', '#ffb3c6', '#ff0a54'],
  ['#5ce1ff', '#7fdbff', '#a8e6ff', '#00c2ff'],
  ['#9dff5c', '#c6ff80', '#6ee7b7', '#00e676'],
  ['#c77dff', '#e0aaff', '#ff6ec7', '#ff9cee'],
  ['#ffd700', '#ffea00', '#fff59d', '#ffab00'],
];

const TYPES: FireworkType[] = ['chrysanthemum', 'peony', 'ring', 'willow', 'crackle', 'heart', 'star', 'spiral'];

let active: Fireworks | null = null;

export function triggerFirework(x: number, y: number, type?: FireworkType) {
  if (active) active.launch(x, y, type);
}

class Fireworks {
  ctx: CanvasRenderingContext2D;
  canvas: HTMLCanvasElement;
  particles: Particle[] = [];
  raf = 0;
  lastAmbient = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('no ctx');
    this.ctx = ctx;
    this.resize();
    window.addEventListener('resize', this.resize);
    this.loop();
  }

  resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = window.innerWidth * dpr;
    this.canvas.height = window.innerHeight * dpr;
    this.canvas.style.width = window.innerWidth + 'px';
    this.canvas.style.height = window.innerHeight + 'px';
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  randomType = (): FireworkType => TYPES[Math.floor(Math.random() * TYPES.length)];

  launch = (x: number, y: number, type?: FireworkType) => {
    const t = type ?? this.randomType();
    const palette = PALETTES[Math.floor(Math.random() * PALETTES.length)];
    const color = () => palette[Math.floor(Math.random() * palette.length)];
    const life = 70 + Math.random() * 50;

    switch (t) {
      case 'chrysanthemum': {
        const count = 90;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count;
          const speed = 3 + Math.random() * 5;
          this.particles.push(this.mk(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, color(), life, true));
        }
        break;
      }
      case 'peony': {
        const count = 110;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 7 + 1;
          this.particles.push(this.mk(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, color(), life, false));
        }
        break;
      }
      case 'ring': {
        const count = 70;
        const speed = 5.5;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 * i) / count;
          this.particles.push(this.mk(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, color(), life, true));
        }
        break;
      }
      case 'willow': {
        const count = 60;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = 2 + Math.random() * 3;
          const p = this.mk(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, color(), life + 40, true);
          p.gravity = 0.12;
          p.size = 2.4;
          this.particles.push(p);
        }
        break;
      }
      case 'crackle': {
        const count = 50;
        for (let i = 0; i < count; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6 + 2;
          const p = this.mk(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, color(), life * 0.7, false);
          p.flicker = true;
          this.particles.push(p);
        }
        // secondary crackle pops
        for (let i = 0; i < 25; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 3 + 0.5;
          this.particles.push(this.mk(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, color(), 30, true));
        }
        break;
      }
      case 'heart': {
        const count = 80;
        for (let i = 0; i < count; i++) {
          const a = (Math.PI * 2 * i) / count;
          const hx = 16 * Math.pow(Math.sin(a), 3);
          const hy = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a));
          const speed = 0.4;
          this.particles.push(this.mk(x, y, hx * speed, hy * speed, color(), life + 20, true));
        }
        break;
      }
      case 'star': {
        const points = 5;
        const perPoint = 16;
        for (let p = 0; p < points; p++) {
          const baseAngle = (Math.PI * 2 * p) / points - Math.PI / 2;
          for (let i = 0; i < perPoint; i++) {
            const spread = (i / perPoint) * 0.6 - 0.3;
            const angle = baseAngle + spread;
            const speed = 3 + Math.random() * 4;
            this.particles.push(this.mk(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, color(), life, true));
          }
        }
        break;
      }
      case 'spiral': {
        const count = 80;
        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 8;
          const speed = 1 + (i / count) * 6;
          this.particles.push(this.mk(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed, color(), life, true));
        }
        break;
      }
    }
  };

  mk = (x: number, y: number, vx: number, vy: number, color: string, life: number, trail: boolean): Particle => ({
    x, y, vx, vy, color, life, maxLife: life, size: 1.8 + Math.random() * 2.2, gravity: 0.05, trail, flicker: false,
  });

  ambient = (ts: number) => {
    if (ts - this.lastAmbient < 1400) return;
    this.lastAmbient = ts;
    const x = window.innerWidth * (0.15 + Math.random() * 0.7);
    const y = window.innerHeight * (0.12 + Math.random() * 0.4);
    this.launch(x, y);
  };

  loop = () => {
    const ts = performance.now();
    this.ambient(ts);

    // fade trail
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.fillStyle = 'rgba(10, 4, 24, 0.18)';
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    this.ctx.globalCompositeOperation = 'lighter';

    const next: Particle[] = [];
    for (const p of this.particles) {
      p.vy += p.gravity;
      p.vx *= 0.99;
      p.vy *= 0.99;
      p.x += p.vx;
      p.y += p.vy;
      p.life--;

      const alpha = Math.max(p.life / p.maxLife, 0);
      const flick = p.flicker ? (Math.random() > 0.5 ? 1 : 0.3) : 1;

      if (p.trail) {
        this.ctx.globalAlpha = alpha * 0.25 * flick;
        this.ctx.fillStyle = p.color;
        this.ctx.beginPath();
        this.ctx.arc(p.x - p.vx, p.y - p.vy, p.size * 0.6, 0, Math.PI * 2);
        this.ctx.fill();
      }

      this.ctx.globalAlpha = alpha * flick;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();

      // glow core
      this.ctx.globalAlpha = alpha * flick * 0.8;
      this.ctx.fillStyle = '#ffffff';
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
      this.ctx.fill();

      if (p.life > 0) next.push(p);
    }
    this.particles = next;
    this.ctx.globalAlpha = 1;
    this.ctx.globalCompositeOperation = 'source-over';

    this.raf = requestAnimationFrame(this.loop);
  };

  destroy = () => {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('resize', this.resize);
  };
}

export default function FireworksCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    active = new Fireworks(ref.current);
    return () => { active?.destroy(); active = null; };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden="true"
    />
  );
}
