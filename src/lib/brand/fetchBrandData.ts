// // lib/brand/fetchBrandData.ts
// const endpoint = 'https://nuxt.vitaline.uz/graphql';

// export async function fetchBrandInfo(slug: string) {
//   const query = `
//     query GetBrandInfo($slug: ID!) {
//       brand(id: $slug, idType: SLUG) {
//         id
//         name
//         description
//         brandBanner
//         count
//       }
//     }
//   `;

//   const variables = { slug };

//   const res = await fetch(endpoint, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ query, variables }),
//     cache: 'no-store',
//   });

//   const json = await res.json();
//   return json.data?.brand;
// }

// // Функция для получения товаров — без изменений
// export async function fetchBrandProducts(slug: string, after?: string) {

//   // Старый вывод в наличии
//   // const query = `
//   //   query GetBrandProducts($slug: ID!, $after: String) {
//   //     brand(id: $slug, idType: SLUG) {
//   //       products(first: 100, after: $after) {
//   //         nodes {
//   //           id
//   //           name
//   //           slug
//   //           image {
//   //             sourceUrl
//   //             altText
//   //           }
//   //           ... on SimpleProduct {
//   //             price
//   //             convertedPrice
//   //           }

//   //           brands {
//   //             nodes {
//   //               name
//   //               slug
//   //               }
//   //             }
//   //         }
//   //         pageInfo {
//   //           endCursor
//   //           hasNextPage
//   //         }
//   //       }
//   //     }
//   //   }
//   // `;

//   const query = `
//     query GetBrandProducts($slug: ID!, $after: String) {
//       brand(id: $slug, idType: SLUG) {
//         products(first: 100, after: $after, where: { stockStatus: IN_STOCK }) {
//           nodes {
//             id
//             name
//             slug
//             image {
//               sourceUrl
//               altText
//             }
//             ... on SimpleProduct {
//               price
//               convertedPrice
//             }

//             brands {
//               nodes {
//                 name
//                 slug
//               }
//             }
//           }
//           pageInfo {
//             endCursor
//             hasNextPage
//           }
//         }
//       }
//     }
//   `;

//   const variables = { slug, after };

//   const res = await fetch(endpoint, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ query, variables }),
//     cache: 'no-store',
//   });

//   const json = await res.json();
//   return json.data?.brand?.products;
// }



// ОГРАНИЧЕНИЕ ПО БРЕНДУ
// lib/brand/fetchBrandData.ts
const endpoint = 'https://nuxt.vitaline.uz/graphql';

export async function fetchBrandInfo(slug: string) {
  const query = `
    query GetBrandInfo($slug: ID!) {
      brand(id: $slug, idType: SLUG) {
        id
        name
        description
        brandBanner
        count
      }
    }
  `;

  const variables = { slug };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  const json = await res.json();
  return json.data?.brand;
}

export async function fetchBrandProducts(slug: string, after?: string) {
  const query = `
    query GetBrandProducts($slug: ID!, $after: String) {
      brand(id: $slug, idType: SLUG) {
        products(first: 100, after: $after) {
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
            }
            brands {
              nodes {
                name
                slug
              }
            }
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    }
  `;

  // const variables = { slug, after };

  // const res = await fetch(endpoint, {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ query, variables }),
  //   cache: 'no-store',
  // });

  // const json = await res.json();
  // return json.data?.brand?.products;

  const variables = { slug, after };

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  const json = await res.json();
  const products = json.data?.brand?.products;

  // Сортируем: товары в наличии сначала, нет в наличии - в конец
  if (products?.nodes) {
    products.nodes.sort((a: any, b: any) => {
      const aInStock = a.stockStatus === 'IN_STOCK' && (a.stockQuantity || 0) > 0;
      const bInStock = b.stockStatus === 'IN_STOCK' && (b.stockQuantity || 0) > 0;

      if (aInStock && !bInStock) return -1;
      if (!aInStock && bInStock) return 1;
      return 0;
    });
  }

  return products;
}