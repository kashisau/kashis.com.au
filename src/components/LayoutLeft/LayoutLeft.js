import React from 'react'
import styles from './layoutleft.module.css'

const LayoutLeft = ({ heading, pageRef, children }) =>
  <section className={styles.LayoutLeft} ref={pageRef}>
    <header className={styles.header}>
      <h1 className={styles.heading}>{heading}</h1>
    </header>
    <main className={styles.main}>{children}</main>
  </section>

export default LayoutLeft