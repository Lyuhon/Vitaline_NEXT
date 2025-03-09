// src/lib/fetchBackInStockProducts.js
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://nuxt.vitaline.uz/graphql';

const query = gql`
query GetBackInStockProducts {
  products(
    first: 12,
    where: { 
      stockStatus: IN_STOCK,
      showOnlyNewArrivals: true
    }
  ) {
    nodes {
      id
      name
      slug
      image {
        sourceUrl
        altText
      }
      ... on SimpleProduct {
        backInStockDate
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

export async function fetchBackInStockProducts() {
  const client = new GraphQLClient(endpoint, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await client.request(query);
  return data.products.nodes;
}
