import { fetchAPI } from "@/helpers/api/fetch-api";
import { notFound } from "next/navigation";

export default async function Page({params}){
    const {slug} = await params;
    const cat = await fetchAPI('categoria',{
        slug: slug
    });
    console.log(cat);
    if(!cat) notFound();
    return <div>
        pagina categoria
    </div>;
}