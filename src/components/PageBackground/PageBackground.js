import React from 'react'
import PropTypes from 'prop-types'

import styles from './pagebackground.module.css'

const PageBackground = ({ pages }) => 
  <div className={styles.pageBackgrounds}>
    {pages.map(
      page =>
        <div className={styles[page.name]} style={{opacity: page.intersectionRatio}}></div>
    )}
  </div>

export default PageBackground