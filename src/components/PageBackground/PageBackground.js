import React from 'react'
import PropTypes from 'prop-types'

import styles from './pagebackground.module.css'

const PageBackground = ({ pages, children }) => {
  return <div className="PageBackgrounds">
    {pages.map(
      page =>
        <div className={`PageBackground PageBackground--${page.name}`} style={{opacity: page.intersectionRatio}}></div>
    )}
  </div>
}

export default PageBackground