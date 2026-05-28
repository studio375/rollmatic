import { useLocale } from "next-intl";
import config from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useParams } from "next/navigation";



export default function LangSwitcher({}){
    const locale = useLocale();
    const all_locales = config.locales;
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();
    // console.log(params);
    // console.log(pathname);
    const commonClasses = 'uppercase font-medium [#site-header.transparent_&]:!text-white';

    async function switchLocale(newLocale){
        var slug = pathname;
        var path = 'pages';
        if(pathname.includes('[product_cat]')){
            if(pathname.includes('[product]')){
                slug = params.product;
                path = 'prodotto';
            }else{
                slug = params.product_cat;
                path = 'categoria';
            }
        }
        if(pathname.includes('[slug]')){
            slug=params.slug;
            path=(pathname.includes('settori'))?'settore':'posts';
        }
        console.log(`/api/translated-slug?path=${path}&slug=${slug}&from=${locale}&to=${newLocale}`);
        const res = await fetch(
            `/api/translated-slug?path=${path}&slug=${slug}&from=${locale}&to=${newLocale}`,
        );
        if (res.ok) {
            const { slug: translatedSlug } = await res.json();
            router.replace(
            { pathname, params: { slug: translatedSlug } },
            { locale: newLocale },
            );
        } else {
            // Fallback
            router.replace("/", { locale: newLocale });
        }
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