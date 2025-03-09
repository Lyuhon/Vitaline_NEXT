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
//   // Убедимся, что цена это число, если она строка, то преобразуем ее
//   const numericPrice = parseFloat(price.replace(/\s/g, '').replace(',', '.')); // Убираем пробелы и заменяем запятую на точку

//   if (isNaN(numericPrice)) {
//     return price; // если цена не число, возвращаем как есть
//   }

//   // Преобразуем цену в строку с пробелами в качестве разделителей тысяч
//   const formattedPrice = numericPrice
//     .toLocaleString('en-US') // Форматируем число с разделителями
//     .replace(/,/g, ' '); // Заменяем запятые на пробелы

//   return `${formattedPrice} сӯм`;
// }

// export async function fetchSingleProduct(slug) {
//   const client = new GraphQLClient(endpoint, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   // const data = await client.request(query, { slug });

//   // // Проверяем, если цена существует, то форматируем
//   // if (data.product && data.product.price) {
//   //   data.product.price = formatPrice(data.product.price);
//   // }

//   // return data.product;
//   try {
//     const data = await client.request(query, { slug });

//     if (data.product && data.product.price) {
//       data.product.price = formatPrice(data.product.price);
//     }

//     return data.product;
//   } catch (error) {
//     console.error('Error fetching product:', error);
//     return null; // Возвращаем null при ошибке
//   }
// }


// src/lib/fetchSingleProduct.js
import { GraphQLClient, gql } from 'graphql-request';

const endpoint = 'https://nuxt.vitaline.uz/graphql';

const query = gql`
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      id
      name
      slug
      description
      shortDescription
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
          slug
        }
      }
      productTags {
        nodes {
          name
          slug
        }
      }
    }
  }
`;

function formatPrice(price) {
  const numericPrice = parseFloat(price.replace(/\s/g, '').replace(',', '.'));
  if (isNaN(numericPrice)) {
    return price;
  }
  const formattedPrice = numericPrice
    .toLocaleString('en-US')
    .replace(/,/g, ' ');
  return `${formattedPrice} сӯм`;
}

export async function fetchSingleProduct(slug) {
  const client = new GraphQLClient(endpoint, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    const data = await client.request(query, { slug });
    if (data.product && data.product.price) {
      data.product.price = formatPrice(data.product.price);
    }
    return data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}