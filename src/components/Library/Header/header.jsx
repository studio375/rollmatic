import { fetchAPI } from "@/helpers/api/fetch-api";
import Image from "next/image";
import Link from "next/link";
import style from './header.module.scss';

export default async function Header({}){
    const menu_items = await fetchAPI("menu-items", {
        'name': 'Main Menu',
    });
    
    return <header id="site-header" className={`${style.siteHeader}`}>
        <div className={style.logo}><Link href={"/"}><Image src={"/Logo.svg"} width={250} height={65} alt="Logo Rollmatic" /></Link></div>
        <div className={style.hamburgerButton}>MENU</div>
        <div className={style.menuContainer}>
            {
                menu_items.map(elem => {
                    return <div className="menu-item" key={elem.object_id}>
                            <Link href={elem.url}>{elem.title.rendered}</Link>
                        </div>;
                })
            }
        </div>
    </header>;
}