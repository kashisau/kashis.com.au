import React from 'react'
import styles from './layoutlanding.module.css'

const LayoutLanding = ({ pageRef, heroText, landingRatio, isMobile = true }) => 
  <section className={styles.LayoutLanding} ref={pageRef}>
    <p
      className={styles.heroText} dangerouslySetInnerHTML={{ __html: heroText }}
      style={{transform: isMobile? undefined : `translateX(${(landingRatio - 1)*250}%)`}} />
    {/* {children} */}
  </section>

export default LayoutLanding