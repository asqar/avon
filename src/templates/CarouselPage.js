import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content'
import Layout from '../components/Layout'
import InstagramFeed from '../components/InstagramFeed'

// Export Template for use in CMS preview
export const CarouselPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  body
}) => (
  <main className="CarouselPage">
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />

    <section className="section">
      <div className="container">
        <Content source={body} />
        <InstagramFeed count="90" datasetId="N7uzMTiEA3P4899Ku" />
      </div>
    </section>
  </main>
)

const CarouselPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <CarouselPageTemplate {...page.frontmatter} body={page.html} />
  </Layout>
)
export default CarouselPage

export const pageQuery = graphql`
  query CarouselPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      html
      frontmatter {
        title
        subtitle
        featuredImage
      }
    }
  }
`
