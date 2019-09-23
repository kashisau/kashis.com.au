import React, { useRef, useEffect, useLayoutEffect, useState } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

import LandingPage from '../templates/landing-page'
import LatestPage from '../templates/latest-page'
import PreviousWorkPage from '../templates/previous-work-page'
import PhotographyPage from '../templates/photography-page'
import ContactPage from '../templates/contact-page'

import PageBackground from '../components/PageBackground'
import FloatingNav from '../components/FloatingNav'

export const CombinedPageTemplate = ({contactPageData, photographyPageData, previousWorkPageData, latestPageData, landingPageData}) =>
  <>
    <LandingPage isMobile={landingPageData.isMobile} page={landingPageData.page} data={{...landingPageData}} />
    <LatestPage page={latestPageData.page} data={{...latestPageData}} />
    <PreviousWorkPage page={previousWorkPageData.page} data={{...previousWorkPageData}} />
    <PhotographyPage page={photographyPageData.page} data={{...photographyPageData}} />
    <ContactPage page={contactPageData.page} data={{...contactPageData}} />
  </>

const CombinedPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  const pages = useRef(
    [
      {name: 'landing', intersectionRatio: 1, ref: useRef()},
      {name: 'latest', intersectionRatio: 0, ref: useRef()},
      {name: 'previousWork', intersectionRatio: 0, ref: useRef()},
      {name: 'photography', intersectionRatio: 0, ref: useRef()},
      {name: 'contact', intersectionRatio: 0, ref: useRef()},
    ]
  )

  const [pagesIntersection, updatePagesIntersection] = useState([{}])
  const [isMobile, updateIsMobile] = useState((typeof(window) === 'undefined')? false : window.innerWidth < 768);

  const landingFrontmatter = { markdownRemark: frontmatter.landingMarkdownFile.childMarkdownRemark, pageRef: pages.current[0].ref }
  const latestFrontmatter = { markdownRemark: frontmatter.latestMarkdownFile.childMarkdownRemark, pageRef: pages.current[1].ref }
  const previousWorkFrontmatter = { markdownRemark: frontmatter.previousWorkMarkdownFile.childMarkdownRemark, pageRef: pages.current[2].ref }
  const photographyFrontmatter = { markdownRemark: frontmatter.photographyMarkdownFile.childMarkdownRemark, pageRef: pages.current[3].ref }
  const contactFrontmatter = { markdownRemark: frontmatter.contactMarkdownFile.childMarkdownRemark, pageRef: pages.current[4].ref }

  const observer = useRef();

  useEffect(
    () => {
      window.addEventListener(
        'resize',
        (resizeEvent) => {
          updateIsMobile(window.innerWidth < 768)
        }
      )
      updateIsMobile(window.innerWidth < 768)
    },
    []
  )

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

  // console.log("Pages: ", pages.current.reduce(
  //   (pageString, page) => pageString + `${page.name}: ${Math.round(page.intersectionRatio*100)/100}`
  //   , "")
  // )

  return (
    <Layout>
        <FloatingNav pages={pages.current} />
        <CombinedPageTemplate
          landingPageData={{page: pages.current[0], isMobile: isMobile, ...landingFrontmatter}}
          latestPageData={{page: pages.current[1], ...latestFrontmatter}}
          previousWorkPageData={{page: pages.current[2], ...previousWorkFrontmatter}}
          photographyPageData={{page: pages.current[3], ...photographyFrontmatter}}
          contactPageData={{page: pages.current[4], ...contactFrontmatter}}
        />
        <PageBackground pages={pages.current} />
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
                liveUrl
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
