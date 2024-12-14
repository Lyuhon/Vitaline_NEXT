// src/lib/fetchRelatedProducts.js
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://nuxt.vitaline.uz/graphql';

const query = gql`
  query GetRelatedProducts($category: String!) {
    products(first: 8, where: { category: $category }) {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
          altText
        }
        ... on SimpleProduct {
          price
          stockStatus
        }
      }
    }
  }
`;

export async function fetchRelatedProducts(categorySlug, excludeSlug) {
    const client = new GraphQLClient(endpoint, {
        headers: { 'Content-Type': 'application/json' },
    });

    const data = await client.request(query, { category: categorySlug });

    // Фильтруем текущий товар и берем первые 4
    const related = data.products.nodes.filter(p => p.slug !== excludeSlug).slice(0, 4);
    return related;
}
