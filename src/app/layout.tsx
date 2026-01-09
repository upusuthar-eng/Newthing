import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AudioProvider } from '@/context/AudioContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'A Poem For My Love',
  description: 'A special digital love card.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Dancing+Script:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
