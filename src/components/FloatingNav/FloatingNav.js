import React, { useState } from 'react'
import styles from './floatingnav.module.css'
import Logo from '../../img/kashis-logo.png'

const FloatingNav = ({ pages }) => {
  const landingIntersectionRatio = pages[0].intersectionRatio
  const navScale = 0.5 + (landingIntersectionRatio) * 0.5
  const newCurrentPage = pages.find(
    page => page.intersectionRatio === 1
  )

  const [currentPage, updateCurrentPage] = useState('landing')
  const [oldCurrentPage, updateOldCurrentPage] = useState('landing')

  if (newCurrentPage && newCurrentPage.name !== currentPage) {
    updateCurrentPage(newCurrentPage.name)
    updateOldCurrentPage(currentPage)
    // console.log(`to${newCurrentPage.name} from${oldCurrentPage}`)
  }

  const transitionLanding = pages[0].intersectionRatio === 1
    || pages[0].intersectionRatio > 0 && pages[1].intersectionRatio < 1 && pages[1].intersectionRatio >= 0

  return (
    <nav className={styles.FloatingNav} style={{ transform: `scale(${navScale})`}}>
      <a className={styles.logoLockup} href="#" title="Scroll to top">
        <img className={styles.logo} src={Logo} title="Kashis.com.au's Logo" /><h1 className={styles.logoType}>Kashi Samaraweera</h1>
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
      </div>
    </nav>
  )
}

export default FloatingNav