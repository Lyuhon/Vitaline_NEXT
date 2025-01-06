// src/lib/fetchProducts.js
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://nuxt.vitaline.uz/graphql';

const query = gql`
  query GetProducts {
    products(
      first: 8,
      where: { 
        stockStatus: IN_STOCK 
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

export async function fetchProducts() {
  const client = new GraphQLClient(endpoint, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await client.request(query);
  return data.products.nodes;
}
