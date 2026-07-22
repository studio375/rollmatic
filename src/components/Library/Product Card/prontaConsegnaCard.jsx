import Image from "next/image";
import CustomButton from "../Custom Button/customButton";
import parse from 'html-react-parser'

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
    const commonClass = `relative product-image product-image-card px-[75px] max-xl:px-3 pb-6 max-s:pb-3 w-[calc(100%/3)] max-l:w-1/2 max-s:w-full ${props.className}`;
    if(prodObject == null){
        return <div {...props} className={`${commonClass} max-l:[&:nth-last-child(1)]:hidden max-l:[&:nth-last-child(2)]:hidden max-s:hidden`}></div>
    }
    const img = prodObject.thumbnail_data;
    return <div {...props} className={`flex flex-col items-center ${commonClass}`}>
        {img && <Image src={img[0]} width={img[1]} height={img[2]} alt={prodObject.title}/>}
        <div className="w-full h-[1px] bg-[var(--color-primary)] mt-2"></div>
        {prodObject.cat && <span className="mt-1 block text-center">{prodObject.cat.name}</span>}
        <span className="font-extrabold text-[30px] text-[var(--color-primary)] mt-[5px] text-center">{parse(prodObject.title)}</span>
        <div className="flex items-center justify-center gap-1 mt-2 max-[450px]:flex-col max-[450px]:gap-1">
            <CustomButton className="!text-[var(--color-foreground)] !border-[var(--color-foreground)] text-[14px] max-[450px]:w-full justify-center" href="" target="_blank">Specifiche tecniche</CustomButton>
            <CustomButton className="!text-[var(--color-foreground)] !border-[var(--color-foreground)] text-[14px] max-[450px]:w-full justify-center" href="#form">Richiedi offerta</CustomButton>
        </div>
    </div>
}