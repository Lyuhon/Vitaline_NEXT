// // lib/brand/fetchBrandData.ts
// const endpoint = 'https://nuxt.vitaline.uz/graphql';

// export async function fetchAllBrands() {
//   /**
//    * ГрафQL-запрос на получение всех брендов:
//    *
//    * query MyBrands {
//    *   brands {
//    *     nodes {
//    *       id
//    *       name
//    *       slug
//    *       brandThumbnail
//    *     }
//    *   }
//    * }
//    */
//   const query = `
//     query MyBrands {
//       brands(first: 50, where: {hideEmpty: true}) {
//         nodes {
//           id
//           name
//           slug
//           brandThumbnail
//         }
//       }
//     }
//   `;

//   const res = await fetch(endpoint, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ query }),
//     // cache: 'no-store',
//     next: { revalidate: 3600 },
//   });

//   const json = await res.json();
//   const brands = json?.data?.brands?.nodes || [];
//   return brands;
// }


// lib/brand/fetchBrandData.ts
import { headers } from "next/headers";

const endpoint = 'https://nuxt.vitaline.uz/graphql';

export async function fetchAllBrands() {
  const query = `
    query MyBrands {
      brands(first: 50, where: {hideEmpty: true}) {
        nodes {
          id
          name
          slug
          brandThumbnail
        }
      }
    }
  `;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  const json = await res.json();
  let brands = json?.data?.brands?.nodes || [];

  // Получаем userType из заголовков с использованием await
  const headersList = await headers(); // Ждём результат headers
  const userType = headersList.get("x-user-type") as string | null;

  // Фильтруем бренды для ограниченного аккаунта
  if (userType === "restricted") {
    const restrictedBrands = ['carlson-labs', 'childlife']; // Slug-ы брендов
    brands = brands.filter((brand: { slug: string }) => !restrictedBrands.includes(brand.slug));
  }

  return brands;
}