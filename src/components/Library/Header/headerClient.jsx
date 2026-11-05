"use client";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../Custom Button/customButton";
import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import LangSwitcher from "./langSwitcher";
import { usePathname } from "@/i18n/navigation";
import MobileHeader from "./mobileHeader";
import { useParams } from "next/navigation";

function buildMenuTree(items = []) {
    const nodes = items.map(item => ({ ...item, children: [] }));
    const nodesById = new Map(nodes.map(item => [String(item.id), item]));
    const roots = [];

    nodes.forEach(item => {
        const parent = nodesById.get(String(item.parent));
        if (parent) parent.children.push(item);
        else roots.push(item);
    });

    return roots;
}

export default function HeaderClient({menu_items}){
    const commonClasses = 'uppercase font-medium [#site-header.transparent_&]:!text-[var(--background)] max-l:text-[15px]';
    const ref = useRef(null);
    var pathName = usePathname();
    const locale = useLocale();
    const params = useParams();
    const menuTree = buildMenuTree(menu_items);
    const [transparent,setTransparent] = useState(pathName === '/' || params?.product_cat);
    const [isMobile, setIsMobile] = useState(false);
    const handleScroll = () => {
        if(!ref.current) return;
        if(window.scrollY > 300){
            ref.current.classList.remove("transparent");
        } else {
            ref.current.classList.add("transparent");
        }
    }
    const positionMegaMenu = (event) => {
        const panel = event.currentTarget.querySelector(".mega-menu-panel");
        if (!panel || window.innerWidth > 1700) return;

        const itemRect = event.currentTarget.getBoundingClientRect();
        const panelWidth = Math.min(1400, window.innerWidth - 32);
        const desiredLeft = itemRect.left + itemRect.width / 2 - panelWidth / 2;
        const left = Math.max(16, Math.min(desiredLeft, window.innerWidth - panelWidth - 16));

        panel.style.width = `${panelWidth}px`;
        panel.style.left = `${left - itemRect.left}px`;
        panel.style.transform = "none";
        panel.style.translate = "none";
    }
    useEffect(() => {
        setIsMobile(window.innerWidth <= 1100);
        window.addEventListener("resize", () => {setIsMobile(window.innerWidth <= 1100);});
        setTransparent(pathName === '/' || params?.product_cat);
    }, [locale, pathName]);
    useEffect(() => {
        if(!ref) return;    
        if(!transparent) return;
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [transparent, isMobile]);
    return <header id="site-header" ref={ref} className={`fixed ${(transparent)?'transparent':''} top-0 w-[100vw] left-0 px-4 py-1 max-m:px-[5vw] max-s:py-[15px] flex items-center justify-start z-[9999] bg-[var(--color-background)] [&.transparent]:!bg-transparent max-mobileHeader:justify-between`}>
        <MobileHeader menu_items={menuTree} isTransparent={transparent} />
        <div className={`mr-4 z-1 max-mobileHeader:absolute max-mobileHeader:left-1/2 max-mobileHeader:-translate-x-1/2 z-1`}><Link href={`${locale=='it'?'/':`/${locale}`}`}><Image className="max-xl:w-20 max-s:w-15" src={"/Logo.svg"} width={250} height={65} alt="Logo Rollmatic" /></Link></div>
        <div className={`flex items-center justify-center rounded-[5px] w-auto gap-[45px] max-xl:gap-3 ml-auto max-mobileHeader:hidden`}>
            {
                menuTree.map(elem => {
                    const children = elem.children;
                    const hasNestedChildren = children.some(child => child.children.length > 0);
                    
                    return <div className="menu-item relative py-[15px]" key={elem.object_id} onMouseEnter={hasNestedChildren ? positionMegaMenu : undefined}>
                            {(elem.classes.indexOf('btn')>=0)?<CustomButton href={elem.url} Tag={Link} className="no-animation max-l:text-[15px]">{elem.title.rendered}</CustomButton>:<Link className={`${commonClasses} [.menu-item:hover_&]:!underline`} href={elem.url}>{elem.title.rendered}</Link>}
                            {
                                children.length > 0 && (hasNestedChildren ? <div className="mega-menu-panel absolute top-full left-1/2 hidden w-auto max-w-[1400px] -translate-x-1/2 rounded-[5px] bg-[var(--color-primary)] px-3 py-[25px] [.menu-item:hover_&]:!block">
                                    <div className="grid grid-cols-4 items-start gap-8">
                                        {children.map(category => <div className="flex min-w-0 flex-col items-start" key={category.id}>
                                            <Link className="mb-[17px] text-[15px] font-medium uppercase text-[var(--background)] hover:!underline whitespace-nowrap max-[1700px]:whitespace-normal max-[1700px]:break-words" href={category.url}>{category.title.rendered}</Link>
                                            {category.children.map(subCategory => <Link key={subCategory.id} className="text-[14px]/[14px] mt-1 font-normal text-[var(--background)] hover:!underline whitespace-nowrap max-[1700px]:whitespace-normal max-[1700px]:break-words [&:last-child]:hidden" href={subCategory.url}>{subCategory.title.rendered}</Link>)}
                                        </div>)}
                                    </div>
                                </div> : <div className="absolute top-[calc(100%)] left-[50%] translate-x-[-50%] bg-[var(--color-primary)] flex-col items-center px-[15px] py-3 rounded-[5px] gap-2 hidden [.menu-item:hover_&]:!flex">
                                    {children.map(child => <Link key={child.id} className={`${commonClasses} text-[var(--background)] whitespace-nowrap hover:!underline`} href={child.url}>{child.title.rendered}</Link>)}
                                </div>)
                            }
                        </div>;
                })
            }
        </div>
        <div className="ml-[45px] max-xl:ml-3 flex items-center gap-[45px] max-xl:gap-3 relative">
            <div className="block w-[2px] h-[25px] bg-[var(--color-primary)] rounded-[50px] max-mobileHeader:hidden"></div>
            <LangSwitcher />
        </div>
    </header>;
}