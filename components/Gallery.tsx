'use client'

import { useEffect, useRef } from 'react'

export default function Gallery() {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    // Lazy load videos when they come into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target as HTMLVideoElement
            const source = video.querySelector('source')
            if (source && source.dataset.src) {
              source.src = source.dataset.src
              video.load()
              video.play().catch(() => {})
              observer.unobserve(video)
            }
          }
        })
      },
      { rootMargin: '50px' }
    )

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="section" id="section2">
      <div className="container-fluid sections">
        <div className="row">
          <div className="col-md-4 col-sm-12 nopadding element-color-switch-1">
            <div className="all-content-wrapper">
              <div className="all-content">
                <div className="all-content-inner">
                  <h2 className="section-subheading section-subheading-all section-subheading-light">
                    <span></span>
                  </h2>
                  <div className="inner-divider-half"></div>
                  <h2 className="section-heading section-heading-all section-heading-light">
                    Our Drives
                  </h2>
                  <div className="inner-divider"></div>
                  <div className="all-txt">
                    <p>
                      We plan and execute unforgettable driving experiences. From spirited morning sprints on mountain roads 
                      to relaxed coastal cruises, every route is meticulously scouted for maximum enjoyment and safety.
                    </p>
                    <div className="inner-divider"></div>
                  </div>
                  <div className="mobile-spacer"></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 col-sm-12 nopadding">
            <div className="section-title section-title-center">
              <h4 className="section-title-subheading section-title-subheading-services">
                What we do
              </h4>
              <div className="section-title-heading section-title-heading-services">
                Gallery
              </div>
            </div>
            
            <div className="slick-services overlay overlay-inverse-dark-35">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="all-bg-wapper">
                  <div className="film-grain"></div>
                  <div className="horizontal-stripes-sections"></div>
                  <div className={`all-bg services-bg services-bg-${i}`}>
                    <video 
                      ref={(el) => { videoRefs.current[i-1] = el }}
                      autoPlay 
                      muted 
                      playsInline 
                      loop 
                      className="services-video" 
                      preload="none"
                    >
                      <source data-src={`/img/services/vid${i}.mp4`} type="video/mp4" />
                    </video>
                  </div>
                </div>
              ))}
              <div className="all-bg-wapper">
                <div className="film-grain"></div>
                <div className="horizontal-stripes-sections"></div>
                <div className="all-bg services-bg services-bg-7"></div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 col-sm-12 nopadding element-color-switch-2">
            <div className="all-content-wrapper">
              <div className="all-content all-content-light">
                <div className="all-content-inner">
                  <h2 className="section-subheading section-subheading-all section-subheading-light">
                    <span></span>
                  </h2>
                  <div className="inner-divider-half"></div>
                  <h2 className="section-heading section-heading-all section-heading-dark">
                    Upcoming Events
                  </h2>
                  <div className="inner-divider"></div>
                  <div className="all-txt all-txt-dark">
                    <ul className="upcoming-events-list">
                      <li className="upcoming-event-item">
                        <div className="event-date">Nov 1st, 2025</div>
                        <div className="event-title">Car Meetup & Drive</div>
                        <div className="event-location">
                          <a href="https://maps.app.goo.gl/Nqe8gho4GLf7Gq2g7" target="_blank" rel="noopener noreferrer">
                            [ Location Link ]
                          </a>
                        </div>
                      </li>
                      <li className="upcoming-event-item">
                        <div className="event-date">Nov 22, 2025</div>
                        <div className="event-title">Private Meetup & Networking</div>
                        <div className="event-location">Dubai Marina</div>
                      </li>
                      <li className="upcoming-event-item">
                        <div className="event-date">Dec 01, 2025</div>
                        <div className="event-title">Desert Rally Experience</div>
                        <div className="event-location">Al Qudra Desert</div>
                      </li>
                    </ul>
                    <div className="inner-divider"></div>
                  </div>
                  <div className="mobile-spacer"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

