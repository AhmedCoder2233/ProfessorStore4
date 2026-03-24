'use client'
import { motion } from 'framer-motion'

const links = ['HOME','SERVICES','PORTFOLIO']

export default function Footer() {
  return (
    <footer className="relative py-12 border-t border-red-950/50 overflow-hidden grid-pattern">
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(229,57,53,0.4),transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div className="flex items-center gap-3" whileHover={{ scale: 1.03 }}>
            <div className="w-10 h-10 mc-block flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #1a0505, #350a0a)', borderColor: 'rgba(229,57,53,0.4)' }}>
              <span className="font-pixel text-sm" style={{ color: '#E53935' }}>P</span>
            </div>
            <div>
              <div className="font-pixel text-[9px] gradient-red">PROFESSOR STORE</div>
              <div className="font-rajdhani text-red-900 text-xs">Cinematic &amp; Social Media</div>
            </div>
          </motion.div>

          {/* Nav */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`}
                className="font-pixel text-[6px] text-red-950 hover:text-red-600 transition-colors duration-200">
                {l}
              </a>
            ))}
          </div>

          {/* HP hearts */}
          <div className="flex items-center gap-1.5">
            {[1,2,3].map(i => (
              <motion.span key={i} className="text-red-600 text-base"
                animate={{ opacity: [1, 0.5, 1], scale: [1, 1.15, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}>
                ❤
              </motion.span>
            ))}
            <span className="font-pixel text-[6px] text-red-900 ml-1">FULL HP</span>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-red-950/30 text-center">
          <p className="font-pixel text-[6px] text-red-950">
            © {new Date().getFullYear()} PROFESSOR STORE · CRAFTED IN THE NETHER · NO CREEPERS ALLOWED
          </p>
        </div>
      </div>
    </footer>
  )
}