import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import LayoutRight from '../components/LayoutRight'
import styles from './pagestyles.module.css'

export const ContactPageTemplate = ({
  title,
  description,
  email,
  phone,
  sections,
}) => 
  <>
    {sections.map(
      (section, i) => <section className={styles.contactSection} key={i}>
        <h2>{section.sectionTitle}</h2>
        {section.links.map(
          (link, i) => <section key={i}>
              <p dangerouslySetInnerHTML={{ __html: link.blurb }} />
              <a href={link.url} title={link.title}>{link.btnText}</a>
            </section>
        )}
      </section>
    )}
    <section className={styles.contactSection}>
      <h2>Connect</h2>
      <p>Finally, if you wish to contact me for any other reason, you may send me an email or reach out via phone:</p>
      <h3>Email</h3>
      <p>{email}</p>
      <h3>Phone</h3>
      <p>{phone}</p>
    </section>
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
  const { page, pageRef } = data

  return (
    <LayoutRight
      heading={frontmatter.title}
      headingStyle={styles.contactHeading}
      page={page}
      pageRef={pageRef}>
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
`
