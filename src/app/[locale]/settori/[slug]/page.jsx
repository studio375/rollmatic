import BigText from "@/components/Library/Big Text/bigText";
import Breadcrumbs from "@/components/Library/Breadcrumbs/breadcrumbs";
import Faq from "@/components/Library/Faq/faq";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import ProductLoop from "@/components/Library/Product Loop/productLoop";
import { fetchAPI, getAllSlugs } from "@/helpers/api/fetch-api";
import { buildMetadata } from "@/helpers/seo/metadata";
import { routing } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({params}){
    const {locale, slug} = await params;
    setRequestLocale(locale);
    var settore = await fetchAPI('settore', {
        lang: locale,
        slug: slug,
        acf_format: 'standard',
        _embed: true
    });
    if(!settore) notFound();
    const img = settore._embedded['wp:featuredmedia'][0];
    const t = await getTranslations('strings');
    const prodAllCat = {};
    if (settore.acf.prodotti_correlati) {
        Array.from(settore.acf.prodotti_correlati).forEach(elem => {
            const topLevelCats = elem.category_info.filter(cat => cat.parent == 0);
            const key = topLevelCats[0].name;
            if (!prodAllCat[key]) {
                prodAllCat[key] = [];
            }
            prodAllCat[key].push(elem);
        });
    }

    return <>
        <Breadcrumbs items={[{href:'settori', label:t("Settori")}, {label: settore.title.rendered}]} className="!relative !top-0 mt-10 mb-[5px]" />
        <section className="flex w-full boxed m:!px-4 min-[1920px]:!px-[3vw] max-s:!px-0 max-m:mt-[75px]">
            <Image className="max-xs:aspect-2/1.5 object-cover xs:h-[50vh] m:h-[75vh] w-full rounded-[5px]" src={img.source_url} width={img.media_details.width} height={img.media_details.height} alt={settore.title.rendered} />
        </section>
        <section className="w-full big-boxed mt-7 mb-10 relative max-s:mt-4">
            <div className="w-full flex items-start justify-between pb-3 border-b-[1px] border-b-[var(--color-primary)] max-l:flex-col max-l:gap-2">
                <BigText Tag="h1" className="classic-title">{settore.title.rendered}</BigText>
                <Paragraph className="w-[calc(100%/3*2.1)] max-l:w-full">{settore.acf.paragrafo}</Paragraph>
            </div>
        </section>
        <section className="flex flex-col items-start gap-5">
        {
            Object.keys(prodAllCat).map((catName) => (
                <ProductLoop key={catName} title={catName} catFilters={null} filters={false} products={prodAllCat[catName]} />
            ))
        }
        </section>
        {
            // settore.acf.faq && <section className="mt-8 max-m:mt-4 big-boxed w-full relative pb-15 max-s:pb-10">
            //     <BigText Tag="h2" className="classic-title">FAQ</BigText>
            //     <div className="mt-5 max-m:mt-3">
            //         <Faq faq={settore.acf.faq} />
            //     </div>
            // </section>
        }
    </>
}

export async function generateMetadata({ params }) {
    const {locale, slug} = await params;
    var page = await fetchAPI('settore', {
        lang: locale,
        slug: slug,
        acf_format: 'standard',
    });
    return buildMetadata({
        yoast: page?.yoast_head_json,
        pathname: "/settori/[slug]",
        locale,
        value: slug,
        translations: page?.wpml_translations,
    });
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