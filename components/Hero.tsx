'use client'

import { useEffect, useRef } from 'react'

export default function Hero() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    // Lazy load Vimeo iframe after initial render
    const timer = setTimeout(() => {
      if (iframeRef.current) {
        const src = iframeRef.current.getAttribute('data-src')
        if (src) {
          iframeRef.current.src = src
        }
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="section overlay-video overlay-dark-60 upper-page" id="section0">
      {/* Film grain effect */}
      <div className="film-grain"></div>
      
      {/* Horizontal stripes */}
      <div className="horizontal-stripes"></div>
      
      {/* Hero background */}
      <div className="hero-fullscreen">
        <div className="hero-fullscreen-FIX">
          <div id="vimeo-videoContainment">
            <iframe 
              ref={iframeRef}
              data-fullscreeneo="" 
              data-src="https://player.vimeo.com/video/1129847007?autoplay=1&background=1&hd=1&loop=1"
              loading="lazy" 
              title="Red Flag Background Video"
            />
          </div>
          <div className="vimeo-bg"></div>
        </div>
      </div>
      
      {/* Intro wrapper */}
      <div className="intro-wrapper fadeIn-element welcome-message">
        <div className="center-container-home">
          <div className="center-block-home">
            <div className="intro-subtitle">
              <span>Drive. Meet. Connect.</span>
            </div>
            <div className="inner-divider-half"></div>
            <div className="intro-title">Red Flag</div>
          </div>
        </div>
      </div>
      
      {/* Bottom credits */}
      <div className="bottom-credits fadeIn-element">
        <a className="link-underline" href="#">RedFlag</a> &copy; 2025 All Rights Reserved.
      </div>
      
      {/* Social icons launcher */}
      <div className="social-icons-launcher ion-share fadeIn-element"></div>
      
      {/* Social icons */}
      <div className="social-icons-wrapper social-icons-wrapper-reveal">
        <h2 className="social-icons-wrapper-heading">We are social</h2>
        <ul className="social-icons">               
          <li className="social-icon">
            <a 
              className="ion-social-instagram" 
              href="https://www.instagram.com/redflag.dxb"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
            ></a>
          </li>
        </ul>
      </div>
      
      {/* Scroll indicator */}
      <div className="scroll-indicator-wrapper fadeIn-element">
        <div className="scroll-indicator"></div>
      </div>
    </div>
  )
}

