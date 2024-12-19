// // src/app/layout.tsx
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
// import AnimatedWrapper from '@/components/animation/AnimatedWrapper';

import { Metadata } from 'next';
// import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Главная',
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
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://www.vitaline.uz/wp-content/themes/vl/assets/img/favicons/favicon-32x32.png"
        />
      </head>
      <body>
        <Header />
        {/* <AnimatedWrapper> */}
        <PageTransition>
          {/* <div id="page-transition-wrapper" className="content-wrapper page-transition"> */}
          <div className="content-wrapper">
            {children}
          </div>
        </PageTransition>
        {/* </AnimatedWrapper> */}
        <Footer />
        <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
      </body>
    </html >
  );
}



