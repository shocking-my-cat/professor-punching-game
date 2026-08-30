'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'
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

  function handleClick(e: React.MouseEvent) {
    onHit(e)
    setShaking(false)
    // restart the shake animation reliably
    requestAnimationFrame(() => setShaking(true))
    if (shakeTimeout.current) clearTimeout(shakeTimeout.current)
    shakeTimeout.current = setTimeout(() => setShaking(false), 110)
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative flex min-h-screen w-full flex-col items-center justify-start px-8 pt-12"
      style={{ cursor: 'crosshair' }}
    >
      {/* HP BAR */}
      <div className="w-4/5 max-w-5xl">
        <div className="mb-2 flex items-end justify-between">
          <span className="flex items-center gap-2 text-2xl text-primary">
            <Heart className="h-6 w-6 fill-primary" /> HP
          </span>
          <span className="font-mono text-3xl text-foreground">
            {hp} <span className="text-muted-foreground">/ {maxHp}</span>
          </span>
        </div>
        <div className="h-12 w-full overflow-hidden rounded-full border-4 border-foreground/20 bg-secondary">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
            animate={{ width: `${hpPct}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>
      </div>

      {/* NAMETAG + AVATAR */}
      <div className="mt-14 flex flex-col items-center">
        <div className="z-10 -mb-4 rotate-[-2deg] rounded-lg border-4 border-accent bg-primary px-8 py-2 text-center shadow-xl">
          <p className="text-3xl tracking-wide text-primary-foreground">{profName} 교수</p>
          {profDesc && (
            <p className="mt-1 max-w-xs text-pretty text-sm text-primary-foreground/80">
              {profDesc}
            </p>
          )}
        </div>

        <motion.button
          type="button"
          onClick={exploding ? undefined : handleClick}
          aria-label={`${profName} 교수 때리기`}
          // S1-03: exploding 시 scale-up + 페이드아웃 폭발 연출
          animate={
            exploding
              ? { scale: [1, 1.35, 1.6], opacity: [1, 1, 0], rotate: [0, -8, 12] }
              : { scale: 1, opacity: 1, rotate: 0 }
          }
          transition={exploding ? { duration: 0.75, ease: 'easeIn' } : undefined}
          className={`relative mt-6 select-none rounded-full outline-none ${
            shaking && !exploding ? 'animate-prof-shake' : ''
          }`}
          style={{ cursor: exploding ? 'default' : 'crosshair' }}
        >
          <div className="pointer-events-none relative h-72 w-72 overflow-hidden rounded-full border-8 border-primary bg-secondary shadow-2xl">
            <Image
              src="/professor.png"
              alt={`${profName} 교수 캐릭터`}
              fill
              priority
              draggable={false}
              className="object-cover"
            />
            {/* red hit flash */}
            <AnimatePresence>
              {(shaking || exploding) && (
                <motion.div
                  initial={{ opacity: exploding ? 0.9 : 0.6 }}
                  animate={{ opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: exploding ? 0.7 : 0.12 }}
                  className="absolute inset-0 bg-primary mix-blend-multiply"
                />
              )}
            </AnimatePresence>
          </div>
        </motion.button>

        <p className="mt-8 animate-pulse text-lg text-muted-foreground">
          👊 교수님을 클릭해서 HP를 0으로 만드세요! 👊
        </p>
      </div>

      {/* FLOATING DAMAGE TEXTS */}
      <div className="pointer-events-none fixed inset-0 z-50">
        <AnimatePresence>
          {damageTexts.map((d) => (
            <motion.span
              key={d.id}
              initial={{ opacity: 1, y: 0, scale: 1.2 }}
              animate={{ opacity: 0, y: -50 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              onAnimationComplete={() => onDamageComplete(d.id)}
              className="absolute -translate-x-1/2 -translate-y-1/2 text-4xl font-black text-primary drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]"
              style={{ left: d.x, top: d.y }}
            >
              -10
            </motion.span>
          ))}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}
