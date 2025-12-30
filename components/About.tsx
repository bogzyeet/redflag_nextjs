'use client'

import { useState } from 'react'

export default function About() {
  const [isJoinPanelOpen, setIsJoinPanelOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', car: '' })

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const ownerPhone = '+971585315535'
    const message = `Hi! I'd like to join Red Flag Car Club.\n\nName: ${formData.name}\nCar: ${formData.car}\n\n(I will attach a photo of my car)`
    const whatsappUrl = `https://wa.me/${ownerPhone}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      <div className="section" id="section1">
        <div className="container-fluid sections">
          <div className="row">
            <div className="col-md-4 col-sm-12 col-md-push-4 nopadding">
              <div className="all-content-wrapper">
                <div className="all-content all-content-light element-color-switch-3">
                  <div className="all-content-inner">
                    <h2 className="section-heading section-heading-all section-heading-dark about-main-heading">
                      About Red Flag Car Club
                    </h2>
                    <div className="inner-divider"></div>
                    <div className="all-txt all-txt-dark">
                      <p>
                        Founded in 2022, Red Flag was born from a shared passion for automotive excellence and the open road. 
                        We are a curated community of enthusiasts, collectors, and drivers in Dubai. We&apos;re not just about the cars; 
                        we&apos;re about the people and the experiences we create together, from exclusive drives to private networking events.
                      </p>
                      <div className="inner-divider"></div>
                      <div className="join-club-button-wrapper c-btn-about" data-id="about-more">
                        <button 
                          className="join-club-button"
                          onClick={() => setIsJoinPanelOpen(true)}
                        >
                          <span className="join-club-arrow">→</span>
                          <span className="join-club-text">Join the Club</span>
                        </button>
                      </div>
                    </div>
                    <div className="mobile-spacer"></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 col-sm-12 col-md-pull-4 nopadding wrap-teardrop">
              <div className="section-title">
                <h4 className="section-title-subheading">Who we are</h4>
                <div className="section-title-heading section-title-heading-about">About</div>
              </div>
              <div className="overlay overlay-inverse-dark-35">
                <div className="all-bg-wapper">
                  <div className="film-grain"></div>
                  <div className="horizontal-stripes-sections"></div>
                  <div className="all-bg about-bg"></div>
                </div>
              </div>
            </div>
            
            <div className="col-md-4 col-sm-12 nopadding new-about-bg">
              <div className="overlay overlay-inverse-dark-35">
                <div className="all-bg-wapper">
                  <div className="film-grain"></div>
                  <div className="horizontal-stripes-sections"></div>
                  <div className="all-bg" style={{backgroundImage:'url(\'/img/about/about_right_1.png\')',backgroundSize:'cover',backgroundPosition:'center'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Join panel overlay */}
        <div 
          className={`about-more panel-overlay-from-left-about ${isJoinPanelOpen ? 'about-more-launch' : ''}`}
          onClick={() => setIsJoinPanelOpen(false)}
        ></div>
        <div className={`about-more panel-from-right-about ${isJoinPanelOpen ? 'active' : ''}`}>
          <div className="container-fluid sections">
            <div className="row">
              <div className="all-content-wrapper">
                <div className="all-content all-content-light all-content-full-height">
                  <div className="all-content-inner">
                    <h2 className="section-subheading-details section-subheading-details-all section-subheading-details-light">
                      <span></span>
                    </h2>
                    <div className="inner-divider-ultra-half"></div>
                    <h2 className="section-heading-details section-heading-details-all section-heading-details-dark">
                      Join the Club
                    </h2>
                    <div className="inner-divider"></div>
                    <div className="all-txt all-txt-dark join-panel">
                      <p className="join-intro">
                        Add your name and car, then tap the button. WhatsApp opens so you can attach your car photo; 
                        the owner will confirm and add you to the club group.
                      </p>
                      <form onSubmit={handleJoinSubmit} className="join-form">
                        <label htmlFor="join-name">Name</label>
                        <input 
                          id="join-name" 
                          type="text" 
                          placeholder="Your name" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                        
                        <label htmlFor="join-car">Car</label>
                        <input 
                          id="join-car" 
                          type="text" 
                          placeholder="Make / Model" 
                          required
                          value={formData.car}
                          onChange={(e) => setFormData({...formData, car: e.target.value})}
                        />
                        
                        <p className="join-note">Tip: attach a clear photo of your car once WhatsApp opens.</p>
                        
                        <div className="join-buttons">
                          <button type="submit" className="the-button the-button-details join-whatsapp-button">
                            Send on WhatsApp
                          </button>
                          <button 
                            type="button" 
                            className="the-button the-button-details about-more-launch join-close-button"
                            onClick={() => setIsJoinPanelOpen(false)}
                          >
                            Close
                          </button>
                        </div>
                      </form>
                      <div className="inner-divider"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

