
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FloatingHearts } from '@/components/FloatingHearts';
import { useAudio } from '@/context/AudioContext';

const song1 = '/song1.mp3';

export default function OpeningScreen() {
  const router = useRouter();
  const { play, isInitialized, initializeAudio } = useAudio();

  const beginPoem = () => {
    if (!isInitialized) {
      initializeAudio();
    }
    // Always call play to ensure music starts if it wasn't already playing
    play(song1);
    router.push('/poem');
  };

  return (
    <div
      className="relative flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-cream-100 overflow-hidden"
    >
      <FloatingHearts />
      <div className="text-center animate-fade-in z-10">
        <h1
          className="text-6xl font-extrabold text-white drop-shadow-lg"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          For My Love, Upasna Suthar
        </h1>
        <p className="mt-4 text-lg text-white/90">A journey through our moments</p>
      </div>
      <Button
        onClick={beginPoem}
        className="mt-12 rounded-full bg-white/30 px-8 py-6 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/40 hover:scale-105 animate-fade-in animation-delay-500 z-10"
      >
        Tap to Begin
      </Button>
    </div>
  );
}
