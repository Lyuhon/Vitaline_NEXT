// src/app/blog/page.tsx
import { fetchBlogPosts } from "@/lib/fetchBlogPage";
import { Metadata } from "next";
import Link from "next/link";
import './blog.css';

// Описание интерфейса для постов
interface BlogPost {
    id: string;
    title: string;
    slug: string;
    featuredImage?: {
        node?: {
            sourceUrl?: string;
        };
    };
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    return {
        title: "Блог - Vitaline.uz",
        description: `Читайте полезные посты на нашем блоге.`,
    };
}

export default async function BlogPage() {
    // Получение данных с API
    const posts: BlogPost[] = await fetchBlogPosts();

    return (
        <section className="blog_page">
            <h1>Полезный блог</h1>
            <div className="blog__categories" style={{ display: "none" }}>
                <button className="category">Красота</button>
                <button className="category">Здоровье</button>
                <button className="category">Фитнес</button>
                <button className="category">Питание</button>
                <button className="category">Самочувствие</button>
                <button className="category">События</button>
                <button className="category">Новости</button>
            </div>

            <div className="blog__grid">
                {posts.map((post) => (
                    <article
                        key={post.id}
                        className="blog__item"
                        style={{
                            backgroundImage: post.featuredImage?.node?.sourceUrl
                                ? `url(${post.featuredImage.node.sourceUrl})`
                                : undefined,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >

                        <Link href={`/blog/${post.slug}`} className="blog__link">
                            <h3>{post.title}</h3>
                            <div className="read_more_svg">
                                <img src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Rectangle-60.svg" alt="" />
                                <span>Открыть статью</span>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>

        </section>
    );
}
