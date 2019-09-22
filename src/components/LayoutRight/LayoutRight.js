import React from 'react'
import styles from './layoutright.module.css'

const LayoutRight = ({ page, layoutStyle, heading, headingStyle, pageRef, children }) =>
  <section className={styles.LayoutRight} ref={pageRef}>
    <header className={styles.header} style={{ opacity: page.intersectionRatio }}>
      <h1 className={[styles.heading, headingStyle].join(' ')}>{heading}</h1>
    </header>
    <main className={[styles.main, layoutStyle].join(' ')}>{children}</main>
  </section>

export default LayoutRight