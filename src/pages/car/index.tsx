import type { NextPage } from 'next'
import { gql, GraphQLClient } from 'graphql-request'
import Router from 'next/router'
import Image from 'next/image'
import { SimpleGrid } from '@chakra-ui/react'
import { Card } from '../../components/atomic'

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

const Car: NextPage = ({ data: { cars } }) => {
  const handleRedirect = (slug: string) => Router.push(`/car/${slug}`)

  return (
    <SimpleGrid columns={[1, 1, 1, 2, 3]} spacing={10}>
      {cars.map((car) => (
        <Card
          key={car.slug}
          onClick={() => handleRedirect(car.slug)}
          title={car.name}
          price={car.price}
          image={car.image[0].url}
        />
      ))}
    </SimpleGrid>
  )
}

export default Car
