// // \src\i18n\request.ts
// import { getRequestConfig } from 'next-intl/server';
// import { cookies } from 'next/headers';
// import { defaultLocale } from './config';

// export default getRequestConfig(async () => {
//     const cookieStore = await cookies();
//     const locale = cookieStore.get('NEXT_LOCALE')?.value || defaultLocale;

//     return {
//         locale,
//         messages: (await import(`../../messages/${locale}.json`)).default
//     };
// });

// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';
import { defaultLocale, locales, type Locale } from './config';

export default getRequestConfig(async () => {
    // Получаем локаль из headers (устанавливается в middleware)
    const headersList = await headers();
    const localeFromHeader = headersList.get('x-locale') as Locale;

    // Если локаль есть в headers и она валидна - используем её
    const locale = localeFromHeader && locales.includes(localeFromHeader)
        ? localeFromHeader
        : defaultLocale;

    return {
        locale,
        messages: (await import(`../../messages/${locale}.json`)).default
    };
});