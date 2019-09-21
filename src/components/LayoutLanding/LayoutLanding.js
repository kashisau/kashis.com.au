import React from 'react'
import styles from './layoutlanding.module.css'

const LayoutLanding = ({ pageRef, heroText, children }) => 
  <section className={styles.LayoutLanding} ref={pageRef}>
    <p className={styles.heroText} dangerouslySetInnerHTML={{ __html: heroText }} />
  </section>

export default LayoutLanding