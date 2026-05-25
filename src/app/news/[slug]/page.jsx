import BigText from "@/components/Library/Big Text/bigText";
import { fetchAPI } from "@/helpers/api/fetch-api";
import { notFound } from "next/navigation";

export default async function Page({params}){
    const {slug, news}= await params;
    var obj = await fetchAPI('posts', {
        slug: slug,
        acf_format: 'standard',
        _embed: true
    });
    if(!obj) notFound();
    console.log(obj);
    return <>
        <section className="mt-15 big-boxed flex flex-col items-start">
            <BigText Tag="h1" className="!text-[40px]/[50px] !text-[var(--color-primary)] font-bold">{obj.title.rendered}</BigText>
        </section>
    </>
}