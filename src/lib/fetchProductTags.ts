// src/lib/fetchProductTags.ts
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://nuxt.vitaline.uz/graphql';

const TAGS_QUERY = gql`
  query AllProductTags {
    productTags(first: 100) {
      nodes {
        name
        slug
      }
    }
  }
`;

type ProductTagNode = {
  name: string;
  slug: string;
};

type ProductTagsData = {
  productTags: {
    nodes: ProductTagNode[];
  };
};

export async function fetchProductTags() {
  const client = new GraphQLClient(endpoint);
  const data = await client.request<ProductTagsData>(TAGS_QUERY);
  return data.productTags.nodes;
}