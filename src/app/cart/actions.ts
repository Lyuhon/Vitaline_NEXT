// app/cart/actions.ts
'use server';

interface ProductImage {
  sourceUrl: string;
}

interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  price: string;
  convertedPrice: string;
  stockStatus: string;
  stockQuantity: number;
  image: ProductImage;
}

async function fetchSingleProductByID(id: string): Promise<Product | null> {
  const query = `
      query GetSimpleProduct($id: ID!) {
        product(id: $id, idType: ID) {
          id 
          name
          slug
          sku 
          ... on SimpleProduct {
            price
            convertedPrice 
            stockStatus
            stockQuantity
            image {
              sourceUrl
            }
          }
        }
      }
    `;

  try {
    const res = await fetch('https://nuxt.vitaline.uz/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { id } }),
      next: { revalidate: 1800 },
      // cache: 'force-cache'
    });

    if (!res.ok) return null;

    const json = await res.json();
    const product = json?.data?.product;

    if (!product?.id || !("price" in product)) {
      return null;
    }

    return product as Product;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return null;
  }
}

export async function fetchProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return [];
  const fetchPromises = ids.map(id => fetchSingleProductByID(id));
  const results = await Promise.all(fetchPromises);
  return results.filter((product): product is Product => product !== null);
}
