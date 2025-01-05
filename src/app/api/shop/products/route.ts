// import { NextRequest, NextResponse } from 'next/server';
// import { fetchProductsForCatalog } from '@/lib/fetchProductsForCatalog';

// export async function GET(req: NextRequest) {
//     const { searchParams } = new URL(req.url);
//     const after = searchParams.get('after') || undefined;

//     // Запрашиваем у WooCommerce / GraphQL
//     const data = await fetchProductsForCatalog(after);

//     // Возвращаем JSON со структурой { pageInfo, nodes } — 
//     // ровно так, как это приходит из fetchProductsForCatalog
//     return NextResponse.json(data);
// }


import { NextRequest, NextResponse } from 'next/server';
import { fetchProductsForCatalog } from '@/lib/fetchProductsForCatalog';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const after = searchParams.get('after') || undefined;

    // Запрашиваем у WooCommerce следующую страницу (20 шт) с курсором `after`.
    const data = await fetchProductsForCatalog(after);

    // Ожидаем, что data имеет структуру: { pageInfo, nodes }, как в вашем fetchProductsForCatalog.
    // Возвращаем JSON
    return NextResponse.json(data);


}
