import React, { useState, useEffect, useRef } from 'react'
import styles from './floatingnav.module.css'
import Logo from '../../img/kashis-logo.png'

const FloatingNav = ({ pages, isMobile, pageContainerRef, landingRatio = 1 }) => {
  const landingIntersectionRatio = pages[0].intersectionRatio
  const newCurrentPage = pages.find(
    page => page.intersectionRatio === 1
  )
  
  const landingActive = typeof(landingIntersectionRatio) === 'undefined'? 
    true : landingIntersectionRatio > 0.05
  
  const [currentPage, updateCurrentPage] = useState('landing')
  const [oldCurrentPage, updateOldCurrentPage] = useState('landing')

  if (newCurrentPage && newCurrentPage.name !== currentPage) {
    updateCurrentPage(newCurrentPage.name)
    updateOldCurrentPage(currentPage)
  }

  const navScale = 0.5 + (landingRatio) * 0.5
  const transitionLanding = pages[0].intersectionRatio === 1
    || pages[0].intersectionRatio > 0 && pages[1].intersectionRatio < 1 && pages[1].intersectionRatio >= 0

  return (
    <nav className={styles.FloatingNav} style={{ transform: `scale(${navScale}) translateY(${landingRatio*5}em)`}}>
      <a className={styles.logoLockup} href="#" title="Scroll to top">
        <img className={styles.logo} src={Logo} title="Kashis.com.au's Logo" />
        <h1 className={styles.logoType}>Kashi Samaraweera</h1>
      </a>
      <div className={styles.background}>
        {pages.map(
          (page, i) => {
            const opacity = (currentPage === 'landing' || (transitionLanding && currentPage === 'latest') )? page.intersectionRatio
              : page.name === currentPage? 1 : 0
            return (
              <div className={[styles[page.name], currentPage === page.name && styles[`to${currentPage}`], oldCurrentPage === page.name && styles[`from${oldCurrentPage}`]].join(' ')} style={{opacity: opacity}} key={i}></div>
            )
            
          }
        )}
        <div className={styles.navShadow} style={{opacity: 1 - landingRatio}}></div>
      </div>
    </nav>
  )
}

export default FloatingNav