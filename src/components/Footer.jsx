import './Footer.css'

const logoSvg = '/assets/logo.svg'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer-wrap">
      <div className="container">
        <div className="footer-main-grid">

          <div className="footer-brand-col">
            <a href="#home" className="brand-logo footer-logo">
              <div className="brand-logo-frame">
                <img src={logoSvg} alt="AVERA Logo" className="brand-svg-icon" />
              </div>
              <div className="brand-text">
                <span className="brand-name">AVERA</span>
              </div>
            </a>
            <p className="footer-tagline">
              Autonomous Voice-Enabled Edge Rural Advisor.<br />
              Empowering rural communities with zero-latency, offline voice intelligence.
            </p>
            <div className="footer-contact-pill">
              <span className="dot-lime" />
              <span>teamaveraofficial@gmail.com</span>
            </div>
          </div>

          <div className="footer-nav-col">
            <h4>Navigation</h4>
            <ul>
              {['Home', 'About Us', 'Solutions', 'Field Impact', 'Founding Team', 'Contact'].map((item, i) => {
                const hrefs = ['#home', '#about', '#solutions', '#impact', '#team', '#contact']
                return <li key={item}><a href={hrefs[i]}>{item}</a></li>
              })}
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4>Who We Serve</h4>
            <ul>
              <li><a href="#impact">👩‍⚕️ Healthcare Workers</a></li>
              <li><a href="#impact">🌾 Rural Communities</a></li>
              <li><a href="#impact">🏪 Small Businesses</a></li>
              <li><a href="#impact">🌐 Low-Literacy Citizens</a></li>
            </ul>
          </div>

          <div className="footer-nav-col">
            <h4>Capabilities</h4>
            <ul>
              <li><a href="#solutions">Offline Edge ASR</a></li>
              <li><a href="#solutions">Multi-Dialect NLU</a></li>
              <li><a href="#solutions">Knowledge Graphs</a></li>
              <li><a href="#solutions">Low-Power Microchip</a></li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom-bar">
          <div className="footer-copy">
            © {year} AVERA (Autonomous Voice-Enabled Edge Rural Advisor). All Rights Reserved.
          </div>
          <div className="footer-email-ref">
            Official Inquiries: <a href="mailto:teamaveraofficial@gmail.com">teamaveraofficial@gmail.com</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
