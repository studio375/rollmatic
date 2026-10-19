"use client"
import BigText from "@/components/Library/Big Text/bigText";
import Breadcrumbs from "@/components/Library/Breadcrumbs/breadcrumbs";
import Faq from "@/components/Library/Faq/faq";
import GravityForm from "@/components/Library/Gravity Form/gravityForm";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import ProductLoop from "@/components/Library/Product Loop/productLoop";
import { useStore } from "@/store/useStore";
import {useTranslations } from "next-intl";
import { useEffect } from "react";

export default function ClientPage({ page, products, form }) {
  const t = useTranslations("strings");
  
  products = products.filter(elem => {
    return elem.acf.pronta_consegna == true;
  })

  const prodAllCat = {};
  products.forEach((elem) => {
    const topLevelCats = elem.category_info.filter((cat) => cat.parent == 0);
    const key = topLevelCats[0].name;
    if (!prodAllCat[key]) {
      prodAllCat[key] = [];
    }
    prodAllCat[key].push(elem);
  });

  const {setCurrentPageTitle, setFormHtmlValue} = useStore();
  useEffect(() => {
    setCurrentPageTitle(null);
    setFormHtmlValue(' - ');
  },[setCurrentPageTitle])
  
  return (
    <>
      <Breadcrumbs items={[{ label: page.title.rendered }]} />
      <section className="w-full relative big-boxed pt-20 max-m:pt-13">
        <div className="w-full flex items-start justify-between border-b-[1px] border-b-[var(--color-primary)] pb-3 max-l:flex-col max-l:gap-3">
          <BigText Tag="h1" className="classic-title">
            {page.title.rendered}
          </BigText>
          <Paragraph className="w-[calc(100%/3*2)] max-l:w-full">
            {page.acf.paragrafo}
          </Paragraph>
        </div>
      </section>
      <section className="flex flex-col items-start mt-8 max-m:mt-4 gap-5 mb-8 max-m:mb-4 gap-10">
      {Object.keys(prodAllCat).map((catName) => (
          <ProductLoop
            key={catName}
            title={catName}
            catFilters={null}
            filters={false}
            prontaConsegna={true}
            products={prodAllCat[catName]}
          />
        ))}
      </section>
      {/* <ProductLoop products={products} prontaConsegna={true} filters={false} /> */}
      <section
        id="form"
        className="mb-10 max-s:mb-6 relative w-full mt-25 max-xl:mt-10 max-s:mt-5 big-boxed flex items-start max-m:flex-col max-m:gap-3"
      >
        <BigText
          className={`m:w-[calc(100%/3)] !text-[36px] !font-bold`}
          Tag="h3"
        >
          {t("Richiedi offerta").replace("<br/>", " ")}
        </BigText>
        <GravityForm className={`m:!w-[calc(200%/3)]`} formObject={form} />
      </section>
      {page.acf.faq && page.acf.faq.length > 0 && (
        <section className="relative w-full big-boxed mb-10 max-s:mb-6 flex flex-col items-start gap-5 max-s:gap-3">
          <BigText Tag="h2" className="classic-title">
            Faq
          </BigText>
          <Faq faq={page.acf.faq} />
        </section>
      )}
    </>
  );
}
