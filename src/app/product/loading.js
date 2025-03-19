// app/product/[slug]/loading.js
'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Проверка, является ли устройство мобильным
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Скролл к верху страницы
    if (isMobile) {
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, 115); // Для ПК скроллим на 115 пикселей вниз
    }

    return () => window.removeEventListener('resize', checkMobile);
  }, [isMobile]); // Добавляем isMobile в зависимости

  return (
    <div className="max-w-[1220px] px-5 mx-auto mb-[60px] mt-5">
      {/* Хлебные крошки */}
      <div className="hidden md:block mb-4 h-6 w-[45%] bg-gray-200 animate-pulse rounded"></div>

      <div className="md:hidden block mb-4 mt-12 h-4 w-[100%] bg-gray-200 animate-pulse rounded"></div>
      <div className="md:hidden block mb-4 h-4 w-[100%] bg-gray-200 animate-pulse rounded"></div>
      <div className="md:hidden block mb-8 h-4 w-[40%] bg-gray-200 animate-pulse rounded"></div>

      {/* Основной контент: изображение + информация о продукте */}
      <div className="flex flex-col md:flex-row md:justify-between gap-6">
        {/* Блок с изображением */}
        <div className="flex flex-col gap-4 md:w-[40%]">
          <div className="w-full aspect-square bg-gray-200 animate-pulse rounded"></div>
          <div className="flex gap-2">
            <div className="w-[25%] aspect-square bg-gray-200 animate-pulse rounded"></div>
            <div className="w-[25%] aspect-square bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>

        {/* Блок с информацией о продукте */}
        <div className="md:w-[50%]">
          {/* Заголовок */}
          <div className="h-8 w-3/4 bg-gray-200 animate-pulse rounded mb-8"></div>

          {/* Метки и категории */}
          <div className="flex gap-2 mb-4">
            <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
          </div>

          {/* Цена */}
          <div className="h-8 w-32 bg-gray-200 animate-pulse rounded mb-8"></div>

          {/* Количество и кнопки */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-10 w-32 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-10 w-40 bg-gray-200 animate-pulse rounded"></div>
          </div>

          {/* Количество и кнопки */}
          <div className="flex items-center gap-4 mb-4">
            <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-6 w-40 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-6 w-40 bg-gray-200 animate-pulse rounded"></div>
          </div>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-6 w-40 bg-gray-200 animate-pulse rounded"></div>
          </div>

          {/* Доставка и оплата */}
          <div className="h-6 w-1/2 bg-gray-200 animate-pulse rounded mb-2"></div>
          <div className="flex gap-2">
            <div className="h-6 w-48 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-6 w-12 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-6 w-12 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}