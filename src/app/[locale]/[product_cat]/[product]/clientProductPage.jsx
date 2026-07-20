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

export default function ProductPage({prodotto, cat, formObject = null}){
    const [open, setOpen] = useState(false);
    const [drawsHeight, setDrawsHeight] = useState(0);
    const drawsInner = useRef(null);
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
        <section className="w-full relative h-auto py-8 testata-product flex flex-col items-center">
            {/* {prodotto._embedded['wp:featuredmedia'] && <Image className='h-[calc(100%-200px)] w-auto object-cover absolute left-1/2 bottom-12 -translate-x-1/2 object-bottom' src={prodotto._embedded['wp:featuredmedia'][0].source_url} width={prodotto._embedded['wp:featuredmedia'][0].media_details.width} height={prodotto._embedded['wp:featuredmedia'][0].media_details.height} alt={prodotto._embedded['wp:featuredmedia'][0].alt_text || prodotto.title.rendered}/>} */}
            {prodotto._embedded['wp:featuredmedia'] && <Image className='h-[calc(100vh-200px)] w-auto object-cover relative object-bottom' src={prodotto._embedded['wp:featuredmedia'][0].source_url} width={prodotto._embedded['wp:featuredmedia'][0].media_details.width} height={prodotto._embedded['wp:featuredmedia'][0].media_details.height} alt={prodotto._embedded['wp:featuredmedia'][0].alt_text || prodotto.title.rendered}/>}
            <div className={`boxed relative -mt-8 w-full flex items-end`}>
                <div className={`w-[40%]`}>
                    <BigText className="h3 sub" Tag="h2">{cat.name}</BigText>
                    <BigText Tag="h1" className="font-extrabold">{prodotto.title.rendered}</BigText>
                </div>
                <div className={`flex items-end justify-between w-[60%]`}>
                    <div className={`${singleColClass}`}>
                        <span>{prodotto.acf.potenza}</span>
                        <span>{prodotto.acf.frequenza} Hz</span>
                        <span>{prodotto.acf.tensione} Ph</span>
                    </div>
                    {
                        prodotto.acf.larghezza_tavolo && <div className={`${singleColClass}`}>
                            <span>Larghezza tavolo</span>
                            <span>{prodotto.acf.larghezza_tavolo}</span>
                        </div>
                    }
                    {
                        prodotto.acf.lunghezza_tavolo && <div className={`${singleColClass}`}>
                            <span>Lunghezza tavolo</span>
                            <span>{prodotto.acf.lunghezza_tavolo}</span>
                        </div>
                    }
                    {
                        prodotto.acf.litri_planetaria && <div className={`${singleColClass}`}>
                            <span>Litri planetaria</span>
                            <span>{prodotto.acf.litri_planetaria}</span>
                        </div>
                    }
                    {
                        prodotto.acf.num_programmi_spazza_arrotondatrice && <div className={`${singleColClass}`}>
                            <span>Numero programmi</span>
                            <span>{prodotto.acf.num_programmi_spazza_arrotondatrice}</span>
                        </div>
                    }
                    {
                        prodotto.acf.passo_lame && <div className={`${singleColClass}`}>
                            <span>Passo lame</span>
                            <span>{prodotto.acf.passo_lame}</span>
                        </div>
                    }
                    {
                        prodotto.acf.dimensione_max_pane && <div className={`${singleColClass}`}>
                            <span>Dimensione massima pane</span>
                            <span>{prodotto.acf.dimensione_max_pane}</span>
                        </div>
                    }
                </div>
            </div>
        </section>
        <section className="boxed flex items-start min-h-50 pt-13">
            <div className={`w-[calc(100%-1050px)] pr-20 z-[10] relative`}><Paragraph>{prodotto.acf.paragrafo}</Paragraph></div>
            {
            prodotto.acf.galleria && 
                <div className={`w-105 z-[10] relative`}>
                    <ScrollGallery images={prodotto.acf.galleria}/>
                </div>
            }
        </section>
        <section className="w-full relative mt-25">
            {cat.acf.testo_gamma && <BigText className="big-boxed text-center !text-[40px]/[50px] font-semibold [&_strong]:text-[var(--color-primary)]" Tag="h3">{cat.acf.testo_gamma}</BigText>}
            {prodotto.acf.immagine_full && <div className="w-full product-image big-boxed">
                 <Image className='w-full h-auto top-0 left-0' src={prodotto.acf.immagine_full.url} width={prodotto.acf.immagine_full.width} height={prodotto.acf.immagine_full.height} alt={prodotto.acf.immagine_full.alt || prodotto.title.rendered}/>
            </div>}
            <div className={`big-boxed relative flex flex-col items-center gap-[77px] w-full pt-10 pb-25 gradient-before`}>
                <CustomButton href={prodotto.acf.scheda_tecnica.url || ''} className={``}>Scheda tecnica</CustomButton>
                {prodotto.acf.disegni_tecnici && <div className={`${open?'open':''} w-full relative flex items-start flex-col border-y-[1px] border-[var(--color-foreground)]`}>
                    <div className={`flex justify-between items-center w-full cursor-pointer py-[15px]`} onClick={handeClickDraws}>
                        <span className='uppercase'>Disegni tecnici</span>
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
                <div className={`flex items-start justify-start gap-18 w-full`}>
                    <div className={`relative w-[calc(50%-90px)]`}>
                        <ul>
                        {
                            col1Dettagli.map((elem,i) => {
                                return <Paragraph className={`${i > 0 && 'mt-[5px]'}`} key={i} Tag='li'>{elem.testo}</Paragraph>;
                            })
                        }
                        </ul>
                    </div>
                    <div className={`relative w-[calc(50%-90px)]`}>
                        <ul>
                        {
                            col2Dettagli.map((elem,i) => {
                                return <Paragraph className={`${i > 0 && 'mt-[5px]'}`} key={i} Tag='li'>{elem.testo}</Paragraph>;
                            })
                        }
                        </ul>
                    </div>
                </div>
            </div>
            
        </section>
        <section className="big-boxed mt-5 mb-12 relative z-[10] flex items-start flex-col gap-[115px]">
            <div className="divisor"></div>
            <div className={`flex items-start w-full relative`}>
                <BigText className={`w-[calc(100%/3)] !text-[36px] !font-bold`} Tag="h3">{'Richiedi<br>informazioni'}</BigText>
                <GravityForm className={`!w-[calc(200%/3)]`} formObject={formObject} />
            </div>
        </section>
        
        {videoIds && <section className="big-boxed mb-[178px]">
            <VideoCarousel videoIds={videoIds} />
        </section>}
    </>;
}