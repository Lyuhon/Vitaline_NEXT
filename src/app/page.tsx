// src/app/page.tsx
// import { fetchProducts } from '../lib/fetchProducts';
import { fetchFeaturedProducts } from '../lib/fetchFeaturedProducts';
import { fetchBackInStockProducts } from '../lib/fetchBackInStockProducts';
// import ProductsSection from '../components/ProductsSection';
import ProductsSection_SalesOfMonth from '../components/ProductsSection_SalesOfMonth';
import ProductsSection_BackInStock from '../components/ProductsSection_BackInStock';

// import HomeCategories from '../components/HomeCategories';
import HomeAdvantages from '../components/HomeAdvantages';
import HomeBrands from '../components/HomeBrands';
// import UsefulBlog from '../components/UsefulBlog';

// import { MiniCartProvider } from '@/app/context/MiniCartContext';


import HomeSlider from "@/components/HomeSlider";



export default async function Page() {
  // const products = await fetchProducts();
  const featuredProducts = await fetchFeaturedProducts();
  const fetchBackInStock = await fetchBackInStockProducts();


  return (
    <>

      <div className="home_page_content">
        <HomeSlider />

        <HomeBrands />

        <ProductsSection_SalesOfMonth products={featuredProducts} />

        <ProductsSection_BackInStock products={fetchBackInStock} />

        {/* <ProductsSection products={products} /> */}

        {/* <HomeCategories /> */}

        <HomeAdvantages />

        {/* <UsefulBlog /> */}

        {/* <CurrencyCahnger /> */}
      </div>

    </>
  );
}
