// fetchProductsForCatalog.ts
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://nuxt.vitaline.uz/graphql';

const PRODUCTS_QUERY = gql`
  query ProductsCatalog($first: Int = 200, $after: String) {
    products(first: $first, after: $after, where: { stockStatus: IN_STOCK }) {
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

type BrandNode = {
  id: string;
  name: string;
  slug: string;
  brandId?: string;
};

type Image = {
  sourceUrl?: string;
  altText?: string;
};

type SimpleProduct = {
  price?: string;
  convertedPrice?: string;
  stockStatus?: string;
  brands?: {
    nodes: BrandNode[];
  };
};

type ProductNode = {
  id: string;
  name: string;
  slug: string;
  image?: Image;
} & SimpleProduct;

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
  const variables: { first: number; after?: string } = { first: 200 };
  if (after) variables.after = after;

  const data = await client.request<ProductsData>(PRODUCTS_QUERY, variables);

  console.log('First param =', variables.first, 'after =', variables.after);
  console.log('Получили IDs:', data.products.nodes.map((n) => n.id));
  console.log('hasNextPage:', data.products.pageInfo.hasNextPage, 'endCursor:', data.products.pageInfo.endCursor);

  return data.products;
}


