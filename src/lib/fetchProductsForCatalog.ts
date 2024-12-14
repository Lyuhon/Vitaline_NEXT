// fetchProductsForCatalog.ts (без offsetPagination)
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://nuxt.vitaline.uz/graphql';

const PRODUCTS_QUERY = gql`
  query ProductsCatalog($first: Int = 8, $after: String) {
    products(first: $first, after: $after) {
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
        }
      }
    }
  }
`;

type ProductNode = {
    id: string;
    name: string;
    slug: string;
    image?: {
        sourceUrl?: string;
        altText?: string;
    };
    price?: string;
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

export async function fetchProductsForCatalog(after?: string) {
    const client = new GraphQLClient(endpoint);
    const variables: { first: number; after?: string } = { first: 8 };
    if (after) variables.after = after;

    const data = await client.request<ProductsData>(PRODUCTS_QUERY, variables);
    return data.products;
}
