import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Img from 'gatsby-image'

import LayoutLeft from '../components/LayoutLeft'
import styles from './pagestyles.module.css'

export const LatestPageTemplate = ({
  title,
  description,
  image,
  body,
  ctaPrimary,
  ctaSecondary
}) => (
  <>
    <div className={styles.body}>
      <p dangerouslySetInnerHTML={{__html: body}} />
    </div>
    <Img className={styles.latestFeaturedImage} fluid={image.childImageSharp.fluid} title={title} />
  </>
)

LatestPageTemplate.propTypes = {
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

const LatestPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const { page, pageRef } = data

  return (
    <LayoutLeft
      heading={frontmatter.title}
      headingStyle={styles.latestHeading}
      page={page}
      pageRef={pageRef}>
      <LatestPageTemplate
        image={frontmatter.image}
        subheading={frontmatter.subheading}
        description={frontmatter.description}
        body={frontmatter.body}
        ctaPrimary={frontmatter.ctaPrimary}
        ctaSecondary={frontmatter.ctaSecondary}
      />
    </LayoutLeft>
  )
}

LatestPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default LatestPage

export const pageQuery = graphql`
  query LatestPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "latest-page" } }) {
      frontmatter {
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        subheading
        body
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
