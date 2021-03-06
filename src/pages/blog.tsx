import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import PersonalBlog from '../containers/Blog'

const PersonalBlogPage = (props: any) => {
	const { data } = props

	return (
		<Layout>
			<PersonalBlog />
		</Layout>
	)
}

export default PersonalBlogPage

export const pageQuery = graphql`
	query {
		site {
			siteMetadata {
				title
				description
			}
		}
		allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
			edges {
				node {
					excerpt
					fields {
						slug
					}
					frontmatter {
						date(formatString: "DD [<span>] MMMM [</span>]")
						title
						description
						tags
						cover {
							childImageSharp {
								fluid(maxWidth: 1170, quality: 90) {
									...GatsbyImageSharpFluid_withWebp_tracedSVG
								}
							}
						}
					}
				}
			}
		}
	}
`
