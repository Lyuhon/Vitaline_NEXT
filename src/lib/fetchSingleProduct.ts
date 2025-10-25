// // src/lib/fetchSingleProduct.js
// import { GraphQLClient, gql } from 'graphql-request';

// const endpoint = 'https://nuxt.vitaline.uz/graphql';

// const query = gql`
//   query GetProductBySlug($slug: ID!) {
//     product(id: $slug, idType: SLUG) {
//       id
//       name
//       slug
//       description
//       shortDescription
//       sku  
//       image {
//         sourceUrl
//         altText
//       }
//       galleryImages {
//         nodes {
//           sourceUrl
//           altText
//         }
//       }
//       ... on SimpleProduct {
//         price
//         convertedPrice
//         stockStatus
//         stockQuantity
//         maxOrderQty
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
//       productCategories {
//         nodes {
//           name
//           slug
//         }
//       }
//       productTags {
//         nodes {
//           name
//           slug
//         }
//       }
//     }
//   }
// `;

// function formatPrice(price) {
//   const numericPrice = parseFloat(price.replace(/\s/g, '').replace(',', '.'));
//   if (isNaN(numericPrice)) {
//     return price;
//   }
//   const formattedPrice = numericPrice
//     .toLocaleString('en-US')
//     .replace(/,/g, ' ');
//   return `${formattedPrice} сӯм`;
// }

// export async function fetchSingleProduct(slug) {
//   const client = new GraphQLClient(endpoint, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   try {
//     const data = await client.request(query, { slug });
//     if (data.product && data.product.price) {
//       data.product.price = formatPrice(data.product.price);
//     }
//     return data.product;
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     return null;
//   }
// }






// src/lib/fetchSingleProduct.ts
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://nuxt.vitaline.uz/graphql';

const query = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      name
      name_uz
      slug
      description
      description_uz
      shortDescription
      shortDescription_uz
      sku  
      image {
        sourceUrl
        altText
      }
      galleryImages {
        nodes {
          sourceUrl
          altText
        }
      }
      ... on SimpleProduct {
        price
        convertedPrice
        stockStatus
        stockQuantity
        maxOrderQty
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
      productCategories {
        nodes {
          name
          name_uz
          slug
        }
      }
      productTags {
        nodes {
          name
          name_uz
          slug
        }
      }
    }
  }
`;

function formatPrice(price: string, locale: string) {
  const numericPrice = parseFloat(price.replace(/\s/g, '').replace(',', '.'));
  if (isNaN(numericPrice)) {
    return price;
  }
  const formattedPrice = numericPrice
    .toLocaleString('en-US')
    .replace(/,/g, ' ');
  return `${formattedPrice} ${locale === 'uz' ? "so'm" : 'сӯм'}`;
}

interface GraphQLResponse {
  product: Product | null;
}

// Assuming Product type is defined here or imported
interface Product {
  id: string;
  name: string;
  name_uz?: string;
  slug: string;
  description: string;
  description_uz?: string;
  shortDescription: string;
  shortDescription_uz?: string;
  sku?: string;
  image?: {
    sourceUrl?: string;
    altText?: string;
  };
  galleryImages?: {
    nodes: {
      sourceUrl: string;
      altText?: string;
    }[];
  };
  price?: string;
  convertedPrice?: string;
  stockStatus?: string;
  stockQuantity?: number;
  maxOrderQty?: number | null;
  productCategories?: {
    nodes: {
      name: string;
      name_uz?: string;
      slug: string;
    }[];
  };
  productTags?: {
    nodes: {
      name: string;
      name_uz?: string;
      slug: string;
    }[];
  };
  brands?: {
    nodes: {
      id: string;
      name: string;
      slug: string;
      brandBanner?: string;
      brandId?: string;
      brandThumbnail?: string;
    }[];
  };
}

export async function fetchSingleProduct(slug: string, locale: string) {
  const client = new GraphQLClient(endpoint, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    const data = await client.request<GraphQLResponse>(query, { slug });
    if (!data.product) {
      return null;
    }

    const product = data.product;

    // Применяем переводы в зависимости от locale
    if (locale === 'uz') {
      product.name = product.name_uz || product.name;
      product.description = product.description_uz || product.description;
      product.shortDescription = product.shortDescription_uz || product.shortDescription;

      if (product.productCategories?.nodes) {
        product.productCategories.nodes = product.productCategories.nodes.map((cat) => ({
          ...cat,
          name: cat.name_uz || cat.name,
        }));
      }

      if (product.productTags?.nodes) {
        product.productTags.nodes = product.productTags.nodes.map((tag) => ({
          ...tag,
          name: tag.name_uz || tag.name,
        }));
      }
    }

    // Форматируем цену
    if (product.price) {
      product.price = formatPrice(product.price, locale);
    }

    return product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}