'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import type { DamageText } from '@/app/page'

type Props = {
  profName: string
  profDesc: string
  hp: number
  maxHp: number
  damageTexts: DamageText[]
  onHit: (e: React.MouseEvent) => void
  onDamageComplete: (id: number) => void
  /** S1-03: HP 0 시 폭발 연출 플래그 */
  exploding?: boolean
}

export function PlayingScreen({
  profName,
  profDesc,
  hp,
  maxHp,
  damageTexts,
  onHit,
  onDamageComplete,
  exploding = false,
}: Props) {
  const [shaking, setShaking] = useState(false)
  const shakeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  const hpPct = (hp / maxHp) * 100
  const isDanger = hpPct <= 30 && !exploding
  const isCritical = hpPct <= 10 && !exploding

  function handleClick(e: React.MouseEvent) {
    onHit(e)
    setShaking(false)
    requestAnimationFrame(() => setShaking(true))
    if (shakeTimeout.current) clearTimeout(shakeTimeout.current)
    shakeTimeout.current = setTimeout(() => setShaking(false), 110)
  }

  const hpBarColor = isCritical
    ? 'bg-red-800'
    : isDanger
    ? 'bg-red-600'
    : 'bg-primary'

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={`bg-halftone flex min-h-screen w-full flex-col ${isDanger ? 'animate-danger-pulse' : ''}`}
      style={{ cursor: 'crosshair' }}
    >
      {/* ── TOP NAV BAR ── */}
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

      {/* ── HP BAR SECTION ── */}
      <div className="w-full bg-background border-b-4 border-foreground px-6 py-3 flex-shrink-0">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="font-label-mono text-xs text-foreground">
              PROF. {profName.toUpperCase()}
            </span>
            <span className={`font-label-mono text-xs font-bold ${isDanger ? 'text-destructive' : 'text-foreground'}`}>
              HP {hp}/{maxHp}
            </span>
          </div>
          {/* Segmented HP bar — Neo-Brutalist style */}
          <div className="w-full h-8 border-4 border-foreground bg-muted shadow-brutal-sm overflow-hidden relative">
            <motion.div
              className={`h-full ${hpBarColor} relative overflow-hidden`}
              animate={{ width: `${hpPct}%` }}
              transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            >
              {/* Shimmer stripe */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-bar-shimmer" />
            </motion.div>
            {/* Damage marker at 15% */}
            <div className="absolute top-0 bottom-0 right-0 w-1 bg-foreground z-10" />
          </div>
        </div>
      </div>

      {/* ── BATTLE ARENA ── */}
      <main className="flex-1 flex items-center justify-center px-6 py-8 relative overflow-hidden">
        <div className="relative flex flex-col items-center">

          {/* Name tag — tacky sticker style */}
          <div className="relative z-20 mb-[-1rem]">
            <div className="bg-red-50 border-4 border-foreground shadow-brutal px-6 py-3 -rotate-2 relative">
              {/* Tape pieces */}
              <div className="absolute -top-3 -left-4 w-10 h-5 bg-muted border-2 border-foreground rotate-12 opacity-80" />
              <div className="absolute -top-2 -right-3 w-8 h-5 bg-muted border-2 border-foreground -rotate-12 opacity-80" />
              <p className="font-label-mono text-xs text-foreground border-b-2 border-foreground pb-1 mb-1 tracking-widest text-center">
                HELLO, MY NAME IS
              </p>
              <p
                className="font-headline text-2xl md:text-3xl text-destructive text-center tracking-tighter"
                style={{ WebkitTextStroke: '1.5px #191c1e' }}
              >
                {profName.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Professor Avatar */}
          <motion.button
            type="button"
            onClick={exploding ? undefined : handleClick}
            aria-label={`${profName} 교수 때리기`}
            animate={
              exploding
                ? { scale: [1, 1.35, 1.6], opacity: [1, 1, 0], rotate: [0, -8, 12] }
                : { scale: 1, opacity: 1, rotate: 0 }
            }
            transition={exploding ? { duration: 0.75, ease: 'easeIn' } : undefined}
            className={`relative z-10 select-none outline-none ${
              shaking && !exploding ? 'animate-prof-shake' : ''
            }`}
            style={{ cursor: exploding ? 'default' : 'crosshair' }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 border-4 border-foreground bg-card shadow-brutal-lg overflow-hidden">
              {/* Hard shadow layer indicator */}
              <div className="absolute inset-0 z-0" />
              <Image
                src="/professor.png"
                alt={`${profName} 교수 캐릭터`}
                fill
                priority
                draggable={false}
                className="object-cover select-none pointer-events-none z-10"
              />
              {/* Hit flash */}
              <AnimatePresence>
                {(shaking || exploding) && (
                  <motion.div
                    initial={{ opacity: exploding ? 0.9 : 0.7 }}
                    animate={{ opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: exploding ? 0.7 : 0.1 }}
                    className="absolute inset-0 bg-primary mix-blend-multiply z-20"
                  />
                )}
              </AnimatePresence>
            </div>
          </motion.button>

          {profDesc && (
            <p className="mt-3 font-body-mono text-xs text-muted-foreground text-center max-w-xs">
              {profDesc}
            </p>
          )}

          <p className="mt-4 font-label-mono text-xs text-foreground animate-pulse text-center">
            👊 CLICK TO HIT — REDUCE HP TO ZERO 👊
          </p>
        </div>

        {/* Floating damage texts */}
        <div className="pointer-events-none fixed inset-0 z-50">
          <AnimatePresence>
            {damageTexts.map((d) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 1, y: 0, scale: 1.1, rotate: Math.random() * 30 - 15 }}
                animate={{ opacity: 0, y: -60 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                onAnimationComplete={() => onDamageComplete(d.id)}
                className="absolute font-headline text-3xl text-primary bg-red-50 border-4 border-foreground shadow-brutal-sm px-3 py-1 -translate-x-1/2 -translate-y-1/2"
                style={{ left: d.x, top: d.y }}
              >
                -10
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="w-full bg-foreground text-primary-foreground py-4 border-t-4 border-primary flex-shrink-0">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <span className="font-headline text-base">Tenure Denied © 1994</span>
          <div className="flex gap-4 text-xl">🎮💀⚠️</div>
          <span className="font-label-mono text-xs">V.0.6.9-BETA</span>
        </div>
      </footer>
    </motion.section>
  )
}
