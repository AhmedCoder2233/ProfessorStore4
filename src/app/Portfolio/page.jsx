'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Play, Pause, Volume2, VolumeX, Monitor, Smartphone } from 'lucide-react'


const videos916 = [
  {
    id: 4,
     src: 'https://res.cloudinary.com/dypuwanso/video/upload/v1774379537/short6_fugpew.mp4',
  },
  {
    id: 7,
     src: 'https://res.cloudinary.com/dypuwanso/video/upload/v1774379594/short5_1_fgxgec.mp4',
  },
  {
    id: 5,
   
    src: 'https://res.cloudinary.com/dypuwanso/video/upload/v1774379623/short4_1_xkchvu.mp4',
  },
  {
    id: 6,

    src: 'https://res.cloudinary.com/dypuwanso/video/upload/v1774379622/short3_zh78y6.mp4',
  },
  {
    id: 8,
   
    src: 'https://res.cloudinary.com/dypuwanso/video/upload/v1774379918/Sample_t75al9.mp4',
  },
  {
    id: 9,

    src: 'https://res.cloudinary.com/dypuwanso/video/upload/v1774379968/Bloxblast_sonic_e74z1x.mp4',
  },
]

/* ─── Single video card ──────────────────────────────────── */
function VideoCard({ v, index, isVertical }) {
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [hovered, setHovered] = useState(false)
  const videoRef = useRef(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const togglePlay = () => {
    if (!videoRef.current) return
    playing ? videoRef.current.pause() : videoRef.current.play()
    setPlaying(p => !p)
  }
  const toggleMute = e => {
    e.stopPropagation()
    if (videoRef.current) videoRef.current.muted = !muted
    setMuted(m => !m)
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.12 }}
    >
      <motion.div
        className="mc-block bg-[#120D0E] overflow-hidden shimmer-hover"
        style={{ borderColor: 'rgba(229,57,53,0.18)' }}
        whileHover={{ y: -6, boxShadow: '0 20px 60px rgba(229,57,53,0.18)' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* ── Video wrapper ── */}
        <div
          className={`relative overflow-hidden bg-black cursor-pointer ${isVertical ? 'aspect-916' : 'aspect-169'}`}
          onClick={togglePlay}
        >
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted={muted}
            loop
            playsInline
            preload="metadata"
            onEnded={() => setPlaying(false)}
          >
            <source src={v.src} type="video/mp4" />
          </video>

          {/* Gradient overlay */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: playing ? 'linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 40%)' : 'linear-gradient(to top,rgba(0,0,0,0.75) 0%,rgba(0,0,0,0.15) 50%,transparent 100%)' }} />

          {/* Play/pause overlay */}
          <AnimatePresence>
            {!playing && (
              <motion.div
                key="play"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-14 h-14 flex items-center justify-center mc-block"
                  style={{ background: 'rgba(180,10,10,0.25)', borderColor: '#E5393580', backdropFilter: 'blur(6px)' }}
                >
                  <Play size={22} className="text-red-400 ml-1" />
                </motion.div>
              </motion.div>
            )}
            {playing && (
              <motion.div
                key="pause"
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered ? 1 : 0 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-12 h-12 flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(229,57,53,0.4)' }}>
                  <Pause size={18} className="text-red-400" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Format badge — top left */}
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1"
            style={{ background: 'rgba(0,0,0,0.8)', border: '1px solid rgba(229,57,53,0.35)' }}>
            {isVertical
              ? <Smartphone size={9} className="text-red-500" />
              : <Monitor size={9} className="text-red-500" />}
            <span className="font-pixel text-[7px] text-red-400">{isVertical ? '9:16' : '16:9'}</span>
          </div>

          {/* Mute toggle — top right */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered || playing ? 1 : 0 }}
            className="absolute top-3 right-3"
          >
            <button
              onClick={toggleMute}
              className="w-8 h-8 flex items-center justify-center transition-colors"
              style={{ background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(229,57,53,0.3)' }}
            >
              {muted
                ? <VolumeX size={11} className="text-red-500" />
                : <Volume2 size={11} className="text-red-400" />}
            </button>
          </motion.div>

 

          {/* Playing waveform — bottom left */}
          {playing && (
            <div className="absolute bottom-3 left-3 flex items-end gap-0.5 h-4">
              {[1, 2, 3, 4].map(b => (
                <motion.div key={b} className="w-1 bg-red-500"
                  animate={{ height: ['30%', '100%', '50%', '80%'] }}
                  transition={{ duration: 0.35, repeat: Infinity, delay: b * 0.09, repeatType: 'reverse' }} />
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Section divider ────────────────────────────────────── */
function Divider({ label, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex items-center gap-4 my-12"
    >
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(229,57,53,0.3))' }} />
      <div className="flex items-center gap-2 px-4 py-2 mc-block bg-[#120D0E]"
        style={{ borderColor: 'rgba(229,57,53,0.25)' }}>
        <span className="text-lg">{icon}</span>
        <span className="font-pixel text-[8px] text-red-500">{label}</span>
      </div>
      <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(229,57,53,0.3), transparent)' }} />
    </motion.div>
  )
}

/* ─── Main section ───────────────────────────────────────── */
export default function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section id="portfolio" className="py-24 relative overflow-hidden grid-pattern">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(180,0,0,0.05) 0%, transparent 60%)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-red-950/25 border border-red-900/35"
          >
            <span className="font-pixel text-[7px] text-red-700">🎬 SHOWCASE VAULT</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-pixel text-xl sm:text-2xl lg:text-3xl text-white mb-3"
          >
            VIDEO <span className="gradient-red">PORTFOLIO</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-rajdhani text-gray-500 text-lg max-w-xl mx-auto"
          >
            Cinematic works crafted to captivate audiences and convert viewers into loyal clients
          </motion.p>
        </motion.div>

        {/* ── 9:16 row ── */}
        <Divider label="SHORTS / REELS 9:16" icon="📱" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos916.map((v, i) => <VideoCard key={v.id} v={v} index={i} isVertical={true} />)}
        </div>

        {/* Disclaimer */}
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center font-pixel text-[6px] text-red-950 mt-10"
        >
          ⚠ SAMPLE VIDEOS SHOWN — YOUR PROJECT WILL BE FULLY CUSTOM ⚠
        </motion.p>
      </div>
    </section>
  )
}