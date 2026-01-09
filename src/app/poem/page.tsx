
'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Undo2, Headphones, ArrowUp, Heart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { FloatingHearts } from '@/components/FloatingHearts';
import { useAudio } from '@/context/AudioContext';
import Link from 'next/link';

const song1 = '/song1.mp3';
const song2 = '/song2.mp3';

const poemStanzas = [
  'It started in AAC Biology,\nsitting face to face, just you and me,\npretending cells were all we saw\nwhen really it was destiny.',
  'Finals week came, calm and slow,\nnotes set aside, no rush, no strain,\nso we watched Young Sheldon side by side,\nturning class time into something to gain.',
  'Between the episodes and quiet talks,\nwe found a bond that felt just right,\nconnecting over summer stories we both loved,\nThe Summer I Turned Pretty filling the night.',
  'And one night we stayed up till morning light,\non FaceTime, laughing endlessly,\nwatching a comedy, half asleep,\nstill not wanting to say goodbye to “we.”',
  'Then basketball at Cornerstone,\none simple invite, one small moment,\nand somehow in that ordinary moment\nour story found its way into it.',
  'No fireworks, no grand display,\njust laughter, trust, and time,\nthe start of something real and deep,\na moment still so mine.',
  'And then our first kiss,\non a quiet bench beneath the sky,\nthe world went still, the timing right,\na memory I will never let pass by.',
  'You see yourself in stories of balance,\nof finding peace when chaos grew,\nof choosing love over fear and power,\nand staying kind in all you do.',
  'Journeys taken across the world,\nlessons learned and friends outgrown,\nbecoming who you are meant to be\neven when you had to do it on your own.',
  'You crochet patience stitch by stitch,\nturning simple yarn to art,\nthe same way you turn everyday moments\ninto warmth that fills my heart.',
  'You snack with pride, Cheetos dust,\nDubai chocolate, rich and sweet,\nand Oreos so legendary\nthey earned hoco proposals, twice, complete.',
  'Two questions asked, two memories made,\nbecause once was never enough,\nwhen it comes to showing how much\nyou mean to me, my love.',
  'I love the way you care so deep,\nthe way you laugh, the way you try,\nthe way you are both soft and strong,\nthe way you help my worries fly.',
  'So on your birthday, hear this clear,\nevery moment, old and new,\nfrom classrooms to courts to quiet nights,\nI am grateful they were spent with you.',
  'I am proud to love you, today and always,\nthrough every bend life sends our way.\nHappy Birthday, my love,\nI will choose you, now and every day. 🩷',
];

const FinalAnimation = () => (
  <div className="absolute inset-0 z-30 pointer-events-none">
    <div className="absolute top-[10%] left-1/2 -translate-x-1/2 text-center animate-fade-in">
      <h2 
        className="text-5xl font-extrabold text-white drop-shadow-lg"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        I LOVE YOU UPASNA
      </h2>
    </div>
    {/* A second, more intense layer of hearts */}
    <FloatingHearts count={50} />
  </div>
);

export default function PoemPage() {
  const [currentCard, setCurrentCard] = useState(0);
  const [showFinalAnimation, setShowFinalAnimation] = useState(false);
  const { play, isInitialized } = useAudio();
  const isLastCard = currentCard === poemStanzas.length - 1;

  useEffect(() => {
    if (isInitialized) {
      const targetSong = isLastCard ? song2 : song1;
      play(targetSong);
    }
  }, [currentCard, isLastCard, play, isInitialized]);

  const handleNext = useCallback(() => {
    if (currentCard < poemStanzas.length - 1) {
      setCurrentCard((prev) => prev + 1);
    }
  }, [currentCard]);
  
  const handleFinalClick = () => {
    setShowFinalAnimation(true);
    // After a delay, go back to the start
    setTimeout(() => {
        // We can navigate or just reset state if we want them to be able to click again
        window.location.href = '/';
    }, 4000);
  }

  return (
    <div className="relative flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-cream-100 p-4 overflow-hidden">
      <FloatingHearts />
      {showFinalAnimation && <FinalAnimation />}

      {currentCard === 0 && !showFinalAnimation && (
        <div className="absolute top-[15%] z-20 flex flex-col items-center text-purple-900 animate-fade-in">
          <div className="flex items-center gap-2">
            <Headphones className="w-8 h-8" />
            <ArrowUp className="w-8 h-8" />
          </div>
          <p className="text-lg mt-2 font-semibold">Turn your volume up</p>
        </div>
      )}

      {!showFinalAnimation && (
        <Card className="w-full max-w-md h-96 bg-white/50 backdrop-blur-lg rounded-2xl shadow-xl flex flex-col justify-between p-6 text-center animate-fade-in z-10">
          <CardContent className="flex items-center justify-center flex-grow pt-6">
            <p
              className="text-2xl text-purple-900 whitespace-pre-line"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              {poemStanzas[currentCard]}
            </p>
          </CardContent>
          <CardFooter className="flex justify-center pb-0">
            {!isLastCard ? (
              <Button
                onClick={handleNext}
                variant="ghost"
                size="icon"
                className="rounded-full w-16 h-16 bg-white/0 group"
              >
                <ArrowRight className="w-8 h-8 text-black/90 transition-colors group-hover:text-purple-600" />
              </Button>
            ) : (
                <Button
                  onClick={handleFinalClick}
                  className="rounded-full bg-white/50 px-6 py-4 text-purple-800 backdrop-blur-sm transition-all hover:bg-white/70"
                >
                  Click me Cutie 😉
                </Button>
            )}
          </CardFooter>
        </Card>
      )}

      {currentCard > 0 && !showFinalAnimation && (
        <Link href="/" passHref>
          <Button
            variant="ghost"
            className="absolute top-5 left-5 text-white/80 hover:text-white flex items-center gap-2 z-20"
          >
            <Undo2 className="w-4 h-4" />
            Back to Start
          </Button>
        </Link>
      )}
    </div>
  );
}
