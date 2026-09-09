import './App.css'
import Navbar  from './components/Navbar'
import Hero    from './components/Hero'
import About   from './components/About'
import Solutions from './components/Solutions'
import Impact  from './components/Impact'
import Team    from './components/Team'
import Contact from './components/Contact'
import Footer  from './components/Footer'
import { ToastShelf, useToast } from './components/Toast'

export default function App() {
  const { toasts, addToast } = useToast()

  return (
    <>
      {/* Ambient Background */}
      <div className="sky-ambient-bg" aria-hidden="true">
        <div className="cloud-orb orb-1" />
        <div className="cloud-orb orb-2" />
        <div className="cloud-orb orb-3" />
        <div className="grid-overlay" />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <Solutions />
        <Impact />
        <Team />
        <Contact onToast={addToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <ToastShelf toasts={toasts} />
    </>
  )
}
