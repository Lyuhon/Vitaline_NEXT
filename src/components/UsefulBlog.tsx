"use client";

import React, { useEffect, useState } from "react";
import { fetchBlogPosts } from "@/lib/fetchBlogSection";

// Интерфейс для типов данных поста
interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    featuredImage?: {
        node?: {
            sourceUrl?: string;
        };
    };
}

const UsefulBlog: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);

    useEffect(() => {
        const getPosts = async () => {
            const data = await fetchBlogPosts();
            setPosts(data.slice(0, 5)); // Берём только 5 последних постов
        };
        getPosts();
    }, []);

    return (
        <section className="useful_blog">
            {/* Заголовок секции */}
            <div className="home_categories_section_heading">
                <div className="general_heading_block">
                    <h2>Полезный блог</h2>
                    <a className="section_read_more" href="/blog">
                        Все статьи
                    </a>
                </div>
                <div className="orange_heading_divider"></div>
            </div>

            {/* Облако категорий */}
            <div className="cats_cloud">
                <a href="#">Красота</a>
                <a href="#">Здоровье</a>
                <a href="#">Фитнес</a>
                <a href="#">Питание</a>
                <a href="#">Самочувствие</a>
                <a href="#">События</a>
                <a href="#">Новости</a>
            </div>

            {/* Список постов */}
            <div className="list_blog">
                {posts.map((post) => (
                    <div
                        key={post.id}
                        className="div_list_blog_item"
                        style={{
                            backgroundImage: `url(${post.featuredImage?.node?.sourceUrl || "/images/default.jpg"})`,
                        }}
                    >
                        <a href={`/blog/${post.slug}`} className="list_blog_item">
                            <div className="blog_post_title">{post.title}</div>

                            <div className="read_more_svg">
                                <img alt="" src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/Rectangle-60.svg" />
                                <span>Открыть статью</span>
                            </div>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default UsefulBlog;
