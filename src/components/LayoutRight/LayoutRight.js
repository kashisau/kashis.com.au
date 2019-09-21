import React from 'react'
import styles from './layoutright.module.css'

const LayoutRight = ({ heading, pageRef, children }) =>
  <section className={styles.LayoutRight} ref={pageRef}>
    <header><h1>{heading}</h1></header>
    <main>{children}</main>
  </section>

export default LayoutRight