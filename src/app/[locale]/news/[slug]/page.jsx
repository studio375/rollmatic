import BigText from "@/components/Library/Big Text/bigText";
import NewsCard from "@/components/Library/News Card/newsCard";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import { fetchAPI, getAllSlugs } from "@/helpers/api/fetch-api";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({params}){
    const {locale, slug}= await params;
    var obj = await fetchAPI('posts', {
        lang: locale,
        slug: slug,
        acf_format: 'standard',
        _embed: true
    });
    if(!obj) notFound();
    const t = await getTranslations('strings');
    const img = obj._embedded['wp:featuredmedia'][0];
    var featuredNews = await fetchAPI('posts', {
        lang: locale,
        per_page: 2,
        exclude: obj.id,
        _embed: true,
        acf_format: 'standard'
    });
    return <>
        <section className="mt-15 max-m:mt-13 big-boxed flex flex-col items-start mb-17 max-m:mb-10">
            <div className="w-full border-b-[1px] border-b-[var(--color-primary)]">
                <BigText Tag="h1" className="classic-title pb-6 max-m:pb-3 border-b-[2px] border-b-[var(--color-primary)] inline-block !font-semibold">{obj.title.rendered}</BigText>
            </div>
            <div className="flex items-start justify-between w-full mt-5 max-m:mt-3 max-m:flex-col-reverse max-m:items-start max-m:gap-3">
                <Paragraph className="w-[calc(50%-100px)] max-xl:w-[calc(50%-50px)] max-m:w-full [&_a]:!underline">{obj.acf.contenuto || ''}</Paragraph>
                <Image className="w-[calc(50%-100px)] max-xl:w-[calc(50%-50px)] max-m:w-full h-auto" src={img.source_url} width={img.media_details.width} height={img.media_details.height} alt={obj.title.rendered} />
            </div>
        </section>
        {
            (featuredNews && featuredNews.length>0) && <section className="w-full big-boxed mb-14 max-m:mt-5">
                <BigText Tag="h2" className="classic-title !text-[var(--color-foreground)]">{t("Altre news")}</BigText>
                <div className="relative w-full flex items-start mt-9 max-m:mt-4 flex-wrap gap-y-6">
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

export async function generateStaticParams() {
    const params = [];
    for (const locale of routing.locales) {
        const slugs = await getAllSlugs("posts", locale);
        for (const {slug, id} of slugs) {
            params.push({ locale, slug});
        }
    }
    return params;
}