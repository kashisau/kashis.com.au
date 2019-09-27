import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import marked from 'marked'
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
    <div className={[styles.body, styles.lightText].join(' ')}>
      <div dangerouslySetInnerHTML={{__html: marked(body)}} />
    </div>
    <section className={styles.featureGallery}>
      <ul className={styles.featureGalleryRails}>
      {photos.map(
        (photo, i) =>
          <li className={styles.galleryItem} key={i}>
            <article>
              <Img
                className={styles.galleryItemContainer}
                fluid={photo.image.childImageSharp.fluid}
                style={{ 
                  width:  `calc((100vh - 18em)*${photo.image.childImageSharp.fluid.aspectRatio})`
                }}
                title={`Kashi Samaraweera's photo: ${photo.title}`} />
              {/* <div className={['hiddenFeatures'].join(' ')}>
                <h2 className={[styles.featureHeading ,styles.featureHiddenUntilHover].join(' ')}>{photo.title}</h2>
                <p className={[styles.featureBlurb ,styles.featureHiddenUntilHover].join(' ')} dangerouslySetInnerHTML={{__html: photo.blurb}} />
              </div> */}
            </article>
          </li>
      )}
      </ul>
    </section>
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
  const { 
    page = {name: 'photography', intersectionRatio: 0},
    pageRef
  } = data

  return (
    <LayoutLeft
      heading={frontmatter.title}
      headingStyle={styles.photographyHeading}
      backgroundStyle={styles.photographyBackgroundColor}
      page={page}
      pageRef={pageRef}>
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
