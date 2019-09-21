import React from 'react'
import styles from './layoutlanding.module.css'

const LayoutLanding = ({ pageRef, children }) => 
  <section className={styles.LayoutLanding} ref={pageRef}>
    <header>
      Logotype
    </header>
    <main>
      {children}
    </main>
  </section>

export default LayoutLanding