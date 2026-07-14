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
    return <section {...props} className={`w-full relative big-boxed my-15 max-m:mt-10 max-xs:mt-5 ${props.className || ''}`}>
        <div ref={lineRef} className="w-[1px] h-full bg-[var(--color-primary)] absolute top-0 left-1/2 max-s:left-[5vw] max-s:top-6"></div>
        <div className="w-full flex justify-center items-center gap-5 s:translate-x-2 max-s:gap-1 max-s:justify-start">
            <BigText className="s:!text-[60px] xs:!text-[40px] font-semibold text-[var(--color-primary)]">Rollmatic</BigText>
            <BigText className="s:!text-[60px] xs:!text-[40px] font-semibold">milestones</BigText>
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
                    
                    return <div key={index} style={{order}} className={`relative flex flex-col w-1/2 relative ${isLeft?'items-start':'items-end'} [&:nth-child(2n)]:mt-20 [&:nth-last-child(2)]:mt-20 max-s:w-full max-s:items-start max-s:!mt-10 max-xs:!mt-5 max-s:!order-[unset]`}>
                        {
                            index !== page.acf.storia.length-1 ? <div className={`relative w-full flex flex-col`}>
                                <BigText Tag="span" className={`fade-effect h1 text-[var(--color-primary)] font-extrabold px-[25px] ${isLeft ? 'text-right' : 'text-left'} max-s:text-start max-s:px-5 max-xs:px-[5vw]`}>{elem.anno}</BigText>
                                <div className={`w-full relative flex items-center ${isLeft?'flex-row-reverse':'flex-row'} max-s:flex-row`} >
                                    <div className={`fade-effect w-2 h-2 rounded-full bg-[var(--color-primary)] absolute top-1/2 transform -translate-y-1/2 ${isLeft ? 'right-0 translate-x-1/2' : 'left-0 -translate-x-1/2'} max-s:left-0 max-s:-translate-x-1/2`}></div>
                                    <div className="w-full line h-[1px] bg-[var(--color-primary)]"></div>
                                </div>
                            </div> : elem.immagini.map((img, index) => {
                                return <Image key={index} className="w-[calc(100%-370px)] h-auto mt-1 fade-effect max-s:ml-5 max-s:w-[calc(100%-100px)] max-xs:ml-[5vw]" src={img.url} width={img.width} height={img.height} alt={img.alt || ''} />
                            })
                        }
                        
                        <div className={`w-[calc(100%-200px)] relative flex flex-col items-start mt-3 fade-effect max-xl:w-[calc(100%-70px)] max-xs:w-full max-s:pl-5 max-xs:pl-[5vw]`}>
                            <BigText Tag="h2" className="!text-[15px] uppercase relative pb-1 !font-bold before:content-[''] before:absolute before:left-0 before:bottom-0 before:w-[85px] before:h-[3px] before:bg-[var(--color-primary)]">{elem.titolo}</BigText>
                            <div className="flex flex-col items-center px-5 py-[45px] bg-[#7D5B5B1A] rounded-[10px] mt-[35px] max-l:p-2">
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