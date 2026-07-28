import { Link } from "@/i18n/navigation";

export default function Breadcrumbs({items, ...attr}){
    var commonClass = 'text-[12px] text-[#AAAAAA]';
    if(!items[0].href || items[0].href !== '/')
        items.splice(0, 0, {href:'/', label:'home'});
    return <div {...attr} className={`absolute top-10 left-4 z-10 flex items-center gap-[5px] lowercase ${attr.className || ''}`}>
        {items.map((item, i) => {
            if (item.href && !item.href.startsWith('/')) {
                item.href = '/' + item.href;
            }
            return <li key={i} className="flex items-center gap-x-[5px]">
                {i > 0 && <span className={`opacity-40 ${commonClass}`}>•</span>}
                {
                    item.href ? <Link
                            href={item.href}
                            className={`${commonClass}`}
                            data-link
                            data-next={item.label}
                        >
                        {item.label}
                    </Link>
                    : <span className={`${commonClass} underline`}>{item.label}</span>
                }
            </li>
        })}
    </div>
}