import React from 'react'
import styles from './layoutleft.module.css'

const LayoutLeft = ({ page, heading, headingStyle, backgroundStyle, mainStyle, pageRef, children }) => 
  <section className={[styles.LayoutLeft, backgroundStyle].join(' ')} ref={pageRef}>
    <header className={styles.header} style={{ opacity: page.intersectionRatio }}>
      <h1 className={[styles.heading, headingStyle].join(' ')}>{heading}</h1>
    </header>
    <main className={[styles.main, mainStyle].join(' ')}>{children}</main>
  </section>

export default LayoutLeft