'use client'

import { useEffect } from 'react'

export default function Contact() {
  useEffect(() => {
    // Defer Instagram embed script loading
    const timer = setTimeout(() => {
      const script = document.createElement('script')
      script.src = 'https://www.instagram.com/embed.js'
      script.async = true
      document.body.appendChild(script)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="section" id="section4">
      <div className="container-fluid sections">
        <div className="row">
          <div className="col-md-4 col-sm-12 col-md-push-4 nopadding element-color-switch-3">
            <div className="all-content-wrapper all-content-wrapper-contact">
              <div className="all-content all-content-light">
                <div className="all-content-inner">
                  <h2 className="section-subheading section-subheading-all section-subheading-light">
                    <span>Join The Club</span>  
                  </h2>
                  <div className="inner-divider-half"></div>
                  <h2 className="section-heading section-heading-all section-heading-dark">
                    Follow Us
                  </h2>
                  <div className="inner-divider"></div>
                  
                  <div className="instagram-embed-wrapper">
                    <blockquote 
                      className="instagram-media" 
                      data-instgrm-permalink="https://www.instagram.com/redflag.dxb" 
                      data-instgrm-version="12" 
                      style={{
                        background: '#FFF',
                        border: 0,
                        borderRadius: '3px',
                        boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                        margin: '1px',
                        maxWidth: 'min(540px, 100%)',
                        minWidth: '150px',
                        padding: 0,
                        width: '99.375%'
                      }}
                    >
                      <div style={{padding:'16px'}}>
                        <a 
                          id="main_link" 
                          href="https://www.instagram.com/redflag.dxb" 
                          style={{
                            background: '#FFF',
                            lineHeight: 0,
                            padding: 0,
                            textAlign: 'center',
                            textDecoration: 'none',
                            width: '100%'
                          }} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                            <div style={{backgroundColor:'#F4F4F4',borderRadius:'50%',flexGrow:0,height:'40px',marginRight:'14px',width:'40px'}}></div>
                            <div style={{display:'flex',flexDirection:'column',flexGrow:1,justifyContent:'center'}}>
                              <div style={{backgroundColor:'#F4F4F4',borderRadius:'4px',flexGrow:0,height:'14px',marginBottom:'6px',width:'100px'}}></div>
                              <div style={{backgroundColor:'#F4F4F4',borderRadius:'4px',flexGrow:0,height:'14px',width:'60px'}}></div>
                            </div>
                          </div>
                          <div style={{padding:'50px 0'}}></div>
                          <div style={{paddingTop:'8px'}}>
                            <div style={{color:'#3897f0',fontFamily:'Arial,sans-serif',fontSize:'14px',fontStyle:'normal',fontWeight:550,lineHeight:'18px'}}>
                              View this post on Instagram
                            </div>
                          </div>
                        </a>
                      </div>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 col-sm-12 col-md-pull-4 nopadding wrap-teardrop">
            <div className="section-title">
              <h4 className="section-title-subheading">We won&apos;t stay silent</h4>
              <div className="section-title-heading section-title-heading-contact">Contact</div>
            </div>
            <div className="overlay overlay-inverse-dark-35">
              <div className="all-bg-wapper">
                <div className="film-grain"></div>
                <div className="horizontal-stripes-sections"></div>
                <div className="all-bg contact-bg"></div>
              </div>
            </div>
          </div>
          
          <div className="col-md-4 col-sm-12 nopadding element-color-switch-4">
            <div className="all-content-wrapper all-content-wrapper-form">
              <div className="film-grain"></div>
              <div className="horizontal-stripes-sections"></div>
              <div className="all-content">
                <div className="all-content-inner">
                  <div className="contact-logo-wrapper">
                    <div className="contact-logo-title">Red Flag</div>
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

