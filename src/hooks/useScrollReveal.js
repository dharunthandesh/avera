import { useRef } from 'react'
import { useInView } from 'framer-motion'

/**
 * Returns { ref, inView } where inView becomes true once
 * the element scrolls into the viewport (fires only once).
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px', ...options })
  return { ref, inView }
}

/** Standard fade-up variants for motion components */
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
  }),
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
}

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
}
