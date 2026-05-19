import { fetchAPI } from "@/helpers/api/fetch-api";
import Image from "next/image";
import Link from "next/link";

export default async function Header({}){
    const menu_items = await fetchAPI("menu-items", {
        'name': 'Main Menu',
    });
    
    return <header id="site-header" className={`fixed top-1 w-[100vw] left-0 px-4 flex items-center justify-start z-[99999]`}>
        <div className={`mr-4`}><Link href={"/"}><Image src={"/Logo.svg"} width={250} height={65} alt="Logo Rollmatic" /></Link></div>
        <div className={`min-w-10 p-[15px] bg-[var(--color-primary)] flex justify-center items-center mr-1 rounded-[5px]`}>MENU</div>
        <div className={`flex items-center justify-center px-2 py-[15px] sfumatura-1 rounded-[5px] w-full gap-4`}>
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