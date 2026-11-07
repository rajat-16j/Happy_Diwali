
import { useCallback, useEffect, useState } from 'react';

import FireworksCanvas, {
  triggerFirework,
} from './components/FireworksCanvas';

import FloatingHearts from './components/FloatingHearts';
import TwinklingStars from './components/TwinklingStars';
import LandingPage from './components/LandingPage';
import NotePage from './components/NotePage';

type Page = 'landing' | 'note';

export default function App() {
  const [page, setPage] = useState<Page>('landing');

  const handleClick = useCallback((e: MouseEvent) => {
    triggerFirework(e.clientX, e.clientY);
  }, []);

  const handleTouch = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      triggerFirework(
        e.touches[0].clientX,
        e.touches[0].clientY
      );
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouch, {
      passive: true,
    });

    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [handleClick, handleTouch]);

  return (
    <div className="relative min-h-screen w-full">

      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            'linear-gradient(180deg, #0a0418 0%, #1a0a2e 40%, #2a0a1a 70%, #0a0418 100%)',
        }}
      />

      {/* Animations */}
      <TwinklingStars count={70} />
      <FloatingHearts count={16} />
      <FireworksCanvas />

      {/* Landing and Note Pages */}
      <div className="relative z-40">
        {page === 'landing' ? (
          <LandingPage
            onOpenNote={() => setPage('note')}
          />
        ) : (
          <NotePage
            onBack={() => setPage('landing')}
          />
        )}
      </div>

    </div>
  );
}
