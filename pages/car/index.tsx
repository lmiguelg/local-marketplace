import type { NextPage } from 'next'
import { gql, GraphQLClient } from 'graphql-request'
import Router from 'next/router'
import Image from 'next/image'
import { Box, SimpleGrid } from '@chakra-ui/react'

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
    <div>
      <h1>Home</h1>
      <SimpleGrid columns={2} spacing={10}>
        {cars.map((car) => (
          <div key={car.slug} onClick={() => handleRedirect(car.slug)}>
            <h2>{car.name}</h2>
            <div
              style={{
                flex: 1,
                width: '550px',
                height: '250px',
                position: 'relative'
              }}
            >
              <Image
                src={car.image[0].url}
                width={0}
                height={0}
                alt='car'
                layout='fill'
                objectFit='contain'
              />
            </div>
            <span>{car.price}</span>
          </div>
        ))}
      </SimpleGrid>
    </div>
  )
}

export default Car
