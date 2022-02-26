import type { NextPage, GetServerSideProps } from 'next'
import { gql, GraphQLClient } from 'graphql-request'

export const getServerSideProps: GetServerSideProps = async (pageContext) => {
  const slug = pageContext.query?.slug
  const url = process.env.ENDPOINT
  const client = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPHQL_CMS_TOKEN
    }
  })
  const query = gql`
    query ($slug: String!) {
      car(where: { slug: $slug }) {
        createdAt
        id
        name
        year
        price
        slug
        image {
          url
          id
        }
      }
    }
  `

  const variables = {
    slug
  }

  const data = await client.request(query, variables)
  return { props: { data } }
}

const Car: NextPage = ({ data: { car } }) => {
  console.log(car)
  return (
    <div>
      <h1>{car.name}</h1>
      {car.image.map((image) => (
        <img src={image.url} style={{ width: '250px' }} />
      ))}
      <span>{car.price}</span>
    </div>
  )
}

export default Car
