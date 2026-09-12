import { motion } from 'framer-motion'
import { useScrollReveal, staggerContainer, staggerItem } from '../hooks/useScrollReveal'
import './Impact.css'

const serveItems = [
  { emoji: '👩‍⚕️', title: 'Healthcare & ASHA Workers',    body: 'Dedicated to equipping community health officers, ANMs, and field nurses with offline clinical triage checklists and emergency protocols.' },
  { emoji: '🌾', title: 'Rural Communities',             body: 'Envisioned to empower smallholder farmers, families, and villagers with immediate voice guidance on healthcare, agriculture, and welfare.' },
  { emoji: '🏪', title: 'Small Businesses',              body: 'Designed to assist rural micro-merchants and local trade cooperatives with voice pricing, bookkeeping, and trade advisories.' },
  { emoji: '🌐', title: 'Underserved Populations',       body: 'Engineered to remove text-literacy barriers so elderly, tribal, and remote citizens can effortlessly access vital healthcare knowledge.' },
]

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
          <motion.div className="pill-chip" variants={staggerItem}>Vision &amp; Impact</motion.div>
          <motion.h2 className="section-heading" variants={staggerItem}>
            Transforming Underserved Communities
          </motion.h2>
          <motion.p className="section-subtext" variants={staggerItem}>
            Envisioned to equip frontline workers and rural populations with autonomous,
            voice-first edge guidance.
          </motion.p>
        </motion.div>

        <ImpactSplit />
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
          <span>Architected for 100% Offline Multi-Dialect Operation</span>
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

