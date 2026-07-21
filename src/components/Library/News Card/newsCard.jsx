"use client"
import Image from "next/image";
import Paragraph from "../Paragraph/paragraph";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function NewsCard({news, index}){
    const t = useTranslations('strings');
    const locale = useLocale();
    var img = news._embedded['wp:featuredmedia'][0];
    var pad = (index%2 == 0)? 'pr-10 max-xl:pr-5' : 'pl-10 max-xl:pl-5';
    return <div key={index} className="relative w-[50%] max-m:w-full flex flex-col items-start">
            <Link className="w-full" href={`${locale !== 'it'? `/${locale}`:''}/${t('News').toLowerCase()}/${news.slug}`}>
                <div className={`border-b-[1px] border-b-[var(--color-primary)] w-full ${pad} max-m:!p-0`}>
                <div className="relative inline-flex pb-1">
                    <span className="text-[15px] font-bold uppercase">{news.title.rendered}</span>
                    <div className="absolute bottom-0 left-0 w-full h-[3px] block bg-[var(--color-primary)]"></div>
                </div>
                </div>
                <div className={`flex flex-col items-start mt-5 max-xl:mt-2 ${pad} max-m:!p-0`}>
                    <Image className="w-full h-auto" src={img.source_url} width={img.media_details.width} height={img.media_details.height} alt="" />
                    <Paragraph className="mt-[27px]">{news.acf.descrizione_breve}</Paragraph>
                </div>
            </Link>
        </div>
}