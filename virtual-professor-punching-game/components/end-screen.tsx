'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

type Props = {
  onReset: () => void
}

export function EndScreen({ onReset }: Props) {
  useEffect(() => {
    const duration = 3000
    const end = Date.now() + duration

    // initial big burst
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
    })

    const interval = setInterval(() => {
      if (Date.now() > end) {
        clearInterval(interval)
        return
      }
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 70,
        origin: { x: 0 },
      })
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 70,
        origin: { x: 1 },
      })
    }, 350)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex min-h-screen w-full flex-col items-center justify-center p-8 text-center"
    >
      <motion.h1
        initial={{ scale: 0.5, rotate: -6, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.1 }}
        className="text-balance font-serif text-6xl font-black leading-tight text-foreground md:text-7xl"
      >
        🎉 당신은 종강했습니다! 🎉
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-6 font-serif text-2xl text-accent"
      >
        고생 많으셨습니다. 방학을 즐기세요!
      </motion.p>

      <motion.button
        type="button"
        onClick={onReset}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-12 rounded-2xl border-4 border-accent bg-primary px-12 py-5 text-2xl tracking-wider text-primary-foreground shadow-xl"
      >
        다시 개강하기
      </motion.button>
    </motion.section>
  )
}
