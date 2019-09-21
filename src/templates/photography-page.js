import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import LayoutLeft from '../components/LayoutLeft'
import styles from './pagestyles.module.css'

export const PhotographyPageTemplate = ({
  title,
  body,
  ctaPrimary,
  ctaSecondary,
  ctaTertiary,
  photos,
}) => 
  <>
    <h1>{title}</h1>
    <main dangerouslySetInnerHTML={{__html: body}} />
    {photos.map(
      (photo, i) =>
        <aside key={i}>
          <h2>{photo.title}</h2>
          <Img fluid={photo.image.childImageSharp.fluid} title={`Screenshot of ${photo.title}`} />
          <p dangerouslySetInnerHTML={{__html: photo.blurb}} />
        </aside>
    )}
  </>

PhotographyPageTemplate.propTypes = {
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
  photos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    blurb: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }))
}

const PhotographyPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const { pageRef } = data

  return (
    <LayoutLeft heading={frontmatter.title} headingStyle={styles.photographyHeading} pageRef={pageRef}>
      <PhotographyPageTemplate
        image={frontmatter.image}
        description={frontmatter.description}
        body={frontmatter.body}
        ctaPrimary={frontmatter.ctaPrimary}
        ctaSecondary={frontmatter.ctaSecondary}
        ctaTertiary={frontmatter.ctaTertiary}
        photos={frontmatter.photos}
      />
    </LayoutLeft>
  )
}

PhotographyPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default PhotographyPage

export const pageQuery = graphql`
  query PhotographyPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "photography-page" } }) {
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
        photos {
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
