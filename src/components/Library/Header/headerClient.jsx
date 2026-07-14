"use client";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../Custom Button/customButton";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import LangSwitcher from "./langSwitcher";
import { usePathname } from "@/i18n/navigation";
import MobileHeader from "./mobileHeader";


export default function HeaderClient({menu_items}){
    const commonClasses = 'uppercase font-medium [#site-header.transparent_&]:!text-white max-l:text-[15px]';
    const ref = useRef(null);
    var pathName = usePathname();
    console.log(pathName);
    var t = useTranslations('strings');
    var transparent = (pathName === t('Homepage path') || pathName.includes('[product_cat]'));
    const [isMobile, setIsMobile] = useState(false);
    const handleScroll = () => {
        if(isMobile) return;
        if(window.scrollY > 300){
            ref.current.classList.remove("transparent");
        } else {
            ref.current.classList.add("transparent");
        }
    }
    useEffect(() => {
        setIsMobile(window.innerWidth <= 1100);
        window.addEventListener("resize", () => {setIsMobile(window.innerWidth <= 1100);});
    });
    useEffect(() => {
        if(!ref) return;    
        if(!transparent) return;
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [transparent, isMobile]);
    return <header id="site-header" ref={ref} className={`fixed ${transparent && !isMobile && 'transparent'} top-0 w-[100vw] left-0 px-4 py-1 max-m:px-[5vw] flex items-center justify-start z-[99999] bg-[var(--color-background)] [&.transparent]:!bg-transparent max-mobileHeader:justify-between`}>
        <MobileHeader menu_items={menu_items} />
        <div className={`mr-4 z-1 max-mobileHeader:absolute max-mobileHeader:left-1/2 max-mobileHeader:-translate-x-1/2 z-1`}><Link href={"/"}><Image className="max-xl:w-20" src={"/Logo.svg"} width={250} height={65} alt="Logo Rollmatic" /></Link></div>
        <div className={`flex items-center justify-center rounded-[5px] w-auto gap-[45px] max-xl:gap-3 ml-auto max-mobileHeader:hidden`}>
            {
                menu_items.map(elem => {
                    var children = menu_items.filter(el => el.parent==elem.id);
                    if(elem.parent) return;
                    
                    return <div className="menu-item relative py-[15px]" key={elem.object_id}>
                            {(elem.classes.indexOf('btn')>=0)?<CustomButton href={elem.url} Tag={Link} className="max-l:text-[15px]">{elem.title.rendered}</CustomButton>:<Link className={`${commonClasses} [.menu-item:hover_&]:!underline`} href={elem.url}>{elem.title.rendered}</Link>}
                            {
                                (children && children.length > 0) && <div className="absolute top-[calc(100%)] left-[50%] translate-x-[-50%] bg-[var(--color-primary)] flex-col items-center px-[15px] py-3 rounded-[5px] gap-2 hidden [.menu-item:hover_&]:!flex" >
                                    {
                                        children.map(elem2 => <Link key={elem2.id} className={`${commonClasses} text-white whitespace-nowrap hover:!underline`} href={elem2.url}>{elem2.title.rendered}</Link>)
                                    }
                                </div>
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