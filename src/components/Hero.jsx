import { useState } from 'react'
import { motion } from 'framer-motion'
import Hero360Viewer from './Hero360Viewer'
import './Hero.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

const featCards = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" y1="19" x2="12" y2="22"/>
      </svg>
    ),
    bg: 'bg-gold',
    title: 'Ask in your language',
    sub: 'Supports regional languages',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    bg: 'bg-green',
    title: 'Get trusted guidance',
    sub: 'Evidence-based, clinical-grade',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    bg: 'bg-pink',
    title: 'Support maternal health',
    sub: 'From pregnancy to postnatal',
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    bg: 'bg-sky-icon',
    title: 'Triage symptoms easily',
    sub: 'Faster, safer decisions',
  },
]

const stats = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      </svg>
    ),
    num: '1M+',
    label: 'Frontline Workers',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e03a3a" strokeWidth="2">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
    num: '10M+',
    label: 'Lives We Aim to Impact',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    num: 'Rural First',
    label: 'Designed for Real India',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ccff00" strokeWidth="2" style={{ filter: 'drop-shadow(0 0 4px #aadd00)' }}>
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/>
        <line x1="4" y1="22" x2="4" y2="15"/>
      </svg>
    ),
    num: 'Equitable',
    label: 'Healthcare Anywhere, Anytime',
  },
]

export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="container hero-container">

        {/* LEFT COLUMN */}
        <div className="hero-left-col">

          <motion.div className="hero-tagline-wrap" {...fadeUp(0.1)}>
            <div className="hero-tag-pill">
              <span className="pill-text">Autonomous Voice-Enabled Edge Rural Advisor</span>
            </div>
  
          </motion.div>

          <motion.h1 className="hero-headline" {...fadeUp(0.2)}>
            CLINICAL-GRADE AI<br />
            IN THE HANDS<br />
            <span className="headline-of">OF EVERY</span><br />
            <span className="headline-highlight">ASHA WORKER.</span>
          </motion.h1>

          <motion.p className="hero-description" {...fadeUp(0.3)}>
            Empowering <strong>frontline</strong> ASHA and ANM healthcare workers
            with <strong>voice-native, offline</strong> clinical intelligence, maternal health
            support, and symptom triage — without internet dependency.
          </motion.p>

          <motion.div className="hero-cta-group" {...fadeUp(0.4)}>
            <a href="#contact" className="btn-hero-primary">
              <span className="mic-icon-circle">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </span>
              <span>Partner with Us →</span>
            </a>
            <a href="#about" className="btn-hero-secondary">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="5,3 19,12 5,21"/>
              </svg>
              <span>Watch Our Story →</span>
            </a>
          </motion.div>

          <motion.div className="hero-trust-strip" {...fadeUp(0.5)}>
            {[
              { label: 'Works Offline', color: 'currentColor', path: <path d="M1 6s4-2 11-2 11 2 11 2v14s-4-2-11-2S1 20 1 20z"/> },
              { label: 'Privacy First',  color: 'currentColor', path: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/> },
              { label: 'Built for Frontline', color: 'currentColor', path: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></> },
              { label: 'Better Health for All', color: '#e03a3a', path: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/> },
            ].map(({ label, color, path }) => (
              <div className="trust-item" key={label}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
                  {path}
                </svg>
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="hero-right-col">
          <motion.div
            className="hero-visual-canvas"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Hero360Viewer />
          </motion.div>

          {/* Feature Cards — 2×2 grid below image */}
          <div className="hero-feature-cards">
            {featCards.map((card, i) => (
              <motion.div
                key={card.title}
                className="feat-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -3, boxShadow: '0 16px 32px rgba(15,23,42,0.1)' }}
              >
                <div className={`feat-card-icon ${card.bg}`}>{card.icon}</div>
                <div className="feat-card-text">
                  <span className="feat-card-title">{card.title}</span>
                  <span className="feat-card-sub">{card.sub}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>

      {/* Stats Strip */}
      <motion.div
        className="container"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7 }}
      >
        <div className="hero-stats-strip">
          {stats.map((s, i) => (
            <div key={s.num} style={{ display: 'contents' }}>
              {i > 0 && <div className="stat-strip-divider" />}
              <div className="stat-strip-item">
                <div className="stat-icon-wrap">{s.icon}</div>
                <div>
                  <span className="strip-num">{s.num}</span>
                  <span className="strip-text">{s.label}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
