'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Film, Share2, TrendingUp, ChevronRight, Camera, Wand2, Sparkles } from 'lucide-react'

const services = [
  {
    icon: Film,
    title: 'MINECRAFT SHORTS',
    subtitle: 'Epic Story Crafting',
    features: ['4K Ultra Resolution', 'Pro Colour Grading', 'Cinematic Sound Mix', 'Special Effects'],
    color: '#E53935',
    tier: '◆ NETHERITE TIER',
    icon2: '🎬',
  },
  {
    icon: Share2,
    title: 'SOCIAL MEDIA MANAGEMENT',
    subtitle: 'Brand Domination',
    features: ['Daily Content Posts', 'Story & Reel Creation', 'Monthly Analytics', 'Community Mgmt'],
    color: '#FF5252',
    tier: '◆ DIAMOND TIER',
    icon2: '📱',
  },
{
  icon: TrendingUp,
  title: 'MINECRAFT TRAILER',
  subtitle: 'Cinematic • Server • 4K',
  features: [
    'Cinematic Trailer',
    'Minecraft Server Trailer',
    '4K Ultra HD',
    'Smooth Transitions'
  ],
  color: '#C62828',
  tier: '◆ REDSTONE TIER',
  icon2: '📊',
}
]

const addons = [
  { icon: Camera,   label: 'PHOTOGRAPHY', color: '#FF5252' },
  { icon: Wand2,    label: 'VFX & SFX',   color: '#E53935' },
  { icon: Sparkles, label: 'THUMBNAILS',  color: '#B71C1C' },
]

function ServiceCard({ s, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const Icon = s.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.14 }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="relative mc-block bg-[#120D0E] p-6 shimmer-hover flex flex-col group"
      style={{ borderColor: `${s.color}22` }}
    >
      {/* Top-right corner glow */}
      <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{ background: `linear-gradient(225deg, ${s.color}14, transparent 65%)` }} />
      </div>

      {/* Tier badge + emoji */}
      <div className="flex items-center justify-between mb-5">
        <span className="font-pixel text-[7px] px-2 py-1"
          style={{ color: s.color, border: `1px solid ${s.color}30`, background: `${s.color}0C` }}>
          {s.tier}
        </span>
        <span className="text-2xl">{s.icon2}</span>
      </div>

      {/* Icon */}
      <div className="w-11 h-11 mb-4 flex items-center justify-center mc-block"
        style={{ background: `${s.color}12`, borderColor: `${s.color}28` }}>
        <Icon size={20} style={{ color: s.color }} />
      </div>

      {/* Text */}
      <h3 className="font-pixel text-[11px] text-white mb-1">{s.title}</h3>
      <p className="font-orbitron text-[9px] mb-3" style={{ color: s.color }}>{s.subtitle}</p>
      <p className="font-rajdhani text-gray-500 text-sm leading-relaxed mb-5 flex-1">{s.desc}</p>

      {/* Features */}
      <ul className="space-y-2 mb-5">
        {s.features.map(f => (
          <li key={f} className="flex items-center gap-2 font-rajdhani text-sm text-gray-400">
            <span className="text-[10px]" style={{ color: s.color }}>▶</span> {f}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4"
        style={{ borderTop: `1px solid ${s.color}18` }}>
        <span className="font-pixel text-[9px]" style={{ color: s.color }}>{s.price}</span>
        <motion.a
          href="#contact"
          whileHover={{ x: 4 }}
          className="flex items-center gap-1 font-pixel text-[7px] text-gray-600 hover:text-white transition-colors"
        >
          LEARN MORE <ChevronRight size={9} />
        </motion.a>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(229,57,53,0.3),transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(229,57,53,0.3),transparent)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-red-950/30 border border-red-900/40"
          >
            <span className="font-pixel text-[7px] text-red-600">⛏ CRAFTING TABLE</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-pixel text-xl sm:text-2xl lg:text-3xl text-white mb-3"
          >
            MY <span className="gradient-red">SERVICES</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-rajdhani text-gray-500 text-lg max-w-xl mx-auto"
          >
            Choose your tier and unlock the power to transform your digital presence
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.map((s, i) => <ServiceCard key={s.title} s={s} index={i} />)}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mc-block bg-[#120D0E] p-5"
          style={{ borderColor: 'rgba(229,57,53,0.1)' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="font-pixel text-[7px] text-red-900">+ ADD-ONS AVAILABLE</span>
            <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg,rgba(229,57,53,0.2),transparent)' }} />
          </div>
          <div className="flex flex-wrap gap-3">
            {addons.map(a => {
              const I = a.icon
              return (
                <motion.div key={a.label} whileHover={{ scale: 1.05, y: -2 }}
                  className="flex items-center gap-2 px-4 py-2 mc-block bg-[#1A1114] cursor-pointer"
                  style={{ borderColor: `${a.color}22` }}>
                  <I size={13} style={{ color: a.color }} />
                  <span className="font-pixel text-[7px]" style={{ color: a.color }}>{a.label}</span>
                </motion.div>
              )
            })}
            <motion.div whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 px-4 py-2 mc-block bg-[#1A1114] cursor-pointer border-red-950">
              <span className="font-pixel text-[7px] text-red-900">+ CUSTOM PACKAGE</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}