// // src/lib/fetchProductsByCategory.ts
// import { GraphQLClient, gql } from 'graphql-request';

// const endpoint = 'https://nuxt.vitaline.uz/graphql';

// const PRODUCTS_BY_CATEGORY_QUERY = gql`
//   query ProductsByCategory($category: String!, $after: String, $first: Int = 8) {
//     products(
//       first: $first
//       after: $after
//       where: { category: $category, stockStatus: IN_STOCK }
//     ) {
//       pageInfo {
//         hasNextPage
//         endCursor
//       }
//       nodes {
//         id
//         name
//         slug
//         image {
//           sourceUrl
//           altText
//         }
//         ... on SimpleProduct {
//           price
//           convertedPrice
//           stockStatus
//           brands {
//             nodes {
//               id
//               name
//               slug
//               brandId
//             }
//           }
//         }
//       }
//     }
//   }
// `;
// type Brand = {
//   id: string;
//   name: string;
//   slug: string;
//   brandId?: string;
// };


// export type ProductNode = {
//   id: string;
//   name: string;
//   slug: string;
//   stockStatus?: string;
//   stockQuantity?: number;
//   image?: {
//     sourceUrl?: string;
//     altText?: string;
//   };
//   price?: string;
//   convertedPrice?: string;
//   brands?: {
//     nodes: Brand[];
//   };
// };

// type ProductsData = {
//   products: {
//     pageInfo: {
//       hasNextPage: boolean;
//       endCursor?: string;
//     };
//     nodes: ProductNode[];
//   };
// };

// export async function fetchProductsByCategory(category: string, after?: string): Promise<{ nodes: ProductNode[], endCursor?: string, hasNextPage: boolean }> {
//   const client = new GraphQLClient(endpoint);
//   const variables: { category: string; after?: string } = { category };
//   if (after) variables.after = after;

//   const data = await client.request<ProductsData>(PRODUCTS_BY_CATEGORY_QUERY, variables);
//   return {
//     nodes: data.products.nodes,
//     endCursor: data.products.pageInfo.endCursor,
//     hasNextPage: data.products.pageInfo.hasNextPage
//   };
// }




import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://nuxt.vitaline.uz/graphql';

const PRODUCTS_BY_CATEGORY_QUERY = gql`
  query ProductsByCategory($categorySlug: ID!, $first: Int = 200, $after: String) {
    productCategory(id: $categorySlug, idType: SLUG) {
      name
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
            stockQuantity
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
  }
`;

type ProductsData = {
  productCategory: {
    name: string;
    products: {
      pageInfo: {
        hasNextPage: boolean;
        endCursor?: string;
      };
      nodes: Array<{
        id: string;
        name: string;
        slug: string;
        image?: {
          sourceUrl?: string;
          altText?: string;
        };
        price?: string;
        convertedPrice?: string;
        stockStatus?: string;
        stockQuantity?: number;
        brands?: {
          nodes: Array<{
            id: string;
            name: string;
            slug: string;
            brandId?: string;
          }>;
        };
      }>;
    };
  };
};

export async function fetchProductsByCategory(categorySlug: string, after?: string) {
  const client = new GraphQLClient(endpoint);
  const variables: { categorySlug: string; first: number; after?: string } = {
    categorySlug,
    first: 200
  };

  if (after) variables.after = after;

  try {
    const data = await client.request<ProductsData>(PRODUCTS_BY_CATEGORY_QUERY, variables);

    return {
      nodes: data.productCategory.products.nodes,
      pageInfo: data.productCategory.products.pageInfo,
      categoryName: data.productCategory.name
    };
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return {
      nodes: [],
      pageInfo: {
        hasNextPage: false,
        endCursor: null
      },
      categoryName: categorySlug
    };
  }
}