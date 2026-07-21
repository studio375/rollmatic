import Link from "next/link";
import CustomButton from "../Custom Button/customButton";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "@/i18n/navigation";
import { slideToggle, slideUp } from "@/helpers/functions";
import { useStore } from "@/store/useStore";
import { useParams, useSearchParams } from "next/navigation";


export default function MobileHeader({menu_items}){
    const commonClasses = 'uppercase font-medium max-l:text-[15px]';
    const [isOpen, setIsOpen] = useState(false);
    const pathName = usePathname();
    const params = useParams();
    const {lenis} = useStore();
    const toggleSetOpen = (val) => {
        setIsOpen(val);
        if(val)
            lenis.stop();
        else if(document.querySelector('html').classList.contains('lenis-stopped'))
            lenis.start();
    }
    useEffect(() => {
        toggleSetOpen(false);
    }, [pathName, params]);
    useEffect(() => {
        document.querySelectorAll('.menu-item .submenu').forEach(elem => slideUp(elem));
        document.querySelectorAll('.menu-item.has-children .main-item').forEach(elem => {
            elem.addEventListener('click', (e) => {
                e.preventDefault();
                elem.parentNode.classList.toggle('submenu-open');
                slideToggle(elem.parentNode.querySelector('.submenu'));
            })
        });
    }, []);
    return <>
        <div className="z-1 cursor-pointer mobileHeader:hidden" onClick={() => toggleSetOpen(!isOpen)}>
            {
                isOpen ? <Image src="/close.svg" width={30} height={30} alt="Close Menu" /> : <Image src="/hamburger.svg" width={30} height={30} alt="Hamburger Menu" />
            }
        </div>
        <div className={`fixed top-0 left-0 w-screen h-screen bg-white flex items-start justify-center ${!isOpen && '!hidden' }`}>
            <div data-lenis-prevent className="flex flex-col items-center py-15 max-h-full overflow-y-auto w-full"> 
                {
                    menu_items.map(elem => {
                        var children = menu_items.filter(el => el.parent==elem.id);
                        if(elem.parent) return;
                        const hasChildren = children && children.length > 0;
                        return <div className={`menu-item relative py-[15px] flex flex-col items-center ${hasChildren && 'has-children'}`} key={elem.object_id}>
                                {
                                    (elem.classes.indexOf('btn')>=0)?<CustomButton href={elem.url} Tag={Link} className="max-l:text-[15px]">{elem.title.rendered}</CustomButton>
                                    :<Link className={`${commonClasses} main-item [.menu-item:hover_&]:!underline relative`} href={elem.url}>{elem.title.rendered} {hasChildren && <><div className='text-[20px] absolute -right-1 translate-x-full top-0 block [.menu-item.submenu-open_&]:hidden'>+</div><div className='text-[20px] absolute -right-1 translate-x-full top-0 hidden [.menu-item.submenu-open_&]:block'>-</div></>}</Link>
                                }
                                {
                                    hasChildren && <div className="relative flex flex-col items-center py-3 submenu" >
                                        {
                                            children.map(elem2 => <Link key={elem2.id} className={`${commonClasses} whitespace-nowrap hover:!underline`} href={elem2.url}>{elem2.title.rendered}</Link>)
                                        }
                                    </div>
                                }
                            </div>;
                    })
                }
            </div>
        </div>
    </>
}