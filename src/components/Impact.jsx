import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useScrollReveal, staggerContainer, staggerItem } from '../hooks/useScrollReveal'
import './Impact.css'

const metrics = [
  { target: 5,     suffix: '+',  title: 'Languages & Dialects',   caption: 'Tamil, Hindi, English, Telugu, Kannada' },
  { target: 15000, suffix: '+',  title: 'Users Reached',          caption: 'Rural citizens & field practitioners' },
  { target: 85,    suffix: '%',  title: 'Advisory Speedup',       caption: 'Compared to manual center travel' },
  { target: 12,    suffix: '+',  title: 'Pilot Deployments',      caption: 'Rural health centers & agricultural belts' },
]

const serveItems = [
  { emoji: '👩‍⚕️', title: 'Healthcare & ASHA Workers',    body: 'Equipping community health officers, ANMs, and field nurses with offline clinical triage checklists and emergency protocols.' },
  { emoji: '🌾', title: 'Rural Communities',             body: 'Empowering smallholder farmers, families, and villagers with immediate voice guidance on crops, livestock, and local governance.' },
  { emoji: '🏪', title: 'Small Businesses',              body: 'Assisting micro-merchants, local trade cooperatives, and artisans with voice pricing, bookkeeping, and trade advisories.' },
  { emoji: '🌐', title: 'Underserved Populations',       body: 'Removing text-literacy obstacles so elderly, tribal, and remote citizens can effortlessly interact with vital information.' },
]

function AnimatedCounter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const { ref: inViewRef, inView } = useScrollReveal()
  const started = useRef(false)

  useEffect(() => {
    if (inView && !started.current) {
      started.current = true
      const duration = 1600
      const start = performance.now()
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1)
        const ease = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(ease * target))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }
  }, [inView, target])

  return (
    <span ref={inViewRef} className="metric-digit">
      {count.toLocaleString()}{suffix}
    </span>
  )
}

export default function Impact() {
  const { ref, inView } = useScrollReveal()

  return (
    <section className="section-container bg-subtle" id="impact">
      <div className="container">
        <motion.div
          className="section-title-wrap"
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="pill-chip" variants={staggerItem}>Field Impact</motion.div>
          <motion.h2 className="section-heading" variants={staggerItem}>
            Empowering Underserved Communities
          </motion.h2>
          <motion.p className="section-subtext" variants={staggerItem}>
            Designed specifically for individuals and field workers operating on the frontlines of
            rural growth and care.
          </motion.p>
        </motion.div>

        <ImpactSplit />
        <MetricsBanner />
      </div>
    </section>
  )
}

function ImpactSplit() {
  const { ref, inView } = useScrollReveal()

  return (
    <div className="impact-split-stage">
      <motion.div
        className="impact-image-container"
        initial={{ opacity: 0, x: -32 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.75, ease: [0.16,1,0.3,1] }}
        ref={ref}
      >
        <img src="/assets/rural-impact.jpg" alt="AVERA Rural Healthcare & Multilingual Empowerment" className="impact-hero-photo" />
        <div className="impact-floating-tag">
          <span className="pulse-lime" />
          <span>100% Offline Multi-Dialect Operation</span>
        </div>
      </motion.div>

      <motion.div
        className="impact-cards-stack"
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {serveItems.map(item => (
          <motion.div key={item.title} className="serve-row-card" variants={staggerItem} whileHover={{ x: 6 }}>
            <div className="serve-row-icon">{item.emoji}</div>
            <div>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

function MetricsBanner() {
  const { ref, inView } = useScrollReveal()

  return (
    <motion.div
      className="metrics-super-banner"
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {metrics.map(m => (
        <motion.div key={m.title} className="metric-block" variants={staggerItem}>
          <AnimatedCounter target={m.target} suffix={m.suffix} />
          <div className="metric-title">{m.title}</div>
          <div className="metric-caption">{m.caption}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}
