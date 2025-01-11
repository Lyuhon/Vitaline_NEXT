// src/lib/fetchProductsByCategory.ts
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://nuxt.vitaline.uz/graphql';

const PRODUCTS_BY_CATEGORY_QUERY = gql`
  query ProductsByCategory($category: String!, $after: String, $first: Int = 8) {
    products(
      first: $first
      after: $after
      where: { category: $category, stockStatus: IN_STOCK }
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
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
          convertedPrice
          stockStatus
          brands {
            nodes {
              id
              name
              slug
              brandId
            }
          }
        }
      }
    }
  }
`;
type Brand = {
  id: string;
  name: string;
  slug: string;
  brandId?: string;
};


export type ProductNode = {
  id: string;
  name: string;
  slug: string;
  stockStatus?: string;
  stockQuantity?: number;
  image?: {
    sourceUrl?: string;
    altText?: string;
  };
  price?: string;
  convertedPrice?: string;
  brands?: {
    nodes: Brand[];
  };
};

type ProductsData = {
  products: {
    pageInfo: {
      hasNextPage: boolean;
      endCursor?: string;
    };
    nodes: ProductNode[];
  };
};

export async function fetchProductsByCategory(category: string, after?: string): Promise<{ nodes: ProductNode[], endCursor?: string, hasNextPage: boolean }> {
  const client = new GraphQLClient(endpoint);
  const variables: { category: string; after?: string } = { category };
  if (after) variables.after = after;

  const data = await client.request<ProductsData>(PRODUCTS_BY_CATEGORY_QUERY, variables);
  return {
    nodes: data.products.nodes,
    endCursor: data.products.pageInfo.endCursor,
    hasNextPage: data.products.pageInfo.hasNextPage
  };
}



