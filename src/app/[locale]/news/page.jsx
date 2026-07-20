import BigText from "@/components/Library/Big Text/bigText";
import NewsCard from "@/components/Library/News Card/newsCard";
import { fetchAPI } from "@/helpers/api/fetch-api";
import { getLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function Page({params}){
    var locale = await getLocale();
    var page = await fetchAPI('pages', {
        slug: 'news',
        acf_format: 'standard',
        lang: locale
    });
    if(!page) notFound();
    var posts = await fetchAPI('posts', {
        lang: locale,
        _embed: true,
        acf_format: 'standard'
    });

    return <>
        <section className="w-full big-boxed mt-15">
            <BigText Tag="h1" className="classic-title">News</BigText>
        </section>
        <section className="big-boxed w-full mt-[35px] mb-15 flex flex-wrap gap-y-13">
            {
                posts.map((elem, index) => {
                    return <NewsCard key={elem.id} news={elem} index={index} />
                })
            }
        </section>
    </>

}