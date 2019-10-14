import React, { useRef, useEffect, useState } from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'

import LandingPage from '../templates/landing-page'
import LatestPage from '../templates/latest-page'
import PreviousWorkPage from '../templates/previous-work-page'
import PhotographyPage from '../templates/photography-page'
import ContactPage from '../templates/contact-page'

import PageBackground from '../components/PageBackground'
import FloatingNav from '../components/FloatingNav'

export const CombinedPageTemplate = ({contactPageData, photographyPageData, previousWorkPageData, latestPageData, landingPageData, isMobile}) =>
  <>
    <LandingPage isMobile={isMobile} landingRatio={landingPageData.landingRatio} page={landingPageData.page} data={{...landingPageData}} />
    <LatestPage page={latestPageData.page} data={{...latestPageData}} />
    <PreviousWorkPage page={previousWorkPageData.page} data={{...previousWorkPageData}} />
    <PhotographyPage isMobile={isMobile} page={photographyPageData.page} data={{...photographyPageData}} />
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

  const [isMobile, updateIsMobile] = useState((typeof(window) === 'undefined')? false : window.innerWidth < 768);
  const [pagesIntersection, updatePagesIntersection] = useState([])
  const [pageScroll, updatePageScroll] = useState(0)

  
  const observer = useRef()
  const pageContainerRef = useRef()
  const scrollWatcher = useRef(scrollEvent => updatePageScroll((scrollEvent.currentTarget === document? scrollEvent.target.scrollingElement : scrollEvent.target).scrollTop))
  
  // Data extracted from GraphQL
  const landingFrontmatter = { markdownRemark: frontmatter.landingMarkdownFile.childMarkdownRemark, pageRef: pages.current[0].ref }
  const latestFrontmatter = { markdownRemark: frontmatter.latestMarkdownFile.childMarkdownRemark, pageRef: pages.current[1].ref }
  const previousWorkFrontmatter = { markdownRemark: frontmatter.previousWorkMarkdownFile.childMarkdownRemark, pageRef: pages.current[2].ref }
  const photographyFrontmatter = { markdownRemark: frontmatter.photographyMarkdownFile.childMarkdownRemark, pageRef: pages.current[3].ref }
  const contactFrontmatter = { markdownRemark: frontmatter.contactMarkdownFile.childMarkdownRemark, pageRef: pages.current[4].ref }

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
        // Elements to watch for scroll [mobile, desktop]
      const scrollingElements = [document, pageContainerRef.current]
      const scrollingElement = scrollingElements[isMobile? 0 : 1]
      // Remove current listeners
      scrollingElements.forEach(el => el && el.removeEventListener('scroll', scrollWatcher.current))
      // Add new listener
      scrollingElement && scrollingElement.addEventListener('scroll', scrollWatcher.current)
    },
    [isMobile, pages]
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

  useEffect(
    () =>
    pagesIntersection.forEach(
      pageIntersectionEvent => {
        const page = pages.current.find(({ ref : { current }}) => current === pageIntersectionEvent.target)
        page.intersectionRatio = pageIntersectionEvent.intersectionRatio
      }
    ),
    [pagesIntersection]
  )

  const activePage = pages.current.reduce(
    (activePage, page) => 
      (page.intersectionRatio > 0
      && page.intersectionRatio > activePage.intersectionRatio)? page : activePage
  )

  const activePageScaler = 1 / activePage.intersectionRatio
  const scaledPages = pages.current.map(
    page => ({...page, intersectionRatio: page.intersectionRatio * activePageScaler})
  )

  const landingRatio = Math.max(1 - pageScroll / 120, 0)
  const pagesNormalised = isMobile? scaledPages : pages.current

  return (
    <Layout pageContainerRef={pageContainerRef}>
        <FloatingNav
          pages={pagesNormalised}
          pageContainerRef={pageContainerRef}
          landingRatio={landingRatio}
          isMobile={isMobile} />
        <CombinedPageTemplate
          pages={pagesNormalised}
          isMobile={isMobile}
          landingPageData={{page: pagesNormalised[0], landingRatio: landingRatio, isMobile: isMobile, ...landingFrontmatter}}
          latestPageData={{page: pagesNormalised[1], ...latestFrontmatter}}
          previousWorkPageData={{page: pagesNormalised[2], ...previousWorkFrontmatter}}
          photographyPageData={{page: pagesNormalised[3], ...photographyFrontmatter}}
          contactPageData={{page: pagesNormalised[4], ...contactFrontmatter}}
        />
        <PageBackground pages={pagesNormalised} />
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
            html
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
