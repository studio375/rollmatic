import BigText from "@/components/Library/Big Text/bigText";
import IncrementNumber from "@/components/Library/Increment number/incrementNumber";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import Timeline from "@/components/Library/Timeline/timeline";
import { fetchAPI } from "@/helpers/api/fetch-api";
import Image from "next/image";
import { notFound } from "next/navigation";
export default async function Page({params}){
    const {locale} = await params;
    const page = await fetchAPI('pages', {
        slug: 'azienda',
        acf_format: 'standard',
        lang: locale
    });
    console.log(page);
    if(!page) notFound();
    var beforeClass = "[&::before]:w-8 [&::before]:h-[3px] [&::before]:absolute [&::before]:bottom-0 [&::before]:left-0 [&::before]:bg-[var(--color-primary)] [&::before]:content-['']";
    return <>
        <section className="w-full relative">
            <Image className="w-full h-auto" src={page.acf.immagine_testata.url} width={page.acf.immagine_testata.width} height={page.acf.immagine_testata.height} alt={page.title.rendered} />
        </section>
        <section className="w-full relative big-boxed mt-10">
            <div className="w-full flex items-start justify-start gap-5">
                <div className="flex-1 relative flex flex-col items-start justify-start gap-[25px]">
                    <BigText Tag="h3" className={`!text-[15px] !uppercase relative font-bold pb-[7px] ${beforeClass}`}>{page.acf.produzione_e_metodo.titolo_piccolo}</BigText>
                    <BigText Tag="h2" className={'classic-title'}>{page.acf.produzione_e_metodo.titolo_grande}</BigText>
                </div>
                <Paragraph className="flex-1">{page.acf.produzione_e_metodo.paragrafo}</Paragraph>
            </div>
            <div className="w-full flex items-stretch justify-start gap-5 mt-10">
                <Image className="flex-1 relative h-auto min-h-full" src={page.acf.produzione_e_metodo.immagine_sx.url} width={page.acf.produzione_e_metodo.immagine_sx.width} height={page.acf.produzione_e_metodo.immagine_sx.height} alt={page.acf.produzione_e_metodo.immagine_sx.alt || ''} />
                <Image className="flex-1 relative h-auto min-h-full" src={page.acf.produzione_e_metodo.immagine_dx.url} width={page.acf.produzione_e_metodo.immagine_dx.width} height={page.acf.produzione_e_metodo.immagine_dx.height} alt={page.acf.produzione_e_metodo.immagine_dx.alt || ''} />
            </div>
        </section>
        <section className="w-full relative big-boxed mt-10">
            <div className="w-full flex items-start justify-start gap-5">
                <div className="flex-1 relative flex flex-col items-start justify-start gap-[25px]">
                    <BigText Tag="h3" className={`!text-[15px] !uppercase relative font-bold pb-[7px] ${beforeClass}`}>{page.acf.ricerca_e_sviluppo.titolo_piccolo}</BigText>
                    <BigText Tag="h2" className={'classic-title'}>{page.acf.ricerca_e_sviluppo.titolo_grande}</BigText>
                </div>
                <Paragraph className="flex-1">{page.acf.ricerca_e_sviluppo.paragrafo}</Paragraph>
            </div>
            <IncrementNumber page={page} className="w-full relative flex justify-between items-start mt-4" />
            <Image className="absolute top-10 left-1/2 -translate-x-1/2" src={page.acf.ricerca_e_sviluppo.immagine_mondo.url} width={page.acf.ricerca_e_sviluppo.immagine_mondo.width} height={page.acf.ricerca_e_sviluppo.immagine_mondo.height} alt={page.acf.ricerca_e_sviluppo.immagine_mondo.alt || ''} />
        </section>
        <section className="w-full relative big-boxed mt-40">
            <div className="w-full flex items-start justify-start gap-5">
                <div className="flex-1 relative flex flex-col items-start justify-start gap-[25px]">
                    <BigText Tag="h3" className={`!text-[15px] !uppercase relative font-bold pb-[7px] ${beforeClass}`}>{page.acf.mercati.titolo_piccolo}</BigText>
                    <BigText Tag="h2" className={'classic-title'}>{page.acf.mercati.titolo_grande}</BigText>
                </div>
                <Paragraph className="flex-1">{page.acf.mercati.paragrafo}</Paragraph>
            </div>
        </section>
        <section className="w-full relative big-boxed mt-10">
            <div className="w-full flex items-start justify-start gap-5">
                <div className="flex-1 relative flex flex-col items-start justify-start gap-[25px]">
                    <BigText Tag="h3" className={`!text-[15px] !uppercase relative font-bold pb-[7px] ${beforeClass}`}>{page.acf.codice_etico.titolo_piccolo}</BigText>
                    <BigText Tag="h2" className={'classic-title'}>{page.acf.codice_etico.titolo_grande}</BigText>
                </div>
                <Paragraph className="flex-1">{page.acf.codice_etico.paragrafo}</Paragraph>
            </div>
        </section>
        <Timeline page={page} />
    </>
}