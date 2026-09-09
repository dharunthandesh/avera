import { motion } from 'framer-motion'
import { useScrollReveal, staggerContainer, staggerItem } from '../hooks/useScrollReveal'
import './Team.css'

const members = [
  { initials: 'DT', name: 'Dharun Thandesh',  role: 'Product Architecture & Edge Integration',    bio: 'Leading overall system architecture and hardware-software integration for AVERA edge advisory nodes.',    linkedin: 'https://www.linkedin.com/in/dharun-thandesh-429ab9375/', email: 'dharunthandesh4@gmail.com' },
  { initials: 'JS', name: 'Jagadish S',        role: 'Speech NLP & Multilingual Synthesis',         bio: 'Spearheading core natural language processing, regional speech recognition models, and multi-dialect synthesis.',   linkedin: 'https://www.linkedin.com/in/jagadish-soundararajan-898a88381/', email: 'jagadishsoundar07@gmail.com' },
  { initials: 'DJ', name: 'Dharan J S',        role: 'Embedded Systems & Hardware',                 bio: 'Driving embedded systems engineering, low-power micro-architecture, and ruggedized field deployment logistics.',    linkedin: 'https://www.linkedin.com/in/dharan-j-s-03888637b/', email: 'dharanjs07@gmail.com' },
  { initials: 'JH', name: 'Jai Harini P',      role: 'Knowledge Graphs & Domain Ontologies',        bio: 'Focusing on domain knowledge graph modeling for agricultural extension protocols and clinical health triage.',      linkedin: 'https://www.linkedin.com/in/jai-harini-p-404357381/', email: 'jaiharini2006@gmail.com' },
  { initials: 'KK', name: 'Kishor Kumar S',    role: 'Partnerships & Outreach',                     bio: 'Managing strategic institutional partnerships, pilot deployments, NGO relations, and community outreach.',          linkedin: 'https://www.linkedin.com/in/kishor-kumar-232079328/', email: 'kishor80720@gmail.com' },
  { initials: 'DG', name: 'Devaprasath G',     role: 'System Reliability & Telemetry',              bio: 'Overseeing edge system reliability, data integrity, field telemetry analytics, and continuous model improvement.', linkedin: 'https://www.linkedin.com/in/devaprasath-g-ai/', email: 'devaganesan22@gmail.com' },
]

const avatarColors = [
  'linear-gradient(135deg, #e5a950, #d97706)',
  'linear-gradient(135deg, #0ea5e9, #0284c7)',
  'linear-gradient(135deg, #10b981, #059669)',
  'linear-gradient(135deg, #a855f7, #7c3aed)',
  'linear-gradient(135deg, #ccff00, #b8e600)',
  'linear-gradient(135deg, #f97316, #ea580c)',
]

export default function Team() {
  const { ref, inView } = useScrollReveal()

  return (
    <section className="section-container" id="team">
      <div className="container">
        <motion.div
          className="section-title-wrap"
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div className="pill-chip" variants={staggerItem}>Our Team</motion.div>
          <motion.h2 className="section-heading" variants={staggerItem}>Meet Our Founding Team</motion.h2>
          <motion.p className="section-subtext" variants={staggerItem}>
            A passionate group of co-founders united by a singular vision: bringing frontier voice AI
            to every corner of the earth.
          </motion.p>
        </motion.div>

        <TeamGrid />
      </div>
    </section>
  )
}

function TeamGrid() {
  const { ref, inView } = useScrollReveal()

  return (
    <motion.div
      className="team-cards-grid"
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
    >
      {members.map((m, i) => (
        <motion.div
          key={m.name}
          className="team-member-card"
          variants={staggerItem}
          whileHover={{ y: -8, boxShadow: '0 28px 56px rgba(15,23,42,0.12)' }}
        >
          <div className="member-top">
            <div
              className="member-avatar-pill"
              style={{ background: avatarColors[i % avatarColors.length], color: i === 4 ? '#090d16' : '#fff' }}
            >
              {m.initials}
            </div>
            <div className="member-badge">Co-Founder</div>
          </div>
          <h3 className="member-name">{m.name}</h3>
          <div className="member-socials">
            <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn" aria-label="LinkedIn profile">in</a>
            <a href={`mailto:${m.email}`} className="social-link" title="Email" aria-label={`Email ${m.name}`}>✉</a>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
