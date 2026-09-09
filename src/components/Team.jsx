import { motion } from 'framer-motion'
import { useScrollReveal, staggerContainer, staggerItem } from '../hooks/useScrollReveal'
import './Team.css'

const members = [
  { photo: '/assets/team/dharun-thandesh.jpeg', name: 'Dharun Thandesh',  linkedin: 'https://www.linkedin.com/in/dharun-thandesh-429ab9375/', email: 'dharunthandesh4@gmail.com' },
  { photo: '/assets/team/jagadish-s.png',       name: 'Jagadish S',       linkedin: 'https://www.linkedin.com/in/jagadish-soundararajan-898a88381/', email: 'jagadishsoundar07@gmail.com' },
  { photo: '/assets/team/dharan-js.png',        name: 'Dharan J S',       linkedin: 'https://www.linkedin.com/in/dharan-j-s-03888637b/', email: 'dharanjs07@gmail.com' },
  { photo: '/assets/team/jai-harini-p.png',     name: 'Jai Harini P',     linkedin: 'https://www.linkedin.com/in/jai-harini-p-404357381/', email: 'jaiharini2006@gmail.com' },
  { photo: '/assets/team/kishor-kumar-s.png',   name: 'Kishor Kumar S',   linkedin: 'https://www.linkedin.com/in/kishor-kumar-232079328/', email: 'kishor80720@gmail.com' },
  { photo: '/assets/team/devaprasath-g.png',    name: 'Devaprasath G',    linkedin: 'https://www.linkedin.com/in/devaprasath-g-ai/', email: 'devaganesan22@gmail.com' },
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
      {members.map((m) => (
        <motion.div
          key={m.name}
          className="team-member-card"
          variants={staggerItem}
        >
          {/* Circle photo — left */}
          <div className="member-photo-wrap">
            <img src={m.photo} alt={m.name} className="member-photo" />
          </div>

          {/* Name + socials — right */}
          <div className="member-info">
            <h3 className="member-name">{m.name}</h3>
            <div className="member-socials">
              <a
                href={m.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link social-link-in"
                aria-label={`${m.name} LinkedIn`}
              >
                in
              </a>
              <a
                href={`mailto:${m.email}`}
                className="social-link social-link-mail"
                aria-label={`Email ${m.name}`}
              >
                ✉
              </a>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
