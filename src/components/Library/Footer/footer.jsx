import { fetchAPI } from "@/helpers/api/fetch-api";
import './footer.scss';
import FooterClient from "./footerClient";

export default async function Footer({}){
    var widgets = await fetchAPI("widgets", {});
    return <FooterClient widgets={widgets} />
}