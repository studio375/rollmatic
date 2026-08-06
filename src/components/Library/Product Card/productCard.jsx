import Image from "next/image";
import parse from 'html-react-parser';
import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
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
    const locale = useLocale();
    if(prodObject == null){
        return <div {...props} className={`w-[calc(100%/3)] max-m:w-1/2 px-[75px] max-xl:px-3 min-[1920px]:!px-[3vw] overflow-hidden max-xs:w-full max-xs:hidden [&:not(.it-id-284)]:min-[1920px]:!w-[calc(100%/4)] [&:not(.it-id-284):last-child:nth-child(4n)]:max-[1920px]:hidden ${props.className}`}></div>
    }
    const commonClass = `relative px-[75px] max-xl:px-3 min-[1920px]:!px-[3vw] pb-6 max-s:pb-3 product-image product-image-card it-id-${prodObject.cat.main_cat_italian_id}`;
    const img = prodObject.thumbnail_data;
    var cat = (prodObject.cat && prodObject.cat.length > 0)?[...prodObject.cat]:null;
    var mainCat = cat.filter(elem => {
        if(locale !== 'it')
            return elem.parent==0 && elem.term_id != elem.main_cat_italian_id; //controllo perchè in alcune categorie dall'import si è salvata anche la categoria italiana
        else
            return elem.parent==0;
    })[0];
    var childCat = cat.filter(elem => elem.parent==mainCat.term_id)[0];
    if(!childCat) childCat=mainCat;
    return <div {...props} className={`card w-[calc(100%/3)] max-m:w-1/2 max-xs:w-full relative flex [&:not(.it-id-284)]:min-[1920px]:!w-[calc(100%/4)]`}>
        <Link className={`flex flex-col items-center w-full ${commonClass} ${props.className || ''} it-id-${mainCat.main_cat_italian_id}`} href={`/${mainCat.slug}/${prodObject.slug}`}>
            {img && <div className="w-full relative pb-2">
                <Image className="w-full h-auto object-contain z-10 relative" src={img[0]} width={img[1]} height={img[2]} alt={prodObject.title}/>
                <div className="w-full h-[1px] bg-[var(--color-primary)] absolute bottom-0 left-0 transition-all duration-500 [.card:hover_&]:h-full z-0"></div>
            </div>}
            <span className="mt-1 block text-center">{childCat.name}</span>
            <span className="font-extrabold text-[30px] text-[var(--color-primary)] mt-[5px] text-center">{parse(prodObject.title)}</span>
        </Link>
    </div>
}