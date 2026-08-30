'use client'

import { motion } from 'framer-motion'
import { Flame, Skull, Zap } from 'lucide-react'

type Props = {
  profName: string
  profDesc: string
  setProfName: (v: string) => void
  setProfDesc: (v: string) => void
  onSummon: () => void
}

export function InputScreen({
  profName,
  profDesc,
  setProfName,
  setProfDesc,
  onSummon,
}: Props) {
  const canSummon = profName.trim().length > 0

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.35 }}
      className="scanlines bg-grid-pattern flex min-h-screen w-full items-center justify-center p-8"
    >
      <div className="relative w-full max-w-2xl">
        {/* tacky glowing frame */}
        <div className="absolute -inset-2 rounded-3xl bg-primary/40 blur-2xl" aria-hidden />
        <div className="relative overflow-hidden rounded-3xl border-4 border-primary bg-card shadow-2xl">
          <div className="flex items-center justify-center gap-3 bg-primary px-6 py-3 text-primary-foreground">
            <Skull className="h-6 w-6 animate-bounce" />
            <span className="animate-text-blink text-lg tracking-widest">STRESS RELIEF ZONE</span>
            <Skull className="h-6 w-6 animate-bounce" />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (canSummon) onSummon()
            }}
            className="px-10 py-10"
          >
            <h1 className="text-balance text-center text-5xl leading-tight text-foreground">
              가상 교수님 <span className="text-primary">응징</span> 게임
            </h1>
            <p className="mt-3 text-center text-base text-muted-foreground">
              스트레스 그만 받고, 교수님을 소환해서 마음껏 두들겨 보세요.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="prof-name"
                  className="mb-2 flex items-center gap-2 text-sm text-accent"
                >
                  <Flame className="h-4 w-4" /> 교수님 성함
                </label>
                <input
                  id="prof-name"
                  type="text"
                  value={profName}
                  maxLength={10}
                  aria-required="true"
                  aria-label="교수님 성함 입력"
                  onChange={(e) => {
                    // S1-01: 특수문자 제외 — 한글(자음/모음 포함)·영문·숫자·공백만 허용
                    const filtered = e.target.value.replace(/[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9\s]/g, '')
                    setProfName(filtered)
                  }}
                  placeholder="당신을 괴롭히는 교수님의 이름을 알려주세요."
                  className="w-full rounded-xl border-2 border-border bg-input px-4 py-4 text-lg text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="prof-desc"
                  className="mb-2 flex items-center gap-2 text-sm text-accent"
                >
                  <Zap className="h-4 w-4" /> 교수님 특징
                </label>
                <textarea
                  id="prof-desc"
                  value={profDesc}
                  maxLength={50}
                  rows={3}
                  aria-label="교수님 특징 입력"
                  onChange={(e) => setProfDesc(e.target.value)}
                  placeholder="교수님은 어떻게 생기셨나요? (최대 50자)"
                  className="w-full resize-none rounded-xl border-2 border-border bg-input px-4 py-4 text-lg text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
                <div className="mt-1 text-right text-sm text-muted-foreground">
                  {profDesc.length} / 50
                </div>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={!canSummon}
              aria-label="교수님 소환하기 버튼"
              whileHover={canSummon ? { scale: 1.03 } : undefined}
              whileTap={canSummon ? { scale: 0.97 } : undefined}
              animate={
                canSummon
                  ? { boxShadow: ['0 0 0px var(--primary)', '0 0 30px var(--primary)', '0 0 0px var(--primary)'] }
                  : undefined
              }
              transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
              className="mt-8 w-full rounded-2xl border-4 border-accent bg-primary py-6 text-3xl tracking-wider text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              🔥 교수님 소환하기 🔥
            </motion.button>
          </form>
        </div>
      </div>
    </motion.section>
  )
}
