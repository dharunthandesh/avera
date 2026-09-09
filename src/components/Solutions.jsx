import { motion } from 'framer-motion'
import { useScrollReveal, staggerContainer, staggerItem } from '../hooks/useScrollReveal'
import './Solutions.css'

const solutions = [
  {
    num: '01',
    title: 'Maternal & Child Health',
    desc: 'Voice-guided antenatal screening, high-risk pregnancy symptom triage, infant care protocols, and immunization reminders in regional dialects.',
    features: ['High-risk symptom recognition', 'Antenatal care checklists', 'Emergency delivery protocols'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    accent: false,
    iconClass: '',
  },
  {
    num: '02',
    title: 'First-Contact Symptom Triage',
    desc: 'Assists community healthcare workers with standardized triage checklists for acute fevers, respiratory infections, and rapid hospital referral.',
    features: ['5+ regional dialect understanding', 'Noise-filtered far-field speech', 'Instant spoken audio guidance'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="22"/>
      </svg>
    ),
    accent: true,
    iconClass: 'bg-lime-icon',
  },
  {
    num: '03',
    title: 'Field Ledgers & Emergencies',
    desc: 'Voice logging of village health surveys, emergency snakebite triage, and community welfare program guidance with zero cloud reliance.',
    features: ['Voice-driven record entries', 'Rural emergency checklists', 'Air-gapped data confidentiality'],
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
        <line x1="4" y1="22" x2="4" y2="15"/>
      </svg>
    ),
    accent: false,
    iconClass: '',
  },
]

export default function Solutions() {
  const { ref, inView } = useScrollReveal()

  return (
    <section className="section-container" id="solutions">
      <div className="container">
        <motion.div
          className="section-title-wrap"
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="pill-chip" variants={staggerItem}>Solutions</motion.div>
          <motion.h2 className="section-heading" variants={staggerItem}>
            Frontline Healthcare &amp; Rural Intelligence
          </motion.h2>
          <motion.p className="section-subtext" variants={staggerItem}>
            Tailored voice-native advisory solutions built for field workers operating in
            disconnected and resource-constrained environments.
          </motion.p>
        </motion.div>

        <SolutionCards />
      </div>
    </section>
  )
}

function SolutionCards() {
  const { ref, inView } = useScrollReveal()

  return (
    <motion.div
      className="solutions-triple-grid"
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {solutions.map(sol => (
        <motion.div
          key={sol.num}
          className={`solution-glass-box${sol.accent ? ' highlight-border' : ''}`}
          variants={staggerItem}
          whileHover={{ y: -8, boxShadow: '0 28px 60px rgba(15,23,42,0.12)' }}
        >
          <div className="sol-top-row">
            <div className={`sol-icon-badge${sol.iconClass ? ` ${sol.iconClass}` : ''}`}>
              {sol.icon}
            </div>
            <span className="sol-number">{sol.num}</span>
          </div>
          <h3 className="sol-heading">{sol.title}</h3>
          <p className="sol-description">{sol.desc}</p>
          <div className="sol-features-list">
            {sol.features.map(f => (
              <div className="sol-feat-item" key={f}>
                <span className="sol-feat-check">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
