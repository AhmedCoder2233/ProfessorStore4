'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sparkles } from 'lucide-react'

const links = [
  { label: 'HOME',      href: '#home' },
  { label: 'SERVICES',  href: '#services' },
  { label: 'PORTFOLIO', href: '#portfolio' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0D0A0B]/95 backdrop-blur-md border-b border-red-900/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <motion.a href="#home" className="flex items-center gap-2.5 group" whileHover={{ scale: 1.03 }}>
            <div className="w-9 h-9 mc-block flex items-center justify-center relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1a0505, #350a0a)', borderColor: 'rgba(229,57,53,0.45)' }}>
              <span className="font-pixel text-sm" style={{ color: '#E53935' }}>P</span>
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(229,57,53,0.2), transparent 70%)' }} />
            </div>
            <div className="hidden sm:block">
              <span className="font-pixel text-[12px] block leading-none gradient-red">PROFESSOR</span>
              <span className="font-pixel text-[7px] block leading-none text-red-800 mt-0.5">STORE</span>
            </div>
          </motion.a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 + 0.4 }}
                onClick={() => setActive(link.href)}
                className={`relative font-pixel text-[8px] px-3 py-2 transition-colors duration-200 group ${
                  active === link.href ? 'text-red-400' : 'text-gray-500 hover:text-red-400'
                }`}
              >
                {link.label}
                <span className={`absolute bottom-0 left-2 right-2 h-[2px] bg-red-500 transition-transform duration-200 origin-left ${
                  active === link.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </motion.a>
            ))}
          </div>


        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-[#0D0A0B]/98 border-t border-red-900/30"
          >
            <div className="px-4 py-4 space-y-0.5">
              {links.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => { setActive(link.href); setOpen(false) }}
                  className="block font-pixel text-[9px] py-3 px-4 text-gray-500 hover:text-red-400 hover:bg-red-950/30 transition-all duration-200 border-l-2 border-transparent hover:border-red-600"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}