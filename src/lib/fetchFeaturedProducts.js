// src/lib/fetchFeaturedProducts.ts
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://nuxt.vitaline.uz/graphql';

const query = gql`
  query GetFeaturedProducts {
    products(
      first: 8,
      where: { 
        stockStatus: IN_STOCK,
        featured: true 
      }) 
      {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          stockStatus
          price
          convertedPrice
          brands {
            nodes {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
`;

export async function fetchFeaturedProducts() {
  const client = new GraphQLClient(endpoint, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await client.request(query);
  return data.products.nodes;
}
