import Image from "next/image";
import CustomButton from "../Custom Button/customButton";
import parse from 'html-react-parser'

/*
var prodObjectExpamle = {
    ID: 1,
    thumbnail_data: [{url}, {width}, {height}],
    cat: {name: cat-1, id: 11, ....},
    slug: test-1,
    title: Test 1
};
*/
export default function ProntaConsegnaCard({prodObject, ...props}){
    const img = prodObject.thumbnail_data;
    return <div {...props} className={`w-[calc(100%/3)] relative flex flex-col items-center ${props.className}`}>
        <Image src={img[0]} width={img[1]} height={img[2]} alt={prodObject.title}/>
        <div className="w-full h-[1px] bg-[var(--color-primary)] mt-2"></div>
        <span className="mt-1 block">{prodObject.cat.name}</span>
        <span className="font-extrabold text-[30px] text-[var(--color-primary)] mt-[5px]">{parse(prodObject.title)}</span>
        <div className="flex items-center justify-center gap-1 mt-2">
            <CustomButton className="!text-[var(--color-foreground)] !border-[var(--color-foreground)] text-[14px]" href="" target="_blank">Specifiche tecniche</CustomButton>
            <CustomButton className="!text-[var(--color-foreground)] !border-[var(--color-foreground)] text-[14px]" href="#form">Richiedi offerta</CustomButton>
        </div>
    </div>
}