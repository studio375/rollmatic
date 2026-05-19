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

    var videoIds = prodotto.acf.galleria_video.map(elem => {return elem.id_video_yt});

    const {setCurrentPageTitle} = useStore();
    useEffect(() => {
        setCurrentPageTitle(`${cat.name} ${prodotto.title.rendered}`);
    },[setCurrentPageTitle])
    
    const singleColClass="flex items-start justify-start flex-col";

    return <>
        <section className="shaded w-full relative">
            <Image className='w-full h-auto' src={prodotto.acf.immagine_testata.url} width={prodotto.acf.immagine_testata.width} height={prodotto.acf.immagine_testata.height} alt={prodotto.acf.immagine_testata.alt || prodotto.title.rendered}/>
            <div className={`boxed absolute left-0 top-[80vh] w-full flex items-end`}>
                <div className={`w-[40%]`}>
                    <h2 className="h3 sub">{cat.name}</h2>
                    <h1>{prodotto.title.rendered}</h1>
                </div>
                <div className={`flex items-end justify-between w-[60%]`}>
                    <div className={`${singleColClass}`}>
                        <span>{prodotto.acf.potenza}</span>
                        <span>{prodotto.acf.frequenza}</span>
                        <span>{prodotto.acf.tensione}</span>
                    </div>
                    <div className={`${singleColClass}`}>
                        <span>Larghezza tavolo</span>
                        <span>{prodotto.acf.larghezza_tavolo}</span>
                    </div>
                    <div className={`${singleColClass}`}>
                        <span>Lunghezza tavolo</span>
                        <span>{prodotto.acf.lunghezza_tavolo}</span>
                    </div>
                </div>
            </div>
        </section>
        <section className="boxed flex items-start min-h-50">
            <div className={`w-[calc(100%-1050px)] pr-20 z-[10] relative`}><Paragraph>{prodotto.acf.paragrafo}</Paragraph></div>
            <div className={`w-105 z-[10] relative`}>
                <ScrollGallery images={prodotto.acf.galleria}/>
                </div>
        </section>
        <section className="shaded shaded-before w-full relative">
            <Image className='w-full h-auto absolute top-0 left-0' src={prodotto.acf.immagine_full.url} width={prodotto.acf.immagine_full.width} height={prodotto.acf.immagine_full.height} alt={prodotto.acf.immagine_full.alt || prodotto.title.rendered}/>
            <div className={`big-boxed relative top-0 w-full h-full pt-36 pb-25 flex flex-col justify-between items-center gap-85`}>
                <div><BigText className="text-center !text-[40px]/[50px] font-semibold [&_strong]:text-[var(--color-primary)]" Tag="h3">{cat.acf.testo_gamma}</BigText></div>
                <div className={`flex flex-col items-center gap-[77px] w-full`}>
                    <CustomButton href="" className={`light`}>Scheda tecnica</CustomButton>
                    <div className={`${open?'open':''} w-full relative flex items-start flex-col border-y-[1px] border-white`}>
                        <div className={`flex justify-between items-center w-full cursor-pointer py-[15px]`} onClick={handeClickDraws}>
                            <span className='uppercase'>Disegni tecnici</span>
                            <div className={`w-3 h-3 relative`}>
                                <div className='hor absolute top-[50%] translate-y-[-50%] h-[2px] w-full bg-white rounded-[2px]'></div>
                                <div className='vert absolute top-[50%] translate-y-[-50%] h-[2px] w-full bg-white rounded-[2px] rotate-[-90deg] transition-all duration-[0.3s] ease [.open_&]:opacity-0'></div>
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
                    </div>
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
            </div>
        </section>
        <section className="big-boxed mt-5 relative z-[10] flex items-start flex-col gap-[115px]">
            <div className="divisor"></div>
            <div className={`flex items-start w-full relative`}>
                <BigText className={`w-[calc(100%/3)]`} Tag="h3">Richiedi informazioni</BigText>
                <GravityForm className={`!w-[calc(200%/3)]`} formObject={formObject} />
            </div>
        </section>
        <section className="big-boxed mb-[178px] mt-12">
            <VideoCarousel videoIds={videoIds} />
        </section>
    </>;
}