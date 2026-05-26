import BigText from "@/components/Library/Big Text/bigText";
import Faq from "@/components/Library/Faq/faq";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import ProductCard from "@/components/Library/Product Card/productCard";
import { fetchAPI } from "@/helpers/api/fetch-api";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({params}){
    const {slug, sector} = await params;
    
    var settore = await fetchAPI('settore', {
        slug: slug,
        acf_format: 'standard',
        _embed: true
    });
    if(!settore) notFound();
    console.log(settore);
    const img = settore._embedded['wp:featuredmedia'][0];
    return <>
        <section className="flex w-full px-4">
            <Image src={img.source_url} width={img.media_details.width} height={img.media_details.height} alt={settore.title.rendered} />
        </section>
        <section className="w-full big-boxed mt-7 relative">
            <div className="w-full flex items-start justify-between pb-3 border-b-[1px] border-b-[var(--color-primary)]">
                <BigText Tag="h1" className="classic-title">{settore.title.rendered}</BigText>
                <Paragraph className="w-[calc(100%/3*2.1)]">{settore.acf.paragrafo}</Paragraph>
            </div>
        </section>
        <section className="mt-10 px-4">
            {
                settore.acf.prodotti_correlati.map(elem => {
                    var prodObject = {
                        ID: elem.ID,
                        thumbnail_data: elem.thumbnail_data,
                        cat: elem.category_info[0],
                        slug: elem.post_name,
                        title: elem.post_title
                    };
                    return <ProductCard key={elem.ID} prodObject={prodObject} />
                })
            }
        </section>
        <section className="mt-8 big-boxed w-full relative pb-15">
            <BigText Tag="h2" className="classic-title">FAQ</BigText>
            <div className="mt-5">
                <Faq faq={settore.acf.faq} />
            </div>
        </section>
    </>
}