import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import marked from 'marked'
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
              <div className={styles.bodyText} dangerouslySetInnerHTML={{ __html: marked(link.blurb) }} />
              <a className={[styles.buttonLink, i % 2? styles.buttonLinkSecondaryDark : styles.buttonLinkDark].join(' ')} href={link.url} title={link.title} target="blank" rel="noopener">{link.btnText}</a>
            </section>
        )}
      </section>
    )}
    <section className={styles.contactSection}>
      <h2>Connect</h2>
      <p>Finally, if you wish to contact me for any other reason, you may send me an email or reach out via phone:</p>
      <h3>Email</h3>
      <p className={styles.contactMode}>{email}</p>
      <h3>Phone</h3>
      <p className={styles.contactMode}>{phone}</p>
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
  const {
    page = {name: 'contact', intersectionRatio: 0},
    pageRef
  } = data

  return (
    <LayoutRight
      heading={frontmatter.title}
      headingStyle={styles.contactHeading}
      backgroundStyle={styles.contactBackgroundColor}
      layoutStyle={styles.layout4}
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
