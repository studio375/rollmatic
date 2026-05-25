import BigText from "@/components/Library/Big Text/bigText";
import NewsCard from "@/components/Library/News Card/newsCard";
import { fetchAPI } from "@/helpers/api/fetch-api";
import { notFound } from "next/navigation";

export default async function Page({params}){
    var page = await fetchAPI('pages', {
        slug: 'news',
        acf_format: 'standard'
    });
    if(!page) notFound();
    var posts = await fetchAPI('posts', {
        _embed: true,
        acf_format: 'standard'
    });

    return <>
        <section className="w-full big-boxed mt-15">
            <BigText Tag="h1" className="!text-[40px]/[50px] !text-[var(--color-primary)] font-bold">News</BigText>
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