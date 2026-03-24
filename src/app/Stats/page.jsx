'use client'
import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Trophy, Target, Clock, Users, Zap, Star } from 'lucide-react'

function CountUp({ target, duration = 1800, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start = Math.min(start + step, target)
      setCount(Math.floor(start))
      if (start >= target) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, target, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

const stats = [
  { icon: Trophy, val: 100, suffix: '+', label: 'PROJECTS DONE', sublabel: 'Completed quests', color: '#FFD700', ore: '🏆', glow: 'glow-gold' },
  { icon: Users, val: 100, suffix: '+', label: 'HAPPY CLIENTS', sublabel: 'Allied players', color: '#4FC3F7', ore: '💎', glow: 'glow-diamond' },
  { icon: Target, val: 98, suffix: '%', label: 'SATISFACTION', sublabel: 'Full hearts bar', color: '#00C853', ore: '💚', glow: 'glow-emerald' },
  { icon: Zap, val:5, suffix: '+', label: 'Clients Rating', sublabel: 'Total reach XP', color: '#FF1744', ore: '⚡', glow: 'glow-redstone' },
]

const skills = [
  { label: 'VIDEO PRODUCTION', val: 98, color: '#4FC3F7' },
  { label: 'COLOR GRADING', val: 95, color: '#FFD700' },
  { label: 'SOCIAL STRATEGY', val: 92, color: '#00C853' },
  { label: 'MOTION GRAPHICS', val: 88, color: '#FF1744' },
  { label: 'STORYTELLING', val: 99, color: '#7CB957' },
  { label: 'CLIENT COMMS', val: 97, color: '#9945FF' },
]

function SkillBar({ skill, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1 }}
      className="mb-4"
    >
      <div className="flex justify-between mb-1.5">
        <span className="font-pixel text-[8px] text-gray-400">{skill.label}</span>
        <span className="font-pixel text-[8px]" style={{ color: skill.color }}>{skill.val}%</span>
      </div>
      <div className="mc-progress">
        <motion.div
          className="mc-progress-fill"
          style={{ background: `linear-gradient(90deg, ${skill.color}80, ${skill.color})` }}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.val}%` } : {}}
          transition={{ duration: 1.2, delay: index * 0.1 + 0.3, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}

export default function Stats() {
  const titleRef = useRef(null)
  const titleInView = useInView(titleRef, { once: true })

  return (
    <section id="stats" className="py-24 relative overflow-hidden grid-pattern">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(93,138,60,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div ref={titleRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-[#FFD700]/10 border border-[#FFD700]/30"
          >
            <span className="font-pixel text-[7px] text-[#FFD700]">📊 PLAYER STATS</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-pixel text-xl sm:text-2xl lg:text-3xl text-white mb-3"
          >
            MY <span className="gradient-gold">STATS</span>
          </motion.h2>
        </motion.div>

        {/* Counter cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`mc-block bg-[#111118] p-5 text-center relative ${stat.glow} shimmer-hover`}
                style={{ borderColor: `${stat.color}25` }}
              >
                <div className="absolute top-2 right-2 text-xl opacity-40">{stat.ore}</div>
                <div className="flex justify-center mb-3">
                  <div className="w-10 h-10 flex items-center justify-center mc-block"
                    style={{ background: `${stat.color}10`, borderColor: `${stat.color}30` }}>
                    <Icon size={18} style={{ color: stat.color }} />
                  </div>
                </div>
                <div className="font-pixel text-2xl sm:text-3xl mb-1" style={{ color: stat.color }}>
                  <CountUp target={stat.val} suffix={stat.suffix} />
                </div>
                <div className="font-pixel text-[8px] text-white mb-1">{stat.label}</div>
                <div className="font-rajdhani text-[11px] text-gray-600">{stat.sublabel}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Skills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mc-block bg-[#111118] p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <Star size={16} className="text-[#FFD700]" />
              <h3 className="font-pixel text-[10px] text-white">SKILL TREE</h3>
            </div>
            {skills.map((s, i) => <SkillBar key={s.label} skill={s} index={i} />)}
          </motion.div>

          {/* Right: XP / Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* XP Bar */}
            <div className="mc-block bg-[#111118] p-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">⭐</span>
                <div>
                  <div className="font-pixel text-[9px] text-[#FFD700]">LEVEL 99 CREATOR</div>
                  <div className="font-rajdhani text-gray-500 text-xs">5+ years of crafting digital gold</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between font-pixel text-[8px]">
                  <span className="text-gray-500">XP</span>
                  <span className="text-[#FFD700]">99,999 / 100,000</span>
                </div>
                <div className="mc-progress">
                  <motion.div
                    className="mc-progress-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: '99%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    style={{ background: 'linear-gradient(90deg, #FFD700, #FFA000)' }}
                  />
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="mc-block bg-[#111118] p-6">
              <div className="font-pixel text-[9px] text-white mb-4">🏅 ACHIEVEMENTS UNLOCKED</div>
              <div className="space-y-3">
                {[
                  { icon: '🎬', title: 'VIRAL KING', desc: '1M+ views on a single video', color: '#FF1744' },
                  { icon: '💎', title: 'DIAMOND EDITOR', desc: 'Top 1% Adobe Premiere Pro user', color: '#4FC3F7' },
                  { icon: '🌍', title: 'GLOBAL REACH', desc: 'Content in 25+ countries', color: '#00C853' },
                  { icon: '⚡', title: 'SPEED CRAFT', desc: '24hr turnaround available', color: '#FFD700' },
                ].map((a, i) => (
                  <motion.div
                    key={a.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-3 p-2 hover:bg-[#16161F] transition-colors"
                  >
                    <span className="text-lg">{a.icon}</span>
                    <div className="flex-1">
                      <div className="font-pixel text-[8px]" style={{ color: a.color }}>{a.title}</div>
                      <div className="font-rajdhani text-gray-500 text-xs">{a.desc}</div>
                    </div>
                    <span className="font-pixel text-[7px] text-[#7CB957]">✓</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}