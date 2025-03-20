export default function Loading() {
  return (
    <div className="max-w-[1220px] px-5 my-[60px] mx-auto rounded-[30px]">
      {/* Заголовок "Продукция по бренду" */}
      <div className="mb-4 h-8 w-3/4 md:w-1/4 bg-gray-200 animate-pulse rounded"></div>

      {/* Блок с логотипами брендов */}
      <div className="hidden md:flex justify-between gap-4 mb-16">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="w-[12%] h-36 bg-gray-200 animate-pulse rounded"
          ></div>
        ))}
      </div>

      {/* Блок с логотипами брендов МОБИЛКА*/}
      <div className="md:hidden flex justify-between gap-4 mb-16">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="w-[25%] h-20 bg-gray-200 animate-pulse rounded"
          ></div>
        ))}
      </div>

      {/* Заголовок "Каталог товаров" */}
      <div className="mb-4 h-8 w-2/3 md:w-1/3 bg-gray-200 animate-pulse rounded"></div>

      {/* Подзаголовок "Отображено 1-20 из 943" */}
      <div className="mb-6 h-6 w-2/4 md:w-1/4 bg-gray-200 animate-pulse rounded"></div>

      {/* Сетка товаров */}
      <div className="shop_page_prod_grid">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="product_item">
            {/* Изображение */}
            <div className="w-full h-48 bg-gray-200 animate-pulse rounded mb-4"></div>
            {/* Бренд */}
            <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded mb-2"></div>
            {/* Название */}
            <div className="h-5 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-5 bg-gray-200 animate-pulse rounded mb-4"></div>

            {/* Цена */}
            <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded m-auto mb-4"></div>
            {/* Кнопка "Добавить" */}
            <div className="h-10 w-full bg-gray-200 animate-pulse rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}