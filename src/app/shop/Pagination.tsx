// // // components/Pagination.tsx
// // 'use client';

// // import Link from 'next/link';
// // import { useEffect } from 'react';
// // import { usePathname, useSearchParams } from 'next/navigation';

// // interface PaginationProps {
// //     currentPage: number;
// //     totalPages: number;
// // }

// // export function Pagination({ currentPage, totalPages }: PaginationProps) {
// //     const pathname = usePathname();
// //     const searchParams = useSearchParams();

// //     // Эффект для скролла при изменении страницы
// //     useEffect(() => {
// //         window.scrollTo({ top: 0, behavior: 'smooth' });
// //     }, [searchParams.get('page')]);

// //     const getPageNumbers = () => {
// //         const pages = [];
// //         const startRange = Math.min(3, totalPages);
// //         const endRange = Math.max(totalPages - 2, startRange + 1);

// //         // Первые страницы
// //         for (let i = 1; i <= startRange; i++) {
// //             pages.push(i);
// //         }

// //         // Добавляем многоточие, если есть разрыв
// //         if (startRange + 1 < endRange - 1) {
// //             pages.push('...');
// //         }

// //         // Последние страницы
// //         for (let i = endRange; i <= totalPages; i++) {
// //             if (!pages.includes(i)) {
// //                 pages.push(i);
// //             }
// //         }

// //         return pages;
// //     };

// //     return (
// //         <div className="pagination">
// //             {currentPage > 1 && (
// //                 <Link
// //                     href={`${pathname}?page=${currentPage - 1}`}
// //                     className="pagination_button"
// //                 >

// //                     <svg width="21" height="8" viewBox="0 0 21 8" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                         <path d="M0.646288 3.81442C0.451027 4.00968 0.451027 4.32626 0.646288 4.52152L3.82827 7.7035C4.02353 7.89876 4.34011 7.89876 4.53538 7.7035C4.73064 7.50824 4.73064 7.19166 4.53538 6.9964L1.70695 4.16797L4.53538 1.33954C4.73064 1.14428 4.73064 0.827697 4.53538 0.632435C4.34011 0.437173 4.02353 0.437173 3.82827 0.632435L0.646288 3.81442ZM20.918 3.66797L0.999842 3.66797V4.66797L20.918 4.66797V3.66797Z" fill="black" />
// //                     </svg>

// //                 </Link>
// //             )}

// //             <div className="pagination_numbers">
// //                 {getPageNumbers().map((page, index) => {
// //                     if (page === '...') {
// //                         return <span key={`ellipsis_${index}`} className="pagination_ellipsis">...</span>;
// //                     }

// //                     const pageNum = page as number;
// //                     return (
// //                         <Link
// //                             key={pageNum}
// //                             href={`${pathname}?page=${pageNum}`}
// //                             className={`pagination_number ${currentPage === pageNum ? 'active' : ''}`}
// //                         >
// //                             {pageNum}
// //                         </Link>
// //                     );
// //                 })}
// //             </div>

// //             {currentPage < totalPages && (
// //                 <Link
// //                     href={`${pathname}?page=${currentPage + 1}`}
// //                     className="pagination_button"
// //                 >

// //                     <svg width="21" height="9" viewBox="0 0 21 9" fill="none" xmlns="http://www.w3.org/2000/svg">
// //                         <path d="M20.3596 4.85355C20.5548 4.65829 20.5548 4.34171 20.3596 4.14645L17.1776 0.964466C16.9823 0.769204 16.6657 0.769204 16.4705 0.964466C16.2752 1.15973 16.2752 1.47631 16.4705 1.67157L19.2989 4.5L16.4705 7.32843C16.2752 7.52369 16.2752 7.84027 16.4705 8.03553C16.6657 8.2308 16.9823 8.2308 17.1776 8.03553L20.3596 4.85355ZM0.0878906 5H20.006V4H0.0878906V5Z" fill="black" />
// //                     </svg>

// //                 </Link>
// //             )}
// //         </div>
// //     );
// // }



// 'use client';

// // import Link from 'next/link';
// import { useEffect, useState } from 'react';
// import { usePathname, useSearchParams, useRouter } from 'next/navigation';

// interface PaginationProps {
//     currentPage: number;
//     totalPages: number;
// }

// export function Pagination({ currentPage, totalPages }: PaginationProps) {
//     const pathname = usePathname();
//     const searchParams = useSearchParams();
//     const router = useRouter();
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//         // Сбрасываем состояние загрузки при изменении страницы
//         setIsLoading(false);
//     }, [searchParams.get('page')]);

//     const createUrl = (pageNumber: number) => {
//         const params = new URLSearchParams(searchParams.toString());
//         params.set('page', pageNumber.toString());
//         return `${pathname}?${params.toString()}`;
//     };

//     const handlePageChange = (pageNumber: number) => {
//         setIsLoading(true);
//         router.push(createUrl(pageNumber));
//     };

//     const getPageNumbers = () => {
//         const pages: (number | string)[] = [];

//         if (totalPages <= 7) {
//             return Array.from({ length: totalPages }, (_, i) => i + 1);
//         }

//         if (currentPage <= 2 || currentPage >= totalPages - 2) {
//             pages.push(1, 2, 3);
//             pages.push('...');
//             pages.push(totalPages - 2, totalPages - 1, totalPages);
//         } else {
//             pages.push(1);
//             pages.push('...');
//             pages.push(currentPage, currentPage + 1, currentPage + 2);
//             pages.push('...');
//             pages.push(totalPages);
//         }

