import Image from "next/image";
import CustomButton from "../Custom Button/customButton";
import parse from 'html-react-parser'
import { useStore } from "@/store/useStore";
import { useLocale, useTranslations } from "next-intl";

/*
var prodObjectExample = {
    ID: 1,
    thumbnail_data: [{url}, {width}, {height}],
    cat: {name: cat-1, id: 11, ....},
    slug: test-1,
    title: Test 1
};
*/
export default function ProntaConsegnaCard({prodObject, ...props}){
    const {setFormHtmlValue, lenis} = useStore();
    const t = useTranslations('strings');
    const locale = useLocale();
    const commonClass = `relative product-image product-image-card px-[75px] max-xl:px-3 min-[1920px]:!px-[3vw] w-[calc(100%/3)] max-l:w-1/2 max-s:w-full overflow-hidden [&:not(.it-id-284)]:min-[1920px]:!w-[calc(100%/4)] ${props.className}`;
    if(prodObject == null){
        return <div {...props} className={`${commonClass} max-l:[&:nth-last-child(1)]:hidden max-l:[&:nth-last-child(2)]:hidden max-s:hidden `}></div>
    }
    const handleClickRequest = (value) => {
        setFormHtmlValue(value);
        lenis.scrollTo(document.getElementById('form').offsetTop-200, 1);
    }
    const img = prodObject.thumbnail_data;
    var cat = (prodObject.cat && prodObject.cat.length > 0)?[...prodObject.cat]:null;
    var mainCat = cat?.filter(elem => {
        if(locale !== 'it')
            return elem.parent==0 && elem.term_id != elem.main_cat_italian_id; //controllo perchè in alcune categorie dall'import si è salvata anche la categoria italiana
        else
            return elem.parent==0;
    })[0];
    var childCat = cat?.filter(elem => elem.parent==mainCat.term_id)[0];
    if(!childCat) childCat=mainCat;
    return <div {...props} className={`flex flex-col items-center ${props.className || ''} ${commonClass}`}>
        {img && <Image src={img[0]} width={img[1]} height={img[2]} alt={prodObject.title}/>}
        <div className="w-full h-[1px] bg-[var(--color-primary)] mt-2"></div>
        {prodObject.cat && <span className="mt-1 block text-center">{childCat.name}</span>}
        <span className="font-extrabold text-[30px] text-[var(--color-primary)] mt-[5px] text-center">{parse(prodObject.title)}</span>
        <div className="flex items-center justify-center gap-1 mt-2 max-[450px]:flex-col max-[450px]:gap-1">
            <CustomButton className="no-animation !text-[var(--color-foreground)] !border-[var(--color-foreground)] text-[14px] max-[450px]:w-full justify-center" href="" target="_blank">{t('Specifiche tecniche')}</CustomButton>
            <CustomButton onClick={() => handleClickRequest(prodObject.title)} className="no-animation !text-[var(--color-foreground)] !border-[var(--color-foreground)] text-[14px] max-[450px]:w-full justify-center" Tag={'div'}>{t('Richiedi offerta').replace('<br/>', ' ')}</CustomButton>
        </div>
    </div>
}