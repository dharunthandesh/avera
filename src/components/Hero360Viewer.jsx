import { useState, useEffect, useRef, useCallback } from 'react'
import './Hero360Viewer.css'

const TOTAL_FRAMES = 14

export default function Hero360Viewer() {
  const [currentFrame, setCurrentFrame] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isAutoRotating, setIsAutoRotating] = useState(true)

  const dragStartX = useRef(0)
  const dragStartFrame = useRef(0)
  const autoRotateTimer = useRef(null)
  const resumeTimer = useRef(null)
  const containerRef = useRef(null)
  const imagesRef = useRef([])

  // Preload all 14 frames into memory
  useEffect(() => {
    imagesRef.current = []

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = `/assets/device-360/frame_${String(i).padStart(2, '0')}.webp`
      img.onerror = () => {
        img.src = `/assets/device-360/frame_${String(i).padStart(2, '0')}.png`
      }
      imagesRef.current.push(img)
    }
  }, [])

  // Auto-rotation loop
  useEffect(() => {
    if (!isAutoRotating || isDragging) return

    autoRotateTimer.current = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % TOTAL_FRAMES)
    }, 450)

    return () => clearInterval(autoRotateTimer.current)
  }, [isAutoRotating, isDragging])

  // Pause on user interaction, resume after 3.5s
  const pauseAutoRotateTemp = useCallback(() => {
    setIsAutoRotating(false)
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => {
      setIsAutoRotating(true)
    }, 3500)
  }, [])

  // Pointer drag handlers
  const handlePointerDown = (e) => {
    setIsDragging(true)
    setIsAutoRotating(false)
    dragStartX.current = e.clientX || (e.touches && e.touches[0].clientX) || 0
    dragStartFrame.current = currentFrame
    if (containerRef.current) {
      containerRef.current.setPointerCapture?.(e.pointerId)
    }
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const deltaX = clientX - dragStartX.current
    
    // 16 pixels per frame step
    const stepDiff = Math.floor(deltaX / 16)
    let nextFrame = (dragStartFrame.current - stepDiff) % TOTAL_FRAMES
    if (nextFrame < 0) nextFrame += TOTAL_FRAMES
    setCurrentFrame(nextFrame)
  }

  const handlePointerUp = (e) => {
    if (!isDragging) return
    setIsDragging(false)
    if (containerRef.current) {
      containerRef.current.releasePointerCapture?.(e.pointerId)
    }
    pauseAutoRotateTemp()
  }

  const currentDeg = Math.round((currentFrame / TOTAL_FRAMES) * 360)

  return (
    <div className="hero-360-container" ref={containerRef}>
      {/* Top Floating Badge Bar */}
      <div className="hero-360-header">
        <div className="hero-360-badge">
          <span className="live-dot" />
          <span>360° HARDWARE VIEW</span>
        </div>
        <div className="hero-360-deg-pill">
          <span>{currentDeg}°</span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div
        className={`hero-360-viewport ${isDragging ? 'is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onMouseEnter={() => setIsAutoRotating(false)}
        onMouseLeave={() => !isDragging && pauseAutoRotateTemp()}
        role="region"
        aria-label="Interactive 360 degree turntable of AVERA Handheld Device. Drag to rotate."
      >
        {/* Ambient Radial Background Glow */}
        <div className="hero-360-stage-glow" />

        {/* Device Image Stage */}
        <div className="hero-360-img-stage">
          <img
            src={`/assets/device-360/frame_${String(currentFrame).padStart(2, '0')}.webp`}
            alt={`AVERA Handheld AI Clinical Assistant - Angle ${currentDeg} degrees`}
            className="hero-360-img"
            draggable="false"
          />
          {/* Subtle contact shadow under device */}
          <div className="hero-360-contact-shadow" />
        </div>

        {/* Floating Hint Overlay */}
        <div className={`hero-360-drag-hint ${isDragging ? 'fade-out' : ''}`}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M7 16l-4-4 4-4m10 8l4-4-4-4M3 12h18" />
          </svg>
          <span>Drag to Rotate 360°</span>
        </div>

        {/* Play/Pause Float Button */}
        <button
          type="button"
          className="hero-360-play-btn"
          onClick={(e) => {
            e.stopPropagation()
            setIsAutoRotating((prev) => !prev)
          }}
          aria-label={isAutoRotating ? 'Pause auto-rotation' : 'Play auto-rotation'}
          title={isAutoRotating ? 'Pause 360° spin' : 'Resume 360° spin'}
        >
          {isAutoRotating ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          )}
        </button>
      </div>

      {/* Rotation Scrubber Slider */}
      <div className="hero-360-scrubber-wrap">
        <input
          type="range"
          min="0"
          max={TOTAL_FRAMES - 1}
          value={currentFrame}
          onChange={(e) => {
            setCurrentFrame(Number(e.target.value))
            pauseAutoRotateTemp()
          }}
          className="hero-360-slider"
          aria-label="Rotate device angle slider"
        />
      </div>
    </div>
  )
}
