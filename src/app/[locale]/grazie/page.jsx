import { fetchAPI } from "@/helpers/api/fetch-api";
import { notFound } from "next/navigation";
import BigText from "@/components/Library/Big Text/bigText";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import CustomButton from "@/components/Library/Custom Button/customButton";
import { buildMetadata } from "@/helpers/seo/metadata";
import { setRequestLocale } from "next-intl/server";

export default async function Page({params}){
    const {locale} = await params;
    setRequestLocale(locale);
    const page = await fetchAPI('pages',{
        slug: 'grazie',
        acf_format: 'standard',
        lang: locale
    });
    if(!page) notFound();
    return <section className="big-boxed mt-20 mb-15 max-s:mt-15 max-s:mb-10 w-full relative">
        <div className={`flex flex-col items-center w-full gap-3`}>
            <BigText Tag="h1" className={`h2 text-center`}>{page.acf.titolo}</BigText>
            <Paragraph Tag="span" className={`text-center`}>{page.acf.testo}</Paragraph>
            <CustomButton href="/" className={``}>Torna alla home</CustomButton>
        </div>
    </section>;
}


export async function generateMetadata({ params }) {
  const { locale } = await params;
  const page = await fetchAPI("pages", {
    lang: locale,
    slug: "grazie",
  });
  return buildMetadata({
    yoast: page?.yoast_head_json,
    pathname: "/grazie",
    locale,
  });
}