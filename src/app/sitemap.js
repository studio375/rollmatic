// src/app/sitemap.js
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL;
const WP_API = process.env.BACKEND_ENDPOINT;

// **** VARIABILI DA MODIFICARE SITO PER SITO ****

const LOCALES = routing?.locales || ['it', 'en', 'fr', 'es', 'ru']; //tutte le lingue del sito
const DEFAULT_LOCALE = routing?.defaultLocale || "it"; //lingua principale
const DYNAMIC_POST_TYPE = ['prodotto', 'categoria', 'settore', 'posts']; //tutti i post_type / tassonomie per cui dover creare url dinamici
const STATIC_PAGES = [ // Pagine statiche (quelle definite in routing.js)
  "/",
  "/azienda",
  "/contatti",
  "/grazie",
  "/news",
  "/pronta-consegna",
  "/settori",
];
const ADD_VARIABLES_ON_FETCH = 'type,category_info,wpml_translations,term_id'; //variabili da aggiungere nel fetch dei post

// **** UTILITIES DA ADATTARE SITO PER SITO ****

const getTranslationOfSlug = (slug, locale) => { //funzione per la traduzione di certi slug fissi ma da tradurre lungua per lingua
  if(slug == 'settori'){
    switch(locale){
      case 'it': return 'settori'; break;
      case 'en': return 'sectors'; break;
      case 'fr': return 'secteurs'; break;
      case 'es': return 'sectores'; break;
      case 'ru': return 'секторы'; break;
    }
  }
  if(slug == 'news'){
    switch(locale){
      case 'it': return 'news'; break;
      case 'en': return 'news'; break;
      case 'fr': return 'nouvelles'; break;
      case 'es': return 'noticias'; break;
      case 'ru': return 'новости'; break;
    }
  }
  return null;
}

//funzione per costruire il path "centrale" tra l'url del sito e lo slug dell'item (ad esempio se in mezzo deve esserci una parola statica o una categoria dinamica ecc)
function buildPath(item, locale){
  if(item.type === 'prodotto'){
    var cat = item.category_info.filter(elem => {
        if(locale !== 'it')
            return elem.parent==0 && elem.term_id != elem.main_cat_italian_id; //controllo perchè in alcune categorie dall'import si è salvata anche la categoria italiana
        else
            return elem.parent==0;
    })[0];
    return cat.slug;
  }
  if(item.type === 'settore'){
    return getTranslationOfSlug('settori', locale);
  }
  return null;
}

// **** SITEMAP ****

export default async function sitemap() {
  //Pagine statiche
  const staticEntries = STATIC_PAGES.map((page) => makeEntry(page));
  var dynamicEntries = {};

  //controllo se ci sono dei post_type o tassonomie dinamiche
  if(DYNAMIC_POST_TYPE && DYNAMIC_POST_TYPE.length > 0){
    //fetch per tutte le lingue
    const results = await Promise.all(
      LOCALES.map((locale) => getAllPostsByLocale(locale))
    );
    //creo un oggetto che associa lingua - post trovati in quella lingua
    const postsByLocale = Object.fromEntries(
      LOCALES.map((locale, i) => [locale, results[i]])
    );

    dynamicEntries = await buildDynamicEntries({ localesData: postsByLocale });
  }

  return [...staticEntries, ...dynamicEntries];
}


// **** FUNZIONI PER BUILDARE I 2 TIPI DI ENTRIES ****

//funzione per creare le entries delle pagine statiche
function makeEntry(pathname, params = {}, lastModified = null) {
  const languages = {};
  for (const locale of LOCALES) {
    const path = getPathname({
      href: params.slug
        ? { pathname, params: { slug: params[locale] || params.slug } }
        : pathname,
      locale,
    });
    // IT senza prefisso, EN con /en
    languages[locale] = `${SITE_URL}${path}`;
  }

  return {
    url: languages[DEFAULT_LOCALE], // canonical = italiano
    priority: pathname === '/'?1:0.8, //rendo la home prioritaria su tutto
    lastModified: lastModified || new Date(),
    alternates: { languages },
  };
}

//funzione generica per costruire le entries dinamiche
async function buildDynamicEntries({ localesData,  priority = 0.8 }) {
  const baseLocalePosts = localesData[DEFAULT_LOCALE]; //mi prendo tutti i post nella lingua principale
  return baseLocalePosts.map((item) => { //per ogni post devo trovare le traduzioni
    const languages = {};
    for (const locale of LOCALES) { //per tutte le lingue trovo il post corrente in quella lingua
      const match =
        locale === DEFAULT_LOCALE
          ? item //se è la lingua principale restituisco l'oggetto del post corrente
          : getTranslatedElement(localesData[locale], item); //oggetto del post corrente nella lingua corrente
      
      if (match) { //se trova un oggetto
        var path = buildPath(match, locale); //ottengo il path "centrale"    
        //costruirsco l'url finale
        languages[locale] =
          locale === DEFAULT_LOCALE
            ? `${SITE_URL}/${path?`${path}/`:''}${match.slug}`
            : `${SITE_URL}/${locale}/${path?`${path}/`:''}${match.slug}`;
      }
    }
    return {
      url: languages[DEFAULT_LOCALE],
      lastModified: item.modified || new Date(),
      priority,
      alternates: { languages },
    };
  });
}


// **** UTILITIES ****

//funzione per ottenere l'oggetto del post tradotto nella lingua corrente
function getTranslatedElement(posts, main_lang_post_object){
  var result = posts?.find((post) => {
    //tra le traduzioni del post corrente trovo quella della lingua principale 
    var [mainLangTranslationKey, mainLangTranslationObj] = Object.entries(post.wpml_translations)?.filter(elem => elem[0].includes(DEFAULT_LOCALE))[0];
    return mainLangTranslationObj.id === main_lang_post_object.id;
  });
  return result;
}

// Fetch dei post da WP per il post_type / tassonomia selezionato nella lingua selezionata
async function getPostsByLocale(locale, postType){
  const res = await fetch(
    `${WP_API}/${postType}?lang=${locale}&per_page=100&_fields=id,slug,modified,${ADD_VARIABLES_ON_FETCH}`,
    { next: { revalidate: 3600 } },
  );
  if (!res.ok) return [];
  return res.json();
}

//creo un'array con tutti i post per cui fare un entry dinamica in tutte le lingue
async function getAllPostsByLocale(locale) {
  const results = await Promise.all(
    DYNAMIC_POST_TYPE.map((pt) => getPostsByLocale(locale, pt))
  );
  return results.flat();
}


