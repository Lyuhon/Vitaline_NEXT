// // // src/app/layout.tsx
// import './globals.css';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import PageTransition from '@/components/PageTransition';
// // import AnimatedWrapper from '@/components/animation/AnimatedWrapper';

// import { Metadata } from 'next';
// // import Script from 'next/script';

// import { Suspense } from "react";
// import { Metrika } from "@/components/Metrika";


// export const metadata: Metadata = {
//   title: 'Интернет магазин витаминов - Vitaline',
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="ru">
//       <head>
//         <meta charSet="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <link
//           rel="stylesheet"
//           href="https://unpkg.com/swiper/swiper-bundle.min.css"
//         />
//         <link
//           rel="icon"
//           type="image/png"
//           sizes="32x32"
//           href="https://www.vitaline.uz/wp-content/themes/vl/assets/img/favicons/favicon-32x32.png"
//         />
//       </head>
//       <body>
//         <Header />
//         {/* <AnimatedWrapper> */}
//         {/* Был рабочий */}
//         {/* <PageTransition> */}
//         {/* <div id="page-transition-wrapper" className="content-wrapper page-transition"> */}

//         <div className="content-wrapper">
//           {children}
//         </div>

//         {/* </PageTransition> */}
//         {/* </AnimatedWrapper> */}
//         <Footer />
//         <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
//         <Suspense>
//           <Metrika />
//         </Suspense>
//       </body>
//     </html >
//   );
// }





// // // src/app/layout.tsx
// import './globals.css';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// // import PageTransition from '@/components/PageTransition';
// // import AnimatedWrapper from '@/components/animation/AnimatedWrapper';

// import Script from 'next/script';

// import { Metadata } from 'next';
// // import Script from 'next/script';

// import { Suspense } from "react";
// import { Metrika } from "@/components/Metrika";


// export const metadata: Metadata = {
//   title: 'Оптовый интернет магазин витаминов - Vitaline Trade',
//   description: 'Купить оптом витамины в Ташкенте с доставкой. Широкий выбор витаминов, БАДов и товаров для здоровья.',
//   openGraph: {
//     title: 'Интернет магазин витаминов - Vitaline',
//     description: 'Купить оптом витамины в Ташкенте с доставкой. Широкий выбор витаминов, БАДов и товаров для здоровья.',
//     url: 'https://www.vitaline-trade.com/',
//     siteName: 'Vitaline',
//     images: [
//       {
//         url: 'https://nuxt.vitaline.uz/wp-content/uploads/2025/01/vitaline-og-banner.jpg', // Замените на реальный путь
//         width: 1200,
//         height: 630,
//         alt: 'Vitaline Trade - Оптовый магазин витаминов в Ташкенте',
//       }
//     ],
//     locale: 'ru_RU',
//     type: 'website',
//   },
//   // Дополнительные метатеги
//   robots: {
//     index: true,
//     follow: true,
//   },
//   icons: {
//     icon: 'https://nuxt.vitaline.uz/wp-content/uploads/2025/01/vitaline-favicon.png',
//   },
// };

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="ru">
//       <head>
//         <meta charSet="UTF-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//         <link
//           rel="stylesheet"
//           href="https://unpkg.com/swiper/swiper-bundle.min.css"
//         />
//         <link
//           rel="icon"
//           type="image/png"
//           sizes="32x32"
//           // href="https://www.vitaline.uz/wp-content/themes/vl/assets/img/favicons/favicon-32x32.png"
//           href="https://nuxt.vitaline.uz/wp-content/uploads/2025/01/vitaline-favicon.png"
//         />
//       </head>
//       <body>
//         <Header />
//         {/* <AnimatedWrapper> */}
//         {/* Был рабочий */}
//         {/* <PageTransition> */}
//         {/* <div id="page-transition-wrapper" className="content-wrapper page-transition"> */}

//         <div className="content-wrapper">
//           {children}
//         </div>

//         {/* </PageTransition> */}
//         {/* </AnimatedWrapper> */}
//         <Footer />
//         <Script
//           // src="https://unpkg.com/swiper/swiper-bundle.min.js"
//           src="/swiper-bundle.min.js"
//           strategy="beforeInteractive"
//           // Добавляем кеширование
//           crossOrigin="anonymous"
//         />
//         <Suspense>
//           <Metrika />
//         </Suspense>
//       </body>
//     </html >
//   );
// }



// // src/app/layout.tsx
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import PageTransition from '@/components/PageTransition';
// import AnimatedWrapper from '@/components/animation/AnimatedWrapper';

import Script from 'next/script';

import { Metadata } from 'next';
// import Script from 'next/script';

import { Suspense } from "react";
import { Metrika } from "@/components/Metrika";


//ОГРАНИЧЕНИЕ ПОЛЬЗОВАТЕЛЯ
import HeaderWrapper from '@/components/HeaderWrapper';

export const metadata: Metadata = {
  title: 'Оптовый интернет магазин витаминов - Vitaline Trade',
  description: 'Купить оптом витамины в Ташкенте с доставкой. Широкий выбор витаминов, БАДов и товаров для здоровья.',
  icons: {
    icon: [
      { url: '/vitaline-icon-32.png', type: 'image/png' },
    ],
    apple: [
      { url: '/vitaline-apple-icon-180.png' },
    ],
    shortcut: [{ url: '/vitaline-icon-32.png' }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/swiper/swiper-bundle.min.css"
        />
        {/* <link
          rel="icon"
          type="image/png"
          href="https://nuxt.vitaline.uz/wp-content/uploads/2025/01/vitaline-icon.png"
        // href="https://www.vitaline.uz/wp-content/themes/vl/assets/img/favicons/favicon-32x32.png"
        /> */}

        <meta property="og:title" content="Оптовый интернет магазин витаминов - Vitaline Trade" />
        <meta property="og:description" content="Купить оптом витамины в Ташкенте с доставкой. Широкий выбор витаминов, БАДов и товаров для здоровья." />
        <meta property="og:url" content="https://www.vitaline-trade.com/" />
        <meta property="og:site_name" content="Vitaline Trade" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:image" content="https://nuxt.vitaline.uz/wp-content/uploads/2025/01/vitaline-og-banner.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Vitaline Trade - Оптовый магазин витаминов в Ташкенте"></meta>
      </head>
      <body>
        {/* <Header /> */}<HeaderWrapper />
        {/* <AnimatedWrapper> */}
        {/* Был рабочий */}
        {/* <PageTransition> */}
        {/* <div id="page-transition-wrapper" className="content-wrapper page-transition"> */}

        <div className="content-wrapper">
          {children}
        </div>

        {/* </PageTransition> */}
        {/* </AnimatedWrapper> */}
        <Footer />
        <Script
          // src="https://unpkg.com/swiper/swiper-bundle.min.js"
          src="/swiper-bundle.min.js"
          strategy="beforeInteractive"
          // Добавляем кеширование
          crossOrigin="anonymous"
        />
        <Suspense>
          <Metrika />
        </Suspense>
      </body>
    </html >
  );
}