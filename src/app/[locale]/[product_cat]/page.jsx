import BigText from "@/components/Library/Big Text/bigText";
import Faq from "@/components/Library/Faq/faq";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import ProductLoop from "@/components/Library/Product Loop/productLoop";
import { fetchAPI, getAllSlugs } from "@/helpers/api/fetch-api";
import { routing } from "@/i18n/routing";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({params}){ 
    const {product_cat} = await params;
    const cat = await fetchAPI('categoria',{
        slug: product_cat,
        acf_format: 'standard'
    });
    
    if(!cat) notFound();
    const catChild = await fetchAPI('categoria', {
        parent: cat.id
    });

    var products = await fetchAPI('prodotto', {
        'categoria': [cat.id].concat(catChild.map(el => {return el.id;})),
        acf_format: 'standard',
        _embed: true,
        per_page: 100
    });
    
    return <>
    
        <section className="w-full flex h-auto relative min-h-[50vh]">
                {cat.acf.immagine_testata && <Image className="w-full h-auto object-cover max-h-[80vh]" src={cat.acf.immagine_testata.url} width={cat.acf.immagine_testata.width} height={cat.acf.immagine_testata.height} alt={cat.name}/>}
                <div className="absolute flex flex-col items-start left-15 bottom-15 gap-[15px]">
                    <BigText Tag="h1" className="classic-title">{cat.name}</BigText>
                    <Paragraph className="text-[var(--color-background)]">{cat.acf.paragrafo}</Paragraph>
                </div>
        </section>
       <ProductLoop catFilters={catChild} products={products} />
       {
        cat.acf.faq && <section className="my-10 big-boxed relative flex flex-col items-start gap-5">
            <BigText Tag="h2" className="classic-title">Faq</BigText>
            <Faq faq={cat.acf.faq} />
        </section>
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