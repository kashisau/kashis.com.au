import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import LandingLayout from '../components/LandingLayout'

export const LandingPageTemplate = ({
  title,
  description,
  image,
  heroText,
  ctaPrimary,
  ctaSecondary
}) => (
  <p>{heroText}</p>
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

const LandingPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const { pageRef } = data

  return (
    <LandingLayout pageRef={pageRef} backgroundClass="PageBackground--landing">
      <LandingPageTemplate
        image={frontmatter.image}
        title={frontmatter.title}
        heroText={frontmatter.heroText}
        ctaPrimary={frontmatter.ctaPrimary}
        ctaSecondary={frontmatter.ctaSecondary}
      />
    </LandingLayout>
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
            fluid(maxWidth: 2048, quality: 100) {
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
