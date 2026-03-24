'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BLOCKS = ['⬛','🟥','⬛','🟥','⬛','🟥','⬛','🟥']

export default function Intro({ onDone }) {
  const [phase, setPhase] = useState('loading') // loading | reveal | done
  const [progress, setProgress] = useState(0)
  const [loadText, setLoadText] = useState('LOADING WORLD...')

  const texts = ['LOADING WORLD...', 'BUILDING TERRAIN...', 'SPAWNING ASSETS...', 'CRAFTING EXPERIENCE...', 'READY TO ENTER...']

  useEffect(() => {
    let p = 0
    const interval = setInterval(() => {
      p += Math.random() * 4 + 1.5
      if (p >= 100) { p = 100; clearInterval(interval); }
      setProgress(Math.min(p, 100))
      const idx = Math.floor((Math.min(p, 100) / 100) * (texts.length - 1))
      setLoadText(texts[idx])
    }, 60)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      const t1 = setTimeout(() => setPhase('reveal'), 400)
      const t2 = setTimeout(() => { setPhase('done'); onDone?.() }, 2000)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [progress, onDone])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="intro"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: '#080608' }}
        >
          {/* Pixel block rain background */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute font-pixel text-2xl opacity-0"
                style={{ left: `${(i / 18) * 100 + Math.random() * 4}%` }}
                animate={{ y: ['-60px', '110vh'], opacity: [0, 0.12, 0.08, 0] }}
                transition={{
                  duration: 3 + Math.random() * 3,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                  ease: 'linear',
                }}
              >
                {BLOCKS[i % BLOCKS.length]}
              </motion.div>
            ))}
          </div>

          {/* Vignette */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(0,0,0,0.85) 100%)' }} />

          <AnimatePresence mode="wait">
            {phase === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-8"
              >
                {/* Logo mark */}
                <motion.div
                  animate={{ boxShadow: ['0 0 20px rgba(229,57,53,0.4)', '0 0 50px rgba(229,57,53,0.8)', '0 0 20px rgba(229,57,53,0.4)'] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                  className="w-20 h-20 mc-block flex items-center justify-center relative"
                  style={{ background: 'linear-gradient(135deg, #1a0505, #2d0808)', borderColor: 'rgba(229,57,53,0.5)' }}
                >
                  <span className="font-pixel text-3xl" style={{ color: '#E53935' }}>P</span>
                  {/* Corner dots */}
                  {[0,1,2,3].map(c => (
                    <span key={c} className="absolute w-1.5 h-1.5 bg-red-600"
                      style={{ top: c < 2 ? -1 : 'auto', bottom: c >= 2 ? -1 : 'auto', left: c % 2 === 0 ? -1 : 'auto', right: c % 2 === 1 ? -1 : 'auto' }} />
                  ))}
                </motion.div>

                {/* Title */}
                <div className="text-center">
                  <motion.p
                    className="font-pixel text-[8px] text-red-700 mb-2 tracking-widest"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    ENTERING THE REALM OF
                  </motion.p>
                  <h1 className="font-pixel text-lg sm:text-2xl leading-tight">
                    <span className="block text-white">PROFESSOR</span>
                    <span className="block text-red-500" style={{ textShadow: '0 0 20px rgba(229,57,53,0.8)' }}>STORE</span>
                  </h1>
                </div>

                {/* Progress block bar */}
                <div className="w-full">
                  <div className="flex justify-between mb-2">
                    <span className="font-pixel text-[7px] text-red-800 animate-neon-pulse">{loadText}</span>
                    <span className="font-pixel text-[7px] text-red-500">{Math.floor(progress)}%</span>
                  </div>
                  <div className="mc-progress w-full" style={{ height: 22 }}>
                    <motion.div
                      className="mc-progress-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  {/* Pixel blocks below bar */}
                  <div className="flex mt-1 gap-0.5">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div key={i} className="flex-1 h-1 transition-all duration-200"
                        style={{ background: (i / 20) * 100 <= progress ? '#E53935' : '#1a0a0a' }} />
                    ))}
                  </div>
                </div>

                {/* Minecraft-style tip */}
                <motion.p
                  className="font-pixel text-[6px] text-gray-700 text-center"
                  animate={{ opacity: [0.4, 0.8, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  TIP: GREAT CONTENT IS CRAFTED, NOT GENERATED
                </motion.p>
              </motion.div>
            )}

            {phase === 'reveal' && (
              <motion.div
                key="reveal"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative z-10 flex flex-col items-center gap-4"
              >
                {/* Dramatic reveal flash */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  style={{ background: 'radial-gradient(circle, rgba(229,57,53,0.3) 0%, transparent 70%)' }}
                />
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="font-pixel text-center"
                >
                  <span className="text-4xl sm:text-6xl block" style={{
                    color: '#E53935',
                    textShadow: '0 0 30px rgba(229,57,53,1), 0 0 60px rgba(229,57,53,0.5)'
                  }}>
                    WELCOME
                  </span>
                  <motion.span
                    className="text-sm sm:text-base text-white/60 block mt-2 font-pixel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    TO THE OVERWORLD
                  </motion.span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Corner decorations */}
          {[
            'top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'
          ].map((pos, i) => (
            <div key={i} className={`absolute ${pos} font-pixel text-red-900 text-[10px] opacity-40`}>
              {i === 0 ? '◢' : i === 1 ? '◣' : i === 2 ? '◥' : '◤'}
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}