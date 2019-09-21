import React from 'react'
import styles from './layoutright.module.css'

const LayoutRight = ({ heading, pageRef, children }) =>
  <section className={styles.LayoutRight} ref={pageRef}>
    <header className={styles.header}>
      <h1 className={styles.heading}>{heading}</h1>
    </header>
    <main className={styles.main}>{children}</main>
  </section>

export default LayoutRight