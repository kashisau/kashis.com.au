import React from 'react'
import './all.sass'

const LandingLayout = ({ pageRef, children }) => 
  <section className="PageLayout PageLayout--landing" ref={pageRef}>
    <header>
      Logotype
    </header>
    <main>
      {children}
    </main>
  </section>

export default LandingLayout