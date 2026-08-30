'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { InputScreen } from '@/components/input-screen'
import { PlayingScreen } from '@/components/playing-screen'
import { EndScreen } from '@/components/end-screen'

export type Step = 'input' | 'playing' | 'end'
export type DamageText = { id: number; x: number; y: number }

const INITIAL_HP = 1000

export default function Page() {
  const [step, setStep] = useState<Step>('input')
  const [profName, setProfName] = useState('')
  const [profDesc, setProfDesc] = useState('')
  const [hp, setHp] = useState(INITIAL_HP)
  const [damageTexts, setDamageTexts] = useState<DamageText[]>([])

  function handleSummon() {
    if (!profName.trim()) return
    setStep('playing')
  }

  function handleHit(e: React.MouseEvent) {
    const x = e.clientX
    const y = e.clientY
    const id = Date.now() + Math.random()
    setDamageTexts((prev) => [...prev, { id, x, y }])

    setHp((prev) => {
      const next = Math.max(0, prev - 10)
      if (next <= 0) {
        // defer the transition so the final hit renders first
        setTimeout(() => setStep('end'), 120)
      }
      return next
    })
  }

  function removeDamageText(id: number) {
    setDamageTexts((prev) => prev.filter((d) => d.id !== id))
  }

  function handleReset() {
    setStep('input')
    setProfName('')
    setProfDesc('')
    setHp(INITIAL_HP)
    setDamageTexts([])
  }

  return (
    <main className="min-h-screen w-full overflow-hidden bg-background font-sans text-foreground">
      <AnimatePresence mode="wait">
        {step === 'input' && (
          <InputScreen
            key="input"
            profName={profName}
            profDesc={profDesc}
            setProfName={setProfName}
            setProfDesc={setProfDesc}
            onSummon={handleSummon}
          />
        )}
        {step === 'playing' && (
          <PlayingScreen
            key="playing"
            profName={profName}
            profDesc={profDesc}
            hp={hp}
            maxHp={INITIAL_HP}
            damageTexts={damageTexts}
            onHit={handleHit}
            onDamageComplete={removeDamageText}
          />
        )}
        {step === 'end' && <EndScreen key="end" onReset={handleReset} />}
      </AnimatePresence>
    </main>
  )
}
