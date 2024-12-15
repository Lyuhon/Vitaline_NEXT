import { Metadata } from "next";
import './post.css';

const endpoint = "https://nuxt.vitaline.uz/graphql";

// Функция для получения метаданных
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; // Дожидаемся params
  const post = await fetchPost(slug);

  return {
    title: post.title,
    description: `Читайте пост ${post.title} на блоге Vitaline.`,
  };
}

// Функция для получения данных поста
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

// Компонент страницы поста
export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; // Дожидаемся params
  const post = await fetchPost(slug);

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
