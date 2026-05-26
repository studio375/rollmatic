import Image from "next/image";
import Paragraph from "../Paragraph/paragraph";
import Link from "next/link";

export default function NewsCard({news, index}){
    var img = news._embedded['wp:featuredmedia'][0];
    var pad = (index%2 == 0)? 'pr-10' : 'pl-10';
    return <div key={index} className="w-[50%] flex flex-col items-start">
            <Link href={`/news/${news.slug}`}>
                <div className={`border-b-[1px] border-b-[var(--color-primary)] w-full ${pad}`}>
                <div className="relative inline-flex pb-1">
                    <span className="text-[15px] font-bold uppercase">{news.title.rendered}</span>
                    <div className="absolute bottom-0 left-0 w-full h-[3px] block bg-[var(--color-primary)]"></div>
                </div>
                </div>
                <div className={`flex flex-col items-start mt-5 ${pad}`}>
                    <Image src={img.source_url} width={img.media_details.width} height={img.media_details.height} alt="" />
                    <Paragraph className="mt-[27px]">{news.acf.descrizione_breve}</Paragraph>
                </div>
            </Link>
        </div>
}