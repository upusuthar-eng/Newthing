
'use client';

import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const HeartIcon = ({ style }: { style: React.CSSProperties }) => (
  <Heart
    className="absolute text-pink-300"
    style={style}
    fill="currentColor"
    strokeWidth={0}
  />
);

export function FloatingHearts({ count = 25 }: { count?: number }) {
  const [hearts, setHearts] = useState<
    { id: string; style: React.CSSProperties }[]
  >([]);

  useEffect(() => {
    // This check is to prevent server-side rendering issues
    if (typeof window === 'undefined') return;

    let i = 0;
    const createHeart = () => {
      const id = `${Date.now()}-${i++}`;
      const size = Math.random() * 20 + 10; // 10px to 30px
      const left = Math.random() * 100; // 0% to 100%
      const animationDuration = Math.random() * 5 + 5; // 5s to 10s
      const animationDelay = Math.random() * 5; // 0s to 5s

      const style: React.CSSProperties = {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}%`,
        bottom: `-${size}px`,
        animation: `floatUp ${animationDuration}s linear ${animationDelay}s infinite`,
        opacity: Math.random() * 0.5 + 0.2, // 0.2 to 0.7
      };

      return { id, style };
    };

    const heartArray = Array.from({ length: count }, createHeart);
    setHearts(heartArray);
  }, [count]);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {hearts.map((heart) => (
        <HeartIcon key={heart.id} style={heart.style} />
      ))}
    </div>
  );
}
