"use client"
import parse from "html-react-parser";
import { usePathname } from "next/navigation"
import './footer.scss';

export default function FooterClient({widgets}){
    const pathName = usePathname();
    const isContatti = (pathName === '/contatti');
    var items = widgets.filter((widget) => widget.sidebar !== "sidebar-bottom").map((widget) => {
        return (<div className="singleCol w-auto [&:first-child]:w-[50%] [&:last-child]:ml-auto" key={widget.id}>{parse(widget.rendered)}</div>);
    });  
    var bottom = widgets.filter((widget) => widget.sidebar === "sidebar-bottom").map((widget) => {
        return (<div className={`footer-bottom px-2 ${!isContatti && 'mt-25'} w-full`} key={widget.id}>{parse(widget.rendered)}</div>);
    });
    return <footer id="site-footer" className={`relative w-full bg-[var(--color-primary)] ${isContatti? 'pt-3' : 'pt-30'} pb-2`}>
        {
            !isContatti && <div className="top relative px-17 flex items-start w-full">{items}</div>
        }
        {bottom}
    </footer>;
}