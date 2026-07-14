import { fetchAPI } from "@/helpers/api/fetch-api"
import Link from "next/link";
import { notFound } from "next/navigation";
import parse from 'html-react-parser';
import Image from "next/image";
import GravityForm from "@/components/Library/Gravity Form/gravityForm";

export default async function Page({params}){
    var page = await fetchAPI('pages', {
        slug: 'contatti',
        acf_format: 'standard',
        _embed: true
    });
    if(!page) notFound();
    console.log(page);
    const social = page.acf.social;
    var form = await fetchAPI('forms/1', {}, true);
    return <>
        <section className="mt-20 big-boxed flex items-start max-m:flex-col max-m:gap-5 max-m:mt-13">
            <div className="flex flex-col items-start [&_*]:!text-[24px]/[30px] w-[calc(100%/3)] max-m:w-full max-m:flex-row flex-wrap max-m:gap-y-1 max-xs:gap-y-2">
                <h1 className="!text-[24px]/[30px] font-bold !text-[var(--color-foreground)] w-full">{parse(page.acf.titolo)}</h1>
                <span className="block mt-1 max-m:w-1/2 max-m:mt-0 max-xs:w-full">{parse(page.acf.indirizzo)}</span>
                <div className="flex flex-col items-start mt-5 max-m:w-1/2 max-m:mt-0 max-xs:w-full">
                    <Link href={`tel:${page.acf.telefono}`} target="_blank"><span className="font-bold text-[var(--color-primary)]">T </span>{page.acf.telefono}</Link>
                    <Link href={`mailto:${page.acf.email}`} target="_blank"><span className="font-bold text-[var(--color-primary)]">T </span>{page.acf.email}</Link>
                    <div className="flex items-center justify-start gap-2 mt-3">
                        {
                            social.map(elem => {
                                return <Link key={elem.icona.ID} href={elem.link} target="_blank"><Image src={elem.icona.url} width={elem.icona.width} height={elem.icona.height} alt={elem.icona.filename} /></Link>
                            })
                        }
                    </div>
                </div>
           </div>
           <div className="relative w-[calc(200%/3)] flex flex-col items-start gap-2 max-m:w-full">
                <span className="!text-[24px]/[30px] font-bold !text-[var(--color-foreground)]">Richiedi informazioni</span>
                <GravityForm formObject={form} />
           </div>
        </section>
        <section className="mt-10 s:px-4 w-full relative max-s:mt-5">
            <iframe className="border-0 w-full h-50" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2785.4067043809837!2d11.41373627607234!3d45.72293797107939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4778b6a9cfb75185%3A0xe4fef808164800a1!2sRollmatic%20Srl!5e0!3m2!1sit!2sit!4v1779783716966!5m2!1sit!2sit" width="600" height="450" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </section>
    </>
}