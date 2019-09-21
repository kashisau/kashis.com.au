import React from 'react'
import './all.sass'

const LayoutLeft = ({ heading, children }) =>
  <section className="PageLayout PageLayout--right">
    <header><h1>{heading}</h1></header>
    <main>{children}</main>
  </section>

export default LayoutLeft