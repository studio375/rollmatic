export default {
    locales: ['it', 'en', 'fr', 'es', 'de', 'ru'],
    defaultLocale: 'it',
    localePrefix: "as-needed",
    localeDetection: false,
    alternateLinks: true,
    pathnames: {
        "/": "/",
        "/[product_cat]":{
            it: "/[product_cat]",
            en: "/[product_cat]",
            fr: "/[product_cat]",
            es: "/[product_cat]",
            de: "/[product_cat]",
            ru: "/[product_cat]",
        },
        "/[product_cat]/[product]": {
            it: "/[product_cat]/[product]",
            en: "/[product_cat]/[product]",
            fr: "/[product_cat]/[product]",
            es: "/[product_cat]/[product]",
            de: "/[product_cat]/[product]",
            ru: "/[product_cat]/[product]",
        },
        '/settori' : {
            it: '/settori',
            en: '/sectors',
            fr: '/secteurs',
            de: '/sektoren',
            ru: '/секторы',
            es: '/sectores'
        },
        '/settori/[slug]':{
            it: '/settori/[slug]',
            en: '/sectors/[slug]',
            fr: '/secteurs/[slug]',
            de: '/sektoren/[slug]',
            ru: '/секторы/[slug]',
            es: '/sectores/[slug]'
        },
        '/news':{
            it:'/news',
            en:'/news',
            fr:'/nouvelles',
            de:'/nachricht',
            es:'/noticias',
            ru:'/новости',
        },
        '/news/[slug]':{
            it:'/news/[slug]',
            en:'/news/[slug]',
            fr:'/nouvelles/[slug]',
            es:'/noticias/[slug]',
            de:'/nachricht/[slug]',
            ru:'/новости/[slug]',
        },
        '/azienda':{
            it:'/azienda',
            en:'/company',
            fr:'/agence',
            es:'/agencia',
            de:'/agentur',
            ru:'/агентство'
        },
        '/pronta-consegna':{
            it:'/pronta-consegna',
            en:'/ready-for-delivery',
            fr:'/prêt-à-être-livré',
            es:'/listo-para-entrega',
            de:'/lieferbereit',
            ru:'/готово-к-доставке'
        },
        '/contatti':{
            it:'/contatti',
            en:'/contacts',
            fr:'/contacts',
            es:'/contactos',
            de:'/kontakte',
            ru:'/контакты'
        },
        '/grazie':{
            it:'/grazie',
            en:'/thank-you',
            fr:'/merci',
            es:'/gracias',
            de:'/danke',
            ru:'/спасибо'
        }
    },
}