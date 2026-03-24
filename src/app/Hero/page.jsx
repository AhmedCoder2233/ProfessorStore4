'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, ChevronDown, Zap, Star } from 'lucide-react'

const PARTICLES = Array.from({ length: 24 })

function BlockParticle({ i }) {
  const x = `${(i / 24) * 100}%`
  const delay = (i * 0.37) % 4
  const dur = 5 + (i % 5)
  return (
    <motion.div
      className="absolute font-pixel text-xl select-none pointer-events-none"
      style={{ left: x, top: `${10 + (i % 5) * 16}%`, opacity: 0 }}
      animate={{ y: [-8, 12, -8], opacity: [0, 0.12, 0.12, 0], rotate: [0, i % 2 === 0 ? 90 : -90, 0] }}
      transition={{ duration: dur, repeat: Infinity, delay, ease: 'easeInOut' }}
    >
      {i % 3 === 0 ? '⬛' : i % 3 === 1 ? '🟥' : '◼'}
    </motion.div>
  )
}

export default function Hero() {
  const [wordIdx, setWordIdx] = useState(0)
  const words = ['CINEMATIC VIDEOS', 'SOCIAL MEDIA', 'VIRAL CONTENT', 'YOUR BRAND']

  useEffect(() => {
    const timer = setInterval(() => {
      setWordIdx(p => (p + 1) % words.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [])

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } }
  }
  const itemVariants = {
    hidden: { opacity: 0, y: 32 },
    show:  { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } }
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern">
      {/* Background radial */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 10%, rgba(180,0,0,0.1) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-80"
          style={{ background: 'linear-gradient(to top, rgba(13,10,11,1) 0%, transparent 100%)' }} />
        {/* Horizontal accent lines */}
        <div className="absolute top-1/3 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(229,57,53,0.12), transparent)' }} />
        <div className="absolute top-2/3 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(229,57,53,0.07), transparent)' }} />
      </div>

      {/* Floating block particles */}
      {PARTICLES.map((_, i) => <BlockParticle key={i} i={i} />)}

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16"
      >
        {/* Status badge */}
        <motion.div variants={itemVariants}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-red-900/50 bg-red-950/30"
          style={{ clipPath: 'polygon(8px 0,100% 0,100% calc(100% - 8px),calc(100% - 8px) 100%,0 100%,0 8px)' }}
        >
          <span className="w-2 h-2 bg-red-500 animate-neon-pulse" />
          <span className="font-pixel text-[7px] text-red-400">LEVEL 99 CONTENT CREATOR</span>
          <Star size={10} className="text-red-600" />
        </motion.div>

        {/* Main title */}
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="font-pixel leading-tight">
            <motion.span
              className="block text-3xl sm:text-4xl lg:text-5xl mb-2"
              style={{ color: '#f5f5f5' }}
            >
              PROFESSOR
            </motion.span>
            <motion.span
              className="block text-4xl sm:text-5xl lg:text-7xl gradient-red"
              style={{ textShadow: '0 0 40px rgba(229,57,53,0.4)' }}
              animate={{ textShadow: [
                '0 0 30px rgba(229,57,53,0.3)',
                '0 0 60px rgba(229,57,53,0.6)',
                '0 0 30px rgba(229,57,53,0.3)'
              ]}}
              transition={{ duration: 3, repeat: Infinity }}
            >
              STORE
            </motion.span>
          </h1>
        </motion.div>

        {/* Fade-up word cycle */}
        <motion.div variants={itemVariants} className="mb-6 h-14 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={wordIdx}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -28 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="font-orbitron text-xl sm:text-2xl lg:text-3xl font-bold gradient-red"
              style={{ display: 'block', textShadow: '0 0 20px rgba(229,57,53,0.4)' }}
            >
              {words[wordIdx]}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Sub */}
        <motion.p variants={itemVariants}
          className="font-rajdhani text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Crafting <span className="text-red-400">cinematic stories</span> and dominating
          <span className="text-red-300"> social media</span> — one pixel at a time.
          Transform your brand into an <span className="text-white">epic adventure</span>.
        </motion.p>

        {/* Buttons */}
        <motion.div variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.05, boxShadow: '0 0 35px rgba(229,57,53,0.55)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 font-pixel text-[9px] text-white bg-red-700 hover:bg-red-600 transition-all duration-200 btn-clip-lg"
          >
            <Play size={14} /> WATCH WORK
          </motion.a>
          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(229,57,53,0.25)' }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 font-pixel text-[9px] text-red-400 border-2 border-red-800/70 hover:border-red-600 hover:bg-red-900/20 transition-all duration-200 btn-clip-lg"
          >
            <Zap size={14} /> GET STARTED
          </motion.a>
        </motion.div>

        {/* Mini stats */}
        <motion.div variants={itemVariants}
          className="grid grid-cols-3 gap-3 max-w-sm mx-auto"
        >
          {[
            { val: '50+',  label: 'PROJECTS', icon: '🎬' },
            { val: '99%', label: 'SATISFIED', icon: '⚔' },
            { val: '24/7', label: 'SUPPORT',   icon: '⚡' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              className="mc-block p-3 text-center bg-[#120D0E] scanline-wrap"
              style={{ borderColor: 'rgba(229,57,53,0.18)' }}
              whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(229,57,53,0.2)' }}
            >
              <div className="text-base mb-1">{s.icon}</div>
              <div className="font-pixel text-sm text-red-400">{s.val}</div>
              <div className="font-pixel text-[6px] text-gray-600 mt-1">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        <span className="font-pixel text-[6px] text-red-900">SCROLL</span>
        <ChevronDown size={18} className="text-red-700" />
      </motion.div>
    </section>
  )
}