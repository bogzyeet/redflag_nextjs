'use client'

import { useEffect } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Gallery from '@/components/Gallery'
import RecentDrives from '@/components/RecentDrives'
import Contact from '@/components/Contact'
import Navigation from '@/components/Navigation'
import Preloader from '@/components/Preloader'

export default function Home() {
  useEffect(() => {
    // Import fullpage.js dynamically to avoid SSR issues
    const loadFullPage = async () => {
      if (typeof window !== 'undefined') {
        const fullpage = await import('fullpage.js')
        // @ts-ignore
        new fullpage.default('#fullpage', {
          licenseKey: 'gplv3-license',
          anchors: ['home', 'about', 'services', 'works', 'contact'],
          menu: '#menu-mobile',
          scrollingSpeed: 700,
          autoScrolling: true,
          fitToSection: true,
          fitToSectionDelay: 1000,
          scrollBar: false,
          easing: 'easeInOutCubic',
          easingcss3: 'ease',
          loopBottom: false,
          loopTop: false,
          loopHorizontal: true,
          continuousVertical: false,
          continuousHorizontal: false,
          scrollHorizontally: false,
          interlockedSlides: false,
          dragAndMove: false,
          offsetSections: false,
          resetSliders: false,
          fadingEffect: false,
          normalScrollElements: '.drive-modal, .about-more, .services-more-1, .services-more-2',
          scrollOverflow: true,
          scrollOverflowReset: false,
          scrollOverflowOptions: null,
          touchSensitivity: 15,
          normalScrollElementTouchThreshold: 5,
          bigSectionsDestination: null,
          keyboardScrolling: true,
          animateAnchor: true,
          recordHistory: true,
          controlArrows: true,
          verticalCentered: true,
          sectionsColor: [],
          paddingTop: 0,
          paddingBottom: 0,
          fixedElements: '#menu-wrapper, .logo, .menu-trigger, .navigation-icon, .social-icons-wrapper, .bottom-credits',
          responsive: 0,
          responsiveWidth: 0,
          responsiveHeight: 0,
          responsiveSlides: false,
          parallax: false,
          parallaxOptions: {
            type: 'reveal',
            percentage: 62,
            property: 'translate'
          },
          cards: false,
          cardsOptions: {
            perspective: 100,
            fadeContent: true,
            fadeBackground: true
          },
          sectionSelector: '.section',
          slideSelector: '.slide',
          lazyLoading: true,
        })
      }
    }

    const timer = setTimeout(loadFullPage, 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <Preloader />
      <Navigation />
      <div id="fullpage">
        <Hero />
        <About />
        <Gallery />
        <RecentDrives />
        <Contact />
      </div>
    </>
  )
}

