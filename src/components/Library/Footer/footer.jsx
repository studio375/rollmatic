import { fetchAPI } from "@/helpers/api/fetch-api";
import parse from "html-react-parser";
import './footer.scss';

export default async function Footer({}){
    var widgets = await fetchAPI("widgets", {});
    var items = widgets.filter((widget) => widget.sidebar !== "sidebar-bottom").map((widget) => {
        return (<div className="singleCol w-auto [&:first-child]:w-[50%] [&:last-child]:ml-auto" key={widget.id}>{parse(widget.rendered)}</div>);
    });  
    var bottom = widgets.filter((widget) => widget.sidebar === "sidebar-bottom").map((widget) => {
        return (<div className="footer-bottom px-2 mt-25 w-full" key={widget.id}>{parse(widget.rendered)}</div>);
    });
    return <footer id="site-footer" className="relative w-full bg-[var(--color-primary)] pt-30 pb-2">
        <div className="top relative px-17 flex items-start w-full">{items}</div>
        {bottom}
    </footer>;
}