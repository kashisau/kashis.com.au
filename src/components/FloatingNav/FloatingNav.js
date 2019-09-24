import React, { useState, useEffect, useRef } from 'react'
import styles from './floatingnav.module.css'
import Logo from '../../img/kashis-logo.png'

const FloatingNav = ({ pages, landingRatio = 1 }) => {
  const navScale = 0.5 + (landingRatio) * 0.5
  return (
    <nav className={styles.FloatingNav} style={{ transform: `scale(${navScale}) translateY(${landingRatio*5}em)`}}>
      <a className={styles.logoLockup} href="#" title="Scroll to top">
        <img className={styles.logo} src={Logo} title="Kashis.com.au's Logo" />
        <h1 className={styles.logoType}>Kashi Samaraweera</h1>
      </a>
      <div className={styles.backgrounds}>
        {pages.map(
          (page, i) => {
            return (<div
              className={[styles[page.name]].join(' ')}
              style={{opacity: page.intersectionRatio}}
              key={i}></div>)
            }
        )}
        <div className={styles.navShadow} style={{opacity: 1 - landingRatio}}></div>
      </div>
    </nav>
  )
}

export default FloatingNav