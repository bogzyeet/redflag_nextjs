'use client'

import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <a className="logo logo-light">
        <div className="logo-img fadeIn-element"></div>
      </a>
      
      <div className="menu-trigger navigation-icon fadeIn-element" id="menu-mobile-btn">
        <button 
          className={`lines-button minus menu-toggle ${isMenuOpen ? 'open' : ''}`} 
          id="menu-mobile-caller" 
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className="lines inverse"></span>
        </button>
      </div>
      
      <div id="ui-layer">
        <div id="menu-wrapper" className={isMenuOpen ? 'open' : ''}>
          <div id="menu-mobile">
            <div className="menu-nav-wrapper">
              <nav className="menu-nav">
                <ul>
                  <li>
                    <a className="menu-state active" href="#home" onClick={() => setIsMenuOpen(false)}>
                      Home
                    </a>
                  </li>
                  <li>
                    <a className="menu-state" href="#about" onClick={() => setIsMenuOpen(false)}>
                      About
                    </a>
                  </li>
                  <li>
                    <a className="menu-state" href="#services" onClick={() => setIsMenuOpen(false)}>
                      Gallery
                    </a>
                  </li>
                  <li>
                    <a className="menu-state" href="#works" onClick={() => setIsMenuOpen(false)}>
                      Recent Drives
                    </a>
                  </li>
                  <li>
                    <a className="menu-state" href="#contact" onClick={() => setIsMenuOpen(false)}>
                      Contact
                    </a>
                  </li>
                  <li className="credits">
                    <a href="#">&copy; 2025 All Rights Reserved.</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

