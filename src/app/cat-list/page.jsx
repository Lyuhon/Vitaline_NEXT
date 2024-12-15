"use client";

import { useState, useEffect } from "react";
import './s.css'

const endpoint = "https://nuxt.vitaline.uz/graphql";


export default function Page() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const query = `
            query GetProductCategories {
                productCategories(first: 100, where: { hideEmpty: true }) {
                  nodes {
                    id
                    name
                    slug
                  }
                }
              }
              
      `;

            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query })
            });

            const json = await res.json();
            setCategories(json?.data?.productCategories?.nodes || []);
        };

        fetchCategories();
    }, []);

    return (
        <div className="cat_list_ppp">
            <h1>Список категорий</h1>
            <ol>
                {categories.map((category) => (
                    <li key={category.id}>
                        <a href={`/${category.slug}`}>{category.name}</a>
                    </li>
                ))}
            </ol>
        </div>
    );
}
