import type { NextPage, GetServerSideProps } from 'next'
import Image from 'next/image'
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
      <div style={{ display: 'fle' }}>
        {car.image.map((image) => (
          <div
            key={image.url}
            style={{
              flex: 1,
              width: '250px',
              height: '250px',
              position: 'relative'
            }}
          >
            <Image
              src={image.url}
              width={0}
              height={0}
              alt='car'
              layout='fill'
              objectFit='contain'
            />
          </div>
        ))}
      </div>
      <span>{car.price}</span>
    </div>
  )
}

export default Car
