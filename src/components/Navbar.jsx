import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Navbar.css'

const logoSvg = '/assets/logo.svg'

const navLinks = [
  { href: '#home',      label: 'Home' },
  { href: '#about',     label: 'About' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#impact',    label: 'Impact' },
  { href: '#team',      label: 'Team' },
  { href: '#contact',   label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [active,   setActive]     = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)

      const sections = document.querySelectorAll('section[id]')
      let current = 'home'
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 140) {
          current = sec.id
        }
      })
      setActive(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = () => setMobileOpen(false)

  return (
    <header className={`navbar-wrapper${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="container nav-box">
        {/* Brand */}
        <a href="#home" className="brand-logo" aria-label="AVERA Home">
          <div className="brand-logo-frame">
            <img src={logoSvg} alt="AVERA Logo" className="brand-svg-icon" />
          </div>
          <div className="brand-text">
            <span className="brand-name">AVERA</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="nav-links-wrap" id="navMenu">
          <ul className="nav-links">
            {navLinks.map(link => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`nav-item${active === link.href.slice(1) ? ' active' : ''}`}
                  onClick={handleNavClick}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Action Area */}
        <div className="nav-action-area">
          <a href="#contact" className="btn-neon-action">
            <span>Get in Touch</span>
            <div className="btn-arrow-circle">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="7" y1="17" x2="17" y2="7"/>
                <polyline points="7 7 17 7 17 17"/>
              </svg>
            </div>
          </a>

          <button
            className={`mobile-toggle-btn${mobileOpen ? ' open' : ''}`}
            id="mobileToggle"
            aria-label="Toggle navigation menu"
            onClick={() => setMobileOpen(v => !v)}
          >
            <span/><span/><span/>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className={`mobile-nav-item${active === link.href.slice(1) ? ' active' : ''}`}
                onClick={handleNavClick}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
