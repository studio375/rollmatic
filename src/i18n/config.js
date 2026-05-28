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
        '/pronta-consegna':'/pronta-consegna',
        '/contatti':'/contatti',
        '/grazie':'/grazie',
        '/news':'/news',
        '/news/[slug]':'/news/[slug]',
    },
}