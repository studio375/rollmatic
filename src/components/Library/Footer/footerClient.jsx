"use client"
import parse from "html-react-parser";
import { usePathname } from "next/navigation"
import './footer.scss';

export default function FooterClient({widgets}){
    const pathName = usePathname();
    const isContatti = (pathName === '/contatti');
    var items = widgets.filter((widget) => widget.sidebar !== "sidebar-bottom").map((widget) => {
        return (<div className="singleCol w-auto max-m:w-[calc(50%-25px)] [&:first-child]:w-[50%] max-m:[&:first-child]:w-full [&:last-child]:ml-auto max-xs:w-full" key={widget.id}>{parse(widget.rendered)}</div>);
    });  
    var bottom = widgets.filter((widget) => widget.sidebar === "sidebar-bottom").map((widget) => {
        return (<div className={`footer-bottom px-2 ${!isContatti && 'mt-25 max-xl:mt-15 max-s:mt-10'} w-full`} key={widget.id}>{parse(widget.rendered)}</div>);
    });
    return <footer id="site-footer" className={`relative w-full bg-[var(--color-primary)] ${isContatti? 'pt-3' : 'pt-30 max-xl:pt-15 max-s:pt-10'} pb-2`}>
        {
            !isContatti && <div className="top relative boxed xl:!px-17 flex items-start w-full max-m:flex-wrap max-m:gap-5">{items}</div>
        }
        {bottom}
    </footer>;
}