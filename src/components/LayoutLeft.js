import React from 'react'
import './all.sass'

const LayoutLeft = ({ heading, pageRef, children }) =>
  <section className="PageLayout PageLayout--left" ref={pageRef}>
    <header><h1>{heading}</h1></header>
    <main>{children}</main>
  </section>

export default LayoutLeft