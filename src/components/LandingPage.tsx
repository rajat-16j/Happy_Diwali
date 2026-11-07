import { useState } from 'react';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import Diya from './Diya';

type LandingPageProps = {
  onOpenNote: () => void;
};

export default function LandingPage({ onOpenNote }: LandingPageProps) {
  const [hover, setHover] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
      {/* soft radial warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 35%, rgba(255,140,60,0.18) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 50% 90%, rgba(196,30,58,0.12) 0%, transparent 60%)',
        }}
      />

      {/* row of diyas at bottom */}
      <div className="absolute bottom-6 left-0 right-0 flex items-end justify-center gap-3 sm:gap-6 px-4 z-10">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="animate-gentleFloat"
            style={{ animationDelay: `${i * 0.4}s`, transform: `scale(${0.7 + (i === 2 ? 0.4 : Math.abs(2 - i) * 0.12)})` }}
          >
            <Diya size={48 + (i === 2 ? 20 : 0)} />
          </div>
        ))}
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        {/* small kicker */}
        <div className="animate-fadeUp flex items-center justify-center gap-2 mb-6">
          <Sparkles className="w-5 h-5 text-amber-300 animate-sparkle" />
          <span className="font-serif-d tracking-[0.4em] text-amber-200/80 text-xs sm:text-sm uppercase">
            With all my love
          </span>
          <Sparkles className="w-5 h-5 text-amber-300 animate-sparkle" />
        </div>

        {/* Happy Diwali */}
        <h1 className="animate-popIn delay-200 font-script text-6xl sm:text-7xl md:text-8xl leading-none mb-2 text-shimmer text-glow">
          Happy Diwali
        </h1>

        {/* decorative divider */}
        <div className="animate-fadeUp delay-500 flex items-center justify-center gap-3 my-5">
          <span className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-amber-400/60" />
          <Heart className="w-5 h-5 text-rose-400 fill-rose-400 animate-heartBeat" />
          <span className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-amber-400/60" />
        </div>

        {/* her name */}
        <h2 className="animate-popIn delay-700 font-script text-5xl sm:text-6xl md:text-7xl text-rose-300 mb-6"
          style={{ textShadow: '0 0 24px rgba(255,94,126,0.6), 0 0 48px rgba(255,94,126,0.3)' }}
        >
          Bacchi
          <Heart className="inline w-9 h-9 sm:w-11 sm:h-11 ml-2 -mt-2 text-rose-400 fill-rose-400 animate-heartBeat" />
        </h2>

        <p className="animate-fadeUp delay-1000 font-serif-d text-lg sm:text-xl md:text-2xl text-amber-100/90 leading-relaxed max-w-2xl mx-auto mb-10">
          May this festival of lights bring your beautiful smile all the glow in the world.
          You light up my life brighter than a thousand diyas ever could. 🪔
        </p>

        {/* CTA button */}
        <button
          onClick={onOpenNote}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          className="animate-popIn delay-1500 group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-medium text-lg overflow-hidden transition-transform duration-300 hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(135deg, #f4a93a 0%, #ff8c42 50%, #c41e3a 100%)',
            boxShadow: '0 0 30px rgba(255,160,80,0.5), 0 0 60px rgba(196,30,58,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
          }}
        >
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)' }}
          />
          <Heart className={`w-5 h-5 text-white transition-transform ${hover ? 'scale-125' : ''}`} />
          <span className="relative text-white drop-shadow">A little note for you</span>
          <Heart className={`w-5 h-5 text-white transition-transform ${hover ? 'scale-125' : ''}`} />
        </button>

        {/* scroll hint */}
        <div className="animate-fadeUp delay-2000 mt-12 flex flex-col items-center text-amber-200/60">
          <span className="font-serif-d text-sm tracking-widest mb-2">tap anywhere for fireworks</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
