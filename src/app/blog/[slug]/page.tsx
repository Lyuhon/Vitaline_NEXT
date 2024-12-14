// src/app/blog/[slug]/page.tsx

import { Metadata } from "next";
import './post.css';

const endpoint = "https://nuxt.vitaline.uz/graphql";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = await fetchPost(params.slug);
    return {
        title: post.title,
        description: `Читайте пост ${post.title} на блоге Vitaline.`,
    };
}

async function fetchPost(slug: string) {
    const query = `
    query GetPost($slug: String!) {
      postBy(slug: $slug) {
        title
        content
        categories {
          nodes {
            name
          }
        }
        tags {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
      }
    }
  `;

    const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables: { slug } }),
    });

    const json = await res.json();
    if (!json.data?.postBy) {
        throw new Error("Post not found");
    }
    return json.data.postBy;
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
    const post = await fetchPost(params.slug);

    return (
        <div className="single_post_wrapper">
            <div className="post_title">
                <h1>{post.title}</h1>


                <div
                    className="post_hero"
                    style={{ backgroundImage: `url(${post.featuredImage?.node?.sourceUrl || ""})` }}
                >

                    <div className="post_hero_gradient">

                        <div className="single_post_meta">
                            <p>Категории: {post.categories.nodes.map((cat: any) => cat.name).join(", ")}</p>
                            {/* Условие для вывода меток */}
                            {post.tags.nodes.length > 0 && (
                                <p>Метки: {post.tags.nodes.map((tag: any) => tag.name).join(", ")}</p>
                            )}
                        </div>
                    </div>

                </div>

                <div
                    className="post_full_content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>
        </div>
    );
}

