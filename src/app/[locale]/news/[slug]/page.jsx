import BigText from "@/components/Library/Big Text/bigText";
import NewsCard from "@/components/Library/News Card/newsCard";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import { fetchAPI } from "@/helpers/api/fetch-api";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({params}){
    const {slug, news}= await params;
    var locale = await getLocale();
    var obj = await fetchAPI('posts', {
        lang: locale,
        slug: slug,
        acf_format: 'standard',
        _embed: true
    });
    if(!obj) notFound();
    console.log(obj);
    const img = obj._embedded['wp:featuredmedia'][0];
    var featuredNews = await fetchAPI('posts', {
        per_page: 2,
        exclude: obj.id,
        _embed: true,
        acf_format: 'standard'
    });
    return <>
        <section className="mt-15 big-boxed flex flex-col items-start mb-17">
            <div className="w-full border-b-[1px] border-b-[var(--color-primary)]">
                <BigText Tag="h1" className="classic-title pb-6 border-b-[2px] border-b-[var(--color-primary)] inline-block !font-semibold">{obj.title.rendered}</BigText>
            </div>
            <div className="flex items-start justify-between w-full mt-5">
                <Paragraph className="w-[calc(50%-100px)] [&_a]:!underline">{obj.acf.contenuto || ''}</Paragraph>
                <Image className="w-[calc(50%-100px)] h-auto" src={img.source_url} width={img.media_details.width} height={img.media_details.height} alt={obj.title.rendered} />
            </div>
        </section>
        {
            (featuredNews && featuredNews.length) && <section className="w-full big-boxed mb-14">
                <BigText Tag="h2" className="classic-title !text-[var(--color-foreground)]">Altre news</BigText>
                <div className="relative w-full flex items-start mt-9">
                    {
                        featuredNews.map((elem, index) => {
                            return <NewsCard key={elem.id} news={elem} index={index} />
                        })
                    }
                </div>
            </section>
        }
    </>
}