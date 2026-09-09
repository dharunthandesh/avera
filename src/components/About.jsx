import { motion } from 'framer-motion'
import { useScrollReveal, staggerContainer, staggerItem } from '../hooks/useScrollReveal'
import './About.css'

export default function About() {
  const { ref, inView } = useScrollReveal()

  return (
    <section className="section-container bg-subtle" id="about">
      <div className="container">
        <motion.div
          className="section-title-wrap"
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="pill-chip" variants={staggerItem}>About Us</motion.div>
          <motion.h2 className="section-heading" variants={staggerItem}>
            Reinventing Rural Knowledge Access
          </motion.h2>
          <motion.p className="section-subtext" variants={staggerItem}>
            Over 3.4 billion people worldwide live in areas where connectivity is fragile,
            and standard text-based portals fail because of language and literacy barriers.
            AVERA bridges this gap.
          </motion.p>
        </motion.div>

        <AboutCards />
        <MissionVision />
      </div>
    </section>
  )
}

function AboutCards() {
  const { ref, inView } = useScrollReveal()

  return (
    <motion.div
      className="about-cards-grid"
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {/* Who We Are */}
      <motion.div className="feature-glass-card" variants={staggerItem} whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(15,23,42,0.1)' }}>
        <div className="card-pill-header">
          <div className="card-icon-pill bg-lime">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <span className="card-tag">Identity</span>
        </div>
        <h3 className="card-title">Who We Are</h3>
        <p className="card-desc">
          <strong>AVERA</strong> (Autonomous Voice-Enabled Edge Rural Advisor) is a deep-tech initiative
          built by engineers and innovators dedicated to rural empowerment. We build localized,
          hardware-integrated AI advisors capable of understanding complex rural accents, dialects,
          and technical domains in real-time.
        </p>
      </motion.div>

      {/* Why We Exist */}
      <motion.div className="feature-glass-card" variants={staggerItem} whileHover={{ y: -6, boxShadow: '0 24px 48px rgba(15,23,42,0.1)' }}>
        <div className="card-pill-header">
          <div className="card-icon-pill bg-sky">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <span className="card-tag">Purpose</span>
        </div>
        <h3 className="card-title">Why We Exist</h3>
        <p className="card-desc">
          Over 3.4 billion people globally reside in rural areas where stable internet connectivity
          is unreliable, and traditional text-based digital services fail due to language and literacy
          barriers. AVERA exists to ensure that geography and connectivity never restrict access to
          essential knowledge.
        </p>
      </motion.div>
    </motion.div>
  )
}

function MissionVision() {
  const { ref, inView } = useScrollReveal()

  return (
    <motion.div
      className="mission-vision-wrapper"
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="mv-split-card">
        <div className="mv-col">
          <div className="mv-head">
            <div className="mv-bullet">01</div>
            <h4>Our Mission</h4>
          </div>
          <p>
            To democratize actionable advisory intelligence by deploying zero-latency, voice-native
            AI engines on low-power edge hardware—enabling non-literate and remote populations to
            speak, learn, and prosper in their native dialect.
          </p>
        </div>
        <div className="mv-divider" />
        <div className="mv-col">
          <div className="mv-head">
            <div className="mv-bullet highlight-lime">02</div>
            <h4>Our Vision</h4>
          </div>
          <p>
            A resilient world where every rural farmer, healthcare practitioner, and small business
            owner holds an intelligent, voice-powered advisor in their hands—unrestricted by
            connectivity loss, language barriers, or infrastructure gaps.
          </p>
        </div>
      </div>
    </motion.div>
  )
}
