import { fetchAPI } from "@/helpers/api/fetch-api";
import './footer.scss';
import FooterClient from "./footerClient";
import { getLocale } from "next-intl/server";

export default async function Footer({}){
    const locale = await getLocale();
    var widgets = await fetchAPI("widgets", {
        lang: locale
    });
    return <FooterClient widgets={widgets} />
}