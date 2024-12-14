// src/app/page.tsx
import { fetchProducts } from '../lib/fetchProducts';
import ProductsSection from '../components/ProductsSection';
import HomeCategories from '../components/HomeCategories';
import HomeAdvantages from '../components/HomeAdvantages';
import UsefulBlog from '../components/UsefulBlog';

import HomeSlider from "@/components/HomeSlider";



export default async function Page() {
  const products = await fetchProducts();

  return (
    <>

      <HomeSlider />

      <ProductsSection products={products} />
      {/* Здесь вы можете добавить другие секции вашей главной страницы */}


      <HomeCategories />

      <HomeAdvantages />

      <UsefulBlog />
    </>
  );
}
