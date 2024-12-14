// src/lib/fetchBlogSection.js
import { GraphQLClient } from "graphql-request";

const endpoint = "https://nuxt.vitaline.uz/graphql";

const graphQLClient = new GraphQLClient(endpoint);

const GET_ALL_POSTS = `
  query GetAllPosts {
    posts {
      nodes {
        id
        title
        slug
        excerpt
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  }
`;

export const fetchBlogPosts = async () => {
    try {
        const data = await graphQLClient.request(GET_ALL_POSTS);
        return data.posts.nodes;
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
};
