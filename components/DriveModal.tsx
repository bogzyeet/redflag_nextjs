'use client'

import { useState, useEffect, useRef } from 'react'
import { Drive, MediaItem } from '@/lib/drivesData'

interface DriveModalProps {
  drive: Drive
  onClose: () => void
}

export default function DriveModal({ drive, onClose }: DriveModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const imageRef = useRef<HTMLImageElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const currentMedia = drive.media[currentIndex]
  const isVideo = currentMedia.type === 'video'

  useEffect(() => {
    // Prevent body scroll
    document.body.style.overflow = 'hidden'
    
    // Keyboard navigation
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        navigatePrev()
      } else if (e.key === 'ArrowRight') {
        navigateNext()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex])

  useEffect(() => {
    // Play video when it's loaded
    if (isVideo && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [currentIndex, isVideo])

  const navigatePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + drive.media.length) % drive.media.length)
  }

  const navigateNext = () => {
    setCurrentIndex((prev) => (prev + 1) % drive.media.length)
  }

  return (
    <div className="drive-modal" aria-hidden="false">
      <div className="drive-modal-backdrop drive-modal-close" onClick={onClose}></div>
      <div className="drive-modal-dialog">
        <button 
          className="drive-modal-close" 
          onClick={onClose}
          aria-label="Close gallery"
        >
          &times;
        </button>
        
        <div className="drive-modal-body">
          <button 
            className="drive-nav drive-nav-prev" 
            onClick={navigatePrev}
            aria-label="Previous"
          >
            &#10094;
          </button>
          
          {isVideo ? (
            <video 
              ref={videoRef}
              id="drive-modal-video" 
              src={currentMedia.src}
              autoPlay 
              muted 
              loop 
              playsInline 
              preload="auto"
              style={{display: 'block'}}
            />
          ) : (
            <img 
              ref={imageRef}
              id="drive-modal-image" 
              src={currentMedia.src} 
              alt={`${drive.title} - ${currentIndex + 1}`}
              loading="lazy"
              style={{display: 'block'}}
            />
          )}
          
          <button 
            className="drive-nav drive-nav-next" 
            onClick={navigateNext}
            aria-label="Next"
          >
            &#10095;
          </button>
        </div>
        
        <div className="drive-modal-thumbs" id="drive-modal-thumbs">
          {drive.media.map((media, index) => (
            <div 
              key={index}
              className={`drive-thumb-modal ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            >
              <img 
                src={media.type === 'video' ? media.src : media.src} 
                alt={`Thumbnail ${index + 1}`}
                loading="lazy"
              />
              {media.type === 'video' && <div className="video-indicator">▶</div>}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

