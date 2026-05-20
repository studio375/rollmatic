import { fetchAPI } from "@/helpers/api/fetch-api";
import Image from "next/image";
import Link from "next/link";

export default async function Header({}){
    const menu_items = await fetchAPI("menu-items", {
        'name': 'Main Menu',
    });
    
    return <header id="site-header" className={`fixed top-0 w-[100vw] left-0 px-4 py-1 flex items-center justify-start z-[99999] bg-[var(--color-background)]`}>
        <div className={`mr-4`}><Link href={"/"}><Image src={"/Logo.svg"} width={250} height={65} alt="Logo Rollmatic" /></Link></div>
        <div className={`flex items-center justify-center py-[15px] rounded-[5px] w-auto gap-[45px] ml-auto`}>
            {
                menu_items.map(elem => {
                    return <div className="menu-item" key={elem.object_id}>
                            <Link href={elem.url}>{elem.title.rendered}</Link>
                        </div>;
                })
            }
        </div>
        <div className="ml-[45px] flex items-center gap-[45px] relative">
            <div className="block w-[2px] h-[25px] bg-[var(--color-primary)] rounded-[50px]"></div>
            <div className="flex">
                <span>ITA +</span>
            </div>
        </div>
    </header>;
}