//         return pages;
//     };

//     return (
//         <>
//             <div className="pagination">
//                 {currentPage > 1 && (
//                     <button
//                         onClick={() => handlePageChange(currentPage - 1)}
//                         className="pagination_button"
//                         disabled={isLoading}
//                     >
//                         <svg width="21" height="8" viewBox="0 0 21 8" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M0.646288 3.81442C0.451027 4.00968 0.451027 4.32626 0.646288 4.52152L3.82827 7.7035C4.02353 7.89876 4.34011 7.89876 4.53538 7.7035C4.73064 7.50824 4.73064 7.19166 4.53538 6.9964L1.70695 4.16797L4.53538 1.33954C4.73064 1.14428 4.73064 0.827697 4.53538 0.632435C4.34011 0.437173 4.02353 0.437173 3.82827 0.632435L0.646288 3.81442ZM20.918 3.66797L0.999842 3.66797V4.66797L20.918 4.66797V3.66797Z" fill="black" />
//                         </svg>
//                     </button>
//                 )}

//                 <div className="pagination_numbers">
//                     {getPageNumbers().map((page, index) => {
//                         if (page === '...') {
//                             return <span key={`ellipsis_${index}`} className="pagination_ellipsis">...</span>;
//                         }

//                         const pageNum = page as number;
//                         return (
//                             <button
//                                 key={pageNum}
//                                 onClick={() => handlePageChange(pageNum)}
//                                 className={`pagination_number ${currentPage === pageNum ? 'active' : ''}`}
//                                 disabled={isLoading}
//                             >
//                                 {pageNum}
//                             </button>
//                         );
//                     })}
//                 </div>

//                 {currentPage < totalPages && (
//                     <button
//                         onClick={() => handlePageChange(currentPage + 1)}
//                         className="pagination_button"
//                         disabled={isLoading}
//                     >
//                         <svg width="21" height="9" viewBox="0 0 21 9" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M20.3596 4.85355C20.5548 4.65829 20.5548 4.34171 20.3596 4.14645L17.1776 0.964466C16.9823 0.769204 16.6657 0.769204 16.4705 0.964466C16.2752 1.15973 16.2752 1.47631 16.4705 1.67157L19.2989 4.5L16.4705 7.32843C16.2752 7.52369 16.2752 7.84027 16.4705 8.03553C16.6657 8.2308 16.9823 8.2308 17.1776 8.03553L20.3596 4.85355ZM0.0878906 5H20.006V4H0.0878906V5Z" fill="black" />
//                         </svg>
//                     </button>
//                 )}
//             </div>
//             {isLoading && (
//                 <div className="pagination_loading">
//                     Загрузка...
//                 </div>
//             )}
//         </>
//     );
// }


'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Сбрасываем состояние загрузки при изменении страницы
        setIsLoading(false);
    }, [searchParams.get('page')]);

    const createUrl = (pageNumber: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    const handlePageChange = (pageNumber: number) => {
        setIsLoading(true);
        router.push(createUrl(pageNumber));
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        if (currentPage <= 2 || currentPage >= totalPages - 2) {
            pages.push(1, 2, 3);
            pages.push('...');
            pages.push(totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push(1);
            pages.push('...');
            pages.push(currentPage, currentPage + 1, currentPage + 2);
            pages.push('...');
            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <>
            <div className="pagination">
                {currentPage > 1 && (
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="pagination_button"
                        disabled={isLoading}
                    >
                        <svg width="21" height="8" viewBox="0 0 21 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.646288 3.81442C0.451027 4.00968 0.451027 4.32626 0.646288 4.52152L3.82827 7.7035C4.02353 7.89876 4.34011 7.89876 4.53538 7.7035C4.73064 7.50824 4.73064 7.19166 4.53538 6.9964L1.70695 4.16797L4.53538 1.33954C4.73064 1.14428 4.73064 0.827697 4.53538 0.632435C4.34011 0.437173 4.02353 0.437173 3.82827 0.632435L0.646288 3.81442ZM20.918 3.66797L0.999842 3.66797V4.66797L20.918 4.66797V3.66797Z" fill="black" />
                        </svg>
                    </button>
                )}

                <div className="pagination_numbers">
                    {getPageNumbers().map((page, index) => {
                        if (page === '...') {
                            return <span key={`ellipsis_${index}`} className="pagination_ellipsis">...</span>;
                        }

                        const pageNum = page as number;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => handlePageChange(pageNum)}
                                className={`pagination_number ${currentPage === pageNum ? 'active' : ''}`}
                                disabled={isLoading}
                            >
                                {pageNum}
                            </button>
                        );
                    })}
                </div>

                {currentPage < totalPages && (
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="pagination_button"
                        disabled={isLoading}
                    >
                        <svg width="21" height="9" viewBox="0 0 21 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.3596 4.85355C20.5548 4.65829 20.5548 4.34171 20.3596 4.14645L17.1776 0.964466C16.9823 0.769204 16.6657 0.769204 16.4705 0.964466C16.2752 1.15973 16.2752 1.47631 16.4705 1.67157L19.2989 4.5L16.4705 7.32843C16.2752 7.52369 16.2752 7.84027 16.4705 8.03553C16.6657 8.2308 16.9823 8.2308 17.1776 8.03553L20.3596 4.85355ZM0.0878906 5H20.006V4H0.0878906V5Z" fill="black" />
                        </svg>
                    </button>
                )}
            </div>
            {isLoading && (
                <div className="pagination_loading">
                    Загрузка...
                </div>
            )}
        </>
    );
}