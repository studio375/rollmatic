"use client";
import Image from "next/image";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import BigText from "@/components/Library/Big Text/bigText";
import CustomButton from "@/components/Library/Custom Button/customButton";
import { useEffect, useRef, useState } from 'react';
import ScrollGallery from '@/components/Library/Scroll Gallery/scrollGallery';
import VideoCarousel from '@/components/Library/Video Carousel/videoCarousel';
import GravityForm from '@/components/Library/Gravity Form/gravityForm';
import { useStore } from '@/store/useStore.js';
import { useTranslations } from "next-intl";

export default function ProductPage({prodotto, cat, formObject = null}){
    const [open, setOpen] = useState(false);
    const [drawsHeight, setDrawsHeight] = useState(0);
    const drawsInner = useRef(null);
    const t = useTranslations('strings');
    function handeClickDraws(){
        var isOpen = !open;
        setOpen(isOpen);
        var height = drawsInner.current.getBoundingClientRect().height;
        setDrawsHeight((isOpen)?height:'0');
    }
    
    var dettagliProd = prodotto.acf.dettagli_prodotto;
    var col1Dettagli = dettagliProd?.filter((elem, i) => {return (i < dettagliProd.length / 2)});
    var col2Dettagli = dettagliProd?.filter((elem, i) => {return (i >= dettagliProd.length / 2)});

    var videoIds = prodotto.acf.galleria_video && prodotto.acf.galleria_video.map(elem => {return elem.id_video_yt});

    const {setCurrentPageTitle} = useStore();
    useEffect(() => {
        setCurrentPageTitle(`${cat.name} ${prodotto.title.rendered}`);
    },[setCurrentPageTitle])
    
    const singleColClass="flex items-start justify-start flex-col";

    return <>
        <section className="w-full relative h-auto py-8 testata-product flex flex-col items-center max-s:gap-5 max-mobileHeader:pt-13">
            {/* {prodotto._embedded['wp:featuredmedia'] && <Image className='h-[calc(100%-200px)] w-auto object-cover absolute left-1/2 bottom-12 -translate-x-1/2 object-bottom' src={prodotto._embedded['wp:featuredmedia'][0].source_url} width={prodotto._embedded['wp:featuredmedia'][0].media_details.width} height={prodotto._embedded['wp:featuredmedia'][0].media_details.height} alt={prodotto._embedded['wp:featuredmedia'][0].alt_text || prodotto.title.rendered}/>} */}
            {prodotto._embedded['wp:featuredmedia'] && <Image className='h-[calc(100vh-200px)] w-auto max-s:w-full max-s:h-auto max-s:max-h-[100vh-200px] object-cover max-s:object-contain relative object-bottom' src={prodotto._embedded['wp:featuredmedia'][0].source_url} width={prodotto._embedded['wp:featuredmedia'][0].media_details.width} height={prodotto._embedded['wp:featuredmedia'][0].media_details.height} alt={prodotto._embedded['wp:featuredmedia'][0].alt_text || prodotto.title.rendered}/>}
            <div className={`boxed relative -mt-8 max-[1700px]:-m-2 w-full flex items-end justify-between max-[1700px]:flex-col max-[1700px]:items-start max-[1700px]:gap-3`}>
                <div className={`w-[40%] max-[1700px]:w-full`}>
                    <BigText className="h3 sub" Tag="h2">{cat.name}</BigText>
                    <BigText Tag="h1" className="font-extrabold">{prodotto.title.rendered}</BigText>
                </div>
                <div className={`flex items-end justify-between w-[55%] max-[1700px]:w-full max-[1700px]:flex-wrap max-[1700px]:gap-3`}>
                    <div className={`${singleColClass}`}>
                        <span>{prodotto.acf.potenza}</span>
                        <span>{prodotto.acf.frequenza}</span>
                        <span>{prodotto.acf.tensione}</span>
                    </div>
                    {
                        prodotto.acf.larghezza_tavolo && <div className={`${singleColClass}`}>
                            <span>{t("Larghezza tavolo")}</span>
                            <span>{prodotto.acf.larghezza_tavolo}</span>
                        </div>
                    }
                    {
                        prodotto.acf.lunghezza_tavolo && <div className={`${singleColClass}`}>
                            <span>{t("Lunghezza tavolo")}</span>
                            <span>{prodotto.acf.lunghezza_tavolo}</span>
                        </div>
                    }
                    {
                        prodotto.acf.litri_planetaria && <div className={`${singleColClass}`}>
                            <span>{t("Litri planetaria")}</span>
                            <span>{prodotto.acf.litri_planetaria}</span>
                        </div>
                    }
                    {
                        prodotto.acf.num_programmi_spazza_arrotondatrice && <div className={`${singleColClass}`}>
                            <span>{t("Numero programmi")}</span>
                            <span>{prodotto.acf.num_programmi_spazza_arrotondatrice}</span>
                        </div>
                    }
                    {
                        prodotto.acf.passo_lame && <div className={`${singleColClass}`}>
                            <span>{t("Passo lame")}</span>
                            <span>{prodotto.acf.passo_lame}</span>
                        </div>
                    }
                    {
                        prodotto.acf.dimensione_max_pane && <div className={`${singleColClass}`}>
                            <span>{t("Dimensione massima pane")}</span>
                            <span>{prodotto.acf.dimensione_max_pane}</span>
                        </div>
                    }
                </div>
            </div>
        </section>
        <section className="boxed flex items-start pt-13 max-l:flex-col">
            <div className={`w-[40%] max-xl:w-[50%] max-l:w-full pr-20 max-xl:pr-10 max-l:pr-0 z-[10] relative`}><Paragraph>{prodotto.acf.paragrafo}</Paragraph></div>
            {
            prodotto.acf.galleria && 
                <div className={`w-[calc(60%)] max-xl:w-[50%] max-l:w-full z-[10] relative`}>
                    <ScrollGallery images={prodotto.acf.galleria}/>
                </div>
            }
        </section>
        <section className="w-full relative mt-25 max-xl:mt-14">
            {cat.acf.testo_gamma && <BigText className="big-boxed text-center m:!text-[40px]/[50px] font-semibold [&_strong]:text-[var(--color-primary)]" Tag="h3">{cat.acf.testo_gamma}</BigText>}
            {prodotto.acf.immagine_full && <div className="w-full product-image big-boxed">
                 <Image className='w-full h-auto top-0 left-0' src={prodotto.acf.immagine_full.url} width={prodotto.acf.immagine_full.width} height={prodotto.acf.immagine_full.height} alt={prodotto.acf.immagine_full.alt || prodotto.title.rendered}/>
            </div>}
            <div className={`big-boxed relative flex flex-col items-center gap-[77px] w-full pt-10 pb-25 max-xl:pb-14 max-m:pb-4 gradient-before`}>
                <CustomButton href={prodotto.acf.scheda_tecnica.url || ''} className={``}>{t("Scheda tecnica")}</CustomButton>
                {prodotto.acf.disegni_tecnici && <div className={`${open?'open':''} w-full relative flex items-start flex-col border-y-[1px] border-[var(--color-foreground)]`}>
                    <div className={`flex justify-between items-center w-full cursor-pointer py-[15px]`} onClick={handeClickDraws}>
                        <span className='uppercase'>{t("Disegni tecnici")}</span>
                        <div className={`w-3 h-3 relative`}>
                            <div className='hor absolute top-[50%] translate-y-[-50%] h-[2px] w-full bg-[var(--color-foreground)] rounded-[2px]'></div>
                            <div className='vert absolute top-[50%] translate-y-[-50%] h-[2px] w-full bg-[var(--color-foreground)] rounded-[2px] rotate-[-90deg] transition-all duration-[0.3s] ease [.open_&]:opacity-0'></div>
                        </div>
                    </div>
                    <div className={`h-0 overflow-hidden w-full transition-all duration-[0.5s] ease`} style={{height: drawsHeight}}>
                        <div className={`flex items-stretch flex-wrap gap-3 w-full pt-[15px] pb-3`} ref={drawsInner}>
                        {
                            prodotto.acf.disegni_tecnici.map(elem => {
                                return <Image className='w-[calc(50%-15px)] h-auto' src={elem.url} width={elem.width} height={elem.height} alt={elem.alt || 'disegno tecnico'} key={elem.ID} />
                            })
                        }
                        </div>
                    </div>
                </div>}
                <div className={`flex items-start justify-start gap-18 max-xl:gap-9 w-full max-m:flex-col max-m:gap-0`}>
                    <div className={`relative w-[calc(50%-90px)] max-xl:w-[calc(50%-45px)] max-m:w-full`}>
                        <ul>
                        {
                            col1Dettagli.map((elem,i) => {
                                return <div key={i}><span className="absolute left-0">•</span><Paragraph className={`${i > 0 && 'mt-[5px]'} pl-2`} Tag='li'>{elem.testo}</Paragraph></div>;
                            })
                        }
                        </ul>
                    </div>
                    <div className={`relative w-[calc(50%-90px)] max-xl:w-[calc(50%-45px)] max-m:w-full`}>
                        <ul>
                        {
                            col2Dettagli.map((elem,i) => {
                                return <div key={i}><span className="absolute left-0">•</span><Paragraph className={`${i > 0 && 'mt-[5px]'} pl-2`} Tag='li'>{elem.testo}</Paragraph></div>;
                            })
                        }
                        </ul>
                    </div>
                </div>
            </div>
            
        </section>
        <section className="big-boxed mt-5 mb-12 relative z-[10] flex items-start flex-col gap-[115px] max-m:gap-5">
            <div className="divisor"></div>
            <div className={`flex items-start w-full relative max-m:flex-col max-m:gap-3`}>
                <BigText className={`m:w-[calc(100%/3)] !text-[36px] !font-bold`} Tag="h3">{t("Richiedi informazioni")}</BigText>
                <GravityForm className={`m:!w-[calc(200%/3)]`} formObject={formObject} />
            </div>
        </section>
        
        {videoIds && <section className="big-boxed mb-[178px]">
            <VideoCarousel videoIds={videoIds} />
        </section>}
    </>;
}