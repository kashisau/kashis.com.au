import React from 'react'
import styles from './layoutleft.module.css'

const LayoutLeft = ({ heading, pageRef, children }) =>
  <section className={styles.LayoutLeft} ref={pageRef}>
    <header><h1>{heading}</h1></header>
    <main>{children}</main>
  </section>

export default LayoutLeft