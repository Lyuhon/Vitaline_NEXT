// // src/lib/fetchRelatedProducts.js
// import { GraphQLClient, gql } from 'graphql-request';

// const endpoint = 'https://nuxt.vitaline.uz/graphql';

// // const query = gql`
// //   query GetRelatedProducts($category: String!) {
// //     products(first: 4, where: { category: $category }) {
// //       nodes {
// //         id
// //         name
// //         slug
// //         image {
// //           sourceUrl
// //           altText
// //         }
// //         ... on SimpleProduct {
// //           price
// //           stockStatus
// //           convertedPrice
// //         }
// //       }
// //     }
// //   }
// // `;

// // const query = gql`
// // query GetRelatedProducts($category: String!) {
// //   products(
// //     first: 4,
// //     where: { 
// //       category: $category, 
// //       stockStatus: IN_STOCK 
// //     }
// //   ) {
// //     nodes {
// //       id
// //       name
// //       slug
// //       image {
// //         sourceUrl
// //         altText
// //       }

// //       ... on SimpleProduct {
// //         price
// //         stockStatus
// //         convertedPrice
// //       }
// //     }
// //   }
// // }
// // `;


// const query = gql`
// query GetRelatedProducts($category: String!) {
//   products(
//     first: 4,
//     where: { 
//       category: $category, 
//       stockStatus: IN_STOCK 
//     }
//   ) {
//     nodes {
//       id
//       name
//       slug
//       image {
//         sourceUrl
//         altText
//       }
//       ... on SimpleProduct {
//         price
//         stockStatus
//         convertedPrice
//         brands {
//           nodes {
//             id
//             name
//             slug
//             brandBanner
//             brandId
//             brandThumbnail
//           }
//         }
//       }
//     }
//   }
// }
// `;

// export async function fetchRelatedProducts(categorySlug, excludeSlug) {
//   const client = new GraphQLClient(endpoint, {
//     headers: { 'Content-Type': 'application/json' },
//   });

//   const data = await client.request(query, { category: categorySlug });

//   // Фильтруем текущий товар и берем первые 4
//   const related = data.products.nodes.filter(p => p.slug !== excludeSlug).slice(0, 4);
//   return related;
// }


// src/lib/fetchRelatedProducts.js
import { GraphQLClient, gql } from 'graphql-request';
import { headers } from 'next/headers'; // ОГРАНИЧЕНИЕ ПО БРЕНДАМ: Импорт для проверки userType

const endpoint = 'https://nuxt.vitaline.uz/graphql';

const query = gql`
  query GetRelatedProducts($category: String!) {
    products(
      first: 4,
      where: { 
        category: $category, 
        stockStatus: IN_STOCK 
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
          price
          stockStatus
          convertedPrice
          brands {
            nodes {
              id
              name
              slug
              brandBanner
              brandId
              brandThumbnail
            }
          }
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

  // ОГРАНИЧЕНИЕ ПО БРЕНДАМ: Проверка userType и фильтрация товаров
  const headersList = await headers();
  let userType = headersList.get("x-user-type"); // Без TypeScript assertion
  let related = data.products.nodes;

  if (userType === "restricted") {
    const restrictedBrands = ['carlson-labs', 'childlife'];
    related = related.filter((p) => {
      const hasRestrictedBrand = p.brands?.nodes?.some((brand) =>
        restrictedBrands.includes(brand.slug)
      );
      return !hasRestrictedBrand; // Исключаем товары с запрещёнными брендами
    });
  }

  // Фильтруем текущий товар и берем первые 4
  related = related.filter(p => p.slug !== excludeSlug).slice(0, 4);
  return related;
}