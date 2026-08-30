'use client'

import { motion } from 'framer-motion'

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="bg-halftone flex min-h-screen w-full flex-col"
    >
      {/* ── TOP NAV BAR ── */}
      <header className="w-full bg-primary border-b-4 border-foreground shadow-[0_8px_0_0_#191c1e] z-50">
        <div className="h-16 max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-primary-foreground text-2xl">🥊</span>
            <span className="font-headline text-xl text-primary-foreground tracking-tighter italic">
              Professor Punch-Out!!
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <span className="font-label-mono text-xs text-primary-foreground bg-primary-foreground text-primary px-2 py-1 border-2 border-primary-foreground shadow-[4px_4px_0_0_#191c1e]"
              style={{ color: '#93000b', background: '#ffffff' }}
            >
              FIGHT
            </span>
            <span className="font-label-mono text-xs text-primary-foreground">SCORES</span>
            <span className="font-label-mono text-xs text-primary-foreground">GYM</span>
          </nav>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="relative w-full max-w-lg bg-card border-4 border-foreground shadow-brutal p-10">

          {/* Setup Stage badge */}
          <div className="absolute -top-5 -left-3 bg-primary text-primary-foreground font-headline text-base px-4 py-1 border-4 border-foreground shadow-brutal-sm -rotate-3 italic">
            Setup Stage
          </div>

          <div className="flex flex-col gap-8 mt-4">
            {/* Title */}
            <div className="text-center">
              <h2 className="font-headline text-5xl md:text-6xl text-foreground leading-none tracking-tighter">
                ENTER THE<br />RING
              </h2>
              <p className="font-label-mono text-xs text-muted-foreground mt-2 tracking-widest">
                Define your academic nemesis
              </p>
            </div>

            {/* Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (canSummon) onSummon()
              }}
              className="flex flex-col gap-5"
            >
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="prof-name"
                  className="font-label-mono text-xs text-foreground"
                >
                  Professor&apos;s Name
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
                  placeholder="e.g. Dr. Doom"
                  className="w-full bg-card border-4 border-foreground px-4 py-3 font-body-mono text-base text-foreground placeholder:text-muted-foreground shadow-brutal-sm transition-all"
                />
              </div>

              {/* Appearance */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="prof-desc"
                  className="font-label-mono text-xs text-foreground"
                >
                  Professor&apos;s Appearance (Max 50 chars)
                </label>
                <textarea
                  id="prof-desc"
                  value={profDesc}
                  maxLength={50}
                  rows={2}
                  aria-label="교수님 특징 입력"
                  onChange={(e) => setProfDesc(e.target.value)}
                  placeholder="e.g. Tweed jacket, menacing glare, chalk dust aura"
                  className="w-full resize-none bg-card border-4 border-foreground px-4 py-3 font-body-mono text-base text-foreground placeholder:text-muted-foreground shadow-brutal-sm transition-all"
                />
                <div className="flex justify-between items-center">
                  <span className="font-label-mono text-xs text-muted-foreground">Max length: 50</span>
                  <span className={`font-label-mono text-xs font-bold ${profDesc.length >= 50 ? 'text-destructive' : 'text-foreground'}`}>
                    {profDesc.length}/50
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={!canSummon}
                whileTap={canSummon ? { x: 4, y: 4 } : undefined}
                className="mt-2 w-full bg-muted border-4 border-foreground shadow-brutal px-6 py-4 font-headline text-2xl text-foreground uppercase tracking-tighter flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed transition-colors hover:bg-primary hover:text-primary-foreground"
                style={canSummon ? {} : {}}
              >
                <span>Summon Professor</span>
                <span className="text-2xl">🥋</span>
              </motion.button>
            </form>
          </div>

          {/* Decorative corner circle */}
          <div className="absolute -bottom-8 -right-8 w-20 h-20 bg-red-100 border-4 border-foreground shadow-brutal-sm rounded-full flex items-center justify-center rotate-12 -z-10">
            <span className="text-2xl">⚠️</span>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer className="w-full bg-foreground text-primary-foreground py-6 border-t-4 border-primary">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <span className="font-headline text-lg">Tenure Denied © 1994</span>
          <div className="flex gap-4 text-xl">🎮💀⚠️</div>
          <span className="font-label-mono text-xs">V.0.6.9-BETA</span>
        </div>
      </footer>
    </motion.section>
  )
}
