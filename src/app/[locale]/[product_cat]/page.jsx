import BigText from "@/components/Library/Big Text/bigText";
import Faq from "@/components/Library/Faq/faq";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import ProductLoop from "@/components/Library/Product Loop/productLoop";
import { fetchAPI, getAllSlugs } from "@/helpers/api/fetch-api";
import { buildMetadata } from "@/helpers/seo/metadata";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({params}){ 
    const {product_cat, locale} = await params;
    const cat = await fetchAPI('categoria',{
        slug: product_cat,
        acf_format: 'standard',
        lang: locale
    });
    
    if(!cat) notFound();
    const catChild = await fetchAPI('categoria', {
        parent: cat.id,
        lang: locale
    });

    var products = await fetchAPI('prodotto', {
        'categoria': [cat.id].concat(catChild.map(el => {return el.id;})),
        acf_format: 'standard',
        _embed: true,
        per_page: 100,
        lang: locale
    });
    
    return <>
        <section className="w-full flex h-auto relative min-h-[50vh] testata-product pt-10 max-m:pt-12 max-m:pb-5 boxed xl:!px-15 flex items-center justify-between max-m:flex-col max-m:gap-4">
                <div className="relative flex flex-col items-start gap-[15px] w-40 max-m:w-full">
                    <BigText Tag="h1" className="classic-title">{cat.name}</BigText>
                    <Paragraph className="text-[var(--color-foreground)]">{cat.acf.paragrafo}</Paragraph>
                </div>
                {cat.acf.immagine_categoria && <Image className="w-full h-auto s:max-h-[80vh] s:object-contain m:h-[80vh] w-auto object-cover m:max-w-[calc(100%-400px)]" src={cat.acf.immagine_categoria.url} width={cat.acf.immagine_categoria.width} height={cat.acf.immagine_categoria.height} alt={cat.name}/>}
        </section>
       <ProductLoop catFilters={catChild} products={products} />
       {
        cat.acf.faq ? <section className="my-10 big-boxed relative flex flex-col items-start gap-5">
            <BigText Tag="h2" className="classic-title">Faq</BigText>
            <Faq faq={cat.acf.faq} />
        </section>:<div className="h-10"></div>
       }       
    </>;
}

export async function generateStaticParams() {
    const params = [];
    for (const locale of routing.locales) {
        const slugs = await getAllSlugs("categoria", locale);
        for (const {slug, id} of slugs) {
            const product_cat = slug;
            params.push({ locale, product_cat });
        }
    }
    return params;
}

export async function generateMetadata({ params }) {
    const {product_cat, locale} = await params;
    setRequestLocale(locale);
    const page = await fetchAPI('categoria',{
        slug: product_cat,
        lang: locale
    });

    return buildMetadata({
        yoast: page?.yoast_head_json,
        pathname: "/[product_cat]",
        locale,
        value: product_cat,
        translations: page?.wpml_translations,
    });
}