import { fetchAPI } from "@/helpers/api/fetch-api";
import parse from "html-react-parser";
import './footer.scss';

export default async function Footer({}){
    var widgets = await fetchAPI("widgets", {});
    var items = widgets.filter((widget) => widget.sidebar !== "sidebar-bottom").map((widget) => {
        return (<div className="singleCol" key={widget.id}>{parse(widget.rendered)}</div>);
    });  
    var bottom = widgets.filter((widget) => widget.sidebar === "sidebar-bottom").map((widget) => {
        return (<div className="footer-bottom" key={widget.id}>{parse(widget.rendered)}</div>);
    });
    return <footer id="site-footer">
        <div className="top">{items}</div>
        {bottom}
    </footer>;
}