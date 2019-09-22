import React from 'react'
import styles from './layoutlanding.module.css'

const LayoutLanding = ({ pageRef, heroText, intersectionRatio, children }) => 
  <section className={styles.LayoutLanding} ref={pageRef}>
    <p className={styles.heroText} dangerouslySetInnerHTML={{ __html: heroText }} style={{transform: `translateX(${(intersectionRatio - 1)*250}%)`}} />
    {/* {children} */}
  </section>

export default LayoutLanding