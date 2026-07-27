import { Link } from "@/i18n/navigation";

export default function Breadcrumbs({page}){
    console.log(page);
    const breadcrumb = page.yoast_head_json.schema['@graph'][2].itemListElement;
    var commonClass = 'text-[12px] text-[#AAAAAA]';
    var items = breadcrumb.map(elem => {
        //to do: devo trovare tramite elem.slug l'url definitivo della voce seguendo il pathname
        return <div key={elem.position} className="single-voice flex items-center gap-[5px]">
            {elem.item?<Link href={''} className={`${commonClass}`}>{elem['name']}</Link>:<span className={`${commonClass} underline`}>{elem['name']}</span>}
            <span className={`[.single-voice:last-child_&]:hidden ${commonClass}`}>•</span>
        </div>
    })
    return <div className="absolute top-10 left-4 z-10 flex items-center gap-[5px]">
        {items}
    </div>
}