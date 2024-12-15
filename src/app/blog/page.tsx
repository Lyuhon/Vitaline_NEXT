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

// Генерация метаданных для страницы блога
export async function generateMetadata(): Promise<Metadata> {
    return {
        title: "Блог - Vitaline.uz",
        description: "Читайте полезные посты на нашем блоге.",
    };
}

export default async function BlogPage() {
    try {
        // Получение данных с API
        const posts: BlogPost[] = await fetchBlogPosts();

        return (
            <section className="blog_page">
                <h1>Полезный блог</h1>
                <div className="blog__categories" style={{ display: "none" }}>
                    {["Красота", "Здоровье", "Фитнес", "Питание", "Самочувствие", "События", "Новости"].map((category) => (
                        <button key={category} className="category">
                            {category}
                        </button>
                    ))}
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
                                    <img
                                        src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Rectangle-60.svg"
                                        alt={`Открыть статью ${post.title}`}
                                    />
                                    <span>Открыть статью</span>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </section>
        );
    } catch (error) {
        console.error("Ошибка загрузки постов блога:", error);
        return (
            <section className="blog_page">
                <h1>Полезный блог</h1>
                <p>К сожалению, произошла ошибка при загрузке постов. Пожалуйста, попробуйте позже.</p>
            </section>
        );
    }
}
