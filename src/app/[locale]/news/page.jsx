import BigText from "@/components/Library/Big Text/bigText";
import NewsCard from "@/components/Library/News Card/newsCard";
import { fetchAPI } from "@/helpers/api/fetch-api";
import { buildMetadata } from "@/helpers/seo/metadata";
import { setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function Page({params}){
    const {locale} = await params;
    setRequestLocale(locale);
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
        <section className="w-full big-boxed mt-15 max-m:mt-13">
            <BigText Tag="h1" className="classic-title">News</BigText>
        </section>
        <section className="big-boxed w-full mt-[35px] mb-15 max-s:mb-10 flex flex-wrap gap-y-13 max-xl:gap-y-6">
            {
                posts.map((elem, index) => {
                    return <NewsCard key={elem.id} news={elem} index={index} />
                })
            }
        </section>
    </>

}


export async function generateMetadata({ params }) {
  const { locale } = await params;
  const page = await fetchAPI("pages", {
    lang: locale,
    slug: "news",
    _fields: "yoast_head_json",
  });
  return buildMetadata({
    yoast: page?.yoast_head_json,
    pathname: "/news",
    locale,
  });
}