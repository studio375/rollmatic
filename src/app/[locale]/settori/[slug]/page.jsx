import BigText from "@/components/Library/Big Text/bigText";
import Faq from "@/components/Library/Faq/faq";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import ProductCard from "@/components/Library/Product Card/productCard";
import ProductLoop from "@/components/Library/Product Loop/productLoop";
import { fetchAPI, getAllSlugs } from "@/helpers/api/fetch-api";
import { routing } from "@/i18n/routing";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({params}){
    const {locale, slug} = await params;
    var settore = await fetchAPI('settore', {
        lang: locale,
        slug: slug,
        acf_format: 'standard',
        _embed: true
    });
    if(!settore) notFound();
    const img = settore._embedded['wp:featuredmedia'][0];
    return <>
        <section className="flex w-full boxed m:!px-4 max-m:mt-10">
            <Image src={img.source_url} width={img.media_details.width} height={img.media_details.height} alt={settore.title.rendered} />
        </section>
        <section className="w-full big-boxed mt-7 relative max-s:mt-4">
            <div className="w-full flex items-start justify-between pb-3 border-b-[1px] border-b-[var(--color-primary)] max-l:flex-col max-l:gap-2">
                <BigText Tag="h1" className="classic-title">{settore.title.rendered}</BigText>
                <Paragraph className="w-[calc(100%/3*2.1)] max-l:w-full">{settore.acf.paragrafo}</Paragraph>
            </div>
        </section>
        {
            settore.acf.prodotti_correlati && <ProductLoop catFilters={null} filters={false} products={settore.acf.prodotti_correlati}/>
        }
        {
            settore.acf.faq && <section className="mt-8 max-m:mt-4 big-boxed w-full relative pb-15">
                <BigText Tag="h2" className="classic-title">FAQ</BigText>
                <div className="mt-5 max-m:mt-3">
                    <Faq faq={settore.acf.faq} />
                </div>
            </section>
        }
    </>
}

export async function generateStaticParams() {
    const params = [];
    for (const locale of routing.locales) {
        const slugs = await getAllSlugs("settore", locale);
        for (const {slug, id} of slugs) {
            params.push({ locale, slug});
        }
    }
    return params;
}