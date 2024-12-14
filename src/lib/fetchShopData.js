import { GraphQLClient } from "graphql-request";

const endpoint = "https://nuxt.vitaline.uz/graphql";
const client = new GraphQLClient(endpoint);

const PRODUCTS_AND_TAGS_QUERY = `
  query GetProductsAndTags($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      nodes {
        id
        name
        slug
        price
        image {
          sourceUrl
          altText
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
    tags {
      nodes {
        id
        name
      }
    }
  }
`;

export async function fetchProductsAndTags(page = 1, itemsPerPage = 8) {
  const after = page > 1 ? btoa(`arrayconnection:${(page - 1) * itemsPerPage}`) : null;

  try {
    const data = await client.request(PRODUCTS_AND_TAGS_QUERY, {
      first: itemsPerPage, // Передаём обязательный аргумент
      after,
    });

    const products = data.products.nodes.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price || "Цена не указана",
      image: product.image || { sourceUrl: "/images/default-product.jpg" },
    }));

    const tags = data.tags.nodes.map((tag) => ({
      id: tag.id,
      name: tag.name,
    }));

    return { products, tags, hasNextPage: data.products.pageInfo.hasNextPage };
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    throw error;
  }
}
