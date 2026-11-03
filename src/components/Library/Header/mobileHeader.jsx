import Link from "next/link";
import CustomButton from "../Custom Button/customButton";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { useStore } from "@/store/useStore";
import { useParams } from "next/navigation";
import { slideToggle, slideUp } from "@/helpers/functions";

function AnimatedSubmenu({children, commonClasses}) {
    return  <div className="relative flex flex-col items-center pt-3 submenu gap-1 [.submenu_&]:pt-[15px] [.submenu_&]:pb-2 [.submenu_&]:gap-[5px]" >
        {
            children.map((elem2) => {
                const hasChildren = elem2.children && elem2.children.length > 0;

                return hasChildren ? <div key={elem2.id} className={`${`flex flex-col items-center menu-item has-children`}`}>
                    <Link key={elem2.id} className={`${commonClasses} text-[15px] whitespace-nowrap hover:!underline menu-item has-children main-item relative`} href={elem2.url}>{elem2.title.rendered}<ExpandIcon /></Link>
                    <AnimatedSubmenu children={elem2.children} commonClasses={commonClasses} />
                </div> : <Link key={elem2.id} className={`${commonClasses} text-[15px] [.submenu_.submenu_>_&]:text-[12px] whitespace-nowrap hover:!underline`} href={elem2.url}>{elem2.title.rendered}</Link>
            })
        }
    </div>;
}

function ExpandIcon() {
    return <>   
        <div className='text-[20px] absolute -right-1 translate-x-full top-0 block [.menu-item.submenu-open_>.main-item_>_&]:hidden'>+</div>
        <div className='text-[20px] absolute -right-1 translate-x-full top-0 hidden [.menu-item.submenu-open_>.main-item_>_&]:block'>-</div>
    </>
}

export default function MobileHeader({menu_items, isTransparent}){
    const commonClasses = 'uppercase font-medium';
    const [isOpen, setIsOpen] = useState(false);
    const pathName = usePathname();
    const params = useParams();
    const {lenis} = useStore();
    const toggleSetOpen = (val) => {
        setIsOpen(val);
        if(val){
            lenis.stop();
            if(isTransparent)
                document.getElementById('site-header').classList.remove("transparent");
        }
        else if(document.querySelector('html').classList.contains('lenis-stopped')){
            lenis.start();
            if(isTransparent && window.scrollY <= 300)
                document.getElementById('site-header').classList.add("transparent");
        }
    }

     useEffect(() => {
        const onClickMainItem = (e) => {
            e.preventDefault();
            const elem = e.currentTarget;
            elem.parentNode.classList.toggle('submenu-open');
            slideToggle(elem.parentNode.querySelector('.submenu'));
        }
        document.querySelectorAll('.menu-item .submenu').forEach(elem => slideUp(elem));
        document.querySelectorAll('.menu-item.has-children .main-item').forEach(elem => {
            elem.addEventListener('click', onClickMainItem);
        });

        return () => {
            document.querySelectorAll('.menu-item.has-children .main-item').forEach(elem => {
                elem.removeEventListener('click', onClickMainItem);
            });
        }
    }, []);

    useEffect(() => {
        toggleSetOpen(false);
    }, [pathName, params]);
    
    

    return <>
        <div className="z-1 cursor-pointer mobileHeader:hidden" onClick={() => toggleSetOpen(!isOpen)}>
            {
                isOpen ? <Image src="/close.svg" width={30} height={30} alt="Close Menu" className="max-xs:w-[25px] max-xs:h-[25px]" /> : <><Image className="[#site-header.transparent_&]:hidden" src="/hamburger.svg" width={30} height={30} alt="Hamburger Menu" /><Image className="[#site-header:not(.transparent)_&]:hidden" src="/hamburger_light.svg" width={30} height={30} alt="Hamburger Menu" /></>
            }
        </div>
        <div className={`fixed top-0 left-0 w-screen h-screen bg-[var(--background)] flex items-start justify-center ${!isOpen && '!hidden' }`}>
            <div data-lenis-prevent className="flex flex-col items-center py-15 max-h-full overflow-y-auto w-full"> 
                {
                    menu_items.map(elem => {
                        const children = elem.children;
                        const hasChildren = children && children.length > 0;
                        return <div className={`menu-item relative py-[15px] flex flex-col items-center ${hasChildren && 'has-children'}`} key={elem.object_id}>
                                {
                                    (elem.classes.indexOf('btn')>=0)?<CustomButton href={elem.url} Tag={Link} className="no-animation">{elem.title.rendered}</CustomButton> 
                                    : <Link className={`${commonClasses} [.menu-item:hover_&]:!underline relative main-item ${hasChildren && 'has-children'}`} href={elem.url}>{elem.title.rendered}{hasChildren && <ExpandIcon />}</Link>
                                }
                                {
                                    hasChildren && <AnimatedSubmenu commonClasses={commonClasses} children={children} /> 
                                }
                                {/* {
                                    hasChildren && <AnimatedSubmenu isOpen={isSubmenuOpen}>
                                        <div className="relative flex flex-col items-center pt-3 submenu gap-3">
                                            {children.map(category => {
                                                const hasSubcategories = category.children.length > 0;
                                                const isCategoryOpen = Boolean(openMenus[category.id]);

                                                return <div key={category.id} className="flex flex-col items-center gap-1">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Link className={`${commonClasses} text-[15px] whitespace-nowrap hover:!underline`} href={category.url}>{category.title.rendered}</Link>
                                                        {hasSubcategories && <button
                                                            type="button"
                                                            className="text-[18px] leading-none"
                                                            aria-label={`${isCategoryOpen ? 'Chiudi' : 'Apri'} ${category.title.rendered}`}
                                                            aria-expanded={isCategoryOpen}
                                                            onClick={() => setOpenMenus(current => ({ ...current, [category.id]: !current[category.id] }))}
                                                        >{isCategoryOpen ? '-' : '+'}</button>}
                                                    </div>
                                                    {hasSubcategories && <AnimatedSubmenu isOpen={isCategoryOpen}>
                                                        <div className="flex flex-col items-center gap-1 pt-1">
                                                            {category.children.map(subCategory => <Link key={subCategory.id} className="text-[13px] normal-case opacity-80 hover:underline" href={subCategory.url}>{subCategory.title.rendered}</Link>)}
                                                        </div>
                                                    </AnimatedSubmenu>}
                                                </div>;
                                            })}
                                        </div>
                                    </AnimatedSubmenu>
                                } */}
                            </div>;
                    })
                }
            </div>
        </div>
    </>
}