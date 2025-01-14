// lib/brand/fetchBrandData.ts
const endpoint = 'https://nuxt.vitaline.uz/graphql';

export async function fetchAllBrands() {
  /**
   * ГрафQL-запрос на получение всех брендов:
   *
   * query MyBrands {
   *   brands {
   *     nodes {
   *       id
   *       name
   *       slug
   *       brandThumbnail
   *     }
   *   }
   * }
   */
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
    // cache: 'no-store',
    next: { revalidate: 3600 },
  });

  const json = await res.json();
  const brands = json?.data?.brands?.nodes || [];
  return brands;
}
