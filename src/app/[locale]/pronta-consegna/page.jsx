import BigText from "@/components/Library/Big Text/bigText";
import Faq from "@/components/Library/Faq/faq";
import GravityForm from "@/components/Library/Gravity Form/gravityForm";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import ProductLoop from "@/components/Library/Product Loop/productLoop";
import { fetchAPI } from "@/helpers/api/fetch-api";
import { buildMetadata } from "@/helpers/seo/metadata";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function Page({params}){
    const {locale} = await params;
    setRequestLocale(locale);
    const t = await getTranslations('strings');
    var page = await fetchAPI('pages', {
        slug: 'pronta-consegna',
        acf_format: 'standard',
        lang: locale
    });
    if(!page) notFound();
    var products = await fetchAPI('pronta-consegna', {
        acf_format: 'standard',
        _embed: true,
        per_page: 100,
        lang: locale
    });
    var form = await fetchAPI('forms/1', {}, true);
    return <>
        <section className="w-full relative big-boxed pt-20 max-m:pt-13">
            <div className="w-full flex items-start justify-between border-b-[1px] border-b-[var(--color-primary)] pb-3 max-l:flex-col max-l:gap-3">
                <BigText Tag="h1" className="classic-title">{page.title.rendered}</BigText>
                <Paragraph className="w-[calc(100%/3*2)] max-l:w-full">{page.acf.paragrafo}</Paragraph>
            </div>    
        </section>
        <ProductLoop products={products} prontaConsegna={true} filters={false} />
        <section id="form" className="relative w-full mt-25 max-xl:mt-10 max-s:mt-5 big-boxed flex items-start max-m:flex-col max-m:gap-3">
            <BigText className={`m:w-[calc(100%/3)] !text-[36px] !font-bold`} Tag="h3">{t("Richiedi offerta")}</BigText>
            <GravityForm className={`m:!w-[calc(200%/3)]`} formObject={form} />
        </section>
        <section className="relative w-full big-boxed my-10 max-s:mt-6 flex flex-col items-start gap-5 max-s:gap-3">
            <BigText Tag="h2" className="classic-title">Faq</BigText>
            <Faq faq={page.acf.faq} />
        </section>
    </>
}


export async function generateMetadata({ params }) {
    const { locale } = await params;
    const page = await fetchAPI("pages", {
      lang: locale,
      slug: "pronta-consegna",
      _fields: "yoast_head_json",
    });
    return buildMetadata({
        yoast: page?.yoast_head_json,
        pathname: "/pronta-consegna",
        locale,
    });
}