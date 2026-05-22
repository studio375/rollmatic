import Image from "next/image";
import Link from "next/link";
import { fetchAPI } from "@/helpers/api/fetch-api";
import VideoHtml from "@/components/Library/Video Html/videoHtml";
import BigText from "@/components/Library/Big Text/bigText";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import CustomButton from "@/components/Library/Custom Button/customButton";
import FullpageScrollGallery from "@/components/Library/Scroll Gallery/fullpageScrollGallery";

export default async function Home({params}) {
  const page = await fetchAPI('pages', {
    slug: 'homepage',
    acf_format: 'standard',
  });
  const categorie = await fetchAPI('categoria', {
    acf_format: 'standard',
    parent: 0
  });
  const settori = await fetchAPI('settore', {
    acf_format: 'standard',
    _embed: true
  });
  const articoli = await fetchAPI('posts', {
    acf_format: 'standard',
    _embed: true
  });
  console.log(articoli);
  return (
    <>
      <section className="w-full h-screen relative">
        <div className="absolute top-0 left-0 w-full h-28 sfumatura-dark z-2 rotate-[180deg]"></div>
        <VideoHtml className="z-0" videoObj={page.acf.video_testata} />
        <div className="absolute bottom-9 w-full px-4 flex items-start justify-between flex-wrap z-3">
          <BigText Tag="h1" className="!text-[var(--color-background)] !normal-case">{page.acf.titolo}</BigText>
          <Paragraph className="text-end !text-[var(--color-background)]">{page.acf.paragrafo}</Paragraph>
          <div className="relative bottom-0 left-0 w-full h-px bg-[var(--color-primary)] mt-4"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-28 sfumatura-dark z-2"></div>
      </section>
      <section className="w-full pt-10 boxed flex flex-col items-center">
        <BigText className="font-semibold">{page.acf.titolo_categorie}</BigText>
        <div className="mt-15 flex items-start w-full">
          {
            categorie.map(elem => {
              return <div key={elem.id} className="relative flex flex-col items-center flex-1">
                <BigText Tag="h3" className="text-[32px] font-semibold text-center">{elem.name}</BigText>
                <Paragraph Tag="span">{elem.acf.sottotitolo || ''}</Paragraph>
                <CustomButton className="mt-3" href={elem.slug}>Vedi soluzioni</CustomButton>
              </div>
            })
          }
        </div>
      </section>  
      <section className="mt-23 big-boxed flex flex-col items-center gap-7">
        <BigText Tag="span" className="h2 font-semibold text-center">{page.acf.paragrafo_azienda}</BigText>
        <CustomButton href={page.acf.cta.url}>{page.acf.cta.title}</CustomButton>
      </section>
      <section className="mt-10 min-h-50 flex items-center justify-center">
          OGGETTO 3D
      </section>
      <section className="mt-20 w-full relative">
          <FullpageScrollGallery elements={settori}>
            {
              settori.map(elem => {
                const img = elem._embedded['wp:featuredmedia'][0];
                console.log(img);
                return <div key={elem.id} className="w-full min-w-full h-full relative" data-slide-id={elem.id}>
                  <Image className="w-full h-screen" src={img.source_url} width={img.media_details.width} height={img.media_details.height} alt={elem.title.rendered} />
                </div>
              })
            }
          </FullpageScrollGallery>
      </section>
      <section className="mt-13 big-boxed w-full flex flex-col items-start pb-15">
          <BigText Tag="h2" className="!text-[var(--color-primary)]">News</BigText>
          <div className="realtive w-full flex items-start mt-[35px]">
            {
              articoli.map((elem, index) => {
                var img = elem._embedded['wp:featuredmedia'][0];
                var pad = (index === 0)? 'pr-10' : 'pl-10';
                return <div key={index} className="w-[50%] flex flex-col items-start">
                  <div className={`border-b-[1px] border-b-[var(--color-primary)] w-full ${pad}`}>
                    <div className="relative inline-flex pb-1">
                      <span className="text-[15px] font-bold uppercase">{elem.title.rendered}</span>
                      <div className="absolute bottom-0 left-0 w-full h-[3px] block bg-[var(--color-primary)]"></div>
                    </div>
                  </div>
                  <div className={`flex flex-col items-start mt-5 ${pad}`}>
                    <Image src={img.source_url} width={img.media_details.width} height={img.media_details.height} alt="" />
                    <Paragraph className="mt-[27px]">{elem.acf.descrizione_breve}</Paragraph>
                  </div>
                </div>
              })
            }
          </div>
      </section>
    </>
  );
}
