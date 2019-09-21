import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'

import Layout from '../components/Layout'
import LatestPage from './latest-page'
import LandingPage from './landing-page'
import PageBackground from '../components/PageBackground'

export const CombinedPageTemplate = ({latestPageData, landingPageData}) => (
  <>
    <LandingPage data={{...landingPageData}} />
    <LatestPage data={{...latestPageData}} />
  </>
)

const CombinedPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark

  const pages = useRef(
    [
      {name: 'landing', intersectionRatio: 1, ref: useRef(), backgroundRef: useRef()},
      {name: 'latest', intersectionRatio: 0, ref: useRef(), backgroundRef: useRef()},
    ]
  )

  const [pagesIntersection, updatePagesIntersection] = useState([{}])
  // const [activePageName, updateActivePageName] = useState(pages.current[0].name)

  const landingFrontmatter = { markdownRemark: frontmatter.landingMarkdownFile.childMarkdownRemark, pageRef: pages.current[0].ref }
  const latestFrontmatter = { markdownRemark: frontmatter.latestMarkdownFile.childMarkdownRemark, pageRef: pages.current[1].ref }

  const observer = useRef();

  useEffect(
    () => {
      if (observer.current) observer.current.disconnect()
      observer.current = new window.IntersectionObserver(
        (entries) => updatePagesIntersection(entries),
        {
          threshold: [...Array(21).keys()].map((p, q) => q/20)
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

  // const activePage = pagesIntersection.reduce(
  //   intersection => (intersection.intersectionRatio === 1)? intersection.target : false
  // ).target || undefined

  // // activePage && updateActivePageName()
  // // activePage && console.log("activePage: ", pages.current.find(({ ref : { current }}) => current === activePage).name)
  
  // const activePageName = activePage && pages.current.find(({ ref : { current }}) => current === activePage).name

  return (
    <Layout>
      <div className="PageContainer">
        <CombinedPageTemplate
          landingPageData={landingFrontmatter}
          latestPageData={latestFrontmatter}
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
      }
    }
  }
`
