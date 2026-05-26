"use client";
import Image from "next/image";
import Link from "next/link";
import CustomButton from "../Custom Button/customButton";
import { useEffect, useRef } from "react";
import { useParams, usePathname } from "next/navigation";


export default function HeaderClient({menu_items}){
    const commonClasses = 'uppercase font-medium [#site-header.transparent_&]:!text-white';
    const ref = useRef(null);
    const params = useParams();
    var pathName = usePathname();
    var transparent = (pathName === '/' || (params.slug && pathName.indexOf('news/') == -1)); //controllo che sia la home (pathname === '/') oppure che sia un post type guardando i params escludendo le news
    const handleScroll = () => {
        if(window.scrollY > 300){
            ref.current.classList.remove("transparent");
        } else {
            ref.current.classList.add("transparent");
        }
    }
    useEffect(() => {
        if(!ref) return;    
        if(!transparent) return;
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [transparent]);
    return <header id="site-header" ref={ref} className={`fixed ${transparent && 'transparent'} top-0 w-[100vw] left-0 px-4 py-1 flex items-center justify-start z-[99999] bg-[var(--color-background)] [&.transparent]:!bg-transparent`}>
        <div className={`mr-4`}><Link href={"/"}><Image src={"/Logo.svg"} width={250} height={65} alt="Logo Rollmatic" /></Link></div>
        <div className={`flex items-center justify-center rounded-[5px] w-auto gap-[45px] ml-auto`}>
            {
                menu_items.map(elem => {
                    var children = menu_items.filter(el => el.parent==elem.id);
                    if(elem.parent) return;
                    
                    return <div className="menu-item relative py-[15px]" key={elem.object_id}>
                            {(elem.classes.indexOf('btn')>=0)?<CustomButton href={elem.url} Tag={Link}>{elem.title.rendered}</CustomButton>:<Link className={`${commonClasses} [.menu-item:hover_&]:!underline`} href={elem.url}>{elem.title.rendered}</Link>}
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
        <div className="ml-[45px] flex items-center gap-[45px] relative">
            <div className="block w-[2px] h-[25px] bg-[var(--color-primary)] rounded-[50px]"></div>
            <div className="flex">
                <span className={`py-[15px] ${commonClasses}`}>ITA +</span>
            </div>
        </div>
    </header>;
}