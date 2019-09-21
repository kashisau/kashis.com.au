import React from 'react'
import './all.sass'

const LayoutRight = ({ heading, pageRef, children }) =>
  <section className="PageLayout PageLayout--right" ref={pageRef}>
    <header><h1>{heading}</h1></header>
    <main>{children}</main>
  </section>

export default LayoutRight