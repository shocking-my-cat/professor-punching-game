'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

type Props = {
  onReset: () => void
}

export function EndScreen({ onReset }: Props) {
  useEffect(() => {
    // Initial big burst
    setTimeout(() => {
      confetti({
        particleCount: 300,
        spread: 160,
        origin: { y: 0.5 },
        colors: ['#93000b', '#b91c1c', '#ffffff', '#191c1e', '#ffdad6'],
        gravity: 0.7,
        scalar: 1.2,
      })
    }, 150)

    // Infinite side cannons
    const interval = setInterval(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.8 },
        colors: ['#93000b', '#b91c1c', '#ffffff'],
      })
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.8 },
        colors: ['#93000b', '#b91c1c', '#ffffff'],
      })
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-end-screen flex min-h-screen w-full flex-col relative overflow-hidden"
    >
      {/* ── TOP NAV ── */}
      <header className="w-full bg-primary border-b-4 border-foreground shadow-[0_8px_0_0_#191c1e] z-50 flex-shrink-0">
        <div className="h-16 max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-primary-foreground text-2xl">🥊</span>
            <span className="font-headline text-xl text-primary-foreground tracking-tighter italic">
              Professor Punch-Out!!
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <span className="font-label-mono text-xs px-2 py-1 border-2 border-primary-foreground shadow-[4px_4px_0_0_#191c1e]"
              style={{ color: '#93000b', background: '#ffffff' }}
            >
              FIGHT
            </span>
            <span className="font-label-mono text-xs text-primary-foreground">SCORES</span>
            <span className="font-label-mono text-xs text-primary-foreground">GYM</span>
          </nav>
        </div>
      </header>

      {/* ── Neo-Brutalist floating decorations ── */}
      <div className="absolute top-20 left-10 w-14 h-14 bg-primary border-4 border-foreground shadow-brutal rotate-12 animate-pulse z-0" />
      <div className="absolute top-1/4 right-16 w-10 h-10 bg-foreground border-4 border-primary rotate-45 z-0" />
      <div className="absolute bottom-32 left-20 w-16 h-6 bg-muted border-4 border-foreground shadow-brutal-sm -rotate-12 z-0" />
      <div className="absolute bottom-24 right-12 w-20 h-20 bg-card border-4 border-foreground shadow-brutal rounded-full flex items-center justify-center -rotate-45 z-0">
        <span className="text-3xl">✕</span>
      </div>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-12 z-10">

        {/* Victory Banner */}
        <motion.div
          initial={{ scale: 0.5, rotate: -5, opacity: 0 }}
          animate={{ scale: 1, rotate: -2, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 180, damping: 10, delay: 0.1 }}
          className="relative w-full max-w-3xl bg-card border-4 border-foreground shadow-brutal-lg text-center hover:rotate-0 transition-transform duration-300"
        >
          {/* Stage Cleared header strip */}
          <div className="w-full bg-foreground text-primary-foreground py-2 px-4 flex justify-between items-center border-b-4 border-foreground">
            <div className="flex gap-1 text-primary text-sm">★ ★ ★</div>
            <span className="font-label-mono text-xs text-primary tracking-widest uppercase">Stage Cleared</span>
            <div className="flex gap-1 text-primary text-sm">★ ★ ★</div>
          </div>

          <div className="p-8 md:p-12 flex flex-col items-center gap-5">
            <span className="text-6xl">🏆</span>

            <motion.h2
              initial={{ scale: 3, rotate: -5, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.25 }}
              className="font-headline text-4xl md:text-6xl text-foreground tracking-tighter leading-tight w-full break-words"
            >
              🎉 당신은 종강했습니다! 🎉
            </motion.h2>

            {/* Divider */}
            <div className="w-full h-1 bg-foreground" />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="font-body-mono text-sm text-foreground font-bold bg-red-50 px-4 py-3 border-4 border-foreground shadow-brutal-sm rotate-1 max-w-xl text-center uppercase tracking-wide"
            >
              YOU SURVIVED THE GRIND. SLEEP IS NOW AUTHORIZED.<br />ALL ASSIGNMENTS HAVE BEEN OBLITERATED.
            </motion.p>
          </div>
        </motion.div>

        {/* Scoreboard */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          className="flex flex-wrap justify-center gap-4 mt-8 rotate-1 w-full max-w-3xl"
        >
          <div className="flex-1 min-w-[160px] bg-primary border-4 border-foreground p-4 shadow-brutal flex flex-col items-center hover:-translate-y-1 transition-transform">
            <span className="font-label-mono text-xs text-primary-foreground mb-1">Final Score</span>
            <span className="font-headline text-3xl text-primary-foreground">9,999,999</span>
          </div>
          <div className="flex-1 min-w-[160px] bg-muted border-4 border-foreground p-4 shadow-brutal flex flex-col items-center hover:-translate-y-1 transition-transform">
            <span className="font-label-mono text-xs text-foreground mb-1">Sanity Remaining</span>
            <span className="font-headline text-3xl text-destructive">0%</span>
          </div>
          <div className="flex-1 min-w-[160px] bg-foreground border-4 border-foreground p-4 shadow-brutal-red flex flex-col items-center hover:-translate-y-1 transition-transform">
            <span className="font-label-mono text-xs text-primary-foreground mb-1">Credits Earned</span>
            <span className="font-headline text-3xl text-primary">MAX</span>
          </div>
        </motion.div>

        {/* Reset Button */}
        <motion.button
          type="button"
          onClick={onReset}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          whileTap={{ x: 8, y: 8 }}
          className="mt-10 flex items-center justify-center gap-3 bg-card text-foreground border-4 border-foreground px-10 py-5 shadow-brutal-lg font-headline text-2xl uppercase tracking-tighter hover:bg-primary hover:text-primary-foreground transition-colors group"
          style={{
            boxShadow: '12px 12px 0 0 #191c1e',
          }}
        >
          <span className="text-2xl group-hover:rotate-180 transition-transform duration-500 inline-block">↺</span>
          <span>Restart (다시 개강하기)</span>
        </motion.button>
      </main>

      {/* ── FOOTER ── */}
      <footer className="w-full bg-foreground text-primary-foreground py-4 border-t-4 border-primary flex-shrink-0 z-10">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <span className="font-headline text-base">Tenure Denied © 1994</span>
          <div className="flex gap-4 text-xl">🎮💀⚠️</div>
          <span className="font-label-mono text-xs">V.0.6.9-BETA</span>
        </div>
      </footer>
    </motion.section>
  )
}
