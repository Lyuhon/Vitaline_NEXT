import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://nuxt.vitaline.uz/graphql';

const CATEGORY_META_QUERY = gql`
  query CategoryMeta($slug: ID!) {
    productCategory(id: $slug, idType: SLUG) {
      name
      description
      seo {
        title
        description
        metaDesc
        metaKeywords
      }
    }
  }
`;

type CategoryMetaData = {
    productCategory: {
        name: string;
        description: string;
        seo: {
            title: string;
            description: string;
            metaDesc: string;
            metaKeywords: string;
        };
    };
};

export async function fetchCategoryMeta(slug: string) {
    const client = new GraphQLClient(endpoint);

    try {
        const data = await client.request<CategoryMetaData>(CATEGORY_META_QUERY, {
            slug,
        });

        return {
            name: data.productCategory?.name || '',
            description: data.productCategory?.description || '',
            seo: data.productCategory?.seo || {
                title: '',
                description: '',
                metaDesc: '',
                metaKeywords: '',
            },
        };
    } catch (error) {
        console.error('Error fetching category meta:', error);
        return {
            name: '',
            description: '',
            seo: {
                title: '',
                description: '',
                metaDesc: '',
                metaKeywords: '',
            },
        };
    }
}