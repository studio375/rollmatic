export default {
    locales: ['it', 'en', 'fr', 'es', 'ru'],
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
            ru: "/[product_cat]",
        },
        "/[product_cat]/[product]": {
            it: "/[product_cat]/[product]",
            en: "/[product_cat]/[product]",
            fr: "/[product_cat]/[product]",
            es: "/[product_cat]/[product]",
            ru: "/[product_cat]/[product]",
        },
        '/settori' : {
            it: '/settori',
            en: '/sectors',
            fr: '/secteurs',
            ru: '/секторы',
            es: '/sectores'
        },
        '/settori/[slug]':{
            it: '/settori/[slug]',
            en: '/sectors/[slug]',
            fr: '/secteurs/[slug]',
            ru: '/секторы/[slug]',
            es: '/sectores/[slug]'
        },
        '/news':{
            it:'/news',
            en:'/news',
            fr:'/nouvelles',
            es:'/noticias',
            ru:'/новости',
        },
        '/news/[slug]':{
            it:'/news/[slug]',
            en:'/news/[slug]',
            fr:'/nouvelles/[slug]',
            es:'/noticias/[slug]',
            ru:'/новости/[slug]',
        },
        '/azienda':{
            it:'/azienda',
            en:'/company',
            fr:'/agence',
            es:'/agencia',
            ru:'/агентство'
        },
        '/pronta-consegna':{
            it:'/pronta-consegna',
            en:'/ready-for-delivery',
            fr:'/prêt-à-être-livré',
            es:'/listo-para-entrega',
            ru:'/готово-к-доставке'
        },
        '/contatti':{
            it:'/contatti',
            en:'/contacts',
            fr:'/contacts',
            es:'/contactos',
            ru:'/контакты'
        },
        '/grazie':{
            it:'/grazie',
            en:'/thank-you',
            fr:'/merci',
            es:'/gracias',
            ru:'/спасибо'
        }
    },
}