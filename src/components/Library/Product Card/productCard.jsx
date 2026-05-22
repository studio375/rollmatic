import Image from "next/image";

/*
var prodObjectExpamle = {
    ID: 1,
    thumbnail_data: [{url}, {width}, {height}],
    cat: {name: cat-1, id: 11, ....},
    slug: test-1,
    title: Test 1
};
*/
export default function ProductCard({prodObject, ...props}){
    const img = prodObject.thumbnail_data;
    return <div {...props} className={`w-[calc(100%/3)] relative flex flex-col items-center ${props.className}`}>
        <Image src={img[0]} width={img[1]} height={img[2]} alt={prodObject.title}/>
        <div className="w-full h-[1px] bg-[var(--color-primary)] mt-2"></div>
        <span className="mt-1 block">{prodObject.cat.name}</span>
        <span className="font-extrabold text-[30px] text-[var(--color-primary)] mt-[5px]">{prodObject.title}</span>
    </div>
}