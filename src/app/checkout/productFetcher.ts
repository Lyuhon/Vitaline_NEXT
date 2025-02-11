// productFetcher.ts

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
        });

        if (!res.ok) {
            console.error(`Сетевая ошибка при запросе продукта с ID ${id}: ${res.statusText}`);
            return null;
        }

        const json = await res.json();
        const product = json?.data?.product;

        if (!product || !product.id) {
            console.warn(`Продукт не найден или отсутствует ID для ID ${id}`);
            return null;
        }

        if (!("price" in product)) {
            console.warn(`У продукта с ID ${id} отсутствует поле price`);
            return null;
        }

        return product as Product;
    } catch (error) {
        console.error(`Ошибка при получении продукта с ID ${id}:`, error);
        return null;
    }
}

export async function fetchProductsByIds(ids: string[]): Promise<Product[]> {
    if (ids.length === 0) return [];

    // Создаем массив промисов для параллельных запросов
    const fetchPromises = ids.map(id => fetchSingleProductByID(id));

    // Выполняем все запросы параллельно
    const results = await Promise.all(fetchPromises);

    // Фильтруем успешные результаты
    return results.filter((product): product is Product => product !== null);
}