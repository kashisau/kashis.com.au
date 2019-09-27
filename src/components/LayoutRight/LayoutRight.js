import React from 'react'
import styles from './layoutright.module.css'
import cn from 'classnames'

const LayoutRight = ({ page, layoutStyle, heading, headingStyle, backgroundStyle, pageRef, children }) =>
  <section className={[styles.LayoutRight, backgroundStyle].join(' ')} ref={pageRef}>
    <header className={styles.header} style={{ opacity: page.intersectionRatio }}>
      <h1 className={[styles.heading, headingStyle].join(' ')}>{heading}</h1>
    </header>
    <main className={cn(styles.main, layoutStyle)}>{children}</main>
  </section>

export default LayoutRight