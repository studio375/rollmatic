import Image from "next/image";
import parse from 'html-react-parser';
import { Link } from "@/i18n/navigation";
/*
var prodObjectExample = {
    ID: 1,
    thumbnail_data: [{url}, {width}, {height}],
    cat: {name: cat-1, id: 11, ....},
    slug: test-1,
    title: Test 1
};
*/
export default function ProductCard({prodObject, ...props}){
    console.log(prodObject);
    if(prodObject == null){
        return <div {...props} className={`w-[calc(100%/3)] relative px-[75px] pb-6 product-image product-image-card ${props.className}`}></div>
    }
    const img = prodObject.thumbnail_data;
    return <div {...props} className={`w-[calc(100%/3)] relative ${props.className}`}>
        <Link className="flex flex-col items-center w-full relative px-[75px] pb-6 product-image product-image-card" href={`/${prodObject.cat.slug}/${prodObject.slug}`}>
            {img && <Image className="w-full h-auto object-contain" src={img[0]} width={img[1]} height={img[2]} alt={prodObject.title}/>}
            <div className="w-full h-[1px] bg-[var(--color-primary)] mt-2"></div>
            <span className="mt-1 block">{prodObject.cat.name}</span>
            <span className="font-extrabold text-[30px] text-[var(--color-primary)] mt-[5px]">{parse(prodObject.title)}</span>
        </Link>
    </div>
}