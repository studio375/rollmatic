import { fetchAPI } from "@/helpers/api/fetch-api";
import { notFound } from "next/navigation";
import style from './grazie.module.scss';
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
    return <section id={`${style.first}`} className="big-boxed">
        <div className={`${style.container}`}>
            <BigText Tag="h1" className={`${style.title} h2`}>{page.acf.titolo}</BigText>
            <Paragraph Tag="span" className={`${style.subtitle}`}>{page.acf.testo}</Paragraph>
            <CustomButton href="/" className={`${style.button}`}>Torna alla home</CustomButton>
        </div>
    </section>;
}