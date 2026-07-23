import { useLocale } from "next-intl";
import config from "@/i18n/config";
import { usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";



export default function LangSwitcher({}){
    const locale = useLocale();
    const all_locales = config.locales;
    const pathname = usePathname();
    const params = useParams();
    const commonClasses = 'uppercase font-medium [#site-header.transparent_&]:!text-white';
    async function switchLocale(newLocale) {
        const replacements = [];
        if (pathname.includes('[product_cat]')) {
            replacements.push({ token: '[product_cat]', path: 'categoria', slug: params.product_cat });
        }
        if (pathname.includes('[product]')) {
            replacements.push({ token: '[product]', path: 'prodotto', slug: params.product });
        }
        if (pathname.includes('[slug]')) {
            const path = pathname.includes('settori') ? 'settore' : 'posts';
            replacements.push({ token: '[slug]', path, slug: params.slug });
        }

        // pagina senza segmenti dinamici (es. pagina statica)
        if (replacements.length === 0) {
            //router.push(buildLocalizedHref(pathname, newLocale));
            window.location.href = buildLocalizedHref(pathname, newLocale);
            return;
        }

        try {
            //array con tutti i token tradotti (se ho due livelli come categoria->prodotto, ho un array di 2 oggetti con la traduzione della cat e del prodotto)
            const results = await Promise.all( //lancia tutti insieme i fetch, e quando finiscono tutti restituisco il risultato di tutti sottoforma di array
                replacements.map(r =>
                    fetch(`/api/translated-slug?path=${r.path}&slug=${r.slug}&from=${locale}&to=${newLocale}`)
                        .then(res => (res.ok ? res.json() : null))
                )
            );

            // se manca anche solo una traduzione, l'URL sarebbe incoerente -> fallback
            if (results.some(r => !r)) { //controllo che non ci sia nessun null
                //router.push(buildLocalizedHref('/', newLocale));
                window.location.href = buildLocalizedHref('/', newLocale);
                return;
            }

            let targetPathname = pathname;
            replacements.forEach((r, i) => {
                const translatedSlug = Object.values(results[i])[0]; // non serve conoscere la key esatta, con object.values ottengo in posizione 0 la key e in posizione 1 la value
                targetPathname = targetPathname.replace(r.token, translatedSlug);
            });
            //router.push(buildLocalizedHref(targetPathname, newLocale));
            window.location.href = buildLocalizedHref(targetPathname, newLocale);
        } catch (e) {
            //router.push(buildLocalizedHref('/', newLocale));
            window.location.href = buildLocalizedHref('/', newLocale);
        }
    }

    function buildLocalizedHref(path, targetLocale) {
        const isDefault = targetLocale === config.defaultLocale;
        const prefix = isDefault ? '' : `/${targetLocale}`;
        return `${prefix}${path}`.replace(/\/+/g, '/');
    }

    return <div className="flex relative lang-selector">
        <div className="current flex">
            <span className={`py-[15px] uppercase ${commonClasses}`}>{locale} +</span>
        </div>
       <div className="absolute top-[100%] left-[50%] translate-x-[-50%] bg-[var(--color-primary)] flex-col items-center p-[15px] rounded-[5px] gap-1 hidden [.lang-selector:hover_&]:!flex">
            {
                all_locales.map(lang => {
                    if(lang == locale) return;
                    return <span key={lang} onClick={() => switchLocale(lang)} className={`${commonClasses} text-white whitespace-nowrap hover:!underline cursor-pointer`}>{lang}</span>;
                })
            }
       </div>
    </div>
}