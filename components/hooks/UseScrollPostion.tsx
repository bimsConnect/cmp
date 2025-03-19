"use client"

import { useState, useEffect } from 'react'

export function useScrollPosition() {
  const [isInHeroSection, setIsInHeroSection] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.querySelector('section')
      if (heroSection) {
        const heroBottom = heroSection.getBoundingClientRect().bottom
        setIsInHeroSection(heroBottom > 0)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return isInHeroSection
}