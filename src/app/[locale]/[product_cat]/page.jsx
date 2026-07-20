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
    
        <section className="w-full flex h-auto relative min-h-[50vh] testata-product pt-10 px-15 flex items-center justify-between">
                <div className="relative flex flex-col items-start gap-[15px] w-40">
                    <BigText Tag="h1" className="classic-title">{cat.name}</BigText>
                    <Paragraph className="text-[var(--color-foreground)]">{cat.acf.paragrafo}</Paragraph>
                </div>
                {cat.acf.immagine_categoria && <Image className="h-[80vh] w-auto object-cover max-w-[calc(100%-400px)]" src={cat.acf.immagine_categoria.url} width={cat.acf.immagine_categoria.width} height={cat.acf.immagine_categoria.height} alt={cat.name}/>}
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