"use client"
import Image from "next/image";
import Paragraph from "../Paragraph/paragraph";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useEffect } from "react";
import { fadeAnimation, titleAnimation } from "@/helpers/animations";

export default function NewsCard({news, index, ...props}){
    const t = useTranslations('strings');
    const locale = useLocale();
    useEffect(() => {
        fadeAnimation();
        titleAnimation();
    }, []);
    var img = news._embedded['wp:featuredmedia'][0];
    var pad = (index%2 == 0)? 'pr-10 max-xl:pr-5' : 'pl-10 max-xl:pl-5';
    return <div key={index} className="relative w-[50%] max-m:w-full flex flex-col items-start">
            <Link className="w-full" href={`${locale !== 'it'? `/${locale}`:''}/${t('News').toLowerCase()}/${news.slug}`}>
                <div className={`border-b-[1px] border-b-[var(--color-primary)] w-full ${pad} max-m:!p-0`}>
                <div className="relative inline-flex pb-1">
                    <span className="title-animation text-[15px] font-bold uppercase par-animation">{news.title.rendered}</span>
                    <div className={`${props.className && props.className.indexOf('no-animation') > -1?'no-animation':'fade-animation'} absolute bottom-0 left-0 w-full h-[3px] block bg-[var(--color-primary)]`}></div>
                </div>
                </div>
                <div className={`flex flex-col items-start mt-5 max-xl:mt-2 ${pad} max-m:!p-0`}>
                    <Image className={`${props.className && props.className.indexOf('no-animation')>-1?'no-animation':'fade-animation'} w-full h-auto`} src={img.source_url} width={img.media_details.width} height={img.media_details.height} alt="" />
                    <Paragraph className={`${props.className && props.className.indexOf('no-animation')>-1 && 'no-animation'} mt-[27px]`}>{news.acf.descrizione_breve}</Paragraph>
                </div>
            </Link>
        </div>
}