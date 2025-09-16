'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

export default function MobileHome() {
  const [time, setTime] = useState('')
  const [displayedText, setDisplayedText] = useState('')
  const quote = "We are all visitors to this time, this place. We are just passing through. Our purpose here is to observe, to learn, to grow, to love... and then we return home."

  useEffect(() => {
    gsap.fromTo('.name-text',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power2.out' }
    )

    // Update time every minute
    const updateTime = () => {
      const now = new Date()
      const nyTime = now.toLocaleString('en-US', {
        timeZone: 'America/New_York',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
      setTime(nyTime)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)

    // Typewriter effect for quote
    const startTypewriter = () => {
      let currentIndex = 0
      const typeInterval = setInterval(() => {
        if (currentIndex <= quote.length) {
          setDisplayedText(quote.slice(0, currentIndex))
          currentIndex++
        } else {
          clearInterval(typeInterval)
        }
      }, 50)
    }

    // Start typewriter effect after a delay
    const typewriterDelay = setTimeout(startTypewriter, 3000)

    return () => {
      clearInterval(interval)
      clearTimeout(typewriterDelay)
    }
  }, [])

  return (
    <div className="name-text text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
        className="flex justify-center relative px-4 sm:px-0"
      >
        <img
          src="/View_of_Dresden_by_Moonlight.jpg"
          alt="View of Dresden by Moonlight"
          className="rounded-lg shadow-lg w-full h-auto"
          style={{ maxWidth: '90vw' }}
        />

        {/* Name overlay on top left */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          className="absolute text-left"
          style={{ top: '3%', left: '3%' }}
        >
          <div
            style={{
              color: 'white',
              fontFamily: '"Bodoni Moda", serif',
              fontWeight: 400,
              letterSpacing: '0.02em',
              lineHeight: 0.9,
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontSize: 'clamp(2rem, 6vw, 5rem)'
            }}
          >
            <div>Benjamin</div>
            <div>Hu</div>
          </div>
        </motion.div>

        {/* Quote on bottom left with typewriter effect */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 2 }}
          className="absolute text-left"
          style={{ bottom: '3%', left: '3%', maxWidth: '45%' }}
        >
          <div
            style={{
              color: 'white',
              fontFamily: '"Cinzel", serif',
              fontWeight: 400,
              letterSpacing: '0.02em',
              lineHeight: 1.5,
              textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
              fontSize: 'clamp(0.7rem, 2vw, 1.2rem)'
            }}
          >
            &ldquo;{displayedText}
            {displayedText.length < quote.length && (
              <span className="animate-pulse">|</span>
            )}&rdquo;
          </div>
        </motion.div>

        {/* Time display on bottom right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut", delay: 1.5 }}
          className="absolute text-right"
          style={{ bottom: '3%', right: '3%' }}
        >
          <div
            style={{
              color: 'white',
              fontFamily: '"Bodoni Moda", serif',
              fontWeight: 400,
              letterSpacing: '0.02em',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              fontSize: 'clamp(0.9rem, 2.5vw, 1.8rem)'
            }}
          >
            <div style={{ fontSize: '0.8em', opacity: 0.8 }}>New York</div>
            <div>{time}</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}