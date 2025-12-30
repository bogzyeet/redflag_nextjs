'use client'

import { useState, useEffect, useRef } from 'react'
import { DRIVES_DATA, Drive, MediaItem } from '@/lib/drivesData'
import DriveModal from './DriveModal'

export default function RecentDrives() {
  const [selectedDrive, setSelectedDrive] = useState<Drive | null>(null)
  const sliderRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) return
    const scrollAmount = 490 // card width + gap
    sliderRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }

  useEffect(() => {
    // Lazy load cover videos
    const videos = document.querySelectorAll('.ps5-card-video')
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

    videos.forEach((video) => observer.observe(video))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <div className="section" id="section3">
        <div className="ps5-drives-wrapper">
          {/* Background Layer */}
          <div className="ps5-bg-layer overlay overlay-inverse-dark-35">
            <div className="film-grain"></div>
            <div className="horizontal-stripes-sections"></div>
            <div className="all-bg home-bg"></div>
          </div>

          {/* Content Layer */}
          <div className="ps5-content-layer">
            {/* Title */}
            <div className="ps5-title-box">
              <h4 className="ps5-subtitle">Gallery</h4>
              <h2 className="ps5-title">Recent Drives</h2>
            </div>
            
            {/* Horizontal Scroll Container */}
            <div className="ps5-slider-viewport">
              <div className="ps5-fade-left"></div>
              <div className="ps5-fade-right"></div>
              
              <button 
                className="ps5-arrow ps5-arrow-left" 
                onClick={() => scroll('left')}
                aria-label="Previous drives"
              >
                <i className="ion-chevron-left"></i>
              </button>
              <button 
                className="ps5-arrow ps5-arrow-right" 
                onClick={() => scroll('right')}
                aria-label="Next drives"
              >
                <i className="ion-chevron-right"></i>
              </button>
              
              <div className="ps5-slider-container" ref={sliderRef}>
                {DRIVES_DATA.drives.map((drive) => {
                  const isVideoCover = drive.coverImage.toLowerCase().endsWith('.mp4')
                  
                  return (
                    <div 
                      key={drive.id}
                      className="ps5-drive-card"
                      onClick={() => setSelectedDrive(drive)}
                    >
                      {isVideoCover ? (
                        <div className="ps5-card-image">
                          <video 
                            className="ps5-card-video" 
                            autoPlay 
                            muted 
                            loop 
                            playsInline 
                            preload="none"
                          >
                            <source data-src={drive.coverImage} type="video/mp4" />
                          </video>
                        </div>
                      ) : (
                        <div 
                          className="ps5-card-image" 
                          style={{backgroundImage: `url('${drive.coverImage}')`}}
                        ></div>
                      )}
                      
                      <div className="ps5-card-info">
                        <div>
                          <h3 className="ps5-card-title">{drive.title}</h3>
                          <div className="ps5-card-meta">
                            <div className="ps5-meta-item">
                              <i className="ion-calendar"></i>
                              <span>{drive.date}</span>
                            </div>
                            <div className="ps5-meta-item">
                              <i className="ion-images"></i>
                              <span>{drive.media.length} items</span>
                            </div>
                          </div>
                        </div>
                        <button 
                          className="ps5-card-btn open-gallery"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedDrive(drive)
                          }}
                        >
                          View Gallery
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedDrive && (
        <DriveModal 
          drive={selectedDrive}
          onClose={() => setSelectedDrive(null)}
        />
      )}
    </>
  )
}

