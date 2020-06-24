import React from 'react'
import { Helmet } from 'react-helmet'
import useSiteMetadata from '../SiteMetadata'
import { withPrefix } from "gatsby"

import '../all.sass'
import '../../../static/fonts/fonts.css'
import styles from './layout.module.css'

const TemplateWrapper = ({ pageContainerRef, children }) => {
  const { title, description, url } = useSiteMetadata()
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>

        <meta name="title" property="og:title" content={title} />
        <meta name="author" content="Kashi Samaraweera" />
        <meta name="description" property="og:description" content={description} />
        <meta name="image" property="og:image" content={`${url}${withPrefix("/")}img/og-image.png`} />
        <meta name="language" content="AU" />
        <meta property="og:url" content={url} />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${withPrefix("/")}img/apple-touch-icon.png`}
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-32x32.png`}
          sizes="32x32"
        />
        <link
          rel="icon"
          type="image/png"
          href={`${withPrefix("/")}img/favicon-16x16.png`}
          sizes="16x16"
        />

        <link
          rel="mask-icon"
          href={`${withPrefix("/")}img/safari-pinned-tab.svg`}
          color="#ff4400"
        />
        <meta name="theme-color" content="#fff" />
      </Helmet>
      <div className={styles.pageContainer} ref={pageContainerRef}>
        {children}
      </div>
    </>
  )
}

export default TemplateWrapper
