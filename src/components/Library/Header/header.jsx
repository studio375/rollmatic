import { fetchAPI } from "@/helpers/api/fetch-api";
import HeaderClient from "./headerClient";
import { getLocale } from "next-intl/server";

export default async function Header({}){
    const locale = await getLocale();
    const menu = await fetchAPI('menus', {
        slug: `main-menu-${locale}`,
    });
    const menu_items = await fetchAPI("menu-items", {
        menus: menu.id,
        lang: locale
    });
    return <HeaderClient menu_items={menu_items} />
}