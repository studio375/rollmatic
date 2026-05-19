import { fetchAPI } from "@/helpers/api/fetch-api";
import { notFound } from "next/navigation";
import BigText from "@/components/Library/Big Text/bigText";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import CustomButton from "@/components/Library/Custom Button/customButton";

export default async function Page({params}){
    //const {slug} = await params;
    const page = await fetchAPI('pages',{
        slug: 'grazie',
        acf_format: 'standard'
    });
    if(!page) notFound();
    console.log(page);
    return <section className="big-boxed mt-20 mb-15 w-full relative">
        <div className={`flex flex-col items-center w-full gap-3`}>
            <BigText Tag="h1" className={`h2`}>{page.acf.titolo}</BigText>
            <Paragraph Tag="span" className={``}>{page.acf.testo}</Paragraph>
            <CustomButton href="/" className={``}>Torna alla home</CustomButton>
        </div>
    </section>;
}