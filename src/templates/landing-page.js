import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import LayoutLanding from '../components/LayoutLanding'
import styles from './pagestyles.module.css'

export const LandingPageTemplate = ({
  intersectionRatio,
  title,
  description,
  image,
  heroText,
  ctaPrimary,
  ctaSecondary
}) => (
  <>
    {[ctaPrimary, ctaSecondary].map(
      (cta, i) =>
        cta && <a className={[styles.buttonLink, i!==0? styles.buttonLinkSecondaryDark : styles.buttonLinkDark].join(' ')} href={cta.url} title={cta.title}>{cta.btnText}</a>
    )}
  </>
)

LandingPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  description: PropTypes.string,
  heroText: PropTypes.string,
  ctaPrimary: PropTypes.shape({
    btnText: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string
  }),
}

const LandingPage = ({ data, isMobile, landingRatio}) => {
  const { frontmatter } = data.markdownRemark
  const { 
    pageRef
  } = data

  return (
    <LayoutLanding
      backgroundClass="PageBackground--landing"
      heroText={frontmatter.heroText}
      landingRatio={landingRatio}
      isMobile={isMobile}
      pageRef={pageRef}
      >
      <LandingPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heroText={frontmatter.heroText}
        ctaPrimary={frontmatter.ctaPrimary}
        ctaSecondary={frontmatter.ctaSecondary}
      />
    </LayoutLanding>
  )
}

LandingPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default LandingPage

export const pageQuery = graphql`
  query LandingPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "landing-page" } }) {
      frontmatter {
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 70) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        heroText
        ctaPrimary {
          btnText
          url
          title
        }
        ctaSecondary {
          btnText
          url
          title
        }
      }
    }
  }
`
