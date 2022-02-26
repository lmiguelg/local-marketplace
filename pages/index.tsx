import type { NextPage } from 'next'
import { gql, GraphQLClient } from 'graphql-request'
import Router from 'next/router'

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT
  const client = new GraphQLClient(url, {
    headers: {
      Authorization: process.env.GRAPHQL_CMS_TOKEN
    }
  })
  const query = gql`
    query {
      cars {
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
  const data = await client.request(query)
  return { props: { data } }
}

const Home: NextPage = ({ data: { cars } }) => {
  const handleRedirect = (slug: string) => Router.push(`/car/${slug}`)

  return (
    <div>
      <h1>Home</h1>
      {cars.map((car) => (
        <div key={car.slug} onClick={() => handleRedirect(car.slug)}>
          <h2>{car.name}</h2>
          <img src={car.image[0].url} style={{ width: '250px' }} />
          <span>{car.price}</span>
        </div>
      ))}
    </div>
  )
}

export default Home
