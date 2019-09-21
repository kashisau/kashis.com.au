import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import LatestPage from './latest-page'
import LandingPage from './landing-page'
import PreviousWorkPage from './previous-work-page'
import PhotographyPage from './photography-page'
import ContactPage from './contact-page'
import PageBackground from '../components/PageBackground'

export const CombinedPageTemplate = ({contactPageData, photographyPageData, previousWorkPageData, latestPageData, landingPageData}) => (
  <>
    <LandingPage data={{...landingPageData}} />
    <LatestPage data={{...latestPageData}} />
    <PreviousWorkPage data={{...previousWorkPageData}} />
    <PhotographyPage data={{...photographyPageData}} />
    <ContactPage data={{...contactPageData}} />
  </>
)

const CombinedPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  const pages = useRef(
    [
      {name: 'landing', intersectionRatio: 1, ref: useRef(), backgroundRef: useRef()},
      {name: 'latest', intersectionRatio: 0, ref: useRef(), backgroundRef: useRef()},
      {name: 'previousWork', intersectionRatio: 0, ref: useRef(), backgroundRef: useRef()},
      {name: 'photography', intersectionRatio: 0, ref: useRef(), backgroundRef: useRef()},
      {name: 'contact', intersectionRatio: 0, ref: useRef(), backgroundRef: useRef()},
    ]
  )

  const [pagesIntersection, updatePagesIntersection] = useState([{}])

  const landingFrontmatter = { markdownRemark: frontmatter.landingMarkdownFile.childMarkdownRemark, pageRef: pages.current[0].ref }
  const latestFrontmatter = { markdownRemark: frontmatter.latestMarkdownFile.childMarkdownRemark, pageRef: pages.current[1].ref }
  const previousWorkFrontmatter = { markdownRemark: frontmatter.previousWorkMarkdownFile.childMarkdownRemark, pageRef: pages.current[2].ref }
  const photographyFrontmatter = { markdownRemark: frontmatter.photographyMarkdownFile.childMarkdownRemark, pageRef: pages.current[3].ref }
  const contactFrontmatter = { markdownRemark: frontmatter.contactMarkdownFile.childMarkdownRemark, pageRef: pages.current[4].ref }

  const observer = useRef();

  useEffect(
    () => {
      if (observer.current) observer.current.disconnect()
      observer.current = new window.IntersectionObserver(
        (entries) => updatePagesIntersection(entries),
        {
          threshold: [...Array(101).keys()].map((p, q) => q/100)
        }
      )
      const currentObserver = observer.current

      pages.current.forEach(
        page => currentObserver.observe(page.ref.current)
      )

      return () => currentObserver.disconnect()
    },
    [pages]
  )

  pagesIntersection.forEach(
    pageIntersectionEvent => {
      const page = pages.current.find(({ ref : { current }}) => current === pageIntersectionEvent.target)
      page.intersectionRatio = pageIntersectionEvent.intersectionRatio
    }
  )

  return (
    <Layout>
      <div className="PageContainer">
        <CombinedPageTemplate
          landingPageData={landingFrontmatter}
          latestPageData={latestFrontmatter}
          previousWorkPageData={previousWorkFrontmatter}
          photographyPageData={photographyFrontmatter}
          contactPageData={contactFrontmatter}
        />
        <PageBackground pages={pages.current} />
      </div>
    </Layout>
  )
}

export default CombinedPage

export const pageQuery = graphql`
  query CombinedLatestPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "combined-page" } }) {
      frontmatter {
        landingMarkdownFile {
          childMarkdownRemark {
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
        latestMarkdownFile {
          childMarkdownRemark {
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
        previousWorkMarkdownFile {
          childMarkdownRemark {
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
        photographyMarkdownFile {
          childMarkdownRemark {
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
        contactMarkdownFile {
          childMarkdownRemark {
            frontmatter {
              title
              description
              email
              phone
              sections {
                sectionTitle
                links {
                  blurb
                  btnText
                  title
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`
