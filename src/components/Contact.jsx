import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { useScrollReveal, staggerContainer, staggerItem } from '../hooks/useScrollReveal'
import './Contact.css'

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_ixbs7f3'
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_eeccltt'
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'beqYjb8UNRyUx0KMT'

// Google Form (linked to Google Sheet)
const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSfgQk09jjKGIUuq17T9zQ56_vqRyPb1BkfbxWaH29SSBYn3BA/formResponse'
const GOOGLE_FORM_ENTRIES = {
  name:    'entry.857864600',
  email:   'entry.920792902',
  org:     'entry.351641171',
  message: 'entry.1329008745'
}

export default function Contact({ onToast }) {
  const { ref, inView } = useScrollReveal()

  return (
    <section className="section-container bg-subtle" id="contact">
      <div className="container">
        <motion.div
          className="section-title-wrap"
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="pill-chip" variants={staggerItem}>Get in Touch</motion.div>
          <motion.h2 className="section-heading" variants={staggerItem}>Connect with Team AVERA</motion.h2>
          <motion.p className="section-subtext" variants={staggerItem}>
            Interested in pilot deployments, research partnerships, or bringing AVERA edge advisory
            nodes to your region?
          </motion.p>
        </motion.div>

        <ContactLayout onToast={onToast} />
      </div>
    </section>
  )
}

function ContactLayout({ onToast }) {
  const { ref, inView } = useScrollReveal()
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('teamaveraofficial@gmail.com').then(() => {
      setCopied(true)
      onToast('✓ Official email copied to clipboard!')
      setTimeout(() => setCopied(false), 2500)
    })
  }

  return (
    <motion.div
      className="contact-dual-layout"
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {/* Info Panel */}
      <motion.div className="contact-info-panel" variants={staggerItem}>
        <div className="contact-badge-pill">Direct Inquiries</div>
        <h3 className="contact-info-title">
          Let&apos;s build the future of offline intelligence together.
        </h3>
        <p className="contact-info-text">
          We collaborate with public health departments, health societies, universities, and
          non-profits to deliver offline voice intelligence.
        </p>

        <div className="official-email-box">
          <div className="email-details">
            <span className="email-label">Official Communication Channel</span>
            <span className="email-value" id="emailVal">teamaveraofficial@gmail.com</span>
          </div>
          <motion.button
            className={`btn-copy-email${copied ? ' copied' : ''}`}
            id="copyEmailBtn"
            aria-label="Copy official email"
            onClick={copyEmail}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
              </svg>
            )}
            <span>{copied ? 'Copied!' : 'Copy'}</span>
          </motion.button>
        </div>

        <div className="deployment-status-widget">
          <div className="deploy-status-header">
            <span className="dot-green" />
            <span>Accepting 2026–2027 Inquiries</span>
          </div>
          <p>Active deployments across rural primary health centers and community care programs.</p>
        </div>
      </motion.div>

      {/* Form Panel */}
      <motion.div className="contact-form-panel" variants={staggerItem}>
        <ContactForm onToast={onToast} />
      </motion.div>
    </motion.div>
  )
}

function ContactForm({ onToast }) {
  const [form, setForm]           = useState({ name: '', email: '', org: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)

  const handleChange = (e) => {
    const key = e.target.id.replace('contact', '').toLowerCase()
    setForm(f => ({ ...f, [key]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const templateParams = {
      from_name:    form.name,
      from_email:   form.email,
      reply_to:     form.email,
      organization: form.org || 'Not provided',
      message:      form.message,
    }

    // Google Form payload (logged directly to Google Sheet)
    const formBody = new URLSearchParams()
    formBody.append(GOOGLE_FORM_ENTRIES.name, form.name)
    formBody.append(GOOGLE_FORM_ENTRIES.email, form.email)
    formBody.append(GOOGLE_FORM_ENTRIES.org, form.org || 'Not provided')
    formBody.append(GOOGLE_FORM_ENTRIES.message, form.message)

    try {
      // 1. EmailJS notification
      const emailPromise = emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY).catch(err => {
        console.warn('EmailJS delivery warning:', err)
      })

      // 2. Google Form submission (appends row to connected Google Sheet)
      const sheetPromise = fetch(GOOGLE_FORM_ACTION_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      }).catch(err => {
        console.warn('Google Sheet submission warning:', err)
      })

      await Promise.all([emailPromise, sheetPromise])

      onToast(`✓ Message sent! We'll get back to you soon, ${form.name}.`)
      setSubmitted(true)
      setForm({ name: '', email: '', org: '', message: '' })
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err) {
      console.error('Submission error:', err)
      onToast('⚠ Something went wrong. Please email us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form id="contactForm" className="clean-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="contactName">Full Name *</label>
          <input
            type="text" id="contactName"
            placeholder="e.g. Ramesh Kumar"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="contactEmail">Email Address *</label>
          <input
            type="email" id="contactEmail"
            placeholder="name@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="contactOrg">Organization / Region</label>
        <input
          type="text" id="contactOrg"
          placeholder="e.g. Health Department / Community Care"
          value={form.org}
          onChange={handleChange}
        />
      </div>

      <div className="form-field">
        <label htmlFor="contactMessage">Inquiry / Message *</label>
        <textarea
          id="contactMessage"
          rows="4"
          placeholder="How can AVERA support your initiative or community?"
          value={form.message}
          onChange={handleChange}
          required
        />
      </div>

      <motion.button
        type="submit"
        className={`btn-submit-action${submitted ? ' submitted' : ''}`}
        disabled={submitting}
        whileHover={{ scale: submitting ? 1 : 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <span>
          {submitted ? 'Message Sent! ✓' : submitting ? 'Sending…' : 'Send Message to Team AVERA'}
        </span>
        {!submitted && !submitting && (
          <div className="btn-arrow-circle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2"/>
            </svg>
          </div>
        )}
      </motion.button>
    </form>
  )
}
