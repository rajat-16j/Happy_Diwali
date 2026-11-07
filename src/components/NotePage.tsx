
import { useState } from 'react';
import { ArrowLeft, Heart, Sparkles, Gift } from 'lucide-react';
import Diya from './Diya';

type NotePageProps = {
  onBack: () => void;
};

export default function NotePage({ onBack }: NotePageProps) {
  const [showSurprise, setShowSurprise] = useState(false);

  // Customize your photo and message here
  const surprisePhoto = '/surprise-photo.jpg';
  const surpriseMessage =
    'Always keep smiling, Bacchi. You deserve all the happiness in the world. ❤️';

  return (
    <div className="relative min-h-screen px-4 py-12 sm:py-16 overflow-hidden">

      {/* warm ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(255,140,60,0.14) 0%, transparent 60%), radial-gradient(ellipse 80% 60% at 50% 95%, rgba(196,30,58,0.1) 0%, transparent 60%)',
        }}
      />

      {/* top corner diyas */}
      <div className="absolute top-6 left-4 sm:left-10 z-10 animate-gentleFloat">
        <Diya size={44} />
      </div>

      <div
        className="absolute top-6 right-4 sm:right-10 z-10 animate-gentleFloat"
        style={{ animationDelay: '1s' }}
      >
        <Diya size={44} />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto">

        {/* back button */}
        <button
          onClick={onBack}
          className="animate-fadeUp mb-8 inline-flex items-center gap-2 text-amber-200/80 hover:text-amber-100 transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          back to the wishes
        </button>

        {/* card */}
        <div
          className="animate-popIn delay-200 relative rounded-3xl p-1"
          style={{
            background:
              'linear-gradient(135deg, rgba(255,216,107,0.5), rgba(255,94,126,0.35), rgba(196,30,58,0.3))',
            boxShadow:
              '0 0 50px rgba(255,160,80,0.25), 0 20px 60px rgba(0,0,0,0.4)',
          }}
        >
          <div
            className="relative rounded-[22px] px-6 sm:px-12 py-10 sm:py-14 text-center"
            style={{
              background:
                'linear-gradient(180deg, rgba(26,10,40,0.96) 0%, rgba(10,4,24,0.98) 100%)',
            }}
          >

            {/* header hearts */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400 animate-heartBeat" />
              <Sparkles className="w-5 h-5 text-amber-300 animate-sparkle" />
              <Heart className="w-6 h-6 text-rose-500 fill-rose-500 animate-heartBeat delay-300" />
              <Sparkles className="w-5 h-5 text-amber-300 animate-sparkle delay-200" />
              <Heart className="w-5 h-5 text-rose-400 fill-rose-400 animate-heartBeat delay-500" />
            </div>

            <h2 className="font-script text-4xl sm:text-5xl text-amber-200 mb-2 text-shimmer">
              A note for my Bacchi
            </h2>

            <div className="flex items-center justify-center gap-2 my-6">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-rose-400/50" />
              <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-rose-400/50" />
            </div>

            {/* ORIGINAL NOTE - unchanged */}
            <div className="font-serif-d text-lg sm:text-xl md:text-2xl leading-relaxed text-amber-50/95 space-y-5">

              <p className="animate-fadeUp delay-500">
                Bacchi 💛
              </p>

              <p className="animate-fadeUp delay-700">
                Is Diwali Tumko har khushi mile jo tum chahti ho, aur dukh tumse far away rahe.
                Sab dukh dard peeda tension khtm hojayega tensun not,
                Agla diwali tum apne pure family ke saath manayegi i gurantee. 🪔
              </p>

              <p className="animate-fadeUp delay-1000">
                Tumhara bhai jldi hi thik ho jayega, aur tumhare saath fir se masti kar payega. 😎
                Khoob patakha phodo, mithai khao, aur apne pyare smile se khud ko apne family ko roshan kro,
                aur hmko bhi, hehehehe💥
              </p>

              <p className="animate-fadeUp delay-1500">
                I more than all the things in the world, and trust me, that's a LOT. 🍬
              </p>

              <p className="animate-fadeUp delay-2000 text-rose-200">
                Happy Diwali, bacchii.
              </p>

              <p className="animate-fadeUp delay-2000 flex items-center justify-center gap-2 pt-2">
                always
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500 animate-heartBeat" />
              </p>

              <p className="animate-fadeUp delay-2000 font-script text-3xl text-amber-200 text-shimmer pt-1">
                💛
              </p>
            </div>

            {/* SECRET SURPRISE BOX */}
            <div className="mt-12">

              <button
                onClick={() => setShowSurprise(!showSurprise)}
                className="group mx-auto flex flex-col items-center justify-center p-6 rounded-2xl border border-amber-300/40 bg-gradient-to-br from-rose-500/20 to-amber-400/20 hover:scale-105 hover:border-amber-300/80 transition-all duration-300 shadow-lg w-full max-w-sm"
              >
                <Gift className="w-12 h-12 text-amber-300 mb-3 group-hover:animate-bounce" />

                <span className="font-script text-2xl sm:text-3xl text-amber-200">
                  My Virtual Gift 💝
                </span>

                <span className="text-xs text-amber-100/60 mt-2">
                  {showSurprise
                    ? 'Click to close your surprise ✨'
                    : 'Something special is waiting for you... Click here 💌'}
                </span>
              </button>

              {/* PHOTO AND SECOND MESSAGE */}
              {showSurprise && (
                <div className="mt-7 p-5 sm:p-7 rounded-2xl border border-rose-300/40 bg-gradient-to-b from-rose-400/10 to-amber-400/10 animate-popIn">

                  <div className="flex justify-center items-center gap-2 mb-5">
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <h3 className="font-script text-3xl sm:text-4xl text-amber-200">
                      keep smile like this that will be my Happy Diwali, Bacchi ❤️
                    </h3>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                  </div>

                  <img
                    src={surprisePhoto}
                    alt="A special memory"
                    className="w-full max-w-sm mx-auto rounded-2xl border-2 border-amber-300/50 shadow-xl object-cover"
                  />

                  <p className="font-serif-d text-lg sm:text-xl text-amber-50 mt-6 leading-relaxed">
                    {surpriseMessage}
                  </p>

                  <div className="flex justify-center gap-3 mt-5 text-2xl">
                    ❤️ 💛 🥰 💖
                  </div>

                </div>
              )}

            </div>

            {/* floating hearts row at bottom of card */}
            <div className="flex items-center justify-center gap-2 mt-10 opacity-80">
              {['❤️', '💕', '🧡', '💛', '💖', '💗', '💓'].map((h, i) => (
                <span
                  key={i}
                  className="animate-gentleFloat"
                  style={{
                    animationDelay: `${i * 0.3}s`,
                    fontSize: 18 + (i % 3) * 4,
                  }}
                >
                  {h}
                </span>
              ))}
            </div>

          </div>
        </div>

        {/* footer message */}
        <p className="animate-fadeUp delay-2000 mt-8 text-center text-amber-200/60 font-serif-d text-base">
          tap anywhere on the page to burst a firecracker ✨
        </p>

      </div>
    </div>
  );
}
