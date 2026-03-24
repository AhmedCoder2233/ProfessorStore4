'use client'
import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'

const reviews = [
  {
    name: 'ALEX MORGAN',
    handle: '@alexcreates',
    role: 'Brand Owner',
    avatar: 'AM',
    stars: 5,
    text: 'Professor Store completely transformed our brand presence. The cinematic quality of the videos blew our entire team away — we got 3x our usual engagement on every post.',
    platform: 'Instagram',
    project: 'Brand Film',
    color: '#E53935',
  },
  {
    name: 'JESSICA LANE',
    handle: '@jlane_official',
    role: 'Influencer · 2M Followers',
    avatar: 'JL',
    stars: 5,
    text: 'The reels he creates are on another level. After working with Professor Store my TikTok blew up — one of his edits hit 1.2M views in two days. He just understands the algorithm.',
    platform: 'TikTok',
    project: 'Reel Package',
    color: '#FF5252',
  },
  {
    name: 'DAVID CHEN',
    handle: '@chenventures',
    role: 'E-commerce CEO',
    avatar: 'DC',
    stars: 5,
    text: 'We hired Professor Store for social media management and our revenue grew 40% in the first quarter. The content strategy is data-driven and results-oriented. Absolutely recommended.',
    platform: 'YouTube & IG',
    project: 'Full Social Mgmt',
    color: '#C62828',
  },
  {
    name: 'SARAH OKAFOR',
    handle: '@sarahokafor_',
    role: 'Startup Founder',
    avatar: 'SO',
    stars: 5,
    text: 'From concept to final cut, the process was smooth and professional. The 9:16 shorts he made for our launch campaign generated over 500K organic views in the first week.',
    platform: 'Instagram Reels',
    project: 'Launch Campaign',
    color: '#E53935',
  },
  {
    name: 'MIKE THUNDERS',
    handle: '@thundersmedia',
    role: 'Agency Director',
    avatar: 'MT',
    stars: 5,
    text: 'I regularly outsource cinematic short work to Professor Store for my clients. Consistently exceptional quality, always on time, and the communication is top-tier. A true professional.',
    platform: 'Multi-platform',
    project: 'Agency Partner',
    color: '#FF5252',
  },
  {
    name: 'PRIYA SHARMA',
    handle: '@priyasharma.co',
    role: 'Content Creator · 500K',
    avatar: 'PS',
    stars: 5,
    text: 'The colour grading alone is worth every penny. My feed has never looked more cohesive and premium. My engagement rate literally doubled after the rebrand. Highly recommend!',
    platform: 'Instagram',
    project: 'Feed Rebrand',
    color: '#C62828',
  },
]

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < count ? 'star-fill' : 'star-empty'} style={{ fontSize: 12 }}>★</span>
      ))}
    </div>
  )
}

function ReviewCard({ r, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="relative mc-block bg-[#120D0E] p-6 shimmer-hover flex flex-col h-full"
      style={{ borderColor: `${r.color}18` }}
    >
      {/* Quote mark */}
      <div className="absolute top-4 right-5 opacity-10">
        <Quote size={40} style={{ color: r.color }} />
      </div>

      {/* Stars + platform */}
      <div className="flex items-center justify-between mb-4">
        <Stars count={r.stars} />
        <span className="font-pixel text-[7px] px-2 py-0.5"
          style={{ color: r.color, border: `1px solid ${r.color}25`, background: `${r.color}0A` }}>
          {r.platform}
        </span>
      </div>

      {/* Review text */}
      <p className="font-rajdhani text-gray-300 text-base leading-relaxed mb-6 flex-1 relative z-10">
        &ldquo;{r.text}&rdquo;
      </p>

      {/* Project tag */}
      <div className="mb-4">
        <span className="font-pixel text-[6px] text-red-900 px-2 py-1 bg-red-950/30 border border-red-950">
          PROJECT: {r.project}
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4"
        style={{ borderTop: `1px solid ${r.color}14` }}>
        {/* Avatar */}
        <div className="w-10 h-10 flex items-center justify-center mc-block flex-shrink-0 font-pixel text-[9px]"
          style={{ background: `${r.color}18`, borderColor: `${r.color}35`, color: r.color }}>
          {r.avatar}
        </div>
        <div>
          <div className="font-pixel text-[8px] text-white">{r.name}</div>
          <div className="font-rajdhani text-xs text-gray-600 mt-0.5">{r.handle}</div>
          <div className="font-rajdhani text-xs text-gray-700">{r.role}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Reviews() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [page, setPage] = useState(0)
  const perPage = 3
  const totalPages = Math.ceil(reviews.length / perPage)
  const visible = reviews.slice(page * perPage, page * perPage + perPage)

  return (
    <section id="reviews" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(229,57,53,0.25),transparent)' }} />
        <div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg,transparent,rgba(229,57,53,0.25),transparent)' }} />
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(150,0,0,0.03) 0%, transparent 70%)' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-red-950/25 border border-red-900/35"
          >
            <span className="font-pixel text-[7px] text-red-700">⭐ ACHIEVEMENT LOG</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-pixel text-xl sm:text-2xl lg:text-3xl text-white mb-3"
          >
            CLIENT <span className="gradient-red">REVIEWS</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-rajdhani text-gray-500 text-lg max-w-xl mx-auto"
          >
            Real results from real clients — see why brands choose Professor Store
          </motion.p>
        </motion.div>

        {/* Overall score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-8 mb-12 flex-wrap"
        >
          <div className="text-center">
            <div className="font-pixel text-5xl gradient-red mb-1"
              style={{ textShadow: '0 0 30px rgba(229,57,53,0.4)' }}>5.0</div>
            <Stars count={5} />
            <div className="font-pixel text-[7px] text-red-900 mt-1">OVERALL RATING</div>
          </div>
          <div className="h-16 w-px bg-red-950" />
          {[
            { label: 'QUALITY',    val: '100%' },
            { label: 'ON TIME',    val: '98%'  },
            { label: 'RECOMMEND',  val: '100%' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-pixel text-2xl text-red-500 mb-1">{s.val}</div>
              <div className="font-pixel text-[7px] text-red-900">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Cards grid with pagination */}
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
          >
            {visible.map((r, i) => <ReviewCard key={r.name} r={r} index={i} />)}
          </motion.div>
        </AnimatePresence>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => setPage(p => Math.max(0, p - 1))}
            disabled={page === 0}
            className="w-10 h-10 flex items-center justify-center mc-block bg-[#120D0E] disabled:opacity-30 transition-opacity"
            style={{ borderColor: 'rgba(229,57,53,0.2)' }}
          >
            <ChevronLeft size={16} className="text-red-500" />
          </motion.button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.2 }}
                onClick={() => setPage(i)}
                className="w-3 h-3 transition-all duration-200"
                style={{
                  background: i === page ? '#E53935' : '#2a1010',
                  border: `1px solid ${i === page ? '#E53935' : '#3D1515'}`,
                  boxShadow: i === page ? '0 0 10px rgba(229,57,53,0.6)' : 'none',
                }}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="w-10 h-10 flex items-center justify-center mc-block bg-[#120D0E] disabled:opacity-30 transition-opacity"
            style={{ borderColor: 'rgba(229,57,53,0.2)' }}
          >
            <ChevronRight size={16} className="text-red-500" />
          </motion.button>
        </div>
      </div>
    </section>
  )
}