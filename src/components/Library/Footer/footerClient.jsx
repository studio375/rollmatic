"use client"
import parse from "html-react-parser";
import { usePathname } from "next/navigation"
import './footer.scss';
import { useEffect } from "react";

export default function FooterClient({widgets}){
    const pathName = usePathname();
    useEffect(() => {
        (function (w, d) {
            var loader = function () {
                var s = d.createElement("script"),
                    tag = d.getElementsByTagName("script")[0];

                s.src = "https://cdn.iubenda.com/iubenda.js";
                tag.parentNode.insertBefore(s, tag);
            };

            if (w.addEventListener) {
                w.addEventListener("load", loader, false);
            } else if (w.attachEvent) {
                w.attachEvent("onload", loader);
            } else {
                w.onload = loader;
            }
        })(window, document);

        if (typeof window !== "undefined") {
            const addLenisPrevent = () => {
                // Cerco l'elemento iubenda-iframe
                const banner = document.getElementById("iubenda-iframe");
                if (banner) {
                banner.setAttribute("data-lenis-prevent", "");
                }
            };

            addLenisPrevent();

            const observer = new MutationObserver((mutationsList) => {
                mutationsList.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.id === "iubenda-iframe") {
                    node.setAttribute("data-lenis-prevent", "");
                    }
                });
                });
            });

            observer.observe(document.body, { childList: true, subtree: true });
            return () => {
                observer.disconnect();
            };
        }

    }, []);
    const isContatti = (pathName === '/contatti');
    var items = widgets.filter((widget) => widget.sidebar !== "sidebar-bottom").map((widget) => {
        if(widget.rendered.length <= 0) return;
        return (<div className="singleCol w-auto max-m:w-[calc(50%-25px)] [&:first-child]:w-[50%] max-m:[&:first-child]:w-full [&:last-child]:ml-auto max-xs:w-full" key={widget.id}>{parse(widget.rendered)}</div>);
    });  
    var bottom = widgets.filter((widget) => widget.sidebar === "sidebar-bottom").map((widget) => {
        if(widget.rendered.length <= 0) return;
        return (<div className={`footer-bottom px-2 ${!isContatti && 'mt-10 max-xs:mt-5'} w-full`} key={widget.id}>{parse(widget.rendered)}</div>);
    });
    return <footer id="site-footer" className={`relative w-full bg-[var(--color-primary)] ${isContatti? 'pt-3' : 'pt-15 max-xl:pt-10 max-xs:pt-6'} pb-2`}>
        {
            !isContatti && <div className="top relative boxed xl:!px-17 flex items-start w-full max-m:flex-wrap max-m:gap-5">{items}</div>
        }
        {bottom}
    </footer>;
}