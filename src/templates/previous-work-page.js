import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import marked from 'marked'

import LayoutRight from '../components/LayoutRight'
import styles from './pagestyles.module.css'
import './features.scss'

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
    <div className={[styles.bodyRight, styles.lightText].join(' ')}>
      <div dangerouslySetInnerHTML={{__html: marked(body)}} />
      {[ctaPrimary, ctaSecondary, ctaTertiary].map(
        (cta, i) =>
          <a className={[styles.buttonLink, i!==0? styles.buttonLinkSecondaryLight : styles.buttonLinkLight].join(' ')} href={cta.url} title={cta.title} key={i}>{cta.btnText}</a>
      )}
    </div>
    <section className={[styles.leftFeature, styles.leftFeature4x4].join(' ')}>
      {works.map(
        (work, i) =>
          <aside className={[styles[`leftFeature4x4Feature${i}`]].join(' ')} key={i}>
            <Img className={styles.feature4x4Image} fluid={work.image.childImageSharp.fluid} title={`Screenshot of ${work.title}`} />
            <div className={['hiddenFeatures'].join(' ')}>
              <h2 className={[styles.featureHeading ,styles.featureHiddenUntilHover].join(' ')}>{work.title}</h2>
              <p className={[styles.featureBlurb ,styles.featureHiddenUntilHover].join(' ')} dangerouslySetInnerHTML={{__html: work.blurb}} />
              {work.liveUrl && <a className={[styles.buttonLink, styles.buttonLinkLight, styles.featureUrl, styles.featureHiddenUntilHover].join(' ')} href={work.liveUrl} title={`See '${work.title}' online`} target="blank" rel="noopener">{work.title}</a>}
              {!work.liveUrl && <span className={[styles.buttonLink, styles.buttonLinkSecondaryLight, styles.featureUrl, styles.featureHiddenUntilHover, styles.buttonLinkDisabled].join(' ')} title={`'${work.title}' is no longer available online`}>No longer available</span>}
            </div>
          </aside>
      )}
    </section>
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
    liveUrl: PropTypes.string
  }))
}

const PreviousWorkPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const {
    page = {name: 'previousWork', intersectionRatio: 0},
    pageRef
  } = data

  return (
    <LayoutRight
      heading={frontmatter.title}
      headingStyle={styles.previousWorkHeading}
      backgroundStyle={styles.previousWorkBackgroundColor}
      page={page}
      pageRef={pageRef}>
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
          liveUrl
        }
      }
    }
  }
`
