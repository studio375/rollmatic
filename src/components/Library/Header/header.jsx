import { fetchAPI } from "@/helpers/api/fetch-api";
import HeaderClient from "./headerClient";

export default async function Header({}){
    const menu_items = await fetchAPI("menu-items", {
        'name': 'Main Menu',
    });
    return <HeaderClient menu_items={menu_items} />
}