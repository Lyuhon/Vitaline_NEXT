// src/app/page.tsx
import { headers } from 'next/headers'; // Для получения userType
import { fetchFeaturedProducts } from '@/lib/fetchFeaturedProducts';
import { fetchBackInStockProducts } from '@/lib/fetchBackInStockProducts';
import ProductsSection_SalesOfMonth from '@/components/ProductsSection_SalesOfMonth';
import ProductsSection_BackInStock from '@/components/ProductsSection_BackInStock';
import HomeSlider from "@/components/HomeSlider";
import HomeBrands from '@/components/HomeBrandsShort';
import HomeAdvantages from '@/components/HomeAdvantages';

export default async function Page() {
  // Получаем userType из заголовков
  const headersList = await headers();
  const userType = headersList.get("x-user-type") || null;

  // Получаем товары
  const featuredProducts = await fetchFeaturedProducts();
  const fetchBackInStock = await fetchBackInStockProducts();

  // Фильтрация товаров для обоих слайдеров
  const restrictedBrands = ['carlson-labs', 'childlife'];
  const filteredFeaturedProducts = userType === 'restricted'
    ? featuredProducts.filter((product: any) => {
      if (!product.brands || !product.brands.nodes?.length) return true;
      return !product.brands.nodes.some((brand: any) =>
        restrictedBrands.includes(brand.slug.toLowerCase())
      );
    })
    : featuredProducts;

  const filteredBackInStock = userType === 'restricted'
    ? fetchBackInStock.filter((product: any) => {
      if (!product.brands || !product.brands.nodes?.length) return true;
      return !product.brands.nodes.some((brand: any) =>
        restrictedBrands.includes(brand.slug.toLowerCase())
      );
    })
    : fetchBackInStock;

  // Логирование для отладки (опционально)
  console.log("User Type:", userType);
  console.log("Featured Products before filter:", featuredProducts.length);
  console.log("Featured Products after filter:", filteredFeaturedProducts.length);
  console.log("BackInStock Products before filter:", fetchBackInStock.length);
  console.log("BackInStock Products after filter:", filteredBackInStock.length);

  return (
    <div className="home_page_content">
      <HomeSlider />
      <HomeBrands />
      <ProductsSection_SalesOfMonth products={filteredFeaturedProducts} />
      <ProductsSection_BackInStock products={filteredBackInStock} />
      <HomeAdvantages />
    </div>
  );
}