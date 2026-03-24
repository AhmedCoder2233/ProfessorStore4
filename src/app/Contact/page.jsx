'use client'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { Send, Instagram, Youtube, Twitter, Mail, Phone, MapPin, CheckCircle, Loader } from 'lucide-react'

const packages = [
  { id: 'cinematic', label: '🎬 CINEMATIC VIDEO',   color: '#E53935' },
  { id: 'social',    label: '📱 SOCIAL MEDIA MGMT', color: '#FF5252' },
  { id: 'strategy',  label: '📊 CONTENT STRATEGY',  color: '#C62828' },
  { id: 'custom',    label: '⚡ CUSTOM PACKAGE',     color: '#B71C1C' },
]

const socials = [
  { icon: Instagram, label: 'INSTAGRAM', handle: '@professorstore', color: '#FF5252', href: '#' },
  { icon: Youtube,   label: 'YOUTUBE',   handle: 'Professor Store', color: '#E53935', href: '#' },
  { icon: Twitter,   label: 'TWITTER/X', handle: '@professorstore', color: '#C62828', href: '#' },
]

export default function Contact() {
  const [form, setForm]   = useState({ name: '', email: '', package: '', message: '' })
  const [sending, setSending] = useState(false)
  const [sent, setSent]   = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  const handleSubmit = async e => {
    e.preventDefault()
    setSending(true)
    await new Promise(r => setTimeout(r, 1800))
    setSending(false)
    setSent(true)
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden grid-pattern">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(150,0,0,0.06) 0%, transparent 60%)' }} />
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(229,57,53,0.3),transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-red-950/25 border border-red-900/35"
          >
            <span className="font-pixel text-[7px] text-red-700">📨 SEND A SIGNAL</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="font-pixel text-xl sm:text-2xl lg:text-3xl text-white mb-3"
          >
            START YOUR <span className="gradient-red">QUEST</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-rajdhani text-gray-500 text-lg max-w-xl mx-auto"
          >
            Ready to level up your content? Drop a message and let us craft something legendary.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="mc-block bg-[#120D0E] p-6" style={{ borderColor: 'rgba(229,57,53,0.15)' }}>
              <h3 className="font-pixel text-[9px] text-red-700 mb-5">📍 SPAWN POINT</h3>
              <div className="space-y-4">
                {[
                  { icon: Mail,    val: 'hello@professorstore.com',  color: '#E53935' },
                  { icon: Phone,   val: '+1 (555) 000-CRAFT',        color: '#FF5252' },
                  { icon: MapPin,  val: 'Available Worldwide',       color: '#C62828' },
                ].map((c, i) => {
                  const I = c.icon
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 flex items-center justify-center mc-block flex-shrink-0"
                        style={{ background: `${c.color}12`, borderColor: `${c.color}28` }}>
                        <I size={13} style={{ color: c.color }} />
                      </div>
                      <span className="font-rajdhani text-gray-400">{c.val}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="mc-block bg-[#120D0E] p-6" style={{ borderColor: 'rgba(229,57,53,0.12)' }}>
              <h3 className="font-pixel text-[9px] text-red-800 mb-4">🌐 FIND ME</h3>
              <div className="space-y-2">
                {socials.map(s => {
                  const I = s.icon
                  return (
                    <motion.a key={s.label} href={s.href} whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-2 hover:bg-red-950/20 transition-all duration-200 group">
                      <div className="w-8 h-8 flex items-center justify-center mc-block"
                        style={{ background: `${s.color}12`, borderColor: `${s.color}28` }}>
                        <I size={13} style={{ color: s.color }} />
                      </div>
                      <div>
                        <div className="font-pixel text-[7px]" style={{ color: s.color }}>{s.label}</div>
                        <div className="font-rajdhani text-gray-600 text-xs">{s.handle}</div>
                      </div>
                    </motion.a>
                  )
                })}
              </div>
            </div>

            <div className="mc-block bg-[#120D0E] p-4" style={{ borderColor: 'rgba(229,57,53,0.22)' }}>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 bg-red-500 animate-neon-pulse" />
                <span className="font-pixel text-[8px] text-red-500">ONLINE NOW</span>
              </div>
              <p className="font-rajdhani text-gray-600 text-sm">
                Avg response: <span className="text-red-500">under 2 hours</span>
              </p>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="mc-block bg-[#120D0E] p-10 text-center h-full flex flex-col items-center justify-center min-h-[400px]"
                style={{ borderColor: 'rgba(229,57,53,0.25)' }}
              >
                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 2 }}
                  className="text-5xl mb-5">⚔</motion.div>
                <h3 className="font-pixel text-sm gradient-red mb-3">QUEST ACCEPTED!</h3>
                <p className="font-rajdhani text-gray-500 text-lg">Message received. I will respond within 2 hours!</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="mc-block bg-[#120D0E] p-6"
                style={{ borderColor: 'rgba(229,57,53,0.12)' }}>
                <div className="font-pixel text-[9px] text-red-900 mb-6">⌨ NEW QUEST FORM</div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {[
                    { key: 'name',  label: 'YOUR NAME',  placeholder: 'Steve Minecraft',     type: 'text' },
                    { key: 'email', label: 'YOUR EMAIL', placeholder: 'steve@email.com',     type: 'email' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block font-pixel text-[7px] text-red-900 mb-1.5">{f.label}</label>
                      <input type={f.type} required placeholder={f.placeholder}
                        value={form[f.key]}
                        onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))}
                        className="w-full mc-block bg-[#1A1114] px-3 py-2.5 font-rajdhani text-gray-300 text-sm placeholder:text-gray-700 transition-all"
                        style={{ borderColor: 'rgba(229,57,53,0.15)' }} />
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <label className="block font-pixel text-[7px] text-red-900 mb-2">SELECT PACKAGE</label>
                  <div className="grid grid-cols-2 gap-2">
                    {packages.map(p => (
                      <motion.button key={p.id} type="button"
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        onClick={() => setForm(prev => ({ ...prev, package: p.id }))}
                        className="p-2.5 mc-block text-left transition-all duration-200"
                        style={{
                          background: form.package === p.id ? `${p.color}15` : '#1A1114',
                          borderColor: form.package === p.id ? `${p.color}55` : 'rgba(229,57,53,0.08)',
                        }}>
                        <span className="font-pixel text-[7px]"
                          style={{ color: form.package === p.id ? p.color : '#4a2020' }}>
                          {p.label}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block font-pixel text-[7px] text-red-900 mb-1.5">YOUR MESSAGE</label>
                  <textarea required rows={4}
                    placeholder="Tell me about your project, goals, and vision..."
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    className="w-full mc-block bg-[#1A1114] px-3 py-2.5 font-rajdhani text-gray-300 text-sm placeholder:text-gray-700 resize-none transition-all"
                    style={{ borderColor: 'rgba(229,57,53,0.15)' }} />
                </div>

                <motion.button type="submit"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(229,57,53,0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-3 py-3.5 font-pixel text-[9px] text-white bg-red-700 hover:bg-red-600 transition-all duration-200 disabled:opacity-60 btn-clip-lg"
                >
                  {sending
                    ? <><Loader size={13} className="animate-spin" /> SENDING...</>
                    : <><Send size={13} /> SEND MESSAGE ⚔</>}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}