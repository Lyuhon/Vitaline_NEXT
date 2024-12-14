// src/lib/fetchCategoryName.ts
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://nuxt.vitaline.uz/graphql';

const CATEGORY_QUERY = gql`
  query CategoryBySlug($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      name
    }
  }
`;

type CategoryData = {
    productCategory: {
        name: string;
    } | null;
};

export async function fetchCategoryName(slug: string): Promise<string | null> {
    const client = new GraphQLClient(endpoint);
    const data = await client.request<CategoryData>(CATEGORY_QUERY, { slug });
    return data.productCategory ? data.productCategory.name : null;
}
