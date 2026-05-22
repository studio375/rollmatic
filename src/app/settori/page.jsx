import BigText from "@/components/Library/Big Text/bigText";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import { fetchAPI } from "@/helpers/api/fetch-api"
import Image from "next/image";
import Link from "next/link";

export default async function Page({params}){
    var page = await fetchAPI('pages', {
        slug: 'settori',
        acf_format: 'standard'
    });
    const settori = await fetchAPI('settore', {
        acf_format: 'standard',
        _embed: true
    });
    return <>
        <section className="w-full relative big-boxed pt-20">
            <div className="w-full flex items-start justify-between border-b-[1px] border-b-[var(--color-primary)] pb-3 ">
                <BigText Tag="h1" className="text-[var(--color-primary)] text-[40px] font-bold">{page.acf.titolo}</BigText>
                <Paragraph className="w-[calc(100%/3*2)]">{page.acf.paragrafo}</Paragraph>
            </div>    
        </section>
        <section className="relative mt-[75px] flex items-stretch w-full px-4 gap-1 mb-6">
            {
                settori.map(elem => {
                    const img = elem._embedded['wp:featuredmedia'][0];
                    return <div key={elem.id} className="flex-1 relative aspect-[55/60] overflow-hidden rounded-[5px]">
                        <Image className="w-full h-full object-cover" src={img.source_url} width={img.media_details.width} height={img.media_details.height} alt={elem.title.rendered} />
                        <Link className="absolute flex flex-col items-start right-[35px] bottom-[35px]" href={elem.slug}>
                            <BigText tag="span" className="font-bold text-[40px] text-[var(--color-background)]">{elem.title.rendered}</BigText>
                            <Image className="mt-2" src="/next-arrow-light.svg" width={50} height={20} alt=""/>                 
                        </Link>
                    </div>
                })
            }
        </section>
    </>
}