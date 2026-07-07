"use client"

import Image from "next/image";
import BigText from "../Big Text/bigText"
import Paragraph from "../Paragraph/paragraph";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function Timeline({page, ...props}){
    var order = 0;
    var ref = useRef(null);
    var lineRef = useRef(null);
    useEffect(() => {
        if(!ref.current) return;
        if(!lineRef.current) return;
        var tml = gsap.timeline({});
        Array.from(ref.current.children).forEach((elem, index) => {
            tml = gsap.timeline({
                scrollTrigger: {
                    trigger: elem,
                    start: "top 70%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                    invalidateOnRefresh: true
                },
                defaults: {ease: 'none'}
            });
            tml.to(elem.querySelectorAll('.fade-effect'), {opacity:1, duration: 0.5})
               .from(elem.querySelector('.line'), {width:0, duration: 1}, '<')
        })

        var tml2 = gsap.timeline({
            scrollTrigger: {
                trigger: lineRef.current,
                start: "top 70%",
                end: `+=${lineRef.current.parentElement.offsetHeight}px`,
                toggleActions: "play none none reverse",
                scrub: true,
                invalidateOnRefresh: true
            }
        });
        tml2.from(lineRef.current, {height:0, ease: 'none'});

        return () => {
            if(tml){
                tml.scrollTrigger?.kill();
                tml.kill();
            }
            if(tml2){
                tml2.scrollTrigger?.kill();
                tml2.kill();
            }
        }
    }, []);
    return <section {...props} className={`w-full relative big-boxed my-15 ${props.className || ''}`}>
        <div ref={lineRef} className="w-[1px] h-full bg-[var(--color-primary)] absolute top-0 left-1/2"></div>
        <div className="w-full flex justify-center items-center gap-5 translate-x-2">
            <BigText className="!text-[60px] font-semibold text-[var(--color-primary)]">Rollmatic</BigText>
            <BigText className="!text-[60px] font-semibold">milestones</BigText>
        </div>
        <div ref={ref} className="relative w-full flex flex-wrap pt-8 justify-end">
            {
                page.acf.storia.map((elem, index) => {
                    var isLeft = (elem.posizione==='sx');
                    order = index;
                    if(index%2===1 && isLeft){ //se è dispari e a sinistra, spostalo a destra
                        order = index-1;
                    }
                    if(index%2===0 && !isLeft){ //se è pari e a destra, spostalo a sinistra
                        order = index+1;
                    }
                    
                    return <div key={index} style={{order}} className={`flex flex-col w-1/2 relative ${isLeft?'items-start':'items-end'} [&:nth-child(2n)]:mt-20 [&:nth-last-child(2)]:mt-20`}>
                        {
                            index !== page.acf.storia.length-1 ? <div className={`relative w-full flex flex-col`}>
                                <BigText Tag="span" className={`fade-effect h1 text-[var(--color-primary)] font-extrabold px-[25px] ${isLeft ? 'text-right' : 'text-left'}`}>{elem.anno}</BigText>
                                <div className={`w-full relative flex items-center ${isLeft?'flex-row-reverse':'flex-row'}`} >
                                    <div className={`fade-effect w-2 h-2 rounded-full bg-[var(--color-primary)] absolute top-1/2 transform -translate-y-1/2 ${isLeft ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'}`}></div>
                                    <div className="w-full line h-[1px] bg-[var(--color-primary)]"></div>
                                </div>
                            </div> : elem.immagini.map((img, index) => {
                                return <Image key={index} className="w-[calc(100%-370px)] h-auto mt-1 fade-effect" src={img.url} width={img.width} height={img.height} alt={img.alt || ''} />
                            })
                        }
                        
                        <div className={`w-[calc(100%-200px)] relative flex flex-col items-start mt-3 fade-effect`}>
                            <BigText Tag="h2" className="!text-[15px] uppercase relative pb-1 !font-bold before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-[85px] before:h-[3px] before:bg-[var(--color-primary)]">{elem.titolo}</BigText>
                            <div className="flex flex-col items-center px-5 py-[45px] bg-[#7D5B5B1A] rounded-[10px] mt-[35px]">
                                <Paragraph className="mb-3">{elem.paragrafo}</Paragraph>
                                {
                                    index !== page.acf.storia.length-1 && elem.immagini.map((img, index) => {
                                        return <Image key={index} className="w-full h-auto mt-1" src={img.url} width={img.width} height={img.height} alt={img.alt || ''} />
                                    })
                                }
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    </section>
}