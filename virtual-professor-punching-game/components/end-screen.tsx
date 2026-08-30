'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

type Props = {
  onReset: () => void
}

export function EndScreen({ onReset }: Props) {
  useEffect(() => {
    // S1-02: 컴포넌트 언마운트시까지 무한 재생
    // S2-05: 등장 직후 콘퓸티 큰 burst 싹로
    setTimeout(() => {
      confetti({
        particleCount: 300,
        spread: 160,
        origin: { y: 0.5 },
        colors: ['#ffd700', '#ffb800', '#ff6b35', '#ff4444', '#ffffff'],
        gravity: 0.7,
        scalar: 1.2,
      })
    }, 150)

    const interval = setInterval(() => {
      confetti({
        particleCount: 70,
        angle: 60,
        spread: 80,
        origin: { x: 0, y: 0.8 },
        colors: ['#ffd700', '#ffb800', '#fff'],
      })
      confetti({
        particleCount: 70,
        angle: 120,
        spread: 80,
        origin: { x: 1, y: 0.8 },
        colors: ['#ffd700', '#ffb800', '#fff'],
      })
    }, 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-end-screen relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-8 text-center"
    >
      {/* S2-05: 유리성 효교 - 반짝이는 별 파티클 */}
      {['⭐','✨','🌟','💫','⭐','✨','🌟'].map((star, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute text-2xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            x: [(i % 2 === 0 ? -1 : 1) * (30 + i * 20), (i % 2 === 0 ? 1 : -1) * (20 + i * 15)],
            y: [-60 - i * 30, -120 - i * 40],
          }}
          transition={{ duration: 1.8, delay: 0.2 + i * 0.15, repeat: Infinity, repeatDelay: 1.5 }}
          style={{ left: `${15 + i * 12}%`, top: '50%' }}
        >
          {star}
        </motion.span>
      ))}

      <motion.h1
        initial={{ scale: 0.3, rotate: -10, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 10, delay: 0.15 }}
        className="animate-shimmer text-balance font-serif text-6xl font-black leading-tight text-yellow-200 drop-shadow-[0_4px_12px_rgba(200,140,0,0.8)] md:text-7xl"
      >
        🎉 당신은 종강했습니다! 🎉
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="mt-6 font-serif text-2xl text-yellow-100/90 drop-shadow"
      >
        고생 많으셨습니다. 방학을 즐기세요!
      </motion.p>

      <motion.button
        type="button"
        onClick={onReset}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.07, boxShadow: '0 0 30px rgba(255,215,0,0.5)' }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 rounded-2xl border-4 border-yellow-300 bg-yellow-500/20 px-12 py-5 text-2xl tracking-wider text-yellow-100 shadow-xl backdrop-blur-sm"
      >
        다시 개강하기
      </motion.button>
    </motion.section>
  )
}
