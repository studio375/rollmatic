import BigText from "@/components/Library/Big Text/bigText";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import { fetchAPI } from "@/helpers/api/fetch-api"
import { buildMetadata } from "@/helpers/seo/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";


export default async function Page({params}){
    const {locale} = await params;
    setRequestLocale(locale);
    var page = await fetchAPI('pages', {
        slug: 'settori',
        acf_format: 'standard',
        lang: locale
    });
    if(!page) notFound();
    const t = await getTranslations('strings');
    const settori = await fetchAPI('settore', {
        acf_format: 'standard',
        _embed: true,
        lang:locale
    });
    return <>
        <section className="w-full relative big-boxed pt-20 max-l:pt-15 max-m:pt-13">
            <div className="w-full flex items-start justify-between border-b-[1px] border-b-[var(--color-primary)] pb-3 max-m:pb-4 max-l:flex-col max-l:gap-3">
                <BigText Tag="h1" className="classic-title">{page.acf.titolo}</BigText>
                <Paragraph className="w-[calc(100%/3*2)] max-l:w-full">{page.acf.paragrafo}</Paragraph>
            </div>    
        </section>
        <section className="relative mt-[75px] max-l:mt-4 big-boxed flex items-stretch w-full xl:!px-4 gap-[2px] mb-6 max-l:flex-col">
            {
                settori.map(elem => {
                    const img = elem._embedded['wp:featuredmedia'][0];
                    return <Link key={elem.id} className="flex-1 relative l:aspect-[55/40] max-xs:aspect-2/1.5 overflow-hidden rounded-[5px]" href={`${t('Slug settori')}/${elem.slug}`}>
                        <Image className="w-full h-full object-cover" src={img.source_url} width={img.media_details.width} height={img.media_details.height} alt={elem.title.rendered} />
                        <div className="absolute flex flex-col items-end right-[35px] bottom-[35px] max-l:items-end max-s:bottom-2 max-s:right-2">
                            <BigText tag="span" className="font-bold text-[30px] s:text-[40px] text-[var(--color-background)] text-right">{elem.title.rendered}</BigText>
                            <Image className="mt-2" src="/next-arrow-light.svg" width={50} height={20} alt=""/>                 
                        </div>
                    </Link>
                })
            }
        </section>
    </>
}



export async function generateMetadata({ params }) {
  const { locale } = await params;
  const page = await fetchAPI("pages", {
    lang: locale,
    slug: "settori",
    _fields: "yoast_head_json",
  });
  return buildMetadata({
    yoast: page?.yoast_head_json,
    pathname: "/settori",
    locale,
  });
}