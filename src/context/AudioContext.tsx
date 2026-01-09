
'use client';

import React, {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  ReactNode,
} from 'react';

interface AudioContextType {
  play: (track: string) => void;
  stop: () => void;
  isPlaying: boolean;
  isInitialized: boolean;
  initializeAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

let audioInstance: HTMLAudioElement | null = null;

const getAudioInstance = () => {
  if (typeof window !== 'undefined' && !audioInstance) {
    audioInstance = new Audio();
    audioInstance.loop = true;
  }
  return audioInstance;
};

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const audioRef = useRef<HTMLAudioElement | null>(getAudioInstance());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeAudio = useCallback(() => {
    const audio = audioRef.current;
    if (audio && !isInitialized) {
      // A small, silent audio file can be played to "unlock" the audio context.
      // This is a common workaround for browsers' autoplay policies.
      audio.play().catch(error => {
        // This error is expected if the user hasn't interacted yet.
        console.warn("Audio initialization requires user interaction, but we're getting it ready.", error);
      });
      audio.pause();

      audio.addEventListener('play', () => setIsPlaying(true));
      audio.addEventListener('pause', () => setIsPlaying(false));
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const play = useCallback(
    (track: string) => {
      const audio = audioRef.current;
      if (!audio || !isInitialized) {
        console.warn("Audio not initialized. Call initializeAudio on a user gesture.");
        return;
      }
      
      const newTrackSrc = (new URL(track, window.location.origin)).href;

      if (audio.src !== newTrackSrc) {
        audio.src = newTrackSrc;
      }
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          if (error.name !== 'AbortError') {
            console.error('Audio play failed:', error);
          }
        });
      }
    },
    [isInitialized]
  );

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
  }, []);

  const value = {
    play,
    stop,
    isPlaying,
    isInitialized,
    initializeAudio,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
