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