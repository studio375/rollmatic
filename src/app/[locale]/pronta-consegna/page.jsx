import BigText from "@/components/Library/Big Text/bigText";
import Faq from "@/components/Library/Faq/faq";
import GravityForm from "@/components/Library/Gravity Form/gravityForm";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import ProductLoop from "@/components/Library/Product Loop/productLoop";
import { fetchAPI } from "@/helpers/api/fetch-api";
import { notFound } from "next/navigation";

export default async function Page({params}){
    var page = await fetchAPI('pages', {
        slug: 'pronta-consegna',
        acf_format: 'standard'
    });
    if(!page) notFound();
    var products = await fetchAPI('pronta-consegna', {
        acf_format: 'standard',
        _embed: true
    });
    var form = await fetchAPI('forms/1', {}, true);
    return <>
        <section className="w-full relative big-boxed pt-20">
            <div className="w-full flex items-start justify-between border-b-[1px] border-b-[var(--color-primary)] pb-3 ">
                <BigText Tag="h1" className="classic-title">{page.title.rendered}</BigText>
                <Paragraph className="w-[calc(100%/3*2)]">{page.acf.paragrafo}</Paragraph>
            </div>    
        </section>
        <ProductLoop products={products} prontaConsegna={true} />
        <section id="form" className="relative w-full mt-25 big-boxed flex items-start">
            <BigText className={`w-[calc(100%/3)] !text-[36px] !font-bold`} Tag="h3">{'Richiedi<br>offerta'}</BigText>
            <GravityForm className={`!w-[calc(200%/3)]`} formObject={form} />
        </section>
        <section className="relative w-full big-boxed my-10 flex flex-col items-start gap-5">
            <BigText Tag="h2" className="classic-title">Faq</BigText>
            <Faq faq={page.acf.faq} />
        </section>
    </>
}