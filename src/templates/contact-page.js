import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import LayoutRight from '../components/LayoutRight'

export const ContactPageTemplate = ({
  title,
  description,
  email,
  phone,
  sections,
}) => 
  <>
    {sections.map(
      section => <section>
        <h2>{section.sectionTitle}</h2>
        {section.links.map(
          link => <section>
              <p dangerouslySetInnerHTML={{ __html: link.blurb }} />
              <a href={link.url} title={link.title}>{link.btnText}</a>
            </section>
        )}
      </section>
    )}
  </>

ContactPageTemplate.propTypes = {
  title: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  description: PropTypes.string,
  sections: PropTypes.arrayOf(PropTypes.shape({
    sectionTitle: PropTypes.string,
    links: PropTypes.arrayOf(PropTypes.shape({
      blurb: PropTypes.string,
      btnText: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string
    }))
  }))
}

const ContactPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  const { pageRef } = data

  return (
    <LayoutRight heading={frontmatter.title} pageRef={pageRef}>
      <ContactPageTemplate
        description={frontmatter.description}
        email={frontmatter.email}
        phone={frontmatter.phone}
        sections={frontmatter.sections}
      />
    </LayoutRight>
  )
}

ContactPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default ContactPage

export const pageQuery = graphql`
  query ContactPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "contact-page" } }) {
      frontmatter {
        title
        description
        email
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
`
