// src/lib/fetchProductsByCategory.ts
import { GraphQLClient, gql } from 'graphql-request';
import { headers } from 'next/headers'; // ОГРАНИЧЕНИЕ ПО БРЕНДАМ: Импорт для проверки userType

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

    let products = data.productCategory.products;

    // ОГРАНИЧЕНИЕ ПО БРЕНДАМ: Проверка userType и фильтрация товаров
    const headersList = await headers();
    const userType = headersList.get("x-user-type") as string | null;
    // if (userType === "restricted") {
    //   const restrictedBrands = ['carlson-labs', 'childlife'];
    //   products.nodes = products.nodes.filter((node) => {
    //     const hasRestrictedBrand = node.brands?.nodes?.some((brand) =>
    //       restrictedBrands.includes(brand.slug)
    //     );
    //     return !hasRestrictedBrand; // Исключаем товары с запрещёнными брендами
    //   });
    // }
    if (userType === "restricted") {
      const restrictedBrands = ['carlson-labs', 'childlife'];
      products.nodes = products.nodes.filter((node) => {
        const hasRestrictedBrand = node.brands?.nodes?.some((brand) =>
          restrictedBrands.includes(brand.slug)
        );
        return !hasRestrictedBrand;
      });
    } else if (userType === "without_cl") {
      const restrictedBrands = ['childlife'];
      products.nodes = products.nodes.filter((node) => {
        const hasRestrictedBrand = node.brands?.nodes?.some((brand) =>
          restrictedBrands.includes(brand.slug)
        );
        return !hasRestrictedBrand;
      });
    }

    return {
      nodes: products.nodes,
      pageInfo: products.pageInfo,
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