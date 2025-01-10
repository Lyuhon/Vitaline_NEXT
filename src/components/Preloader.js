// // components/Preloader.js
// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import styles from './Preloader.module.css';

// export default function Preloader() {
//     const router = useRouter();
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         const handleStart = () => setLoading(true);
//         const handleComplete = () => {
//             setTimeout(() => setLoading(false), 300); // Задержка 300ms
//         };

//         router.events.on('routeChangeStart', handleStart);
//         router.events.on('routeChangeComplete', handleComplete);
//         router.events.on('routeChangeError', handleComplete);

//         return () => {
//             router.events.off('routeChangeStart', handleStart);
//             router.events.off('routeChangeComplete', handleComplete);
//             router.events.off('routeChangeError', handleComplete);
//         };
//     }, [router]);

//     return (
//         loading && (
//             <div className={styles.preloader}>
//                 <Image
//                     src="https://nuxt.vitaline.uz/wp-content/uploads/2024/12/8e3bc2dcd6d2b7628adf6e926f325187.png"
//                     alt="Vitaline Logo"
//                     className="header__logo-image"
//                     width={240}
//                     height={100}
//                 />
//             </div>
//         )
//     );
// }
