import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import FeaturedCard from '../../../components/FeaturedCard/featuredCard'

import { FeaturedPostWrapper, FeaturedPostRow, FeaturedPostCol, SecTitle } from './style'

type FeaturedPostsProps = {}

const FeaturedPosts: React.FunctionComponent<FeaturedPostsProps> = (props) => {
	const Data = useStaticQuery(graphql`
		query {
			allMarkdownRemark(
				sort: { fields: [frontmatter___date], order: DESC }
				limit: 4
				filter: { frontmatter: { tags: { eq: "featured-project" } } }
			) {
				totalCount
				edges {
					node {
						excerpt(pruneLength: 150)
						fields {
							slug
						}
						frontmatter {
							date(formatString: "MMM DD, YYYY")
							title
							description
							tags
							cover {
								childImageSharp {
									fluid(maxWidth: 270, maxHeight: 405, quality: 100) {
										...GatsbyImageSharpFluid_withWebp_tracedSVG
									}
								}
							}
						}
					}
				}
			}
		}
	`)

	const Posts = Data.allMarkdownRemark.edges

	return (
		<FeaturedPostWrapper>
			<SecTitle>Featured Projects</SecTitle>
			<FeaturedPostRow>
				{Posts.map(({ node }: any) => {
					const title = node.frontmatter.title || node.fields.slug
					return (
						<FeaturedPostCol key={title}>
							<FeaturedCard
								title={title}
								image={
									node.frontmatter.cover == null ? null : node.frontmatter.cover.childImageSharp.fluid
								}
								url={node.fields.slug}
								tags={node.frontmatter.tags}
								description={node.excerpt}
								overlay
							/>
						</FeaturedPostCol>
					)
				})}
			</FeaturedPostRow>
		</FeaturedPostWrapper>
	)
}

export default FeaturedPosts
