import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import LayoutRight from '../components/LayoutRight'
import styles from './pagestyles.module.css'

export const PreviousWorkPageTemplate = ({
  title,
  subheading,
  body,
  ctaPrimary,
  ctaSecondary,
  ctaTertiary,
  works,
}) => (
  <>
    <h1>{title}</h1>
    {subheading && <h2>{subheading}</h2>}
    <main dangerouslySetInnerHTML={{__html: body}} />
    {works.map(
      (work, i) =>
        <aside key={i}>
          <h2>{work.title}</h2>
          <Img fluid={work.image.childImageSharp.fluid} title={`Screenshot of ${work.title}`} />
          <p dangerouslySetInnerHTML={{__html: work.blurb}} />
        </aside>
    )}
  </>
)

PreviousWorkPageTemplate.propTypes = {
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
  description: PropTypes.string,
  heroText: PropTypes.string,
  ctaPrimary: PropTypes.shape({
    btnText: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string
  }),
  ctaSecondary: PropTypes.shape({
    btnText: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string
  }),
  ctaTertiary: PropTypes.shape({
    btnText: PropTypes.string,
    url: PropTypes.string,
    title: PropTypes.string
  }),
  works: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    blurb: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }))
}

const PreviousWorkPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const { pageRef } = data

  return (
    <LayoutRight heading={frontmatter.title} headingStyle={styles.previousWorkHeading} pageRef={pageRef}>
      <PreviousWorkPageTemplate
        image={frontmatter.image}
        subheading={frontmatter.subheading}
        description={frontmatter.description}
        body={frontmatter.body}
        ctaPrimary={frontmatter.ctaPrimary}
        ctaSecondary={frontmatter.ctaSecondary}
        ctaTertiary={frontmatter.ctaTertiary}
        works={frontmatter.works}
      />
    </LayoutRight>
  )
}

PreviousWorkPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default PreviousWorkPage

export const pageQuery = graphql`
  query PreviousWorkPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "previous-work-page" } }) {
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
        ctaTertiary {
          btnText
          url
          title
        }
        works {
          title
          blurb
          image {
            childImageSharp {
              fluid(maxWidth: 2048, quality: 100) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
