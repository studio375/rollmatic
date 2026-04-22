"use client";
import style from './product.module.scss';
import Image from "next/image";
import Paragraph from "@/components/Library/Paragraph/paragraph";
import BigText from "@/components/Library/Big Text/bigText";
import CustomButton from "@/components/Library/Custom Button/customButton";
import { useEffect, useRef, useState } from 'react';
import ScrollGallery from '@/components/Library/Scroll Gallery/scrollGallery';
import VideoCarousel from '@/components/Library/Video Carousel/videoCarousel';
import VideoPlayer from '@/components/Library/video Player/videoPlayer';

export default function ProductPage({prodotto, cat}){
    
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


    return <>
        <section id={style.heading} className="shaded">
            <Image src={prodotto.acf.immagine_testata.url} width={prodotto.acf.immagine_testata.width} height={prodotto.acf.immagine_testata.height} alt={prodotto.acf.immagine_testata.alt || prodotto.title.rendered}/>
            <div className={`${style.text} boxed`}>
                <div className={style.left}>
                    <h2 className="h3 sub">{cat.name}</h2>
                    <h1>{prodotto.title.rendered}</h1>
                </div>
                <div className={style.right}>
                    <div className={style.singleCol}>
                        <span>{prodotto.acf.potenza}</span>
                        <span>{prodotto.acf.frequenza}</span>
                        <span>{prodotto.acf.tensione}</span>
                    </div>
                    <div className={style.singleCol}>
                        <span>Larghezza tavolo</span>
                        <span>{prodotto.acf.larghezza_tavolo}</span>
                    </div>
                    <div className={style.singleCol}>
                        <span>Lunghezza tavolo</span>
                        <span>{prodotto.acf.lunghezza_tavolo}</span>
                    </div>
                </div>
            </div>
        </section>
        <section id={style.first} className="boxed">
            <div className={style.left}><Paragraph>{prodotto.acf.paragrafo}</Paragraph></div>
            <div className={style.right}>
                <ScrollGallery images={prodotto.acf.galleria}/>
                </div>
        </section>
        <section id={style.second} className="shaded shaded-before">
            <Image src={prodotto.acf.immagine_full.url} width={prodotto.acf.immagine_full.width} height={prodotto.acf.immagine_full.height} alt={prodotto.acf.immagine_full.alt || prodotto.title.rendered}/>
            <div className={`${style.container} big-boxed`}>
                <div className={style.title}><BigText Tag="h3">{cat.acf.testo_gamma}</BigText></div>
                <div className={style.bottom}>
                    <CustomButton className={style.datasheet}>Scheda tecnica</CustomButton>
                    <div className={`${style.disegni} ${open?style.open:''}`}>
                        <div className={style.title} onClick={handeClickDraws}><span>Disegni tecnici</span><div className={style.actions}></div></div>
                        <div className={style.drawsContainer} style={{height: drawsHeight}}>
                            <div className={style.inner} ref={drawsInner}>
                            {
                                prodotto.acf.disegni_tecnici.map(elem => {
                                    return <Image src={elem.url} width={elem.width} height={elem.height} alt={elem.alt || 'disegno tecnico'} key={elem.ID} />
                                })
                            }
                            </div>
                        </div>
                    </div>
                    <div className={`${style.text}`}>
                        <div className={`${style.leftCol} ${style.singleCol}`}>
                            <ul>
                            {
                                col1Dettagli.map((elem,i) => {
                                    return <Paragraph key={i} Tag='li'>{elem.testo}</Paragraph>;
                                })
                            }
                            </ul>
                        </div>
                        <div className={`${style.rightCol} ${style.singleCol}`}>
                            <ul>
                            {
                                col2Dettagli.map((elem,i) => {
                                    return <Paragraph key={i} Tag='li'>{elem.testo}</Paragraph>;
                                })
                            }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section id={style.third} className="big-boxed">
            <div className="divisor"></div>
            <div className={style.container}>
                <BigText Tag="h3">Richiedi informazioni</BigText>
            </div>
        </section>
        <section id={style.fourth} className="big-boxed">
            <VideoCarousel videoIds={videoIds} />
        </section>
    </>;
}